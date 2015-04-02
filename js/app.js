// Google maps initial cordinates for San Francisco, CA
var initialCoordinate = {lat: 37.7577, lng: -122.4376, searchQuery: 'sushi'};
/*
========== ViewModel ===========
*/
// ViewModel that defines the data and behavior
function AppViewModel() {
  var self = this;
  var markers = [];
  self.allLocations = ko.observableArray([]);

  var map = initializeMap();
  // if google map is not responding, alert the user
  if (!map) {
    alert("Google Maps is not available. Please try again later!");
    return;
  }  
  self.map = ko.observable(map);
  fetchForsquare(self.allLocations, self.map(), markers);
console.log(self.allLocations());
}

// Activate knockout.js
google.maps.event.addDomListener(window, 'load', ko.applyBindings(new AppViewModel()));


// initializing google map with predefined initial location
function initializeMap() {
    var mapOptions = {
      center: new google.maps.LatLng(initialCoordinate.lat, initialCoordinate.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}


// get location data from foursquare
// Foursquare
function fetchForsquare(allLocations, map, markers) {
  var foursquareUrl = 'https://api.foursquare.com/v2/venues/search' +
    '?client_id=MSJE5EGJPP5MD0PRPRERMCU1V4E4MKQRSSH4KCCBUDIF5W5F' +
    '&client_secret=UJ2DOWO3TDSWOXFEWBGDZY5QOQ4KGWZ3HXVIA54FOB55O1YO' +
    '&v=20130815' +
    '&m=foursquare' +
    '&ll=' + initialCoordinate.lat + ',' + initialCoordinate.lng +
    '&query=' + initialCoordinate.searchQuery;

    var locationDataArr = [];

    $.getJSON(foursquareUrl, function(data) {      
      data.response.venues.forEach(function(item) {
        allLocations.push(item);              
        locationDataArr.push({lat: item.location.lat, lng: item.location.lng, name: item.name, loc: item.location.address + " " + item.location.city + ", " + item.location.state + " " + item.location.postalCode});
      });
      placeMarkers(locationDataArr, map, markers);
    });
}

// place marker for the result locations on the map
function placeMarkers(locationDataArr, map, markers) {
  locationDataArr.forEach(function(data) {
    var latlng = new google.maps.LatLng(data.lat, data.lng);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      animation: google.maps.Animation.DROP,
      content: data.name + "<br>" + data.loc
    });
    markers.push(marker);

    // create infoWindow for each marker on the map
    var infoWindow = new google.maps.InfoWindow({
      content: marker.content
    });

    // show details about location when user clicks on a marker
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    // toggle bounce when user clicks on a location marker on google map
    google.maps.event.addListener(marker, 'click', function() {
      toggleBounce(marker);
    });
  });
}

function toggleBounce(marker) {
  if (marker.setAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 600);
  }
}

