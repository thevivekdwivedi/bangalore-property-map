// Namma Metro network data - stations, lines, and metadata

export const LINE_COLORS = {
  purple: '#7B2D8E',
  green: '#006400',
  yellow: '#FFC107',
  pink: '#FF1493',
  blue: '#00008B'
};

export const LINE_METADATA = {
  purple: { name: 'Purple Line', color: LINE_COLORS.purple, operationalSince: '2011-10-20' },
  green:  { name: 'Green Line',  color: LINE_COLORS.green,  operationalSince: '2014-03-01' },
  yellow: { name: 'Yellow Line', color: LINE_COLORS.yellow, operationalSince: '2024-01-15' },
  pink:   { name: 'Pink Line',   color: LINE_COLORS.pink,   operationalSince: null },
  blue:   { name: 'Blue Line',   color: LINE_COLORS.blue,   operationalSince: null }
};

export const LINE_PHASES = {
  purple: [
    { segment: 'full', status: 'operational', date: '2011-10-20', label: 'Full line operational' }
  ],
  green: [
    { segment: 'full', status: 'operational', date: '2014-03-01', label: 'Full line operational' }
  ],
  yellow: [
    { segment: 'RV Road to Bommasandra', status: 'operational', date: '2024-01-15', label: 'Yellow Line operational', stationRange: [0, 15] }
  ],
  pink: [
    { segment: 'Gottigere to Nagawara (Elevated)', status: 'under_construction', date: '2026-05-01', label: 'Pink Line elevated opens', stationRange: [0, 16] },
    { segment: 'Full line including underground', status: 'operational', date: '2026-12-01', label: 'Pink Line fully operational', stationRange: [0, 16] }
  ],
  blue: [
    { segment: 'Central Silk Board to KR Puram', status: 'under_construction', date: '2026-12-01', label: 'Blue Line Phase 1 opens', stationRange: [0, 12] },
    { segment: 'Full line to KIAL', status: 'operational', date: '2027-12-01', label: 'Blue Line fully operational', stationRange: [0, 27] }
  ]
};

// Line path coordinates in [lng, lat] GeoJSON order
export const LINE_PATHS = {
  purple: [
    [77.757732,12.993819],[77.752,12.995],[77.7469,12.98565],[77.738211,12.987613],
    [77.72762,12.98102],[77.724763,12.976528],[77.715761,12.977461],[77.70887,12.98092],
    [77.71127,12.98873],[77.703,12.9929],[77.698,12.995],[77.6774275,13.000133],
    [77.67,12.9994],[77.652504,12.990738],[77.64493,12.98595],[77.638731,12.978318],
    [77.626616,12.976431],[77.616984,12.973033],[77.606762,12.975505],[77.596645,12.981227],
    [77.591752,12.978793],[77.583998,12.974345],[77.572967,12.975697],[77.566017,12.975842],
    [77.5555,12.975633],[77.545541,12.97424],[77.537389,12.970795],[77.533589,12.961954],
    [77.536973,12.952191],[77.52971,12.946549],[77.525598,12.942479],[77.519593,12.936662],
    [77.512182,12.935423],[77.498288,12.924326],[77.48731,12.914962],[77.48,12.9095],
    [77.476466,12.907963],[77.462701,12.897934]
  ],
  green: [
    [77.500112,13.04802],[77.512407,13.043338],[77.519698,13.039429],[77.52544,13.03628],
    [77.533227,13.032815],[77.540772,13.028383],[77.549859,13.023172],[77.553933,13.014698],
    [77.54881,13.008193],[77.549701,13.000334],[77.556972,12.998523],[77.563439,12.996461],
    [77.57077,12.990502],[77.572967,12.975697],[77.574678,12.96666],[77.574828,12.961108],
    [77.573669,12.95059],[77.58002,12.946408],[77.580096,12.938377],[77.58016,12.929641],
    [77.580128,12.921464],[77.573588,12.915649],[77.573213,12.907382],[77.570193,12.895952],
    [77.562602,12.888872],[77.552683,12.884636],[77.544739,12.877513],[77.538398,12.871395],
    [77.529868,12.861809]
  ],
  yellow: [
    [77.580128,12.921464],[77.588324,12.917184],[77.599925,12.91675],[77.608238,12.916584],
    [77.620833,12.916687],[77.62638,12.911032],[77.632044,12.901631],[77.639233,12.889923],
    [77.645327,12.880055],[77.65259,12.87054],[77.658416,12.863205],[77.663544,12.856689],
    [77.671114,12.846783],[77.67724,12.839366],[77.681612,12.828393],[77.68747,12.820364]
  ],
  pink: [
    [77.592326,12.867493],[77.596237,12.882942],[77.600244,12.897813],[77.601049,12.906755],
    [77.600405,12.927377],[77.602449,12.940866],[77.603141,12.949597],[77.606027,12.956822],
    [77.607004,12.965301],[77.608318,12.976075],[77.602181,12.983712],[77.606306,12.991794],
    [77.609739,13.000836],[77.613576,13.008942],[77.618181,13.017422],[77.620098,13.027521],
    [77.624754,13.040939]
  ],
  blue: [
    [77.620833,12.916687],[77.6330799,12.9164334],[77.6428377,12.9195707],[77.6659583,12.9210189],
    [77.6808715,12.928067],[77.6908869,12.9352717],[77.6974073,12.9431244],[77.7004624,12.9542496],
    [77.7017819,12.9677895],[77.6975012,12.9750348],[77.692802,12.9827923],[77.685442,12.9939471],
    [77.6774275,13.0001332],[77.66318,13.00485],[77.66035,13.01702],[77.64739,13.02254],
    [77.6378,13.02626],[77.62934,13.03383],[77.61802,13.04179],[77.6047,13.04373],
    [77.592666,13.044287],[77.59386,13.05702],[77.59347,13.07038],[77.60035,13.1021],
    [77.61056,13.12061],[77.64487,13.1886],[77.68717,13.19833],[77.71245,13.19809]
  ]
};

