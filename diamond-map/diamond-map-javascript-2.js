var map = L.map('map').setView([51.57435435296581, -1.310918868757071], 17);
var osm =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.diamond.ac.uk/Home.html">Diamond Light Source</a>' + '<sup>&reg</sup>'
})
    .addTo(map);

var gpsIcon = L.icon({
    iconUrl: 'img/icon.png',
    iconSize: [50, 50],
    iconAnchor: [15, 33]
});

fetch ("beamlines_data.json").then((res)=>{return res.json()}).then(function(data) {
    var overlays = {}
    for (let i = 0; i < 8; i++) {
        var dict = data[i];
        var beam = dict["beamlines"];
        var beamno = beam.length;
        var group_markers = [];
        for (let j = 0; j < beamno; j++){
            var sepbeams = beam[j];
            coordinate = sepbeams["position"];
            var marker = L.marker(coordinate)
            group_markers.push(marker);
            marker.bindPopup("<h3>"+sepbeams["name"]+"</h3>"+
            "<p>"+sepbeams["description"]+"</p>"+
            "<a href='"+sepbeams["url"]+"'>Click here for link</a>"
            );

            marker.on('mouseover', function(e) {
                this.openPopup();
            });
        }

        var names = L.layerGroup(group_markers)
        names.addTo(map);
        grpname = dict["name"];
        overlays[grpname] = names;
    }

    // console.log(overlays)
    var layerControl = L.control.layers(null, overlays).addTo(map);
        
});
    

const topRightCoords = [51.57168183170403, -1.3173294067382815];
const bottomRightCoords = [51.57701619673675, -1.304454803466797];
const imageBounds = new L.LatLngBounds([topRightCoords, bottomRightCoords]);

var imageOverlay = L.imageOverlay("img/BaseUnder.png", imageBounds).addTo(map);
var imageOverlayer = L.imageOverlay("img/BaseOver.png", imageBounds).addTo(map);

function locate(){
    map.locate({watch: true});
}

var current_position;

function onLocationFound(e) {
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }
    var radius = e.accuracy;
    current_position = L.marker(e.latlng, {icon: gpsIcon}).addTo(map);
    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

locate()