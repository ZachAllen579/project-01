// element variables
let standingsTable = $('#standings-table-body');
let tab1Title = $('#tab-1');
let tabsMenu = $('#example-tabs');
let tabsBox = $('#tabs-box');
let summaryPanel1 = $('#panel1');
let summaryPanel3 = $('#panel3');
let tabLabel3 = $('#panel3-label');
let panel3TBody = $('#current-games-tbody');
let servicesURL = "https://forwarding-app-project-1.herokuapp.com";
let localservicesURL = "http://127.0.0.1:3001"
let teamDetailsTbody = $('#teamDetailsTbody')
// uncomment below to switch to local service
//servicesURL = localservicesURL;

let videoEls = [$('#video1'), $('#video2'), $('#video3'), $('#video4')];



let headlinesBox = $('#headlines-box');
let teamDetails = $('.teamDetails')
// dynamic page variables
let currentWeek = whatWeek(moment().format('YYYY-MM-DD'));
let confCode = localStorage.getItem("lastChosenConference");
    if ((confCode == null)|| (confCode=='')){
        confCode = 'SEC'
    }


 
function searchYoutube() {
    let conferenceLabel = whatConf(confCode)
    let queryString = conferenceLabel
    queryString += " week "+ (currentWeek-1) + " college football highlights"
    fetch(`${servicesURL}/yt/search?part=snippet&maxResults=4&q=${queryString}&type=video&videoSyndicated=true&videoEmbeddable=true`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
        let videosArray = data.items
        for (let i=0; i<videosArray.length; i++ ){
            console.log(`https://www.youtube.com/watch?v=${videosArray[i].id.videoId}`)
            videoEls[i].attr("src", `https://www.youtube.com/embed/${videosArray[i].id.videoId}`)
        }
      })
}






//function to populate the standings based on the conference code.  
function populateStandings(currentConfCode){
   
    // proxy endpoint nodejs app at our heroku deployment
    let remoteEndPoint = `${servicesURL}/cfd/records?year=2022&conference=${currentConfCode}`;
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
                    <td class="team-text"><a href="#" class="school-link" data-school="${data[i].team}">${data[i].team}</a></td>
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
    if ((date>'2022-08-04')&&(date<='2022-09-04')){
        // week 1 August 5 - September 5
        weekNum = 1;
    } else if ((date>='2022-09-05')&&(date<='2022-09-11')){
    // week 2 September 6 - 12
        weekNum = 2;
    } else if ((date>='2022-09-12')&&(date<='2022-09-18')){
    // week 3 September 13 - 19
        weekNum = 3;
    } else if ((date>='2022-09-19')&&(date<='2022-09-25')){
    // week 4 September 20 - 26
        weekNum = 4;
    } else if ((date>='2022-09-26')&&(date<='2022-10-02')){
    // week 5 September 27 - October 3
        weekNum = 5;
    } else if ((date>='2022-10-03')&&(date<='2022-10-09')){
    // week 6 October 4 - 10
        weekNum = 6;
    } else if ((date>='2022-10-10')&&(date<='2022-10-16')){
    // week 7 October 11 - 17
        weekNum = 7;
    } else if ((date>='2022-10-17')&&(date<='2022-10-23')){
    // week 8 October 18 - 24
        weekNum = 8;
    } else if ((date>='2022-10-23')&&(date<='2022-10-30')){
    // week 9 October 25 - 31
        weekNum = 9;
    } else if ((date>='2022-10-31')&&(date<='2022-11-06')){
    // week 10 November 1 - 7
        weekNum = 10;
    } else if ((date>='2022-11-07')&&(date<='2022-11-13')){
    // week 11 November 8 - 14
        weekNum = 11;
    } else if ((date>='2022-11-14')&&(date<='2022-11-20')){
    // week 12 November 15 - 21
        weekNum = 12;
    } else if ((date>='2022-11-21')&&(date<='2022-11-27')){
    // week 13 November 22 - 28
        weekNum = 13;
    } else if ((date>='2022-11-28')&&(date<='2022-12-04')){
    // week 14 November 29 - December 5
        weekNum = 14;
    } else if (date>'2022-12-04'){
    // week 15 December 6 - 10
        weekNum = 15;
    // week 16 Dec 11 - Jan 10
    }

    return weekNum;
}

