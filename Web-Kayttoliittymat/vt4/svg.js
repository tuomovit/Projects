'use strict';

window.onload = function() {
    






 luopalkit(10, "palkit");

    // Luodaan palkit, parametreina montako
	function luopalkit(monta, id) {

	let kesto = 0.5;
	
        for (var i = 0; i < monta; i++) { 

    	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
     	let rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    	let delay = kesto.toString() + "s";
        console.log("luodaan palkkeja");
        svg.appendChild(rect);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("class", "hbar");
        svg.setAttribute("version", "1.1");
        svg.setAttribute("id", id);
        svg.setAttribute("width", "20");
        svg.style.animationDelay = delay;

     
        //rect.setAttribute("fill", "url(#grad1)");
        rect.setAttribute("id", id);
    	rect.style.animationDelay = delay;


        document.body.appendChild(svg);
        kesto +=0.25; // Annetaan delayta

        } 

    }	  


    // Luodaan pupunpuolikkaat ja asetetaan niille pupukuva
    var v = document.getElementById("myBunny");
    var o = document.getElementById("myBunnyo");
    

    var btv = v.getContext("2d");
    var bto = o.getContext("2d");

    var img = new Image(); 
	img.src = "bunny.png"; 


    btv.canvas.setAttribute("width", "383px");
    btv.canvas.setAttribute("height", "600px");

 	bto.canvas.setAttribute("width", "383px");
    bto.canvas.setAttribute("height", "600px");


 
    bto.drawImage(img, 191.5, 0, 191.5, 600, 0, 0, 191.5, 600);
    console.log(bto.canvas.width);
    btv.drawImage(img, 0, 0, 191.5, 600, 90, 0, 191.5, 600);





}