export const STATIONS = {
  purple: [
    {name:'Whitefield (Kadugodi)',lat:12.993819,lng:77.757732},
    {name:'Hopefarm Channasandra',lat:12.995,lng:77.752},
    {name:'Kadugodi Tree Park',lat:12.98565,lng:77.7469},
    {name:'Pattandur Agrahara',lat:12.987613,lng:77.738211},
    {name:'Sri Sathya Sai Hospital',lat:12.98102,lng:77.72762},
    {name:'Nallurhalli',lat:12.976528,lng:77.724763},
    {name:'Kundalahalli',lat:12.977461,lng:77.715761},
    {name:'Seetharampalya',lat:12.98092,lng:77.70887},
    {name:'Hoodi',lat:12.98873,lng:77.71127},
    {name:'Garudacharpalya',lat:12.9929,lng:77.703},
    {name:'Singayyanapalya',lat:12.995,lng:77.698},
    {name:'Krishnarajapura (K.R. Pura)',lat:13.000133,lng:77.6774275},
    {name:'Benniganahalli',lat:12.9994,lng:77.67},
    {name:'Baiyappanahalli',lat:12.990738,lng:77.652504},
    {name:'Swami Vivekananda Road',lat:12.98595,lng:77.64493},
    {name:'Indiranagar',lat:12.978318,lng:77.638731},
    {name:'Halasuru',lat:12.976431,lng:77.626616},
    {name:'Trinity',lat:12.973033,lng:77.616984},
    {name:'Mahatma Gandhi Road',lat:12.975505,lng:77.606762},
    {name:'Cubbon Park',lat:12.981227,lng:77.596645},
    {name:'Dr. B.R. Ambedkar Vidhana Soudha',lat:12.978793,lng:77.591752},
    {name:'Sir M. Visvesvaraya (Central College)',lat:12.974345,lng:77.583998},
    {name:'Nadaprabhu Kempegowda (Majestic)',lat:12.975697,lng:77.572967},
    {name:'City Railway Station',lat:12.975842,lng:77.566017},
    {name:'Magadi Road',lat:12.975633,lng:77.5555},
    {name:'Hosahalli',lat:12.97424,lng:77.545541},
    {name:'Vijayanagar',lat:12.970795,lng:77.537389},
    {name:'Attiguppe',lat:12.961954,lng:77.533589},
    {name:'Deepanjali Nagara',lat:12.952191,lng:77.536973},
    {name:'Mysore Road',lat:12.946549,lng:77.52971},
    {name:'Pantharapalya - Nayandahalli',lat:12.942479,lng:77.525598},
    {name:'Rajarajeshwari Nagar',lat:12.936662,lng:77.519593},
    {name:'Jnanabharathi',lat:12.935423,lng:77.512182},
    {name:'Pattanagere',lat:12.924326,lng:77.498288},
    {name:'Mailasandra',lat:12.914962,lng:77.48731},
    {name:'Kengeri Bus Terminal',lat:12.9095,lng:77.48},
    {name:'Kengeri',lat:12.907963,lng:77.476466},
    {name:'Challaghatta',lat:12.897934,lng:77.462701}
  ],
  green: [
    {name:'Nagasandra',lat:13.04802,lng:77.500112},
    {name:'Dasarahalli',lat:13.043338,lng:77.512407},
    {name:'Jalahalli',lat:13.039429,lng:77.519698},
    {name:'Peenya Industry',lat:13.03628,lng:77.52544},
    {name:'Peenya',lat:13.032815,lng:77.533227},
    {name:'Goraguntepalya (Yeshwanthpur Industry)',lat:13.028383,lng:77.540772},
    {name:'Yeshwanthpur',lat:13.023172,lng:77.549859},
    {name:'Sandal Soap Factory',lat:13.014698,lng:77.553933},
    {name:'Mahalakshmi',lat:13.008193,lng:77.54881},
    {name:'Rajajinagar',lat:13.000334,lng:77.549701},
    {name:'Kuvempu Road',lat:12.998523,lng:77.556972},
    {name:'Srirampura',lat:12.996461,lng:77.563439},
    {name:'Sampige Road',lat:12.990502,lng:77.57077},
    {name:'Majestic',lat:12.975697,lng:77.572967},
    {name:'Chickpet',lat:12.96666,lng:77.574678},
    {name:'KR Market',lat:12.961108,lng:77.574828},
    {name:'National College',lat:12.95059,lng:77.573669},
    {name:'Lalbagh',lat:12.946408,lng:77.58002},
    {name:'Southend Circle',lat:12.938377,lng:77.580096},
    {name:'Jayanagar',lat:12.929641,lng:77.58016},
    {name:'Rashtreeya Vidyalaya Road (R V Road)',lat:12.921464,lng:77.580128},
    {name:'Banashankari',lat:12.915649,lng:77.573588},
    {name:'JP Nagar',lat:12.907382,lng:77.573213},
    {name:'Yelachenahalli',lat:12.895952,lng:77.570193},
    {name:'Anjanapura Cross Road',lat:12.888872,lng:77.562602},
    {name:'Krishna Leela Park',lat:12.884636,lng:77.552683},
    {name:'Vajrahalli',lat:12.877513,lng:77.544739},
    {name:'Thalagattapura',lat:12.871395,lng:77.538398},
    {name:'Anjanapura Township (Silk Institute)',lat:12.861809,lng:77.529868}
  ],
  yellow: [
    {name:'Rashtreeya Vidyalaya Road (R V Road)',lat:12.921464,lng:77.580128},
    {name:'Ragigudda',lat:12.917184,lng:77.588324},
    {name:'Jayadeva Hospital',lat:12.91675,lng:77.599925},
    {name:'BTM Layout',lat:12.916584,lng:77.608238},
    {name:'Central Silk Board',lat:12.916687,lng:77.620833},
    {name:'HSR Layout',lat:12.911032,lng:77.62638},
    {name:'Oxford College',lat:12.901631,lng:77.632044},
    {name:'Muneshwara Nagar',lat:12.889923,lng:77.639233},
    {name:'Chikkabegur',lat:12.880055,lng:77.645327},
    {name:'Basapura Road',lat:12.87054,lng:77.65259},
    {name:'Hosa Road',lat:12.863205,lng:77.658416},
    {name:'Electronic City I',lat:12.856689,lng:77.663544},
    {name:'Electronic City II',lat:12.846783,lng:77.671114},
    {name:'Huskur Road',lat:12.839366,lng:77.67724},
    {name:'Hebbagodi',lat:12.828393,lng:77.681612},
    {name:'Bommasandra',lat:12.820364,lng:77.68747}
  ],
  pink: [
    {name:'Gottigere',lat:12.867493,lng:77.592326},
    {name:'Hulimavu',lat:12.882942,lng:77.596237},
    {name:'IIM-Bangalore',lat:12.897813,lng:77.600244},
    {name:'JP Nagar 4th Phase',lat:12.906755,lng:77.601049},
    {name:'Swagath Road Cross',lat:12.927377,lng:77.600405},
    {name:'Dairy Circle',lat:12.940866,lng:77.602449},
    {name:'MICO Industries',lat:12.949597,lng:77.603141},
    {name:'Langford Town',lat:12.956822,lng:77.606027},
    {name:'Vellara Road',lat:12.965301,lng:77.607004},
    {name:'MG Road (Pink Line)',lat:12.976075,lng:77.608318},
    {name:'Shivaji Nagar',lat:12.983712,lng:77.602181},
    {name:'Cantonment',lat:12.991794,lng:77.606306},
    {name:'Pottery Town',lat:13.000836,lng:77.609739},
    {name:'Tannery Road',lat:13.008942,lng:77.613576},
    {name:'Venkateshpura',lat:13.017422,lng:77.618181},
    {name:'Arabic College',lat:13.027521,lng:77.620098},
    {name:'Nagawara',lat:13.040939,lng:77.624754}
  ],
  blue: [
    {name:'Central Silkboard',lat:12.916687,lng:77.620833},
    {name:'HSR Layout (ORR)',lat:12.9164334,lng:77.6330799},
    {name:'Agara Lake',lat:12.9195707,lng:77.6428377},
    {name:'Ibbalur',lat:12.9210189,lng:77.6659583},
    {name:'Bellandur',lat:12.928067,lng:77.6808715},
    {name:'Kadubeesanahalli',lat:12.9352717,lng:77.6908869},
    {name:'Kodibisanahalli',lat:12.9431244,lng:77.6974073},
    {name:'Marathahalli',lat:12.9542496,lng:77.7004624},
    {name:'ISRO',lat:12.9677895,lng:77.7017819},
    {name:'Doddanakundi',lat:12.9750348,lng:77.6975012},
    {name:'DRDO Sports Complex',lat:12.9827923,lng:77.692802},
    {name:'Mahadevpura',lat:12.9939471,lng:77.685442},
    {name:'KR Puram (Blue)',lat:13.0001332,lng:77.6774275},
    {name:'Kasturinagar',lat:13.00485,lng:77.66318},
    {name:'Horamavu',lat:13.01702,lng:77.66035},
    {name:'HRBR Layout',lat:13.02254,lng:77.64739},
    {name:'Kalyan Nagar',lat:13.02626,lng:77.6378},
    {name:'HBR Layout',lat:13.03383,lng:77.62934},
    {name:'Veerannapalya',lat:13.04179,lng:77.61802},
    {name:'Kempapura',lat:13.04373,lng:77.6047},
    {name:'Hebbal',lat:13.044287,lng:77.592666},
    {name:'Kodigehalli',lat:13.05702,lng:77.59386},
    {name:'Jakkur Cross',lat:13.07038,lng:77.59347},
    {name:'Yelahanka',lat:13.1021,lng:77.60035},
    {name:'Bagalur Cross',lat:13.12061,lng:77.61056},
    {name:'Doddajala',lat:13.1886,lng:77.64487},
    {name:'Airport City',lat:13.19833,lng:77.68717},
    {name:'KIAL Terminals',lat:13.19809,lng:77.71245}
  ]
};

