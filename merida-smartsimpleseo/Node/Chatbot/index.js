import express from 'express';
import bodyParser  from "body-parser";
import Game  from "./Game";

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = new Game();
        // instantiating the level as 0, when a new object of the game is created
        oGames[sFrom].Level = 0;
    }
    let sMessage = req.body.Body|| req.body.body;

    if (sMessage.toLowerCase().match("yes")){//if the answer is yes, I am incrementing the level by 1
        oGames[sFrom].Level++;
    }else if(sMessage.toLowerCase().match("no")){
        oGames[sFrom].Level = 0;//if the answer is no, it resets the game to start back from Welcoming state.
    }

    let aReply = oGames[sFrom].makeAMove(sMessage, oGames[sFrom].Level);
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");

});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));