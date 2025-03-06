
const taiChungLatLng = { lat: -33.96431581323045, lng: 18.514623667539087 };
const map = L.map('map').setView(taiChungLatLng, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Restaurant icon definition (replace 'img/loc.png' with your icon path)
const restaurantIcon = L.icon({
  iconUrl: '/frontend/img/panjaa-fotor-2025011593531.png',
  iconSize: [150, 150], // Adjust size as needed
  iconAnchor: [30, 30], // Adjust anchor point
  popupAnchor: [0, -30] // Adjust popup anchor
});

const marker = L.marker(taiChungLatLng, { icon: restaurantIcon }).addTo(map);

// Add popup to the marker (before routing)
marker.bindPopup(createPopupContent("Loading...")).openPopup(); // Initial popup content

// Trigger popup on click (Option 1 - inside the loop)
marker.on('click', function () {
  this.getPopup().open();
});


// Handle both successful and failed user location retrieval
getUserLocation()
  .then(userLatLng => {
    L.Routing.control({
      waypoints: [
        L.latLng(userLatLng.lat, userLatLng.lng),
        taiChungLatLng
      ],
      router: L.Routing.osrmv1({ serviceUrl: 'YOUR_OSRM_SERVICE_URL' }), // Replace with your OSRM service URL
      createMarker: function (i, wp, nWps) {
        if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: restaurantIcon });
        }
      }
    })
      .on('routesfound', function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        const duration = timeConverter(summary.totalTime);
        marker.getPopup().setContent(createPopupContent(duration)).update();
      })
      .addTo(map);
  })
  .catch(error => {
    console.error("Error getting user location:", error);
    marker.getPopup().setContent(createPopupContent("Could not get location")).update();
  });

function timeConverter(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}m ${remainingSeconds}s`;
  return formattedTime;
}

function createPopupContent(duration) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${taiChungLatLng.lat},${taiChungLatLng.lng}`; // Corrected Google Maps URL
  return `
    <div class="custom-popup">
      <img src='/frontend/img/1.png' width='120px' alt='Restaurant Logo'>
      <h3>Tai Chung Restaurant</h3>
      <p>Delicious food awaits!</p>
      <p>Estimated travel time (Leaflet Routing Machine): ${duration || "N/A"}</p>
      <a href="${directionsUrl}" target="_blank">Get Directions (Google Maps)</a>
  `;
}
;

function getUserLocation() {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  const userLatLng = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  };
                  resolve(userLatLng);
              },
              error => reject(error)

          );
      } else {
          reject(new Error("Geolocation is not supported by this browser."));

      }
  });
}
