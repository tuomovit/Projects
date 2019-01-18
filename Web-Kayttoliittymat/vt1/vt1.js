// voit tutkia tarkemmin käsiteltäviä tietorakenteita konsolin kautta 
// tai json-editorin kautta osoitteessa http://jsoneditoronline.org/
// Jos käytät json-editoria niin avaa data osoitteesta:
// http://appro.mit.jyu.fi/tiea2120/vt/vt1/2018/data.json

// Seuraavilla voit tutkia käytössäsi olevaa tietorakennetta. Voit ohjelmallisesti
// vapaasti muuttaa selaimen muistissa olevan rakenteen sisältöä ja muotoa.



// console.dir(data);

// Kirjoita tästä eteenpäin oma ohjelmakoodis

"use strict";

// Luodaan esimerkkijoukkue
var uusijoukkue = 

{ 
      "nimi": "Mallijoukkue",
      "last": "2017-09-01 10:00:00",
      "jasenet": [
        "Tommi Lahtonen",
        "Matti Meikäläinen"
      ],
      "id": 99999
}


// Funktiokutsu, parametreina luotu joukkue/haluttu sarja 
lisaaJoukkue(uusijoukkue, "4h");


// Lisätään joukkue haluttuun sarjaan. 
// Jos tulee tyhjä parametri, ilmoittaa konsoliin
function lisaaJoukkue(theObject, haluttusarja) {

	if (haluttusarja == "") 
		{ console.log(" Tyhjä on "); 

	}

	for (let i in data.sarjat) {

    	if (data.sarjat[i].nimi == haluttusarja) {
    	data.sarjat[i].joukkueet.unshift(theObject);
		}

  	}

}

// Tulostaa konsoliin kaikkien joukkueiden nimet
for (let a of data.sarjat) {
	for (let i of a.joukkueet) {
		console.log(i.nimi);
	}	
}

// Lisäilee merkkijonoon rastien koodit ";" eroteltuna
var jono = "";
for (var i in data.rastit) {

	var muuttuja = data.rastit[i].koodi.substring(0,1);
	

	if ( muuttuja < 10  ) {
			
			jono += (data.rastit[i].koodi);
			jono += "; "

	}

	
}

console.log(jono);


// TASO 3: //

poistaJoukkue("Siskokset");

function poistaJoukkue(poistettava) {

var indeksi = 0;

for (let a of data.sarjat) {
	for (let i of a.joukkueet) {
		
		if ((i.nimi) == poistettava) {
			console.log("Poistettava löytyi!")
			a.joukkueet.splice(indeksi, 1);

		}

		indeksi++;
	}

	indeksi = 0;	
}

}



