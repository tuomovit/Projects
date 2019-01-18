"use strict";

class App extends React.Component {
    constructor(props) {
      super(props);

        // tehdään kopio tietorakenteen joukkueista
        // Tämä on tehtävä näin, että saadaan oikeasti aikaan kopio eikä vain viittausta samaan tietorakenteeseen. Objekteja ja taulukoita ei voida kopioida vain sijoitusoperaattorilla
        // päivitettäessä React-komponentin tilaa on aina vanha tila kopioitava uudeksi tällä tavalla
        // kts. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        let joukkueet = Array.from( data.joukkueet, function(j) {
            // luodaan uusijoukkue
            let uusij = {};
            // kopioidaan tavalliset kentät
            let kentat = ["nimi", "sarja", "seura", "id"];
            for( let i of kentat )
                uusij[i] = j[i];
            // taulukot on kopioitava erikseen. Nyt riittää pelkkä array.from, koska tauluiden
            // sisällä ei ole muita taulukoita tai objekteja
            let uusijasenet = Array.from( j["jasenet"] );
            let uusirastit = Array.from( j["rastit"] );
            let uusileimaustapa = Array.from( j["leimaustapa"] );
            uusij["jasenet"] = uusijasenet;
            uusij["rastit"] = uusirastit;
            uusij["leimaustapa"] = uusileimaustapa;
            return uusij;
        });
        console.log(joukkueet);
        this.state = { 
            "joukkueet" : joukkueet
        };
    }
    render () {
      return <div>
        </div>;
    }
}


ReactDOM.render(
    <App />,
  document.getElementById('root')

);
