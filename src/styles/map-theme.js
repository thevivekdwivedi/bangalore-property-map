// Custom grayscale/muted map style for MapLibre GL JS
// Ensures metro line colors maintain visual hierarchy

export const MAP_STYLE = {
  version: 8,
  name: 'Namma Metro Muted',
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
    'terrain-source': {
      type: 'raster-dem',
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
      ],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 15
    }
  },
  terrain: {
    source: 'terrain-source',
        exaggeration: 250000000
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

export const MAP_CENTER = [77.5946, 12.9716]; // Bangalore center
export const MAP_ZOOM = 11.5;
export const MAP_BOUNDS = [[77.35, 12.75], [77.85, 13.25]];
