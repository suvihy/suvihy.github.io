Papa.parse("https://suvihy.github.io/vaeston_koulutusrakenne.csv", {
    download: true,
    header: true,
    complete: function(results) {
        let years = ["1998", "2008", "2018"];

        for (let year of years) {

            let barHeading = document.createElement("h2");
            document.getElementById("container").appendChild(barHeading); // kuviolle on oma div
            barHeading.innerHTML = year;
          
            let barOne = document.createElement("div"); //tämä on yksi pylväs
            barOne.className = "flex-container";

            document.getElementById("container").appendChild(barOne);

            let totalForYear = 0;

            for (let dataPoint of results.data) {
                let dataForYear = dataPoint[year];

                totalForYear += parseFloat(dataForYear);

                let education = dataPoint["Education"];
                let segment = document.createElement("div");

                let number = document.createElement("p");
                segment.appendChild(number);


                number.style.margin = "0";
                number.innerHTML = dataForYear;

                segment.style.flexBasis = (dataForYear / 10000) + "px";
                segment.style.height = "50px";
                segment.style.border = "0.5px solid white";
                segment.style.fontFamily = "Arial";
                segment.className = "segment";
                // segment.style.overflowX = 
                barOne.append(segment);
                console.log(year + " " + dataForYear + " " + education);
            }


            let totalNumber = document.createElement("div");
            document.getElementById("container").appendChild(totalNumber);
            totalNumber.innerHTML = "Total " + totalForYear;
            totalNumber.className = "totalNumber";

        }
    }
});
