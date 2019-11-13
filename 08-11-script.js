// koska otsikkoa ja timelinea ei tarvitse luoda joka kerta uudestaan, sijoitetaan ne draw-funktion ulkopuolelle.
let title = document.createElement("h1");
document.body.appendChild(title);

let timeline = document.createElement('div');
timeline.className = 'timeline'; // määrittelyä myös css-filessä
document.body.appendChild(timeline);

//draw-funktio tehdään, jotta saadaan näyttämään reaaliaikaista dataa. Koko muu koodi tulee olla {} sisällä.
let draw = function() {
let request = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')

request.then(function(response){
    response.json().then(function(json){
        title.innerHTML = json.metadata.title;
        timeline.innerHTML = ""; // tämän ansiosta luuppi nollaa datan ennen kuin hakee uuden, voi tehdä myös ao. tavalla.
        //while (timeline.firstChild){
        //  timeline.removeChild(timeline.firstChild);
        //}

        for (let feature of json.features) {
            let magnitude = document.createElement('div');
            magnitude.className = 'magnitude'; // määrittelyä myös css-filessä
            magnitude.style.left = (100 - 100 *
                (new Date().getTime() - new Date(feature.properties.time).getTime()) / (1000 * 60 * 60)) + "%";
            magnitude.style.height = (20 * feature.properties.mag) + 'px';
            magnitude.innerHTML = feature.properties.mag;
            timeline.appendChild(magnitude);
        }
    })
})

}

draw();

setInterval(draw, 1000); // aloittaa tietojen luuppaamisen, millisekunteina