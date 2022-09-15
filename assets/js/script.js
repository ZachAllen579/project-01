// element variables
let standingsTable = $('#standings-table-body');
let tab1Title = $('#tab-1');
let tabsMenu = $('#example-tabs');
let tabsBox = $('#tabs-box');
let summaryPanel1 = $('#panel1');
let summaryPanel3 = $('#panel3');
let tabLabel3 = $('#panel3-label');
let panel3TBody = $('#current-games-tbody');
// dynamic page variables
let currentWeek = whatWeek(moment().format('YYYY-MM-DD'));
let confCode = localStorage.getItem("dropDownValue");
    if ((confCode == null)|| (confCode=='')){
        confCode = 'SEC'
    }


//function to populate the standings based on the conference code.  
function populateStandings(currentConfCode){
     // local end point for local testing
    let localEndPoint = `http://127.0.0.1:3001/records?year=2022&conference=${currentConfCode}`;
    // proxy endpoint nodejs app at our heroku deployment
    let remoteEndPoint = `https://forwarding-app-project-1.herokuapp.com/records?year=2022&conference=${currentConfCode}`;
    fetch(remoteEndPoint)
    .then(function (response) {
        if (response.status===200){
        return response.json();
        } else {
            console.log('here:' + response.text());
            return response.text();
        }

    })
    .then(function (data) {
        // sort by best conference record
        data.sort((a, b) => (a.conferenceGames.wins-a.conferenceGames.losses > b.conferenceGames.wins - b.conferenceGames.losses) ? -1 : 1)
        standingsTable.html("");
        //build table of standings
        for (let i=0; i<data.length; i++){
            standingsTable.append(`
                <tr>
                    <td><a href="#" class="school-link" data-school="${data[i].team}">${data[i].team}</a></td>
                    <td>${data[i].conferenceGames.wins}-${data[i].conferenceGames.losses}</td>
                    <td>${data[i].total.wins}-${data[i].total.losses}</td>
                    <td>${data[i].total.games}</td>
                </tr>
            
            `)
        }
    });

}

// function to see which football schedule week # the current date is in
function whatWeek(date){
    //date should be YYYY-MM-DD format.
    let weekNum = 0;

    // resolution table for week #s in football season
    if ((date>'2022-08-05')&&(date<='2022-09-05')){
        // week 1 August 5 - September 5
        weekNum = 1;
    } else if ((date>='2022-09-06')&&(date<='2022-09-12')){
    // week 2 September 6 - 12
        weekNum = 2;
    } else if ((date>='2022-09-13')&&(date<='2022-09-19')){
    // week 3 September 13 - 19
        weekNum = 3;
    } else if ((date>='2022-09-20')&&(date<='2022-09-26')){
    // week 4 September 20 - 26
        weekNum = 4;
    } else if ((date>='2022-09-27')&&(date<='2022-10-03')){
    // week 5 September 27 - October 3
        weekNum = 5;
    } else if ((date>='2022-10-04')&&(date<='2022-10-10')){
    // week 6 October 4 - 10
        weekNum = 6;
    } else if ((date>='2022-10-11')&&(date<='2022-10-17')){
    // week 7 October 11 - 17
        weekNum = 7;
    } else if ((date>='2022-10-18')&&(date<='2022-10-24')){
    // week 8 October 18 - 24
        weekNum = 8;
    } else if ((date>='2022-10-24')&&(date<='2022-10-31')){
    // week 9 October 25 - 31
        weekNum = 9;
    } else if ((date>='2022-11-01')&&(date<='2022-11-07')){
    // week 10 November 1 - 7
        weekNum = 10;
    } else if ((date>='2022-11-08')&&(date<='2022-11-14')){
    // week 11 November 8 - 14
        weekNum = 11;
    } else if ((date>='2022-11-15')&&(date<='2022-11-21')){
    // week 12 November 15 - 21
        weekNum = 12;
    } else if ((date>='2022-11-22')&&(date<='2022-11-28')){
    // week 13 November 22 - 28
        weekNum = 13;
    } else if ((date>='2022-11-29')&&(date<='2022-12-05')){
    // week 14 November 29 - December 5
        weekNum = 14;
    } else if (date>'2022-12-05'){
    // week 15 December 6 - 10
        weekNum = 15;
    // week 16 Dec 11 - Jan 10
    }

    return weekNum;
}



//function to get the previous weeks games and optionally the next weeks games
function getGames(week){
    let remoteEndPoint = `https://forwarding-app-project-1.herokuapp.com/games?year=2022&week=${week}&seasonType=regular&conference=${confCode}`;
    return fetch(remoteEndPoint)
    .then(function (response) {
         return response.json();
       
    })
          
    
}


