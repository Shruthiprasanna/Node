document.getElementById("compare").addEventListener("click",function(evt){
    evt.preventDefault();

    let sClientURL = document.getElementById("enterURL").value;
    let sCompetitor1URL= document.getElementById("enterCompetitor1URL").value || null;
    let sCompetitor2URL= document.getElementById("enterCompetitor2URL").value || null;
    let sKeyword = document.getElementById("enterKeyword").value || null;
    let sURL = "/compare/?clientURL=" + sClientURL + "&competitor1URL=" + sCompetitor1URL + "&competitor2URL=" + sCompetitor2URL +"&keyword=" + sKeyword;

    fetch(sURL)
    .then(function(response){
      //console.log("Response: " + response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

         return response.text();
        }        
      )
      .then(function(data) {
        
        var jsonResult = JSON.parse(data);
        this.CreateTableFromJSON(jsonResult);

        }
        )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

      console.log("Testing asynchrnous");
    
})


function CreateTableFromJSON(jsonData) {
 
  var resultTableHeaders = ["Page Elements", "Client's Page Results", "Competitor 1 Page Results" , "Competitor 2 Page Results" , "Average of Competitors Results"];
  var resultRowHeaders = ["Title", "H1 Tag", "H2 Tag", "H3 Tag", "H4 Tag", "H5 Tag", "H6 Tag", "ImgWithoutAltTagCount", "Link Tag", "Keywords in Meta Tag", "Bold Tag", "Italic Tag", "Keywords in Title Tag" ];
  var resultRowKeys = ["title", "h1Tag", "h2Tag", "h3Tag", "h4Tag", "h5Tag", "h6Tag", "altTag","linkTag", "keyword", "boldTag", "italicTag", "titleTag"  ];


  var table = document.createElement("table");


  var tr = table.insertRow(-1);                   

  for (var i = 0; i < resultTableHeaders.length; i++) {
      var th = document.createElement("th");      
      th.innerHTML = resultTableHeaders[i];
      tr.appendChild(th);
  }

  for (var i = 0; i < resultRowHeaders.length; i++) {

      tr = table.insertRow(-1);

      tr.insertCell(-1).innerHTML = resultRowHeaders[i];

      tr.insertCell(-1).innerHTML = jsonData.clientURLResult[ resultRowKeys[i] ];

      tr.insertCell(-1).innerHTML = jsonData.competitor1URLResult[ resultRowKeys[i] ];

      tr.insertCell(-1).innerHTML = jsonData.competitor2URLResult[ resultRowKeys[i] ];

      tr.insertCell(-1).innerHTML = jsonData.average [ resultRowKeys[i] ];

  }

  var divContainer = document.getElementById("results");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}




