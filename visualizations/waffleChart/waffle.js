/* This code was written following the instructions from the 
video lecture from week 11 adapted to a constructor function with minor 
modification to adjust the visual appearance of the visualization*/
function Waffle(
    x, y, waffleWidth, waffleHeight, boxesAcross, boxesDown, 
    table, columnHeading, possibleValues) {

    // Variables
    var x = x;
    var y = y;
    var waffleWidth = waffleWidth;
    var waffleHeight = waffleHeight;  
    var boxesAcross = boxesAcross
    var boxesDown = boxesDown;
    var column = table.getColumn(columnHeading);
    var possibleValues = possibleValues;

    var colors = [
        "#87CEEB",  
        "#1E90FF", 
        "#2929B0", 
        "#800080", 
        "#8A2BE2",
        "#C71585"
    ];
    
    var categories = [];
    var boxes = [];

    categoryLocation = function(categoryName) {
        // Iterates over the categories
        for(var i = 0; i < categories.length; i++) {
                if(categoryName == categories[i].name) {
                return i;
                }
        }
        return -1;
    };

    addCategories = function() {
        // Iterates over the possible values
        for(var i = 0; i < possibleValues.length; i ++) {
            categories.push({
                "name" : possibleValues[i],
                "count" : 0,
                "color" : colors[i % colors.length]
            });
        }

        // Iterate ove the columns from the data
        for(var i = 0; i < column.length; i ++) {
            var catLocation = categoryLocation(column[i])

            if(catLocation != -1) {
                categories[catLocation].count++;
            }
        }

        // Iterate over the categories and add proportions
        for(var i = 0; i < categories.length; i ++) {
            categories[i].boxes = round(
                (categories[i].count / column.length) * 
                (boxesDown * boxesAcross)
            );
        }
    };

    addBoxes =  function() { 
        var currentCategory = 0;
        var currentCategoryBox = 0;
        var boxWidth = waffleWidth / boxesAcross;
        var boxHeight = waffleHeight / boxesDown;

        // Draw the waffle boxes
        for(var i = 0; i < boxesDown; i++) {
            boxes.push([]);
            for(var j = 0; j < boxesAcross; j++) {
                if(currentCategoryBox == categories[currentCategory].boxes) {
                    currentCategoryBox = 0;
                    currentCategory++;
                }

                // Add the box object
                boxes[i].push(new Box(
                    x + (j * boxWidth), 
                    y + (i * boxHeight),
                    boxWidth, 
                    boxHeight, 
                    categories[currentCategory]
                ));
                currentCategoryBox++;
            }
        }
    };

    // Add the categories
    addCategories();
    // Add the Boxes
    addBoxes();

    this.draw = function() {
        // Draws the waffle charts
        for(var i = 0; i < boxes.length; i++) {
            for(var j = 0; j < boxes[i].length; j ++) {
                if(boxes[i][j].category != undefined) {
                    boxes[i][j].draw();
                }

                 /* The code below is my original work and not 
                    part of code from the data-viz template */ 
                // Display the title of the waffle chart 
                push();
                fill(220);
                noStroke()
                textSize(20);
                textAlign(CENTER, BOTTOM,);
                text(columnHeading, x + waffleWidth/2, y - 10);                
                pop();
                // End of my original work
            }
        }

        // Draw the legend
        this.waffleLegend();

        // Draw the title
        this.drawTitle();
    };
  
    this.checkMouse = function(mouseX, mouseY) {
        for(var i = 0; i < boxes.length; i++) {
            for(var j = 0; j < boxes[i].length; j++) {
                if(boxes[i][j].category  != undefined) {
                    var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                    if(mouseOver != false) {
                        var tWidth = textWidth(mouseOver);

                        push();
                        // Draw the background of the data display 
                        noStroke(); 
                        fill(34,34,60,180);  
                        rect(mouseX + 8, mouseY + 13, tWidth, 24, 5);
                
                        // Displays the box type wen the mouse is over the box
                        fill(225);
                        textSize(20);
                        textAlign(LEFT, TOP,);
                        text(mouseOver, mouseX + 15, mouseY + 15);
                        pop();
                        break;
                    }
                }
            }
        }
    };

     /* The code below is my original work and not 
      part of code from the data-viz template */ 
    this.waffleLegend = function() {

        push();
        fill(34, 34, 60, 150);
        rect(waffleWidth * 3.6, 
            (waffleHeight * 1.7), 
            waffleWidth*1.1, 
            waffleHeight* 1.1, 
            10
        );
        pop();

        // Draw the legend
        for(var i = 0; i < categories.length; i++) {
            // Box size
            var boxSize = waffleWidth*1.2 / boxesAcross ;

            // Draw the box
            fill(categories[i].color);
            rect(waffleWidth * 3.65, 
                (waffleHeight * 1.74) + (i * 35), 
                boxSize, 
                boxSize, 
                5
            );

            // Display the data type
            fill(200);
            noStroke();
            textSize(20); 
            textAlign(LEFT, BOTTOM);
            text(categories[i].name, 
                waffleWidth * 3.8, 
                (waffleHeight * 1.84) + (i*35)
            );
        }
    };

    this.drawTitle = function() {
        const titleX = width/2;
        const titleY = 35;  
        const title = 'Eating Behavior Base On The Week Day In The UK';  
        
        // Display the title of the visualization
        push();
        fill(245);
        noStroke();
        textSize(25);
        textAlign(CENTER, CENTER);
        text(title, titleX, titleY);
        pop();
    };
    // End of my original work
} 