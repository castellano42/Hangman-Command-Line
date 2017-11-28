var Word = require('./word');
var wordBank = ["Audi", "Ford", "Mustang", "Aston Martin", "Cadillac", "Mercedes Benz"];


function Game(){
 	this.wins = 0;
 	this.losses = 0;
 	this.lives = 10;
 	this.incorrectLetters = "";
 	this.word = null;

 	this.creatRandomWordObject = function(){
 		return new Word(wordBank[Math.floor(wordBank.length * Math.random())])
 	}

 	this.startNewGame = function(){
 		this.lives = 10;
 		this.incorrectLetters = "";
 		this.word = this.creatRandomWordObject()
 		console.log("\n---------------\nA new game is starting\n"); 
 	}

   this.userInputeSingleKey = function(key){
		// make sure incorrect letters and correct letters strings do not contain the current key entered by the user
		if(!this.hasIncorrectLetter(key) && !this.word.hasCorrectLetter(key)){
			// is the current key that the user pressed in the random word?
			if(this.word.hasKey(key)){
				// add this key to the correct letters string
				this.word.addCorrectLetter(key);
			} else {
				// make sure this key is no longer than 1 otherwise "shift" could get added to incorrect letters
				this.addIncorrectLetter(key);
				this.lives--;
			}
		}
		
		if(this.lives == 0){
			this.losses += 1; 
			console.log("you looser!!! get a real job!"); 
			this.startNewGame();
		} else {
			if(this.word.isCorrectLettersEqualToWord()){
				console.log("you win!!!!");
				this.wins += 1; 
				this.startNewGame();
			}
		}
		this.printOutGameStats(); 
 	}

 	this.getUserInput = function(){
 		process.stdout.write("enter letter> ");
		process.stdin.setEncoding('utf8');
		var that = this; 
		process.stdin.on('readable', function (key) {
        	var key = String(process.stdin.read());
        	if(key != null && key != "null") {
        		key = key.trim(); 
        		if(key.length > 1){
        			console.log("please enter only one character at a time"); 
        		} else {
        			that.userInputeSingleKey(key);
        		}
        	} 
        });
 	}

	this.addIncorrectLetter = function(letter){
		this.incorrectLetters += letter.toLowerCase(); 
	}

 	this.printOutGameStats = function(){
 		console.log("wins: "+this.wins + " losses: "+this.losses);
 		console.log(this.word.getDisplayableLetters());
 		console.log("Lives: " + this.lives);
 		console.log("Incorrect Letters: "+this.incorrectLetters);
 	}

 	this.hasIncorrectLetter = function(letter){
 		return this.incorrectLetters.indexOf(letter.toLowerCase()) != -1;
 	}


 	this.getUserInput(); 
 }

 module.exports = Game; 