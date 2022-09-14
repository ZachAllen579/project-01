let confCode = "SEC";
var bearer = 'Bearer ' + 'oVX1IQTlkQCRtifH3Q9YFdibb72wmisO0wrp4tVgiQxgJMCRTGVEdkyWJSKPtj7I';
fetch('https://api.collegefootballdata.com/records?year=2022&conference=B12', {
  method: 'GET', //GET is the default.
  headers:{
    accept: 'application/json',
    Authorization: bearer
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
