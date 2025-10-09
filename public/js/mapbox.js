/* eslint-disable */
const { accessToken } = require('./secret');
export const displayMap = (locations) => {
  const mapContainer = document.getElementById('map');

  // prevent any internal focus
  mapContainer.addEventListener('focusin', (e) => {
    if (e.target.closest('#map')) e.preventDefault();
  });

  mapboxgl.accessToken = accessToken;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/piyushyadv/cmee3v2bz00ig01s61kidh6lc', // style URL
    scrollZoom: false,
    // center: [],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.tabIndex = -1;

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
      closeButton: false,
      focusAfterOpen: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
