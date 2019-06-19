const API_KEY = {
  dev: "AIzaSyAGDWJ084-hUNF_AdYgg0Y6mZjCMI41hbA",
  prod: "AIzaSyBurOVSyCoITb7Npdj8JFYJs5sfv6fqtkQ"
};

const enviro = /localhost/.test(window.location.host) ? "dev" : "prod";

const scriptTag = `https://maps.googleapis.com/maps/api/js?key=${
  API_KEY[enviro]
}&callback=initMap`;

let googleReady = false;

var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.defer = true;
s.src = scriptTag;
document.body.appendChild(s);

window.initMap = () => {
  googleReady = true;
};

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    console.error("location not supported");
  }
}

export default function getDistance(
  destinations = { lat: Number("53.304400"), lng: Number("-6.313800") }
) {
  return new Promise((resolve, reject) => {
    console.log("getDistance", { googleReady, destinations });
    function askGoogle(userPosition) {
      if (googleReady) {
        const {
          coords: { latitude, longitude }
        } = userPosition;
        const origin1 = { lat: latitude, lng: longitude };
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations,
            travelMode: "DRIVING",
            unitSystem: window.google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: "bestguess"
            }
          },
          resolve
        );
      } else {
        console.error("Google is not ready for us yet");
      }
    }

    getLocation(askGoogle, console.error);
  });
}
