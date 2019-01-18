
var myChart;
window.onload = function() {
       
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
var chartType = 'line';

  
var data = {
  labels: ["0", "0"],
  datasets: [{
        label: 'Rahaa säästössä',
        data: ["0"],
        backgroundColor:  'rgba(255, 99, 132, 0.2)',
        borderColor:   'rgba(255,99,132,1)',
        borderWidth: 1
    }, {
        
         data: ["0"],
        label: "Rahaa talletettu",
        borderColor: "#8e5ea2",
        fill: true,
        borderWidth: 1
        
        
        
    }
    ]
};

var options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  title: {
    fontSize: 12,
    display: true,
    text: 'Vuotta',
    position: 'bottom'
  }
};

    
init();

// Konstruktori, jossa rakennetaan diagrammi    
function init() {
  myChart = new Chart(ctx, {
    type: chartType,
    data: data,
    options: options
  });
}
    
// Testifunktio datan lisäämiselle   
function addData() {
      myChart.data.labels[0] ="2017";
      myChart.update();
    
    }    
   
var i;
for (i = 0; i < 3; i++) {  
    
    var slider = document.getElementById("slide" + i);
    var sliderDiv = document.getElementById("sliderAmount" + i);
     
sliderDiv.innerHTML = slider.value;
    
    
}    
      
}; // Window.onload päättyy

// Funktiot, jotka yhdistetty slidereihin. Nyt tehty typerästi erikseen.
// Kutsuvat aina laskekorko-funktiota
function updateSlider0(slideAmount) {
        var sliderDiv = document.getElementById("sliderAmount0");
        sliderDiv.innerHTML = slideAmount;
        laskeKorko();
    }
    
    
    
  function updateSlider1(slideAmount) {
        var sliderDiv = document.getElementById("sliderAmount1");
        sliderDiv.innerHTML = slideAmount;
        laskeKorko();
    }  


function updateSlider2(slideAmount) {
        var sliderDiv = document.getElementById("sliderAmount2");
        sliderDiv.innerHTML = slideAmount;
        laskeKorko();
    }  


// Laskee koron annetuilla slider-arvoilla
function laskeKorko() {
    
    var slider0 = document.getElementById("slide" + 0);
    var slider1 = document.getElementById("slide" + 1);
    var slider2 = document.getElementById("slide" + 2);
    
    
    var saastosumma = slider0.value;
    var vuodet = slider1.value;
    var tuotto = slider2.value;  
    var kuukausituotto = tuotto / 12 / 100;
    var kuukausia = vuodet * 12;
    
    var tulos = saastosumma * (Math.pow(1 + kuukausituotto, kuukausia) - 1) / kuukausituotto;
    
    var rahaatalletettu = kuukausia * saastosumma;
    
    
    var tuotto = document.getElementById("tulos");
    tuotto.innerHTML = Math.ceil(tulos);
    
    var talletettuoutput = document.getElementById("talletettu");
    talletettuoutput.innerHTML = Math.ceil(rahaatalletettu);
    
    // Päivitetään käppyrä vastaamaan uusia tietoja
    paivitaKappyra(rahaatalletettu, tulos, vuodet);
       
}

// Diagrammin päivitys. Muuttujina kuinka paljon rahaa on talletettu
// mikä on lopputulos ja missä ajassa
function paivitaKappyra(talletettu, tulos, vuodet) {
    
    var saastossa = ["0"];  
    saastossa.push(tulos);
    
    var vuosia = [];  
    vuosia.push(vuodet); 
    
    var tallessa = ["0"];  
    tallessa.push(talletettu);
    
    
    myChart.data.labels[1] = vuosia;
    myChart.data.datasets[0].data = saastossa;
    myChart.data.datasets[1].data[1] = talletettu;
    
    myChart.update();
  
}
 
    
    


