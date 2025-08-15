/* This code was written following the instructions from the 
video lecture from week 11 adapted to a constructor function */
function EatingBehavior() {
    // Name for the visualization to appear in the menu bar.
    this.name = 'Eating Behavior';

    // Each visualization must have a unique ID with no special
    // characters.
    this.id = 'eating-behavior';

    //  variables   
    var backgroundColor = 34;
    var data;
    var waffles = [];
    var waffle;

    this.preload = function() {
        // Loads the data 
        data = loadTable(
            "./data/foodConsumptionData/eatingBehavior.csv", 
            "csv", 
            "header");
    };

    this.setup = function() {
        // Arrays
        var days = [
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday",
            "Sunday"
        ];

        var values = [
            'Take-away', 
            'Cooked from fresh', 
            'Ready meal', 
            'Ate out',
            'Skipped meal', 
            'Left overs'
        ];

        // Object instantiation
        for(var i = 0; i < days.length; i++) {
            if(i< 4) {
                waffles.push(new Waffle(
                    20 + (i * 230), 100,     // Coordinates 
                    200, 200,                // waffle size
                    10, 10,                  // Number of boxes per axel
                    data, days[i], values)); // Data
            } else {
                waffles.push(new Waffle(
                    20 + ((i  -4) * 230), 350, // Coordinates
                    200, 200,                  // waffle size 
                    10, 10,                    // Number of boxes per axel 
                    data, days[i], values));   // Data
            }
        }
    };

    this.draw = function() {
        background(backgroundColor);
        // loop to draw the waffle charts  	
        for(var i = 0; i < waffles.length; i ++) {
            waffles[i].draw();
        }

        // Loop to display data when the mouse pointer is over 
        for(var i = 0; i < waffles.length; i++) {
            waffles[i].checkMouse(mouseX, mouseY);
        }
    };
}