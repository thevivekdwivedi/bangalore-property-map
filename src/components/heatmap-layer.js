// Real estate valuation heatmap layer
// Zoom-dependent: visible at macro zoom, fades at street level
import { STATIONS } from '../data/metro-network.js';
import { PROPERTY_DATA } from '../data/property-valuations.js';

export class HeatmapLayer {
  constructor(map) {
    this.map = map;
    this.visible = false;
  }

  init() {
    const features = [];
    for (const [lineId, stations] of Object.entries(STATIONS)) {
      for (const s of stations) {
        const prop = PROPERTY_DATA[s.name];
        if (!prop) continue;
        features.push({
          type: 'Feature',
          properties: {
            name: s.name,
            pricePerSqFt: prop.pricePerSqFt,
            intensity: prop.pricePerSqFt / 22000, // normalize to max price
            trend: prop.trend,
            zone: prop.zone
          },
          geometry: {
            type: 'Point',
            coordinates: [s.lng, s.lat]
          }
        });
      }
    }

    this.map.addSource('property-heatmap', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    });

    // Heatmap layer - visible at macro zoom levels (8-14), fades out below
    this.map.addLayer({
      id: 'property-heatmap-layer',
      type: 'heatmap',
      source: 'property-heatmap',
      maxzoom: 16,
      paint: {
        'heatmap-weight': ['get', 'intensity'],
        'heatmap-intensity': [
          'interpolate', ['linear'], ['zoom'],
          8, 0.5, 11, 1.5, 14, 2, 16, 0
        ],
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(0,0,0,0)',
          0.1, 'rgba(0,128,255,0.2)',
          0.3, 'rgba(0,200,150,0.4)',
          0.5, 'rgba(255,255,0,0.5)',
          0.7, 'rgba(255,165,0,0.6)',
          1, 'rgba(255,40,40,0.8)'
        ],
        'heatmap-radius': [
          'interpolate', ['linear'], ['zoom'],
          8, 15, 11, 30, 14, 50, 16, 60
        ],
        'heatmap-opacity': [
          'interpolate', ['linear'], ['zoom'],
          8, 0.6, 12, 0.7, 14, 0.4, 15, 0.1, 16, 0
        ]
      },
      layout: {
        visibility: 'none'
      }
    }, 'label-tiles');

    // Point layer for price labels at higher zoom
    this.map.addLayer({
      id: 'property-points-layer',
      type: 'circle',
      source: 'property-heatmap',
      minzoom: 13,
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'],
          13, 3, 16, 8
        ],
        'circle-color': [
          'interpolate', ['linear'], ['get', 'pricePerSqFt'],
          3000, '#2196F3',
          8000, '#4CAF50',
          14000, '#FFC107',
          20000, '#FF5722'
        ],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
        'circle-opacity': [
          'interpolate', ['linear'], ['zoom'],
          13, 0, 14, 0.6, 16, 0.9
        ]
      },
      layout: {
        visibility: 'none'
      }
    });
  }

  toggle() {
    this.visible = !this.visible;
    const vis = this.visible ? 'visible' : 'none';
    this.map.setLayoutProperty('property-heatmap-layer', 'visibility', vis);
    this.map.setLayoutProperty('property-points-layer', 'visibility', vis);
    return this.visible;
  }

  show() {
    this.visible = true;
    this.map.setLayoutProperty('property-heatmap-layer', 'visibility', 'visible');
    this.map.setLayoutProperty('property-points-layer', 'visibility', 'visible');
  }

  hide() {
    this.visible = false;
    this.map.setLayoutProperty('property-heatmap-layer', 'visibility', 'none');
    this.map.setLayoutProperty('property-points-layer', 'visibility', 'none');
  }
}
