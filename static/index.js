

function initMap(data) {
    
    var center = {lat: 15.36869,lng: 75.121651};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: center
    });
    
    var infowindow =  new google.maps.InfoWindow({});
    var marker;
    
    var symbolOne = {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: '#F00',
        fillColor: '#F00',
        fillOpacity: 1
      };
      var symbolOne = {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: '#F00',
        fillColor: '#F00',
        fillOpacity: 1
      };
      
    data.forEach(e => {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(15.36869, 75.121651),
        //icon: symbolOne,
        map: map,
        title: e[`address`],
    });
        google.maps.event.addListener(marker, 'click', (function (marker)
         {
            return function () {
                    infowindow.setContent(`State: ${e[`state`]}<br>County: ${e[`location`]}<br>Address: ${e[`address`]}`);
                infowindow.open(map, marker);
            }
        })(marker));
    });
}