//function to return beginning week date
function whatBeginningDate(weekNum){
    //date should be YYYY-MM-DD format.
    let dateString = '';


    switch(weekNum){
        case 1:
            dateString = '2022-08-05';
            break;
        case 2:
            dateString = '2022-09-06';
            break;
        case 3:
            dateString = '2022-09-13';
            break;
        case 4:
            dateString = '2022-09-20';
            break;
        case 5:
            dateString = '2022-09-27';
            break;
        case 6:
            dateString = '2022-10-04';
            break;
        case 7:
            dateString = '2022-10-11';
            break;
        case 8:
            dateString = '2022-10-18';
            break;
        case 9:
            dateString = '2022-10-24';
            break;
        case 10:
            dateString = '2022-11-01';
            break;
        case 11:
            dateString = '2022-11-08';
            break;
        case 12:
            dateString = '2022-11-15';
            break;
        case 13:
            dateString = '2022-11-22';
            break;
        case 14:
            dateString = '2022-11-29';
            break;
        case 15:
            dateString = '2022-12-05';
            break;
       
        default:
            dateString = '2022-12-12';
    }
    

    return dateString;
}

//function to return the conference code string for searching in APIs
function whatConf(code){
    let tempConfString = "";
    
    if (code==='B12'){
        tempConfString="Big 12";
    } else if (code==='B1G'){
        tempConfString="Big Ten";
    } else if (code==='SEC'){
        tempConfString="SEC";
    } else if (code ==='CUSA'){
        tempConfString="Conference USA";
    } else if (code ==='IND'){
        tempConfString = "FBS";
    } else if (code ==='MAC'){
        tempConfString = "Mid-American";
    } else if (code === 'MWC'){
        tempConfString = "Mountain West";
    } else if (code === 'SBC'){
        tempConfString = "Sun Belt";
    } else if (code === 'PAC'){
        tempConfString = "Pac 12";
    }

    return tempConfString;
}


//function to get the previous weeks games and optionally the next weeks games
function getGames(week){
    let remoteEndPoint = `${servicesURL}/cfd/games?year=2022&week=${week}&seasonType=regular&conference=${confCode}`;
    return fetch(remoteEndPoint)
    .then(function (response) {
         return response.json();
       
    })
        
      
}

