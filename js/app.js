// Google maps initial cordinates for San Francisco, CA
var initialCoordinate = {lat: 37.7577, lng: -122.4376, searchQuery: 'sushi'};

// ViewModel that defines the data and behavior
function AppViewModel() {
  var self = this;
  var markers = [];
  self.allLocations = ko.observableArray([]);

  var map = initializeMap();
  self.map = ko.observable(map);
}

// Activate knockout.js
// ko.applyBindings(new AppViewModel());
google.maps.event.addDomListener(window, 'load', ko.applyBindings(new AppViewModel()));






function initializeMap() {
    var mapOptions = {
      center: new google.maps.LatLng(initialCoordinate.lat, initialCoordinate.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

// google.maps.event.addDomListener(window, 'load', initialize);
// google.maps.event.addDomListener(window, 'load', initialize);

// Foursquare
var forsquareUrl = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=MSJE5EGJPP5MD0PRPRERMCU1V4E4MKQRSSH4KCCBUDIF5W5F' +
  '&client_secret=UJ2DOWO3TDSWOXFEWBGDZY5QOQ4KGWZ3HXVIA54FOB55O1YO' +
  '&v=20130815' +
  '&ll=' + initialCoordinate.lat + ',' + initialCoordinate.lng +
  '&query=' + initialCoordinate.searchQuery;

