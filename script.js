// get current location of user using watchPosition
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const accuracy = document.getElementById("acc");
const speed = document.getElementById("speed");
const date = document.getElementById("date");
const count = document.getElementById("count");
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
if (navigator.geolocation) {
  var reqcount = 0;
  navigator.geolocation.watchPosition(successCallback, errorCallback, options);
  function successCallback(pos) {
    const crd = pos.coords;
    lat.innerHTML = crd.latitude;
    long.innerHTML = crd.longitude;
    accuracy.innerHTML = crd.accuracy.toFixed(2);
    speed.innerHTML = crd.speed?.toFixed(2) || "0";
    date.innerHTML =
      new Date(pos.timestamp).toLocaleTimeString() +
      " " +
      new Date(pos.timestamp).toLocaleDateString();
    reqcount++;
    count.innerHTML = reqcount;
    fetch(
      `https://geocode.maps.co/reverse?lat=${crd.latitude}&lon=${crd.longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("address").innerHTML = data.display_name;
        localStorage.setItem("address", data.display_name);
      });
  }
} else {
  function errorCallback(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
}
