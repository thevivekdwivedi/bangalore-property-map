// BMTC feeder bus route visualization layer
import { getFeederRoutes } from '../data/bmtc-routes.js';

export class FeederLayer {
  constructor(map) {
    this.map = map;
    this.activeRoutes = [];
  }

  init() {
    this.map.addSource('feeder-routes', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    });

    this.map.addLayer({
      id: 'feeder-routes-layer',
      type: 'line',
      source: 'feeder-routes',
      paint: {
        'line-color': '#FF6600',
        'line-width': 3,
        'line-opacity': 0.7,
        'line-dasharray': [4, 3]
      }
    });

    this.map.addLayer({
      id: 'feeder-routes-label',
      type: 'symbol',
      source: 'feeder-routes',
      layout: {
        'symbol-placement': 'line',
        'text-field': ['get', 'name'],
        'text-size': 10,
        'text-offset': [0, -1],
        'text-allow-overlap': false
      },
      paint: {
        'text-color': '#CC5500',
        'text-halo-color': '#fff',
        'text-halo-width': 1
      }
    });
  }

  showRoutes(stationName, routes) {
    if (!routes) routes = getFeederRoutes(stationName);
    if (!routes || routes.length === 0) {
      this.clear();
      return;
    }

    const features = routes.map(r => ({
      type: 'Feature',
      properties: { id: r.id, name: r.name },
      geometry: { type: 'LineString', coordinates: r.coordinates }
    }));

    this.map.getSource('feeder-routes')?.setData({
      type: 'FeatureCollection',
      features
    });
    this.activeRoutes = routes;
  }

  clear() {
    this.map.getSource('feeder-routes')?.setData({
      type: 'FeatureCollection',
      features: []
    });
    this.activeRoutes = [];
  }
}
