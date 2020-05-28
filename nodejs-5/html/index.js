let map;
const positions = [
  { lat: 35.685, lng: 139.691 },
  { lat: 35.686, lng: 139.692 },
  { lat: 35.687, lng: 139.693 },
  { lat: 35.688, lng: 139.694 },
  { lat: 35.689, lng: 139.695 },
];
let param;

const showGeoPosition = async () => {
  const response = await fetch('http://localhost:3000/parameters')
  param = (await response.json()).param;
  const pos = await getCurrentPosition(param, 0)
  map = L.map('map').setView([pos.lat, pos.lng], 14);
  L.marker([pos.lat, pos.lng]).addTo(map);
  mapLink =
    '<a href="http://www.esri.com/">Esri</a>';
  wholink =
    'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
  L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; ' + mapLink + ', ' + wholink,
    maxZoom: 18,
  }).addTo(map);
};

const getCurrentPosition = async (params, index) => {
  return new Promise((res, rej) => {
    if (params === 'auto') res(positions[index])
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      res(currentPosition);
    });
  });
};

const start = async () => {
  if (navigator.geolocation) {
    const socket = io('http://localhost:3000');
    await showGeoPosition();
    for (var i = 0; i < 5; i++) {
      ((i) => {
        setTimeout(async () => {
          const position = await getCurrentPosition(param, i)
          socket.emit('setPosition', { position });
          i === 4 && socket.emit('end');
        }, 5000 * (i + 1));
      })(i);
    }
    socket.on('pathReady', ({ path }) => {
      if (path && path.location && Array.isArray(path.location.coordinates)) {
        const coordinates = path.location.coordinates;
        const length = coordinates.length;
        for (let i = 0; i < length; i++) {
          i === length - 1 && L.marker(coordinates[i]).addTo(map);
          L.circle(coordinates[i], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 5
          }).addTo(map);
        }
      }
    });
  }
};

start();
// showGeoPosition();