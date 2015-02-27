// Global Variables for Drawing staff canvas for singing
var canvasWidth  = 685;
var canvasHeight = 250;

// draw the staff on canvas

function drawStaff () {
		ctx.beginPath();
		for(i = 70; i<= 150; i+=20){
			ctx.moveTo(0, i);
			ctx.fillStyle = "black";
			ctx.lineTo(canvasWidth, i);
			ctx.stroke();
		};
		ctx.closePath();
		var img = new Image();
		img.src = "/assets/treble.png";
		var h = img.height;
		var w = img.width;
		ctx.drawImage(img, 0, 60, w*0.4, h*0.4);
		ctx.font = "40px Georgia";
		ctx.fillText("4", w*0.4 + 1, 100);
		ctx.fillText("4", w*0.4 + 1, 140);
	};