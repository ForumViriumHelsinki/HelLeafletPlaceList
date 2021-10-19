function initPlaceListMap(elId, places, options={}) {
  const attribution = 'Data &copy; <a href="https://www.openstreetmap.org/">OSM</a> contribs, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';

  const zoom = 13;
  const latLng = [60.19, 24.94290];

  const map = L.map(elId).setView(latLng, zoom);

  L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
        attribution: attribution,
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1,
        id: 'hsl-map'}).addTo(map)

  let icon;
  if (options.markerIcon) icon = L.icon(options.markerIcon);
  places.forEach(p => {
    let marker = L.marker(p.coordinates.reverse(), {icon: icon}).addTo(map);
    if (options.popupTemplate)
      marker.bindPopup(options.popupTemplate(p));
  });
}