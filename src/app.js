// Main application - Namma Metro Digital Twin
import { LINE_METADATA, LINE_PATHS, buildLineGeoJSON, buildStationsGeoJSON } from './data/metro-network.js';
import { MAP_STYLE, MAP_CENTER, MAP_ZOOM } from './styles/map-theme.js';
import { TemporalToggle } from './components/temporal-toggle.js';
import { StationModal } from './components/station-modal.js';
import { RealtimeLayer } from './components/realtime-layer.js';
import { HeatmapLayer } from './components/heatmap-layer.js';
import { FeederLayer } from './components/feeder-layer.js';

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
      minZoom: 9,
      maxZoom: 18,
      attributionControl: true
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
    this.map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    this.map.on('load', () => {
      this.addMetroLayers();
      this.initComponents();
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
        type: 'circle',
        source: `stations-${lineId}`,
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            9, 2, 12, 4, 14, 7, 18, 12
          ],
          'circle-color': [
            'case', ['get', 'isJunction'], '#111111', meta.color
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': [
            'interpolate', ['linear'], ['zoom'],
            9, 0.5, 14, 2
          ],
          'circle-opacity': meta.operationalSince ? 1 : 0.5
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
