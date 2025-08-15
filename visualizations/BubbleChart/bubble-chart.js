function Bubble(_name, _data) {
	// Variables 	
	this.color = color(
		random(0, 255), 
		random(0, 255), 
		random(0, 255), 
		150
	);
    this.direction = createVector(0, 0);
	this.position = createVector(0, 0);
	this.targetSize = this.size;
	this.id = getRandomID();
	this.name = _name;	
	this.data = _data; 
	this.size = 20;

	this.draw = function() {
		// Draws the bubbles
		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.size);

		// Change the direction based on the position
		this.position.add(this.direction);

		if(this.size < this.targetSize) {
			this.size += 1;
			
		} else if(this.size > this.targetSize) {
			this.size -= 1;
		}

		// Display the data wen the mouse is over a specific bubble		
		this.checkMouse(this.name);	 


		// Display the text to the canvas
		fill(245);
		noStroke();
		textSize(10);
		textFont('arial');
		textAlign(LEFT, BOTTOM);
		text(this.name, this.position.x - this.targetSize/5, this.position.y - this.targetSize/5, 50);

		// Draw the title of the visualization
		this.drawTitle();
	};

	this.setYear = function(_yearIndex) {
		var _productValue = this.data[_yearIndex];
		this.targetSize = map(_productValue, 0, 3536, 50, 200);
	};

	this.updateDirection = function(_bubbles) {
		this.direction = createVector(0, 0);

		for(var i = 0; i < _bubbles.length; i++) {
			if(_bubbles[i].id != this.id) {
				var bubbleVector = p5.Vector.sub(this.position, _bubbles[i].position);
				var bubbleDistance = bubbleVector.mag();

				if(bubbleDistance < this.size/2 + _bubbles[i].size/2) {
					if(bubbleDistance == 0) {
						this.direction.add(p5.Vector.random2D());
					} else {
						this.direction.add(bubbleVector);
					}
				}
			}
		}
		// Normalize function to make sure the bubble vector is equal to one
		this.direction.normalize();
	};

	/* The code below is my original work and not 
      part of code from the data-viz template */ 
	this.checkMouse = function(_name) {  
		const mouseOver = dist(
			this.position.x, this.position.y, 
			mouseX - width/2, mouseY - height/2
			) < 25;
		
		if(mouseOver) {
			// Draw the information box
			fill(34, 34, 60);
			rect(width/3.5 - 10, height/3.5, 210, 100, 20);	

			// Display the text to the canvas
			fill(245);
			noStroke();
			textSize(20);
			textAlign(CENTER);
			text(_name, width/3.5, height/3, 200);			
		} 
	};

	this.drawTitle = function() {
        const titleX = 0;
        const titleY = -height/2 + 15;        
        fill(245);
        textSize(25);
        noStroke();
        textAlign(CENTER, CENTER);
        text('Food consumption data 1974 - 2017', titleX, titleY);
    };
	// End of my original work 
}