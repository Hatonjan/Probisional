/* This code is part of the data-viz template. 
The data has been changed, and an information display  
has been added at the bottom of the visualization */

function AlcoholConsumptionByRace() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'US Alcohol Consumption: Race';

  // Each visualization must have a unique ID with no special
  // characters.
  this.id = 'alcohol-consumption-by-race';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      // './data/tech-diversity/race-2018.csv', 'csv', 'header',
      './data/alcoholConsumption/race_may2025.csv', 'csv', 'header',
      
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
      
    // Create a select DOM element.
    this.select = createSelect(); 
    // Set select position.
    this.select.position(400, 150); 

    for(var i = 1; i < this.data.getColumnCount(); i++) {
      // Fill the options with all company names.
      this.select.option(this.data.columns[i]);
      
      // Customize the drop down menu
      // Adapted from Stack Overflow answer by Paul Wheeler December-2-2021
      // https://stackoverflow.com/questions/70194514/how-to-customize-dropdown-in-p5-js
      this.select.style('background-color', '#333333');
      this.select.style('border-radius', '5px');
      this.select.style('color', 'gainsboro');  
      this.select.style('font-size', '20px');  
      this.select.style('padding', '0.5em');  
      this.select.style('width', '210px');
    }
    // End of the Customize the drop down menu
  };

    this.destroy = function() {
    this.select.remove();
  };

  // Create a new donut chart object.
  this.pie = new DonutChart(width/2, height/2, width*0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the consumption data we're interested in from the select item.
    var consumptionData = this.select.selected();

    // Get the column of raw data for consumptionData.
    var col = this.data.getColumn(consumptionData);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // color to use for each category.
    var colors = [
        "#87CEEB",  
        "#1E90FF", 
        "#2929B0", 
        "#800080", 
        "#8A2BE2"
    ];

    // Make a title.
    var title = 'US Alcohol Consumption May-2025';

    // Draw the pie chart!
    this.pie.draw(col, labels, colors, title);
    
    // display the information at the bottom of the chart
      fill(245);
      textAlign(CENTER, BOTTOM)
      text(consumptionInfoList[this.select.selected()], width/2, height - 20);

      // Draw the hole of the donut chart 
      noStroke();
      fill(backgroundColor);
      ellipse(width/2, height/2, 200);
  };
}
