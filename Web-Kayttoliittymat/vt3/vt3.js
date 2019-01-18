"use strict";

window.onload = function() {


		// Luodaan klikinkuuntelija, otetaan arvoja talteen
		document.querySelector("button").addEventListener("click", function (e) {
			
			var joukkue = document.getElementById("joukkue").value;
			var aika = document.getElementById("aika").value;
			var radio = document.getElementsByName('radiot');
			
			// Etsitään mikä radiobutton on valittuna
			for (var i = 0, length = radio.length; i < length; i++)
				{
 					if (radio[i].checked)
 					{
 				 
  					var oikearadio = (radio[i].value);
  					break;
 					}				
			}

			
			var tavat = [];
			var mentit = document.getElementsByName("joo");
			for (var i=0;i<mentit.length;i++){
				console.log("kiekka" + i)
 			 if ( mentit[i].checked ) {
  			  	tavat.push(mentit[i].value);
 			 }
			}



			// Haetaan jasenet jasenbokseista, täytyy olla vähintään kaksi että pelittää
			var onkojasenta = 0;
			var jasenet = [];
			var jtaulukko = document.getElementsByName("jasen");
			for (var i=0;i<jtaulukko.length;i++){
				jasenet.push(jtaulukko[i].value);

			}
			
			if ( (jasenet[0] === "") || (jasenet[1] === "")  )
				{ 
					console.log("VÄHINTÄÄN KAKSI JÄSENTÄ")
					var elementti = document.getElementById("eka");
   			 		elementti.setCustomValidity("Kirjoita vähintään kaksi!");
   			 		onkojasenta = 1;
				} else {
					var elementti = document.getElementById("eka");
   			 		elementti.setCustomValidity("");
				}


			

			//Jos mitään leimaustapaa ei ole valittu, valittaa	
			if (tavat.length == 0) {
   			 console.log("Et Valinnut mitään");
   			 var elementti = document.getElementById("check");
   			 elementti.setCustomValidity("Valitse vähintään yksi!");
			} 
			else { 
				var elementti2 = document.getElementById("check"); 
				elementti2.setCustomValidity(""); 
			}
		

			// Tarkastetaan löytyykö tietorakenteesta jo samannistä joukkuetta
			var loytyiko = 0;
			for (let a of data.sarjat) {
			for (let i of a.joukkueet) {
			 if (i.nimi == joukkue) { loytyiko = 1; 
			 	var elementti3 = document.getElementById("joukkue"); 
			 	elementti3.setCustomValidity("Joukkue löytyy jo!");
			  }
			 	
			}
			}


			// Jos kaikki vaaditut asiat löytyvät, voidaan joukkueen tiedot vielä lisättäväksi
			if ( loytyiko == 0 && tavat.length > 0 && onkojasenta == 0) {
				var elementti4 = document.getElementById("joukkue"); 
			 	elementti4.setCustomValidity("");
				console.log(joukkue + aika + radio);
				teeJoukkue(joukkue, aika, oikearadio, jasenet);

			}

		});


	// Koostetaan joukkue tiedoista
	function teeJoukkue(joukkue, aika, radio, jasenet) {

	var radio2 = radio;		
	var uusijoukkue = 

	{ 
      "nimi": joukkue,
      "last": aika,
      "jasenet": [
        
      ],
      "id": 99999
	}

	for ( var i = 0; jasenet.length > i; i++ ){
	   if (jasenet[i].length > 0) {
	    uusijoukkue.jasenet.push(jasenet[i]);}
		
	}

	lisaaJoukkue(uusijoukkue, radio2);
	}



	// Lisätään joukkue haluttuun sarjaan. 
	// Jos tulee tyhjä parametri, ilmoittaa  
	function lisaaJoukkue(theObject, haluttusarja) {

		if (haluttusarja == "") 
			{ console.log(" Tyhjä sarja"); 
		}

		for (let i in data.sarjat) {

  		  	if (data.sarjat[i].nimi == haluttusarja) {
    		data.sarjat[i].joukkueet.unshift(theObject);
			}
  		}

  		nayta();

  		var el = document.getElementById('section');
		el.remove()

  		listaus();
		}

		document.querySelector("form").addEventListener("submit", function (e) {
			e.preventDefault();
		});


	//Luodaan jasenlootia
	var montako = 5; // Montako lootaa luodaan
	montako++;
	for (var i=2; i<montako; i++) {
	luoform(i);
	}

	function luoform(id) {
		var p = document.createElement("p");	
    	var label = document.createElement("label");
    
    	label.textContent = ("Jäsen " + id);	

    	var brr = document.createElement("br");
    	var form = document.getElementsByTagName("p")[1];
		var input = document.createElement("input");
		input.setAttribute("id", "jaa");
		input.setAttribute("input", "jaa");
		input.setAttribute("name", "jasen");

		label.appendChild(input);
		p.appendChild(label);
		form.appendChild(p);

	}


	//Luodaan radiobokseja, ensimmäinen on valittuna. Nimet haetaan sarja-rakenteesta	
	for (let i in data.sarjat) {

	var nimi = (data.sarjat[i].nimi)
	luocheck(nimi);
	document.getElementById("idradio").checked = true;
	}

	function luocheck(nimi2) {

	console.log(nimi2);

	var checkbox = document.createElement('input');
	checkbox.type = "radio";
	checkbox.name = "radiot";
	checkbox.value = nimi2;
	checkbox.id = "idradio";


	var br = document.createElement("br");
	var label = document.createElement('label')
	label.id = "id";

	label.appendChild(document.createTextNode(nimi2));

	var div = document.getElementById("div1"); 

	div.appendChild(checkbox);
	div.appendChild(label);
	div.appendChild(br);

	}

	//Tulostetaan consoliin joukkueiden nimet
	function nayta() {

	for (let a of data.sarjat) {
		for (let i of a.joukkueet) {
			console.log(i.nimi);

		}
	}
	console.log(data.sarjat[0].joukkueet[0].jasenet); // Tarkistus koodailuvaiheessa
													  // että uudet jäsenet tulevat
	}

	listaus();


	// Aakkosjärjestyksessä joukkueet
	function listaus() {
	
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

			
    	
    	var div = document.getElementById("div2"); 
    	var section = document.createElement("section");
    	section.id = "section";
    	var ul=document.createElement('ul');
    	
    	var brr = document.createElement("br");

    	
    	for (let a of data.sarjat) {
		for (let i of a.joukkueet) {
		console.log(i.nimi);

		var li=document.createElement('li');
		var teksti = document.createTextNode(i.nimi);
    	
		div.appendChild(section);
		section.appendChild(ul);
		ul.appendChild(li);
		li.appendChild(teksti);
		
		


	}	
}


    	

	}



}







