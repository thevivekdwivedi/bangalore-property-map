// Station info modal/side-panel component
import { hasParking, getJunctionInfo, PARKING_STATIONS } from '../data/metro-network.js';
import { PROPERTY_DATA } from '../data/property-valuations.js';
import { getFeederRoutes } from '../data/bmtc-routes.js';

export class StationModal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.onFeederRoutesRequested = null; // callback for drawing bus routes
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="station-panel" id="station-panel">
        <button class="panel-close" id="panel-close">&times;</button>
        <div id="panel-content"></div>
      </div>
    `;
    document.getElementById('panel-close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open(stationProps) {
    const panel = document.getElementById('station-panel');
    const content = document.getElementById('panel-content');

    const name = stationProps.name;
    const line = stationProps.lineName;
    const color = stationProps.color;
    const junction = getJunctionInfo(name);
    const parking = hasParking(name);
    const property = PROPERTY_DATA[name];
    const feederRoutes = getFeederRoutes(name);

    let html = `
      <div class="station-header" style="border-left: 4px solid ${color}">
        <h2>${name}</h2>
        <span class="station-line-badge" style="background:${color}">${line}</span>
        ${junction ? `<span class="junction-badge">Junction: ${junction.lines.join(' + ')}</span>` : ''}
      </div>

      <div class="station-section">
        <h3>Station Facilities</h3>
        <div class="facility-grid">
          <div class="facility ${parking ? 'available' : 'unavailable'}">
            <span class="facility-icon">${parking ? 'P' : '-'}</span>
            <span class="facility-label">Parking</span>
            <span class="facility-status">${parking ? 'Organized parking (tendered)' : 'Standard parking'}</span>
          </div>
          <div class="facility placeholder">
            <span class="facility-icon">A</span>
            <span class="facility-label">Accessibility</span>
            <span class="facility-status">Elevators & escalators being deployed (500 elevators, 1000 escalators network-wide)</span>
          </div>
        </div>
      </div>
    `;

    if (property) {
      const trendIcon = property.trend === 'up' ? '&uarr;' : property.trend === 'down' ? '&darr;' : '&rarr;';
      const trendClass = property.trend === 'up' ? 'trend-up' : property.trend === 'down' ? 'trend-down' : 'trend-stable';
      html += `
        <div class="station-section">
          <h3>Real Estate</h3>
          <div class="property-info">
            <div class="price-display">
              <span class="price-value">&#8377;${property.pricePerSqFt.toLocaleString('en-IN')}</span>
              <span class="price-unit">per sq.ft.</span>
            </div>
            <div class="price-meta">
              <span class="price-trend ${trendClass}">${trendIcon} ${property.trend}</span>
              <span class="price-zone">${property.zone} Zone</span>
            </div>
          </div>
        </div>
      `;
    }

    if (feederRoutes.length > 0) {
      html += `
        <div class="station-section">
          <h3>BMTC Feeder Routes</h3>
          <div class="feeder-routes">
            ${feederRoutes.map(r => `
              <button class="feeder-route-btn" data-route-id="${r.id}">
                ${r.name}
              </button>
            `).join('')}
            <button class="feeder-show-all-btn" id="show-all-feeders">Show All Routes</button>
          </div>
        </div>
      `;
    }

    content.innerHTML = html;
    panel.classList.add('open');
    this.isOpen = true;

    // Bind feeder route buttons
    if (feederRoutes.length > 0) {
      document.getElementById('show-all-feeders')?.addEventListener('click', () => {
        if (this.onFeederRoutesRequested) {
          this.onFeederRoutesRequested(name, feederRoutes);
        }
      });
      content.querySelectorAll('.feeder-route-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const routeId = btn.dataset.routeId;
          const route = feederRoutes.find(r => r.id === routeId);
          if (route && this.onFeederRoutesRequested) {
            this.onFeederRoutesRequested(name, [route]);
          }
        });
      });
    }
  }

  close() {
    const panel = document.getElementById('station-panel');
    panel.classList.remove('open');
    this.isOpen = false;
    if (this.onClose) this.onClose();
  }
}
