

document.addEventListener("DOMContentLoaded", function(event) {

    var containerElement = document.querySelector(".container");

    class Country {

        constructor(countryName) {

            this.country = countryName;

            this.fetchNumbers();

            this.buildHTML(this.country);

        //day0 = today, day1 = yesterday, day2 = daybeforeyesterday, etc

    }

    fetchNumbers(){
        fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {

            this.newCasesDay6 = this.calcNewCases(6, data);
            this.newCasesDay5 = this.calcNewCases(5, data);
            this.newCasesDay4 = this.calcNewCases(4, data);
            this.newCasesDay3 = this.calcNewCases(3, data);
            this.newCasesDay2 = this.calcNewCases(2, data);
            this.newCasesDay1 = this.calcNewCases(1, data);
            this.newCasesDay0 = this.calcNewCases(0, data);


            this.day0Difference = this.newCasesDay0 - this.newCasesDay1;
            this.day1Difference = this.newCasesDay1 - this.newCasesDay2;
            this.day2Difference = this.newCasesDay2 - this.newCasesDay3;
            this.day3Difference = this.newCasesDay3 - this.newCasesDay4;
            this.day4Difference = this.newCasesDay4 - this.newCasesDay5;
            this.day5Difference = this.newCasesDay5 - this.newCasesDay6;


            this.differenceAverage0 = (this.day0Difference + this.day1Difference + this.day2Difference + this.day3Difference)/4;
            this.differenceAverage1 = (this.day2Difference + this.day3Difference + this.day4Difference + this.day5Difference)/4;

            this.totalDeaths = data[this.country][data[this.country].length-(1)].deaths;


                   // console.log(this.country + " today = " + this.day0Difference + this.day1Difference + this.day2Difference);
                   // console.log(this.country + " yesterday = " + this.day2Difference + this.day3Difference + this.day4Difference);

                   this.todayAngle = 90 - (this.differenceAverage0/2);
                   this.yesterdayAngle = -90 - (this.differenceAverage1/2);

                   if (this.todayAngle <= 0){
                       this.todayAngle = 1;
                   } else if (this.todayAngle >= 180){
                    this.todayAngle = 179;
                }
                
                if (this.yesterdayAngle <= -180 ){
                   this.yesterdayAngle = -179; 
               } else if (this.yesterdayAngle >= 0){
                this.yesterdayAngle = -1;
            }

            this.refresh();

        });}

        calcNewCases(x, data){
            return data[this.country][data[this.country].length-(x+1)].deaths - data[this.country][data[this.country].length-(x+2)].deaths;
        }

        buildHTML(countryName){
            var title = '';

            if(countryName == 'US'){
                title = 'USA';
            } else {
                title = countryName;
            }

            this.countrySection = '<article id="' + countryName.replace(/\s+/g, '') + '">' + 
            '<section class="title">' + title + '</section> ' + 
            '<section class="clock">' +
            '<section class ="hand today" ' + countryName.replace(/\s+/g, '') + '-today-hand> </section>' + 
            '<section class ="hand yesterday" ' + countryName.replace(/\s+/g, '') + '-yesterday-hand> </section>' +
            '</section>' + 
            '<section class ="otherData" ' + countryName.replace(/\s+/g, '') + 'today>' + '</section>' + 
            '<section class ="otherData" ' + countryName.replace(/\s+/g, '') + 'total>' + '</section>' +  
            '</article>';

            containerElement.innerHTML += this.countrySection;
                //console.log(containerElement);

            }

            refresh(){
                var clock = document.getElementById(this.country.replace(/\s+/g, ''));

                var deathsToday = clock.querySelector('[' + this.country.replace(/\s+/g, '') + 'today]');
                var deathsTotal = clock.querySelector('[' + this.country.replace(/\s+/g, '') + 'total]');

                deathsToday.innerText = "Deaths today = " + this.newCasesDay0;
                deathsTotal.innerText = "Deaths total = " + this.totalDeaths;

                var todayHand = clock.querySelector('[' + this.country.replace(/\s+/g, '') + '-today-hand]');
                var yesterdayHand = clock.querySelector('[' + this.country.replace(/\s+/g, '') + '-yesterday-hand]'); 


                todayHand.style.setProperty('--rotation', this.todayAngle);
                yesterdayHand.style.setProperty('--rotation', this.yesterdayAngle);

            }

        }

        const belgium = new Country('Belgium');
        const brazil = new Country('Brazil');
        const china = new Country('China');
        const denmark = new Country('Denmark');
        const France = new Country('France');
        const germany = new Country('Germany');
        const india = new Country('India');
        const italy = new Country('Italy');
        const holland = new Country('Netherlands');
        const spain = new Country('Spain');
        const sweden = new Country('Sweden');
        const turkey = new Country('Turkey');
        const uk = new Country('United Kingdom');
        const usa = new Country('US');

    })



