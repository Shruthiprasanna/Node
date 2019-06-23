const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    PLAYING: Symbol("playing")
});
//multi-user friendly
export default class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput, level) {
        let sReply = "";

        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "Hi, Welcome to 'Mind Games'. \n Please follow the instructions carefully and type YES or NO only.\n You may need a pen and paper to help play this game. Ready? \n Type 'Yes' if you want to continue";
                this.stateCur = GameState.PLAYING;
                break;
            case GameState.PLAYING:
                if (sInput.toLowerCase().match("yes")){
                    if (level == 1) {
                        sReply = "Question 1 of 15.\nThink of a number between 1 and 10";
                    } 
                    else if (level == 2) {
                        sReply = "Question 2 of 15.\nMultiply the number by 9";
                    } 
                    else if (level == 3) {
                        sReply = "Question 3 of 15.\nAdd the digits of your result";
                    }
                    else if (level == 4) {
                        sReply = "Question 4 of 15.\nSubtract 5 from your new number";
                    }
                    else if (level == 5) {
                        sReply = "Question 5 of 15.\nFind the Alphabet that corresponds to your number, \n1 = A, 2 = B, 3 = C, 4 = D, 5 = E";
                    }
                    else if (level == 6) {
                        sReply = "Question 6 of 15.\nThink of a country that begins with your alphabet";
                    }
                    else if (level == 7) {
                        sReply = "Question 7 of 15.\nWrite down the name of that country";
                    }
                    else if (level == 8) {
                        sReply = "Question 8 of 15.\nThink of an animal beginning with the second letter of your country";
                    }
                    else if (level == 9) {
                        sReply = "Question 9 of 15.\nThink of the color of that animal";
                    }
                    else if (level == 10) {
                        sReply = "Question 10 of 15.\nWrite down the animal and its color";
                    }
                    else if (level == 11) {
                        sReply = "Question 11 of 15.\nThink of another animal, this time that begins with the last letter of your country";
                    }
                    else if (level == 12) {
                        sReply = "Question 12 of 15.\nThink of the color of this second animal";
                    }
                    else if (level == 13) {
                        sReply = "Question 13 of 15.\nWrite down the nanimal and its color";
                    }
                    else if (level == 14) {
                        sReply = "Question 14 of 15.\nFinally,think of a fruit that begins with the last letter of this second animal";
                    }
                    else if (level == 15) {
                        sReply = "Question 15 of 15.\nWrite down the fruit and the animal";
                    }
                    else {
                        sReply = "Denmark is an unlikely place to find gray elephants and orange kangaroos!";
                    }
                } 
                else if(sInput.toLowerCase().match("no")) {
                    sReply = "Sorry to see you leave the game";
                    this.stateCur = GameState.WELCOMING;
                } 
                else{
                    sReply = "Please type 'Yes' or 'No'";
                }
                break;
        }
        return ([sReply]);
    }
}