// function to populate last weeks' games
async function populateGames(){
    
    tab1Title.children().text(`week ${currentWeek-1} game results`);
    let lastWeekGames =  await getGames(currentWeek-1);
    
    let tableObject = ``;
    //reset the current table
    summaryPanel1.html(``);
    tableObject = `<table>
                    <thead>
                    <tr>
                        <th width="200">Matchup Results</th>
                        <th>Date</th>
                        <th>Venue</th>
                        
                    </tr>
                    </thead>
                    <tbody>`;
                    //console.log(lastWeekGames.length);
                   // console.log(lastWeekGames);
    for (let i=0; i<lastWeekGames.length; i++ ){
       tableObject+=`<tr>
                        <td><a href="#" class="school-link" data-school="${lastWeekGames[i].away_team}">${lastWeekGames[i].away_team}</a> - ${lastWeekGames[i].away_points} @ <a href="#" class="school-link" data-school="${lastWeekGames[i].home_team}">${lastWeekGames[i].home_team}</a> - ${lastWeekGames[i].home_points}</td>
                        <td> ${moment(lastWeekGames[i].start_date).format('MM/DD/YYYY')}</td>
                        <td>${lastWeekGames[i].venue}</td>
                        </tr>`;
    }
    tableObject += `</tbody>
                   </table>`

    
    summaryPanel1.append(tableObject);

    let currentWeekGames = await getGames(currentWeek);
    if (currentWeek<16){
        console.log('currentWeek:' + currentWeek);
        //panel3-label set text
        tabLabel3.text(`Week ${currentWeek} Games`);
        // clear out the old table
        panel3TBody.html('');
        // append table body rows
        tableObject = ``;
       

        for (let i=0; i<currentWeekGames.length; i++ ){     
            tableObject+=`<tr>
                                <td><a href="#" class="school-link" data-school="${currentWeekGames[i].away_team}">${currentWeekGames[i].away_team}</a> @ <a href="#" class="school-link" data-school="${currentWeekGames[i].home_team}">${currentWeekGames[i].home_team}</a></td>
                                <td>${moment(currentWeekGames[i].start_date).format('MM/DD/YYYY')} </td>
                                <td>${moment(currentWeekGames[i].start_date).format('h A')}</td>
                                <td>${lastWeekGames[i].venue}</td>
                        </tr>`;
        }
        panel3TBody.append(tableObject);
    }


}

function populateAll(){
    populateStandings(confCode); 
    populateGames();

}

//initialization function to run on page load.
function init(){
    populateAll();
}
//page is loaded, so let's run our initial code
init();


// Date and time in the top right
let time = moment().format("MMM Do, YYYY, hh:mm:ss");
$("#timeDate").text(time);

let currentTime = setInterval(function () {
    let time = moment().format("MMM Do, YYYY, hh:mm:ss");
    $("#timeDate").text(time);
}, 1000)



let conferenceDropDownInput = document.getElementById('conferenceChoice')
let favoriteTeam = document.getElementById("teamName")
let favoriteTeamDropDown = document.getElementById('favoriteTeam')
let lastFavoriteTeam = localStorage.getItem("favoriteTeam");
let lastChosenConference = localStorage.getItem("lastChosenConference");

// Drop down box to be able to choose what conference you want to see


conferenceDropDownInput.addEventListener("change", function conferenceDropDown() {
    let dropDownResults = document.getElementById('conferenceChoice');
    let lastChosenConference = dropDownResults.options[dropDownResults.selectedIndex].value;
    
    console.log(lastChosenConference)
    localStorage.setItem("lastChosenConference", lastChosenConference)
    confCode = lastChosenConference;
    populateAll();
})

// Drop down box to be able to choose what your favorite team is

favoriteTeamDropDown.addEventListener("change", function favoriteTeamDropDown() {
    let favoriteTeamDropDownResults = document.getElementById('favoriteTeam');
    let favoriteTeamDropDown = favoriteTeamDropDownResults.options[favoriteTeamDropDownResults.selectedIndex].value;

    console.log(favoriteTeamDropDown)
    favoriteTeam.innerText = favoriteTeamDropDown
    localStorage.setItem("favoriteTeam", favoriteTeamDropDown) 
})

function renderLastRegistered() {
    favoriteTeam.textContent = lastFavoriteTeam
    favoriteTeamDropDown.value = lastFavoriteTeam
    
    conferenceDropDownInput.value = lastChosenConference
}

renderLastRegistered()
