/* This code is part of the data-viz template file with minor additions*/

// Global variable to store the gallery object. The gallery object is
// a container for all the visualizations.
var backgroundColor = 34;
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  var c = createCanvas(1024, 576);
  c.parent('map');

  // Create a new gallery object.
  gallery = new Gallery(); 

  // Add the visualization objects here.
  gallery.addVisual(new AlcoholConsumptionByRace());
  gallery.addVisual(new EuropeDiversityGender());
  gallery.addVisual(new CarPriceByPetroConsumption());
  gallery.addVisual(new NutrientsTimeSeries());
  gallery.addVisual(new ClimateChange());

  /* The code below is my original work and not 
       part of code from the data-viz template */    
  gallery.addVisual(new EatingBehavior());
  gallery.addVisual(new Map());
  gallery.addVisual(new FoodData()); 

  // End my original work
}

function draw() {
  background(34);
  if(gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
  /* The code below is my original work and not 
      part of code from the data-viz template */ 
  else {
      // Display the home screen
      new HomeScreen(); 
      // End of my original work 
  }
}
