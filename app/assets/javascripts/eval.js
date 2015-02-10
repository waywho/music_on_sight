// timeList; expected list
// [expectedNote, expectedtime];
// noteList; sung list
// [sungNote, actualtime];

//search through the noteList to see if you find a note within
//a tolerance of the expected time

var score;

function evalNotes {
	for(i=0; i<noteList.length; i++) {
	var ranger = secondsPerBeat * 0.9 //tolerance range
	var upperTime = timeList[i+4][1] + ranger
	var lowerTime = timeList[i+4][1] - ranger

	if(noteList[i][1] <= upperTime && noteList[i][1] >= lowertime) {
		if(noteList[i][1]==timeList[i+4][1]){
			score += 1;
			noteList.slice(i)
			};
		};
	};

};
