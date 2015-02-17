// expectedList; expected list
// [expectedNote, expectedtime];
// noteList; sung list
// [sungNote, actualtime];

//search through the noteList to see if you find a note within
//a tolerance of the expected time



function evalNotes() {
	var score = 1; //maybe hash? so each note's given score.
	for(i=1; i<expectedList.length-4; i++) {
	var ranger = secondsPerBeat * 0.5; //tolerance range
	var upperTime = expectedList[i+4][1] + ranger;
	var lowerTime = expectedList[i+4][1] - ranger;
	var hitNote = false;
	var missedNotes = [];

		for(j=1; j<noteList.length; j++) {
			if(noteList[j][1] <= upperTime && noteList[j][1] >= lowerTime) {
				if(noteList[j][0]==expectedList[i+4][0]){
					console.log(noteList[j][1]);
					score += 1;
					hitNote = true;
					break;
				};
			};
		};
		if(hitNote==false) {
			console.log("Missed note:" + i); //make the missed note red show the missed notes
			$('#eval').append("<p><b>Missed note:</b> " + i +"</p>");

		};
	};
	console.log(score);
	$('#score').append(score);
};

//push the score up - button? call every 10 frame?