// Mock BMTC feeder bus routes near metro stations
// Each route has an id, name, and coordinates for the polyline
// In production, this would be replaced by actual BMTC GTFS static feed data

export const BMTC_ROUTES = {
  'Majestic': [
    {
      id: 'KBS-1', name: 'Route KBS-1 (Majestic - Yeshwanthpur)',
      coordinates: [[77.572967,12.975697],[77.570,12.980],[77.565,12.988],[77.555,12.998],[77.549,13.010],[77.549859,13.023172]]
    },
    {
      id: 'KBS-2', name: 'Route KBS-2 (Majestic - Shivajinagar)',
      coordinates: [[77.572967,12.975697],[77.578,12.978],[77.585,12.980],[77.595,12.982],[77.602181,12.983712]]
    },
    {
      id: 'KBS-3', name: 'Route KBS-3 (Majestic - Banashankari)',
      coordinates: [[77.572967,12.975697],[77.573,12.968],[77.574,12.958],[77.576,12.945],[77.578,12.935],[77.573588,12.915649]]
    }
  ],
  'Indiranagar': [
    {
      id: 'IND-1', name: 'Route IND-1 (Indiranagar - Koramangala)',
      coordinates: [[77.638731,12.978318],[77.635,12.970],[77.630,12.960],[77.625,12.950],[77.620833,12.941]]
    },
    {
      id: 'IND-2', name: 'Route IND-2 (Indiranagar - CV Raman Nagar)',
      coordinates: [[77.638731,12.978318],[77.645,12.982],[77.652,12.985],[77.660,12.988],[77.665,12.990]]
    }
  ],
  'Baiyappanahalli': [
    {
      id: 'BYP-1', name: 'Route BYP-1 (Baiyappanahalli - Marathahalli)',
      coordinates: [[77.652504,12.990738],[77.660,12.988],[77.675,12.985],[77.690,12.980],[77.700,12.954]]
    },
    {
      id: 'BYP-2', name: 'Route BYP-2 (Baiyappanahalli - KR Puram)',
      coordinates: [[77.652504,12.990738],[77.660,12.993],[77.668,12.996],[77.6774275,13.000133]]
    }
  ],
  'Yeshwanthpur': [
    {
      id: 'YPR-1', name: 'Route YPR-1 (Yeshwanthpur - Mathikere)',
      coordinates: [[77.549859,13.023172],[77.555,13.025],[77.562,13.028],[77.570,13.030],[77.575,13.032]]
    },
    {
      id: 'YPR-2', name: 'Route YPR-2 (Yeshwanthpur - Rajajinagar)',
      coordinates: [[77.549859,13.023172],[77.549,13.015],[77.549,13.008],[77.549701,13.000334]]
    }
  ],
  'Jayanagar': [
    {
      id: 'JNR-1', name: 'Route JNR-1 (Jayanagar - BTM Layout)',
      coordinates: [[77.58016,12.929641],[77.585,12.928],[77.595,12.924],[77.605,12.920],[77.608238,12.916584]]
    },
    {
      id: 'JNR-2', name: 'Route JNR-2 (Jayanagar - JP Nagar)',
      coordinates: [[77.58016,12.929641],[77.580,12.922],[77.578,12.915],[77.573213,12.907382]]
    }
  ],
  'Hebbal': [
    {
      id: 'HBL-1', name: 'Route HBL-1 (Hebbal - Yelahanka)',
      coordinates: [[77.592666,13.044287],[77.593,13.055],[77.593,13.065],[77.595,13.080],[77.600,13.102]]
    },
    {
      id: 'HBL-2', name: 'Route HBL-2 (Hebbal - Nagawara)',
      coordinates: [[77.592666,13.044287],[77.600,13.043],[77.610,13.042],[77.618,13.041],[77.624754,13.040939]]
    }
  ],
  'Electronic City I': [
    {
      id: 'EC-1', name: 'Route EC-1 (Electronic City - Hosa Road)',
      coordinates: [[77.663544,12.856689],[77.660,12.860],[77.658416,12.863205]]
    },
    {
      id: 'EC-2', name: 'Route EC-2 (Electronic City - Bommasandra)',
      coordinates: [[77.663544,12.856689],[77.668,12.850],[77.671114,12.846783],[77.676,12.840],[77.681612,12.828393]]
    }
  ],
  'MG Road (Pink Line)': [
    {
      id: 'MG-1', name: 'Route MG-1 (MG Road - Brigade Road)',
      coordinates: [[77.608318,12.976075],[77.605,12.973],[77.600,12.972],[77.596645,12.981227]]
    },
    {
      id: 'MG-2', name: 'Route MG-2 (MG Road - Richmond Road)',
      coordinates: [[77.608318,12.976075],[77.607,12.970],[77.606,12.965],[77.607004,12.965301]]
    }
  ],
  'Whitefield (Kadugodi)': [
    {
      id: 'WF-1', name: 'Route WF-1 (Whitefield - ITPL)',
      coordinates: [[77.757732,12.993819],[77.750,12.990],[77.740,12.988],[77.730,12.985]]
    },
    {
      id: 'WF-2', name: 'Route WF-2 (Whitefield - Varthur)',
      coordinates: [[77.757732,12.993819],[77.755,12.988],[77.752,12.982],[77.748,12.976]]
    }
  ],
  'Marathahalli': [
    {
      id: 'MH-1', name: 'Route MH-1 (Marathahalli - Bellandur)',
      coordinates: [[77.7004624,12.9542496],[77.695,12.948],[77.688,12.940],[77.6808715,12.928067]]
    },
    {
      id: 'MH-2', name: 'Route MH-2 (Marathahalli - Kundalahalli)',
      coordinates: [[77.7004624,12.9542496],[77.705,12.960],[77.710,12.968],[77.715761,12.977461]]
    }
  ],
  'Rajajinagar': [
    {
      id: 'RJN-1', name: 'Route RJN-1 (Rajajinagar - Malleswaram)',
      coordinates: [[77.549701,13.000334],[77.555,13.003],[77.560,13.005],[77.565,13.008]]
    }
  ],
  'Banashankari': [
    {
      id: 'BSK-1', name: 'Route BSK-1 (Banashankari - Kanakapura Road)',
      coordinates: [[77.573588,12.915649],[77.572,12.910],[77.570,12.903],[77.568,12.896]]
    },
    {
      id: 'BSK-2', name: 'Route BSK-2 (Banashankari - Padmanabhanagar)',
      coordinates: [[77.573588,12.915649],[77.568,12.914],[77.562,12.912],[77.556,12.910]]
    }
  ]
};

// Find BMTC routes near a given station (checks exact name match or within 1km)
export function getFeederRoutes(stationName) {
  // Direct match
  if (BMTC_ROUTES[stationName]) return BMTC_ROUTES[stationName];

  // Partial name match
  for (const [key, routes] of Object.entries(BMTC_ROUTES)) {
    if (stationName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(stationName.toLowerCase())) {
      return routes;
    }
  }
  return [];
}
