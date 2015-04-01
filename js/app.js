// Google maps initial cordinates for San Francisco, CA
var initialCoordinate = {lat: 37.7577, lng: -122.4376, searchQuery: 'landmarks'};

function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(initialCoordinate.lat, initialCoordinate.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

// google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', initialize);