async function populateHeadlines(){
    
   
    let fromDate = moment(whatBeginningDate(currentWeek)).subtract(2, 'days').format('YYYY-MM-DD');
    let currentConfString = whatConf(confCode);
    let remoteEndPoint = `${servicesURL}/news/everything?q=${encodeURIComponent(currentConfString)}%20week%20${currentWeek-1}%20College%20Football&from=${fromDate}&pageSize=4`
    headlinesBox.children('h3').text(`Week ${currentWeek-1} Headlines`);
    fetch(remoteEndPoint)
    .then(function (response) {
         return response.json();
    })
    .then(function(data){
        console.log(remoteEndPoint);
        console.log(data);
        let articles = data.articles;
        headlinesBox.children('div').remove();
        for (let i=0; i< articles.length; i++){
            let divObj = ``;
            divObj += `<div class="medium-3 cell custom-article-box align-middle">
                            <a href="${articles[i].url}" target="_blank">
                            <div class="" id="article-div-box">
                                <img src="${articles[i].urlToImage}" />
                            </div>
                            <h4 class="small">${articles[i].title}</h4>
                            <article>
                            ${articles[i].description}
                            </article>
                            </a>
                        </div>`;
            headlinesBox.append(divObj);
        }
       
        
    });
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
                        <td class="matchup-text"><a href="#" class="school-link" data-school="${lastWeekGames[i].away_team}">${lastWeekGames[i].away_team}</a> - ${lastWeekGames[i].away_points} <br/>@ <a href="#" class="school-link" data-school="${lastWeekGames[i].home_team}">${lastWeekGames[i].home_team}</a> - ${lastWeekGames[i].home_points}</td>
                        <td class="date-text"> ${moment(lastWeekGames[i].start_date).format('MM/DD')}</td>
                        <td class="venue-text">${lastWeekGames[i].venue}</td>
                        </tr>`;
    }
    tableObject += `</tbody>
                   </table>`

    
    summaryPanel1.append(tableObject);

    let currentWeekGames = await getGames(currentWeek);
    if (currentWeek<16){
        console.log('currentWeek:' + currentWeek);
        console.log(confCode);
        //panel3-label set text
        tabLabel3.text(`Week ${currentWeek} Games`);
        // clear out the old table
        panel3TBody.html('');
        // append table body rows
        tableObject = ``;
       
        console.log(currentWeekGames);
        for (let i=0; i<currentWeekGames.length; i++ ){     
            console.log(i);
            tableObject+=`<tr>
                                <td class="matchup-text"><a href="#" class="school-link" data-school="${currentWeekGames[i].away_team}">${currentWeekGames[i].away_team}</a> <br/>@ <a href="#" class="school-link" data-school="${currentWeekGames[i].home_team}">${currentWeekGames[i].home_team}</a></td>
                                <td class="date-text">${moment(currentWeekGames[i].start_date).format('MM/DD')} </td>
                                <td class="date-text">${moment(currentWeekGames[i].start_date).format('h A')}</td>
                                <td class="venue-text">${currentWeekGames[i].venue}</td>
                        </tr>`;
        }
        panel3TBody.append(tableObject);
    }


}

function populateAll(){
    populateStandings(confCode); 
    populateGames();
    populateHeadlines();
    searchYoutube();
    populateTeamDetails("");
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




// Drop down box to be able to choose what conference you want to see

let conferenceDropDownInput = document.getElementById('conferenceChoice')
let lastChosenConference = localStorage.getItem("lastChosenConference");

conferenceDropDownInput.addEventListener("change", function conferenceDropDown() {
    let dropDownResults = document.getElementById('conferenceChoice');
    let lastChosenConference = dropDownResults.options[dropDownResults.selectedIndex].value;
    youtubeSearch = lastChosenConference + "college football highlights"


    console.log(lastChosenConference)
    localStorage.setItem("lastChosenConference", lastChosenConference)
    confCode = lastChosenConference;
    populateAll();
})

function renderLastRegistered() {    
    conferenceDropDownInput.value = lastChosenConference
}

renderLastRegistered()


let summaryBox = $('#tabs-box')

summaryBox.on('click', handleTeamClick)

function handleTeamClick(event) {

    let element = event.target;
    let schoolString = ""

    if (element.matches("a") === true) {
        let jqueryElement = $(event.target)
        schoolString = jqueryElement.attr('data-school')
        populateTeamDetails(schoolString)
    }
    return false
}
    function populateTeamDetails(schoolString) {
    if ((schoolString === "") || (schoolString === null)) {
        schoolString = "Alabama"
    }
    encodeURIComponent
    $('#teamName').text(schoolString)
    console.log(encodeURIComponent("Texas A&M"));
    let apiUrl = `${servicesURL}/cfd/games?year=2022&seasonType=regular&team=${encodeURIComponent(schoolString)}`
    teamDetailsTbody.html("");
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (let i=0; i<data.length; i++){
            teamDetailsTbody.append(`
                
                <tr>
                    <td>Week ${data[i].week} : ${data[i].away_team} @ ${data[i].home_team}</td>
                </tr>
            
            `)
        }
    });
}