export const JUNCTIONS = [
  {name:'Nadaprabhu Kempegowda (Majestic)',lines:['purple','green'],lat:12.975697,lng:77.572967},
  {name:'Rashtreeya Vidyalaya Road (R V Road)',lines:['green','yellow'],lat:12.921464,lng:77.580128},
  {name:'Central Silk Board',lines:['yellow','blue'],lat:12.916687,lng:77.620833},
  {name:'Jayadeva Hospital',lines:['yellow','pink'],lat:12.91675,lng:77.599925},
  {name:'MG Road',lines:['purple','pink'],lat:12.976075,lng:77.608318},
  {name:'Nagawara',lines:['pink','blue'],lat:13.040939,lng:77.624754}
];

export const PARKING_STATIONS = [
  'Mysore Road','Madavara','Peenya Industry','JP Nagar',
  'Baiyappanahalli','Ragigudda','BTM Layout','Electronic City I','Jayadeva Hospital'
];

export function hasParking(name) {
  return PARKING_STATIONS.some(p => name.toLowerCase().includes(p.toLowerCase()));
}

export function getJunctionInfo(name) {
  const lower = name.toLowerCase();
  return JUNCTIONS.find(j => lower.includes(j.name.toLowerCase()) || j.name.toLowerCase().includes(lower));
}

export function buildLineGeoJSON(lineId) {
  const path = LINE_PATHS[lineId];
  const meta = LINE_METADATA[lineId];
  if (!path || !meta) return null;
  return {
    type: 'Feature',
    properties: { id: lineId, name: meta.name, color: meta.color },
    geometry: { type: 'LineString', coordinates: path }
  };
}

export function buildStationsGeoJSON(lineId) {
  const stations = STATIONS[lineId];
  const meta = LINE_METADATA[lineId];
  if (!stations || !meta) return null;
  return {
    type: 'FeatureCollection',
    features: stations.map((s, idx) => ({
      type: 'Feature',
      properties: {
        name: s.name, line: lineId, lineName: meta.name, color: meta.color,
        index: idx, isJunction: !!getJunctionInfo(s.name), hasParking: hasParking(s.name)
      },
      geometry: { type: 'Point', coordinates: [s.lng, s.lat] }
    }))
  };
}
