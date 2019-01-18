// data-muuttuja on sama kuin viikkotehtävässä 1.
//

"use strict";

console.log(data);


window.onload = function() {

   

   jarjesta();

   // funktio sarjojen järjestämiseen
   function jarjesta() {

       data.sarjat.sort(function(a, b) {
   	     return parseFloat(a.nimi) - parseFloat(b.nimi);
       });



       for (let a of data.sarjat) {
			a.joukkueet.sort(function(a, b) {
  			var nimiA = a.nimi.toUpperCase(); 
  			var nimiB = b.nimi.toUpperCase(); 
 		 	if (nimiA < nimiB) {
  		  	return -1;
 	 	}
	  	if (nimiA > nimiB) {
 	   		return 1;
	  	}

	  	return 0;
		});
	}


   }

  
   // Luodaan elementti, johon voi sitten lisäillä tarvittavat osaset
   var taulukko = document.createElement("table");
   var otsikko = document.createElement("caption");
   var otsikkoteksti = document.createTextNode("Tulokset"); 
   taulukko.appendChild(otsikko);
   otsikko.appendChild(otsikkoteksti);

    
   var tr = document.createElement("tr");
   var th = document.createElement("th");
   var th2 = document.createElement("th");

   
   var aliotsikko1 = document.createTextNode( "Sarja"); 
   var aliotsikko2 = document.createTextNode( "Joukkue"); 
   taulukko.appendChild(tr);
   tr.appendChild(th);
   tr.appendChild(th2);
   th.appendChild(aliotsikko1);
   th2.appendChild(aliotsikko2);

   document.getElementById("tupa").appendChild(taulukko);

   joukkueet();


   // Järjestetyt tiedot tulostetaan html-dokumenttiin.
   // Koitettu tehdä selkeästi luettavaksi
   function joukkueet() {

   	for (let a of data.sarjat) {
		for (let i of a.joukkueet) {
			console.log(a.nimi);
			console.log(i.nimi);
	

    	var sarja = document.createTextNode(a.nimi);
		  var nimi= document.createTextNode(i.nimi);

    	var tr = document.createElement("tr");
    	var td = document.createElement("td"); 
      var td2 = document.createElement("td"); 

    	taulukko.appendChild(tr);
    	tr.appendChild(td);
      tr.appendChild(td);
    	td.appendChild(sarja);
    	tr.appendChild(td2);
      td2.appendChild(nimi);
    
    	}
    	}	
	}

	
    // Kutsutaan funktiota sopivilla parametreilla jotta saadaan input-lootat
		luokentta("Lat: ", 0);
		luokentta("Lon: ", 1);
		luokentta("Koodi: ", 2);

		// Luodaan text-input ja sille label, jossa funktiokutsussa annettu nimi
		function luokentta(nimi, id) {

		var p = document.createElement("p");	
    	var label = document.createElement("label");
    
    	label.textContent = (nimi);	

    	var brr = document.createElement("br");
    	var form = document.getElementsByTagName("form")[0];
		var input = document.createElement("input");
		input.setAttribute("id", id);

		label.appendChild(input);
		p.appendChild(label);
		form.appendChild(p);


		}

		luonappi("Lisää!");

		//luodaan nappula. Parametrina viedaan napille annettava otsikko
		function luonappi(nimi) {

		var form = document.getElementsByTagName("form")[0];
		var p = document.createElement("p");
		var button = document.createElement("button");
    
    	var t = document.createTextNode(nimi); 
    	button.appendChild(t);
		p.appendChild(button);
		form.appendChild(p);
		button.addEventListener("click", klikkikasittelija);

		}

		// Klikkikäsittelijä tarkistaa, että kaikissa inputeissa on sisältöä. 
		// Jos tyhjä, ilmoittaa consoliin eikä lisää rastia.
		// Muuten kutsuu lisäärasti-funtkiota
		function klikkikasittelija(e) {
  	 	e.preventDefault();
  	 	var uusilat = document.getElementById(0).value;
  	 	var uusilon = document.getElementById(1).value;
  	 	var uusikoodi = document.getElementById(2).value;
  	 	if (uusilat == "" || uusilon == "" || uusikoodi == "") {console.log("Joku on tyhjana!!")} 
  	 		else {
  	 			lisaaRasti(uusilat, uusilon, uusikoodi);
  	 		}

  	 	

	}

	// Lisätään rasti jossa lomakkeelta saadut parametrit. Sitten tulostetaan rastit
	function lisaaRasti(lat, lon, koodi) {

		var uusirasti = 

	{
      
      "lon": lon,
      "koodi": koodi,
      "lat": lat,
      
    }

    data.rastit.unshift(uusirasti);
    tulostarastit();

	}

	// Tulostetaan rastien koodi/kordinaatit
	function tulostarastit() {

	for (var i in data.rastit) {
		
			 console.log(data.rastit[i].koodi);
			 console.log(data.rastit[i].lon);
	}		

}

	












}
