function Word(word){
	this.word = word;
	this.correctLetters = "";

	this.getDisplayableLetters = function(){
		var displayText = "";
			for(var i = 0; i < this.word.length; i++){
				if(this.correctLetters.indexOf(this.word.charAt(i).toLowerCase()) > -1){
				displayText += this.word.charAt(i);
			} else if(this.word.charAt(i) == " ") {
				displayText += " ";
			} else {
				displayText += "_";
			}
		}
		return displayText; 
	}

	this.addCorrectLetter = function(letter){
		this.correctLetters += letter.toLowerCase(); 
	}

	this.hasKey = function(letter){
		return this.word.toLowerCase().indexOf(letter.toLowerCase()) != -1;
	}

	this.hasCorrectLetter = function(letter){
		return this.correctLetters.indexOf(letter.toLowerCase()) != -1; 
	}

	this.isCorrectLettersEqualToWord = function(){
		return this.getDisplayableLetters() === this.word; 
	}
}


 module.exports = Word;