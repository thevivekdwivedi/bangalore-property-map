// GTFS-Realtime telemetry integration
// Fetches live train positions from DULT Transport Data Hub

const DULT_BASE_URL = 'https://tdh.dult-karnataka.com';
const PROXY_URL = '/api/gtfs-rt'; // Backend proxy endpoint for CORS

export class RealtimeLayer {
  constructor(map) {
    this.map = map;
    this.pollInterval = null;
    this.markers = {};
    this.useProxy = true;
    this.pollFrequencyMs = 15000; // 15 seconds
  }

  async start() {
    // Add source for realtime positions
    this.map.addSource('realtime-vehicles', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    });

    this.map.addLayer({
      id: 'realtime-vehicles-layer',
      type: 'circle',
      source: 'realtime-vehicles',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'],
          10, 4, 14, 8, 18, 14
        ],
        'circle-color': ['get', 'color'],
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 2,
        'circle-opacity': 0.9
      }
    });

    this.map.addLayer({
      id: 'realtime-vehicles-label',
      type: 'symbol',
      source: 'realtime-vehicles',
      layout: {
        'text-field': ['get', 'label'],
        'text-size': 10,
        'text-offset': [0, 1.5],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#333',
        'text-halo-color': '#fff',
        'text-halo-width': 1
      }
    });

    // Start polling
    await this.fetchAndUpdate();
    this.pollInterval = setInterval(() => this.fetchAndUpdate(), this.pollFrequencyMs);
  }

  stop() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  async fetchAndUpdate() {
    try {
      const data = await this.fetchGTFSRT();
      if (data && data.features) {
        this.map.getSource('realtime-vehicles')?.setData(data);
        this.updateStatusIndicator(true, data.features.length);
      }
    } catch (err) {
      console.warn('GTFS-RT fetch failed, using simulated data:', err.message);
      const simulated = this.getSimulatedPositions();
      this.map.getSource('realtime-vehicles')?.setData(simulated);
      this.updateStatusIndicator(false, simulated.features.length);
    }
  }

  async fetchGTFSRT() {
    const url = this.useProxy ? PROXY_URL : `${DULT_BASE_URL}/api/bmrcl/vehicle-positions`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return this.parseGTFSResponse(data);
  }

  parseGTFSResponse(data) {
    // Handle GTFS-RT protobuf-to-JSON format
    const features = [];
    const entities = data.entity || data.entities || [];

    for (const entity of entities) {
      const vehicle = entity.vehicle || entity;
      const position = vehicle.position;
      if (!position || !position.latitude || !position.longitude) continue;

      features.push({
        type: 'Feature',
        properties: {
          id: entity.id || vehicle.vehicle?.id,
          label: vehicle.vehicle?.label || `Train ${entity.id}`,
          routeId: vehicle.trip?.routeId,
          color: this.getVehicleColor(vehicle),
          type: 'metro'
        },
        geometry: {
          type: 'Point',
          coordinates: [position.longitude, position.latitude]
        }
      });
    }

    return { type: 'FeatureCollection', features };
  }

  getVehicleColor(vehicle) {
    const route = vehicle.trip?.routeId || '';
    if (route.includes('purple') || route.includes('PURPLE')) return '#7B2D8E';
    if (route.includes('green') || route.includes('GREEN')) return '#006400';
    if (route.includes('yellow') || route.includes('YELLOW')) return '#FFC107';
    if (route.includes('pink') || route.includes('PINK')) return '#FF1493';
    if (route.includes('blue') || route.includes('BLUE')) return '#00008B';
    return '#FF6600'; // default orange for BMTC buses
  }

  // Simulated positions for demo when live data is unavailable
  getSimulatedPositions() {
    const now = Date.now();
    const trains = [
      { id: 'P1', line: 'purple', color: '#7B2D8E', baseLat: 12.975, baseLng: 77.60, label: 'Purple Line Train 1' },
      { id: 'P2', line: 'purple', color: '#7B2D8E', baseLat: 12.960, baseLng: 77.53, label: 'Purple Line Train 2' },
      { id: 'G1', line: 'green', color: '#006400', baseLat: 13.010, baseLng: 77.55, label: 'Green Line Train 1' },
      { id: 'G2', line: 'green', color: '#006400', baseLat: 12.940, baseLng: 77.58, label: 'Green Line Train 2' },
      { id: 'Y1', line: 'yellow', color: '#FFC107', baseLat: 12.900, baseLng: 77.64, label: 'Yellow Line Train 1' },
    ];

    const features = trains.map(t => {
      const drift = Math.sin(now / 10000 + t.baseLat * 100) * 0.005;
      return {
        type: 'Feature',
        properties: { id: t.id, label: t.label, color: t.color, type: 'metro-sim' },
        geometry: {
          type: 'Point',
          coordinates: [t.baseLng + drift, t.baseLat + drift * 0.5]
        }
      };
    });

    return { type: 'FeatureCollection', features };
  }

  updateStatusIndicator(isLive, count) {
    const indicator = document.getElementById('realtime-status');
    if (indicator) {
      indicator.className = `realtime-indicator ${isLive ? 'live' : 'simulated'}`;
      indicator.innerHTML = `
        <span class="status-dot"></span>
        ${isLive ? 'Live' : 'Simulated'} (${count} vehicles)
      `;
    }
  }
}
