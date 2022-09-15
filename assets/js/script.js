var YoutubeApiKey = 'AIzaSyCm0R29hvXS6W3QJE9f71gZg7i_ybzQyyM';


// element variables
let standingsTable = $('#standings-table-body');

// temporary conference code
let confCode = "SEC";
// local end point for local testing
let localEndPoint = `http://127.0.0.1:3001/records?year=2022&conference=${confCode}`;
// proxy endpoint nodejs app at our heroku deployment
let remoteEndPoint = `https://forwarding-app-project-1.herokuapp.com/records?year=2022&conference=${confCode}`;


fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=collegefootball&type=video&key=${YoutubeApiKey}`)
.then(response => response.json())
.then(data => console.log(data))

//function to populate the standings based on the conference code.  
function populateStandings()
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

//initialization function to run on page load.
function init(){
    populateStandings(); 
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
})

