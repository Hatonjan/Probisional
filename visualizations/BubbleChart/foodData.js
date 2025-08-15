// var button;
function FoodData() {
    // Name for the visualization to appear in the menu bar.
    this.name = 'Food Data';

    // Each visualization must have a unique ID with no special
    // characters.
    this.id = 'food-data';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Variables
    var bubbles;
    var years;
    var data;

    this.preload = function() {
        var self = this;
        data = loadTable(
            "data/foodConsumptionData/foodData74-17.csv", 
            "csv", 
            "header",
            
        // Callback function to set the value
        // this.loaded to true.
        function (table) {
            self.loaded = true;
        });
    };

    this.setup = function() {
        // Initialize globals
        bubbles = [];
        years = [];

        // Iterates trough the data to get the year values
        for(var i = 5; i < data.getColumnCount(); i++) {
            var s = data.columns[i];
            years.push(s);

/*______________________________________________________________________________________ */            
            // this.button = createButton(s);
            // /* The code below is my original work and not 
            // part of code from the data-viz template */ 
            // this.button.position(375, 20 * i + 20);            
            // if(this.button.y < 560) {
            //     this.button.x + 40
            // } else {
            //     this.button.position(415, 20 * i - 420)
            // }
            // // End of my original work 

            // this.button.mousePressed(function() {
            //     var yearString = this.elt.innerHTML;
            //     var yearIndex = years.indexOf(yearString);

            //     for(var i = 0; i < bubbles.length; i++) {
            //         bubbles[i].setYear(yearIndex);
            //     }
            // });	
/*______________________________________________________________________________________ */            
        }

        // Iterates trough the data to get the food name values
        for(var i = 0; i < data.getRowCount(); i++) {
            var rowsData = data.getRow(i);
            var name  = rowsData.getString("L1");
            
            // Iterates trough the data to avoid getting empty value names
            if(name != "") {
                var yearsData = [];

                for(var j = 0; j < years.length; j++) { 
                    var productValue = Number(rowsData.get(years[j]));
                    yearsData.push(productValue);
                }

                // Creates the bubbles for the visualization
                var newBubble = new Bubble(name, yearsData);
                bubbles.push(newBubble);
                newBubble.setYear(0);
            }	
        }
    };

    this.destroy = function() {
        /* Stops the draw loop and removes any HTML elements 
        created by the sketch, including the canvas. */
        // this.button.remove();
    };

    this.draw = function() {
        background(backgroundColor);

        push();
        translate(width/2, height/2);
        for(var i = 0; i < bubbles.length; i++) {
            bubbles[i].updateDirection(bubbles);
            bubbles[i].draw();	
        }
        pop();
    };
}

function getRandomID() { //Assign a random ID to the bubbles
    var alpha = "abcdefghijklmnopqrstuvwxyz012345679"
    var str = "";
    
    for(var i = 0; i < 10; i++) {
        str += alpha[floor(random(0, alpha.length))];
    }
    return str;
}