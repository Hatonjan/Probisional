/* This code is part of the data-viz template file. Some 
modification has been made to adjust the visual appearance 
of the visualization, and the data has also been changed*/

function CarPriceByPetroConsumption() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'Car Price by Gasoline Consumption';

  // Each visualization must have a unique ID with no special
  // characters.
  this.id = 'car-price-by-gasoline-consumption';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;
  this.pad = 100;

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
  var self = this;
  this.data = loadTable(
    './data/autoData/autoFinalData.csv', 'csv', 'header',
    // Callback function to set the value
    // this.loaded to true. 
    function(table) {
      self.loaded = true;
    });

  };

  this.setup = function() {
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the axes.
    this.addAxes();

    // Get data from the table object.
    var price = this.data.getColumn('price');
    var horsepower = this.data.getColumn('L/100km-mean');
    var make = this.data.getColumn('make');

    // Set ranges for axes.
    // Use full 100% for x-axis (proportion of women in roles).     
    var priceMin = 10198;
    var priceMax = 45400;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    var kmPerLiterMin = 6.53;
    var kmPerLiterMax = 15.95;
    
    for (i = 0; i < this.data.getRowCount(); i++) {
          var xPos    = map(price[i], priceMin, priceMax, this.pad+dotSize/2, width - (this.pad + dotSize)); 
          var yPos    = map(horsepower[i], kmPerLiterMin, kmPerLiterMax, height - this.pad, this.pad);
          var b = map(price[i], priceMin, priceMax, 123, 255);
          var dotSize =  15;

      // Draw an ellipse for each point.
      /* The b variable as an argument in the fill() function, 
       give to every bubble a color based in the price value */
      fill(23, 64, b, 150); 
      stroke(150,150,150,150);
      ellipse(xPos, yPos, dotSize);
    
      /* The code below is my original work and not 
       part of code from the data-viz template */
      // Add a title to the canvas
      const title = 'Car Price By Gasoline Consumption Comparison'
      fill(245);
      stroke(50);
      textSize(25);
      textAlign(CENTER, CENTER);
      text(title, width/2, this.pad/2);

    // Creates the mouse hover effect and display the data
    this.checkMouse(xPos, yPos, dotSize, make, i);
    }
  };

  this.addAxes = function () {
    /* The code below is my original work and not 
       part of code from the data-viz template */
    const xGrid = (width - this.pad) / 10;
    const yGrid = (height - this.pad) / 10;
        
    // Draw horizontal and vertical grid lines 
    // to help with data interpretation 
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        stroke(50);

        //  Add vertical grid lines.
        line(
          this.pad + (xGrid * i), this.pad, 
          this.pad + (xGrid * i), height - 50 
        );

        // Add horizontal grid lines.
        line(
          this.pad, this.pad + (yGrid * j), 
          width - 100, this.pad + (yGrid * j)
        );

        // Car price 
        const carPrice = floor(45400 - (3911.1 * j));
        // Display the Car price
        fill(200);
        textSize(15);
        textAlign(RIGHT, BOTTOM);
        text('$' + carPrice, this.pad - 10, this.pad + (yGrid * j));
       
        // calculate the percentage gap
        const literPerKilometer = (6.50 + (1.2777 * i)).toFixed(2);
        // Display the percentage gap
        fill(200);
        textSize(15);
        textAlign(LEFT, TOP);
        text(literPerKilometer, this.pad + (xGrid * i), height - 40);
      }
    }
  };

  this.checkMouse = function(xPos, yPos, dotSize, make) {
    // Data Display 
    const mouseOver = dist(xPos, yPos, mouseX, mouseY) < dotSize - 10;
    const message = make[i];
    const messageWidth = textWidth(message);
    
    if(mouseOver) {
      push();
      // Draw the background of the data display 
      noStroke(); 
      fill(128,0,128, 50);   
      rect(mouseX - messageWidth/1.5, mouseY + 20, messageWidth + messageWidth/3, 30, 10);
      
      // Display the car make wen mouse is over the data point
      fill(245);
      textSize(25);
      textAlign(CENTER ,TOP);
      text(message, mouseX, mouseY + 20);

      // Creates a hover effect wen the mouse is over the data point
      fill(128,0,128); 
      stroke(23,65,123);
      strokeWeight(4);
      ellipse(xPos, yPos, dotSize+10);
      pop();
    }
  };
  // End of my original work
}
