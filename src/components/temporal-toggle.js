// Temporal UI toggle for filtering metro lines by operational status
import { LINE_PHASES, LINE_METADATA, LINE_COLORS } from '../data/metro-network.js';

const TIMELINE_PRESETS = [
  { label: 'Current (Operational)', date: '2026-02-15', id: 'current' },
  { label: 'May 2026 (Pink Elevated)', date: '2026-05-01', id: 'may2026' },
  { label: 'Dec 2026 (Pink + Blue P1)', date: '2026-12-01', id: 'dec2026' },
  { label: 'Dec 2027 (Full Network)', date: '2027-12-01', id: 'dec2027' }
];

export class TemporalToggle {
  constructor(map, containerId) {
    this.map = map;
    this.container = document.getElementById(containerId);
    this.currentDate = TIMELINE_PRESETS[0].date;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="temporal-panel">
        <h3>Timeline</h3>
        <input type="range" id="timeline-slider" min="0" max="${TIMELINE_PRESETS.length - 1}" value="0" step="1">
        <div id="timeline-label" class="timeline-label">${TIMELINE_PRESETS[0].label}</div>
        <div class="timeline-legend" id="timeline-legend"></div>
      </div>
    `;

    const slider = document.getElementById('timeline-slider');
    slider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value);
      const preset = TIMELINE_PRESETS[idx];
      this.currentDate = preset.date;
      document.getElementById('timeline-label').textContent = preset.label;
      this.updateMapLayers();
    });

    this.renderLegend();
  }

  renderLegend() {
    const legend = document.getElementById('timeline-legend');
    let html = '';
    for (const [lineId, meta] of Object.entries(LINE_METADATA)) {
      const status = this.getLineStatus(lineId);
      html += `
        <div class="legend-item" data-line="${lineId}">
          <span class="legend-color" style="background:${meta.color};opacity:${status === 'operational' ? 1 : 0.4}"></span>
          <span class="legend-name">${meta.name}</span>
          <span class="legend-status ${status}">${status.replace('_', ' ')}</span>
        </div>`;
    }
    legend.innerHTML = html;
  }

  getLineStatus(lineId) {
    const phases = LINE_PHASES[lineId];
    if (!phases) return 'unknown';
    const selectedDate = new Date(this.currentDate);
    for (let i = phases.length - 1; i >= 0; i--) {
      if (new Date(phases[i].date) <= selectedDate) {
        return phases[i].status === 'operational' ? 'operational' : phases[i].status;
      }
    }
    // Check if the earliest phase is still in the future
    const earliest = phases[0];
    if (new Date(earliest.date) > selectedDate) {
      return earliest.status;
    }
    return 'planned';
  }

  getLineVisibility(lineId) {
    const status = this.getLineStatus(lineId);
    return {
      status,
      visible: true,
      opacity: status === 'operational' ? 1 : 0.5,
      dashArray: status === 'operational' ? null : [8, 6]
    };
  }

  updateMapLayers() {
    for (const lineId of Object.keys(LINE_METADATA)) {
      const vis = this.getLineVisibility(lineId);
      const lineLayerId = `line-${lineId}`;
      const stationLayerId = `stations-${lineId}`;
      const labelLayerId = `labels-${lineId}`;

      if (this.map.getLayer(lineLayerId)) {
        this.map.setPaintProperty(lineLayerId, 'line-opacity', vis.opacity);
        if (vis.dashArray) {
          this.map.setPaintProperty(lineLayerId, 'line-dasharray', vis.dashArray);
        } else {
          this.map.setPaintProperty(lineLayerId, 'line-dasharray', [1, 0]);
        }
      }
      if (this.map.getLayer(stationLayerId)) {
        this.map.setPaintProperty(stationLayerId, 'icon-opacity', vis.opacity);
      }
      if (this.map.getLayer(labelLayerId)) {
        this.map.setPaintProperty(labelLayerId, 'text-opacity', vis.opacity);
      }
    }
    this.renderLegend();
  }
}
