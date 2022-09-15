
// element variables
let standingsTable = $('#standings-table-body');
let tab1Title = $('#tab-1');
let tabsMenu = $('#example-tabs');
let tabsBox = $('#tabs-box');

// temporary conference code



//function to populate the standings based on the conference code.  
function populateStandings(confCode){
    if ((confCode == null)|| (confCode=='')){
        confCode = 'SEC'
    }
    // local end point for local testing
    let localEndPoint = `http://127.0.0.1:3001/records?year=2022&conference=${confCode}`;
    // proxy endpoint nodejs app at our heroku deployment
    let remoteEndPoint = `https://forwarding-app-project-1.herokuapp.com/records?year=2022&conference=${confCode}`;
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
                    <td data-school="${data[i].team}">${data[i].team}</td>
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




// function to populate last weeks' games
function populateGames(){
    //current week
    let currentWeek = whatWeek(moment().format('YYYY-MM-DD'));
    tab1Title.children().text(`week ${currentWeek-1} game results`);
    if (currentWeek<16){
        tabsMenu.append(`<li class="tabs-title" role="presentation" ><a href="#panel3" data-tabs-target="panel3" id="panel3-label" aria-controls="panel3" role="tab">Week ${currentWeek} Games</a></li>`);
        let tableObject = "";
        tableObject = `<div class="tabs-panel" id="panel3" role="tabpanel" aria-labelledby="panel3-label">
                            <table>
                            <thead>
                            <tr>
                                <th width="200">Matchup</th>
                                <th>Date</th>
                                <th width="150">Time</th>
                                <th width="150">?</th>
                            </tr>
                            </thead>
                            <tbody>`;
                        
                tableObject+=`<tr>
                                    <td>Content Goes Here</td>
                                    <td>This is </td>
                                    <td>Content Goes Here</td>
                                    <td>Content Goes Here</td>
                              </tr>`;
                            
            tableObject+=`  </tbody>
                            </table>
                        </div>`;
        tabsBox.append(tableObject);
    }


}


//initialization function to run on page load.
function init(){
    let confCode = localStorage.getItem("dropDownValue");
    populateStandings(confCode); 
    populateGames();
}
//page is loaded, so let's run our initial code
init();

// Date and time in the top right

let time = moment().format("MMM Do, YYYY, hh:mm:ss");
$("#timeDate").text(time);

// Drop down box to be able to choose what conference you want to see

let dropDownInput = document.getElementById('conferenceChoice')

dropDownInput.addEventListener("change", function dropDown() {
    let dropDownResults = document.getElementById('conferenceChoice');
    let dropDownValue = dropDownResults.options[dropDownResults.selectedIndex].value;

    console.log(dropDownValue)
    localStorage.setItem("dropDownValue", dropDownValue)
    populateStandings(dropDownValue);
})


