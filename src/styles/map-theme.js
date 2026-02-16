// Custom grayscale/muted map style for MapLibre GL JS
// Ensures metro line colors maintain visual hierarchy
// Includes terrain DEM source for 3D topology rendering

export const MAP_STYLE = {
  version: 8,
  name: 'Namma Metro 3D',
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png'
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
    },
    'osm-labels': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png'
      ],
      tileSize: 256
    },
    'terrain-dem': {
      type: 'raster-dem',
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
      ],
      encoding: 'terrarium',
      tileSize: 256
    },
    'hillshade-source': {
      type: 'raster-dem',
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
      ],
      encoding: 'terrarium',
      tileSize: 256
    }
  },
  terrain: {
    source: 'terrain-dem',
    exaggeration: 2.5
  },
  sky: {
    'sky-color': '#89CFF0',
    'sky-horizon-blend': 0.4,
    'horizon-color': '#d4e6f1',
    'horizon-fog-blend': 0.7,
    'fog-color': '#e8edf0',
    'fog-ground-blend': 0.8
  },
  layers: [
    {
      id: 'base-tiles',
      type: 'raster',
      source: 'osm-tiles',
      paint: {
        'raster-saturation': -0.8,
        'raster-brightness-min': 0.1,
        'raster-brightness-max': 0.9,
        'raster-contrast': -0.2,
        'raster-opacity': 0.9
      }
    },
    {
      id: 'hillshade-layer',
      type: 'hillshade',
      source: 'hillshade-source',
      paint: {
        'hillshade-illumination-direction': 315,
        'hillshade-exaggeration': 0.6,
        'hillshade-shadow-color': '#473B24',
        'hillshade-highlight-color': '#FFFFFF',
        'hillshade-accent-color': '#D4B896'
      }
    },
    {
      id: 'label-tiles',
      type: 'raster',
      source: 'osm-labels',
      paint: {
        'raster-saturation': -1,
        'raster-opacity': 0.5
      }
    }
  ]
};

// Terrain configuration defaults
export const TERRAIN_CONFIG = {
  source: 'terrain-dem',
  defaultExaggeration: 2.5,
  maxExaggeration: 5.0,
  minExaggeration: 0
};

export const MAP_CENTER = [77.5946, 12.9716]; // Bangalore center
export const MAP_ZOOM = 11.5;
export const MAP_PITCH = 55; // 3D perspective pitch
export const MAP_BEARING = -15; // Slight rotation for depth
export const MAP_BOUNDS = [[77.35, 12.75], [77.85, 13.25]];
