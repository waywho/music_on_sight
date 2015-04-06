// Global Variables for Drawing staff canvas for singing
var canvasWidth  = 685;
var canvasHeight = 150;

// draw the staff on canvas

function drawStaff () {
		ctx.beginPath();
		for(i = 40; i<= 88; i+=12){
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
		ctx.drawImage(img, 0, 35, w*0.25, h*0.25);
		ctx.font = "30px Georgia";
		ctx.fillText("4", w*0.25 + 1, 60);
		ctx.fillText("4", w*0.25 + 1, 80);
	};