// Lasketaan joukkueiden pisteet ja lopuksi tulostetaan ne nimien kanssa
function pisteet() {

    var joukkueet = [];
    
    var merkinnat = [];
    
    for (var sarja of data.sarjat) {
    for (var joukkue of sarja.joukkueet) {
        var nimi = joukkue.nimi;
        var pisteet = 0;
        var id = parseInt(joukkue.id);
        var matka = 0;
        var aika = 0;
        var lon1 = 0;
        var lat1 = 0;
         var lon2 = 0;
         var lat2 = 0;
         var aikarastilla = 0;
         var h1 = 0;
        var m1 = 0;
         var s1 = 0;
         var h2 = 0;
          var m2 = 0;
          var s2 = 0;
          var aikatunneissa = 0;
          var aikaminuuteissa = 0;
          var aikasekunneissa = 0;


        
        // Etsitään joukkuid perusteella rastimerkintöjä
        for (var rasti1 of data.tupa) {
            if (parseInt(rasti1.joukkue) === id) {
                var rastinKoodi = parseInt(rasti1.rasti);


             
                // Rastimerkintäkoodinperusteella etsitään rasteista rasti
                // Tarkistetaan merkinnat-rakenteesta ettei ole käyty

                for (var rasti2 of data.rastit) {
                    if (parseInt(rasti2.id) === rastinKoodi) {
                        
                        var onkotupla = false;
                        
                        for (var merkinta of merkinnat) {
                            if (merkinta.joukId === id && merkinta.rastId === rastinKoodi) {
                                onkotupla = true;
                            }
                        }                                
                            
                        // jos alkaa kokonaisluvulla ja alle kymmenen, niin sopii
                        if (onkotupla === false && 10 > (parseInt(rasti2.koodi.substring(0,1)))) {

                            var piste = parseInt(rasti2.koodi.substring(0,1));
                            pisteet += piste;
                            
                            var merkinta = {
                                joukId: parseInt(id),
                                rastId: parseInt(rastinKoodi)
                            };
                            merkinnat.push(merkinta);


                            
                            }
                        }

                    }
                }
            }



            
                      // Laskee kahden koordinaatin vÃ¤lisen matkan
            function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
                var R = 6371; // Radius of the earth in km
                var dLat = deg2rad(lat2-lat1);  // deg2rad below
                var dLon = deg2rad(lon2-lon1); 
                var a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                var d = R * c; // Distance in km
                return d;
            }
            
            function deg2rad(deg) {
                return deg * (Math.PI/180)
            }
            
         
            
            // Lasketaan joukkueen kulkema matka
            for (let merkinta of data.tupa) {
                if (parseInt(merkinta.joukkue)===parseInt(id)) {
                    aikarastilla = merkinta.aika;
                    if (h1===0 && m1===0 && s1===0 && h2===0 && m2===0 && s2===0 & aikarastilla!==NaN && aikarastilla!=="") {
                        h1 = parseInt(aikarastilla.substr(11,2));
                        m1 = parseInt(aikarastilla.substr(14,2));
                        s1 = parseInt(aikarastilla.substr(17,2));
                    } else {
                        if (aikarastilla!==NaN && aikarastilla!==""){
                            h2 = parseInt(aikarastilla.substr(11,2));
                            m2 = parseInt(aikarastilla.substr(14,2));
                            s2 = parseInt(aikarastilla.substr(17,2));
                        }
                    }
                    
                    let rastikoodi = merkinta.rasti;
                    for (let rasti of data.rastit) {
                        if (parseInt(rasti.id)===parseInt(rastikoodi)) {
                            if (lon1===0 && lat1===0 && lon2===0 && lat2===0) {
                                lat1 = parseFloat(rasti.lat);
                                lon1 = parseFloat(rasti.lon);
                                break;
                            } else {
                                lat2 = lat1;
                                lon2 = lon1;
                                lat1 = parseFloat(rasti.lat);
                                lon1 = parseFloat(rasti.lon);
                                matka += getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
                                break;
                            }
                        }
                    }
                }
            }
            
            //Pyöritetään ajat sopiviksi
            aikatunneissa = h2 - h1;
            aikaminuuteissa = m2 - m1;
            aikasekunneissa = s2 - s1;
            
            if (aikasekunneissa < 0) {
                aikasekunneissa += 60;
                aikaminuuteissa -= 1;
            }
            
            if (aikaminuuteissa < 0) {
                aikaminuuteissa += 60;
                aikatunneissa -= 1;
            }
            
            if (aikatunneissa < 0) {
                aikatunneissa += 24;
            }
            
            aika = ("0" + aikatunneissa) + ":" + ("0" + aikaminuuteissa).slice(-2) + ":" + ("0" + aikasekunneissa).slice(-2);






            // Luodaan joukkue
            var joukkue = {
            joukkueNimi: nimi,
            joukkuePisteet: pisteet,
            joukkueMatka: matka,
            joukkueAika: aika
            };
            
            joukkueet.push(joukkue);
        }
    }
    
    // Lajitellaan pistejarjestykseen
    joukkueet.sort(function (a, b) {
    var ero = b.joukkuePisteet - a.joukkuePisteet;
    var onkoajat = b.joukkueAika + a.joukkueAika;
    if ( ero == 0 && onkoajat > 0 ) {
        var b = parseInt(a.joukkueAika.substr(0,2) + a.joukkueAika.substr(3,2) + a.joukkueAika.substr(6,2));
        var a = parseInt(b.joukkueAika.substr(0,2) + b.joukkueAika.substr(3,2) + b.joukkueAika.substr(6,2));
        ero = b - a;

    }

    return ero;
    });

    // Tulostetaan nimet ja pisteet
    for (var joukkue of joukkueet) {
        console.log(joukkue.joukkueNimi + ", " + joukkue.joukkuePisteet + " p, " + Math.round(joukkue.joukkueMatka) + " km, " + joukkue.joukkueAika);
    }



}

pisteet();



// Tulostaa konsoliin kaikkien joukkueiden nimet
for (let a of data.sarjat) {
	for (let i of a.joukkueet) {
		console.log(i.nimi);
	}	
}
