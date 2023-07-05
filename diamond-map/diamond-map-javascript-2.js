var map = L.map('map').setView([51.57435435296581, -1.310918868757071], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.diamond.ac.uk/Home.html">Diamond Light Source</a>' + '<sup>&reg</sup>'
}).addTo(map);

fetch ("beamlines_data.json").then((res)=>{return res.json()}).then(function(data) {
    for (let i = 0; i < 8; i++) {
        var dict = data[i];
        var beam = dict["beamlines"];
        var beamno = beam.length;
        for (let j = 0; j < beamno; j++){
            var sepbeams = beam[j];
            coordinate = sepbeams["position"];
            var marker = L.marker(coordinate).addTo(map);
            marker.bindPopup("<h3>"+sepbeams["name"]+"</h3>"+
            "<p>"+sepbeams["description"]+"</p>"+
            "<a href='"+sepbeams["url"]+"'>Click here for link</a>"
            );

            marker.on('mouseover', function(e) {
                this.openPopup();
               /* const markerHtmlStyles = `
                width: 3rem;
                height: 3rem;
                left: -1.5rem;
                top: -1.5rem;`
                */
            

            });
        }
    }
    
})

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
    current_position = L.marker(e.latlng).addTo(map);
    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

locate()