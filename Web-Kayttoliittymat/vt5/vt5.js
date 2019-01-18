"use strict";
$(document).ready(function() {
 

let linjat = []; // Tänne säilötään reitit

// Kartalle elenebttu joka on puolet ruudusta
var div = $("#map");
div.css("width", Math.round(window.innerWidth / 2) + "px");
div.css("height", Math.round(window.innerHeight) + "px");
 
// Luodaan maastokartta, sijaintina ensin random
let mymap = new L.map('map', {
 	crs: L.TileLayer.MML.get3067Proj()
    }).setView([50.107580, 25.6500], 8);
	L.tileLayer.mml_wmts({ layer: "maastokartta" }).addTo(mymap);

piirraRastit();

// Piirretään rastipallukat koordinaattien perusteella
function piirraRastit() {

let points = [];


for (let rasti of data.rastit) {
            let lon = rasti.lon;
            let lat = rasti.lat;

var circle = L.circle(
        [lat, lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 150 // 150m halkasija pallukalle
        }
        ).addTo(mymap); console.log("LISATTY");
		points.push(circle);

 }

 let rastit = new L.featureGroup(points);
 mymap.fitBounds(rastit.getBounds()); // Sovitetaan kartta sopivaksi rasteille



}


listaaJoukkueet();

// Listaillaan joukkueet ja annetaan attribuuttina että voi viskoa ym
function listaaJoukkueet() {
	let i = 1;

	for (let joukkue of data.joukkueet) {

	let jou = joukkue.nimi;
	let rivi = document.createElement("li");
	rivi.innerHTML = jou;
	$("#joukkuelista").append(rivi);
	rivi.style.backgroundColor = rainbow(data.joukkueet.length, i);
	rivi.setAttribute("draggable", "true");
	rivi.setAttribute("id", jou);
	rivi.addEventListener("dragstart", function(e) {
	    // raahataan datana elementin id-attribuutin arvo
	    e.dataTransfer.setData("text/plain", rivi.getAttribute("id"));
	    event.dataTransfer.effectAllowed = "move";
	});
	i++;

}

}

// Valmis värifunktio kurssisivulta
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    let r, g, b;
    let h = step / numOfSteps;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    let c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

	let drag = document.getElementById("joukkuelista");
	drag.setAttribute("draggable", "true");   




	// Lisätään veto ja pudotus karttalistaukseen
	let drop = document.getElementById("karttalista");
	drop.addEventListener("dragover", function(e) {

	  e.preventDefault();
	 e.dataTransfer.dropEffect = "move"

	});

	drop.addEventListener("drop", function(e) {
	 e.preventDefault();

	 var data = e.dataTransfer.getData("text");
	 var isaDiv = document.getElementById("karttalista");
	 isaDiv.insertBefore(document.getElementById(data), drop.firstChild);

	});


	// Lisätään veto ja pudotus joukkuelistaukseen
    let drop2 = document.getElementById("joukkuelista");
    drop2.addEventListener("dragover", function(e) {
        
        e.preventDefault();
        // Set the dropEffect to move
        e.dataTransfer.dropEffect = "move"
        
    });
    
    //Kun joukkue siirretään kartalta pois
    drop2.addEventListener("drop", function(e) {
        e.preventDefault();
        
        var nimi = e.dataTransfer.getData("text");
        drop2.appendChild(document.getElementById(nimi));

        let laskuri = 0;
            
            for (let poly of linjat) {
                if (poly[1]===nimi) {
                    poly[0].remove();
                    
                    break;
                }
                laskuri++;
            }
                    
    });

 			drop.addEventListener("drop", function(e) {
            e.preventDefault();
            
            var nimi = e.dataTransfer.getData("text");
            var isaDiv = document.getElementById("karttalista");
            isaDiv.insertBefore(document.getElementById(nimi), drop.firstChild);
                     
            // Luodaan karttareitit
            for (let joukkue of data.joukkueet) {
                if (nimi===joukkue.nimi) {
                let reitti = [];
                let matka = 0;
                
                for (let rasti of joukkue.rastit) {
                    let id = parseInt(rasti.id);
                    
                    for (let rasti of data.rastit) {
                        if (id===parseInt(rasti.id)) {
                            let koord = [rasti.lat, rasti.lon];
                            reitti.push(koord);
                            break;
                        }
                    }
                }
                let vari = document.getElementById(nimi);
                let polyline = L.polyline(reitti, {color: vari.style.backgroundColor}).addTo(mymap);
                
                linjat.push([polyline, nimi]);    
                }
            }
    
        });


}); // alotusfuntio


