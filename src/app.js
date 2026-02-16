// Main application - Namma Metro Digital Twin
import { LINE_METADATA, LINE_PATHS, buildLineGeoJSON, buildStationsGeoJSON } from './data/metro-network.js';
import { MAP_STYLE, MAP_CENTER, MAP_ZOOM } from './styles/map-theme.js';
import { TemporalToggle } from './components/temporal-toggle.js';
import { StationModal } from './components/station-modal.js';
import { RealtimeLayer } from './components/realtime-layer.js';
import { HeatmapLayer } from './components/heatmap-layer.js';
import { FeederLayer } from './components/feeder-layer.js';

const STATION_ICON_SVG = `data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2240%22%20height%3D%2280%22%20viewBox%3D%220%200%20100%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%2244%22%20y%3D%2290%22%20width%3D%2212%22%20height%3D%22100%22%20fill%3D%22%23555555%22%20stroke%3D%22none%22%2F%3E%3Cellipse%20cx%3D%2250%22%20cy%3D%22190%22%20rx%3D%2220%22%20ry%3D%228%22%20fill%3D%22%23333333%22%20opacity%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2246%22%20fill%3D%22white%22%20stroke%3D%22%23E0E0E0%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M30%2030%20Q50%2015%2070%2030%20Q85%2050%2070%2070%20Q50%2085%2030%2070%20Q15%2050%2030%2030%22%20fill%3D%22none%22%20stroke%3D%22%232E7D32%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M50%2020%20V80%20M20%2050%20h60%22%20fill%3D%22none%22%20stroke%3D%22%236A1B9A%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%228%22%20fill%3D%22%236A1B9A%22%2F%3E%3C%2Fsvg%3E`;

class NammaMetroApp {
  constructor() {
    this.map = null;
    this.temporalToggle = null;
    this.stationModal = null;
    this.realtimeLayer = null;
    this.heatmapLayer = null;
    this.feederLayer = null;
  }

  async init() {
    // Initialize MapLibre GL map
    this.map = new maplibregl.Map({
      container: 'map',
      style: MAP_STYLE,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      pitch: 60,
      bearing: -20,
      maxPitch: 85,
      minZoom: 9,
      maxZoom: 18,
      attributionControl: true
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
    this.map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    this.map.on('load', () => {
      const img = new Image(40, 80);
      img.onload = () => {
        this.map.addImage('station-icon', img);
        this.addMetroLayers();
        this.initComponents();
      };
      img.onerror = (e) => console.error('Failed to load station icon', e);
      img.src = STATION_ICON_SVG;
    });
  }

  addMetroLayers() {
    // Add line sources and layers
    for (const lineId of Object.keys(LINE_METADATA)) {
      const lineGeoJSON = buildLineGeoJSON(lineId);
      const stationsGeoJSON = buildStationsGeoJSON(lineId);
      const meta = LINE_METADATA[lineId];

      // Line source & layer
      this.map.addSource(`line-${lineId}`, {
        type: 'geojson',
        data: lineGeoJSON
      });

      this.map.addLayer({
        id: `line-${lineId}`,
        type: 'line',
        source: `line-${lineId}`,
        paint: {
          'line-color': meta.color,
          'line-width': ['interpolate', ['linear'], ['zoom'], 9, 2, 14, 5, 18, 8],
          'line-opacity': meta.operationalSince ? 1 : 0.5,
          'line-dasharray': meta.operationalSince ? [1, 0] : [8, 6]
        },
        layout: { 'line-cap': 'round', 'line-join': 'round' }
      });

      // Station source & layers
      this.map.addSource(`stations-${lineId}`, {
        type: 'geojson',
        data: stationsGeoJSON
      });

      this.map.addLayer({
        id: `stations-${lineId}`,
        type: 'symbol',
        source: `stations-${lineId}`,
        layout: {
          'icon-image': 'station-icon',
          'icon-size': [
            'interpolate', ['linear'], ['zoom'],
            9, 0.1, 12, 0.2, 14, 0.35, 18, 0.6
          ],
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        },
        paint: {
          'icon-opacity': meta.operationalSince ? 1 : 0.5
        }
      });

      // Station labels
      this.map.addLayer({
        id: `labels-${lineId}`,
        type: 'symbol',
        source: `stations-${lineId}`,
        minzoom: 12,
        layout: {
          'text-field': ['get', 'name'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 12, 9, 16, 13],
          'text-offset': [0, 1.3],
          'text-anchor': 'top',
          'text-allow-overlap': false,
          'text-optional': true
        },
        paint: {
          'text-color': '#333',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1.5,
          'text-opacity': meta.operationalSince ? 1 : 0.5
        }
      });

      // Click handler for stations
      this.map.on('click', `stations-${lineId}`, (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          this.stationModal.open(props);
          this.feederLayer.clear();
        }
      });

      // Cursor change on hover
      this.map.on('mouseenter', `stations-${lineId}`, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', `stations-${lineId}`, () => {
        this.map.getCanvas().style.cursor = '';
      });
    }
  }

  initComponents() {
    // Temporal toggle
    this.temporalToggle = new TemporalToggle(this.map, 'temporal-controls');

    // Station modal
    this.stationModal = new StationModal('station-modal-container');

    // Feeder routes layer
    this.feederLayer = new FeederLayer(this.map);
    this.feederLayer.init();

    // Wire station modal to feeder layer
    this.stationModal.onFeederRoutesRequested = (stationName, routes) => {
      this.feederLayer.showRoutes(stationName, routes);
    };
    this.stationModal.onClose = () => {
      this.feederLayer.clear();
    };

    // Heatmap layer
    this.heatmapLayer = new HeatmapLayer(this.map);
    this.heatmapLayer.init();

    // Heatmap toggle button
    document.getElementById('heatmap-toggle').addEventListener('click', () => {
      const isOn = this.heatmapLayer.toggle();
      document.getElementById('heatmap-toggle').classList.toggle('active', isOn);
    });

    // Realtime layer
    this.realtimeLayer = new RealtimeLayer(this.map);
    this.realtimeLayer.start();

    // Realtime toggle
    document.getElementById('realtime-toggle').addEventListener('click', () => {
      const btn = document.getElementById('realtime-toggle');
      if (btn.classList.contains('active')) {
        this.realtimeLayer.stop();
        btn.classList.remove('active');
        this.map.setLayoutProperty('realtime-vehicles-layer', 'visibility', 'none');
        this.map.setLayoutProperty('realtime-vehicles-label', 'visibility', 'none');
      } else {
        this.realtimeLayer.start();
        btn.classList.add('active');
        this.map.setLayoutProperty('realtime-vehicles-layer', 'visibility', 'visible');
        this.map.setLayoutProperty('realtime-vehicles-label', 'visibility', 'visible');
      }
    });
  }
}

// Boot
const app = new NammaMetroApp();
app.init();
