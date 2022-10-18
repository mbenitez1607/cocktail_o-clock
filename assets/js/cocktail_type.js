const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'apiKey',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

// Uncomment section below when ready to avoid calling the API while developing
// Next line has temporary hardcoded values
var drink_type = ["Ordinary Drinks","Cocktails","Shaken","Other/Unknown","Cocoa",
                "Shots","Coffee / Tea","Homemade Liqueurs","Punches / Party Drinks",
                "Beer","Soft Drinks"];
var drinkImages = ["./assets/images/Ordinary_Drink.jpg","./assets/images/Cocktail.jpg",
"./assets/images/Shake.jpg","./assets/images/Other.jpg","./assets/images/Cocoa.jpg",
"./assets/images/Shot.jpg","./assets/images/Coffee.jpg","./assets/images/Homemade.jpg",
"./assets/images/Punch.jpg","./assets/images/Beer.jpg","./assets/images/Soft_drink.jpg"];
                /*
fetch('https://the-cocktail-db.p.rapidapi.com/list.php?c=list', options)
	.then(response => response.json())
	.then(function (response) {
        console.log(response.drinks.length);
        var drink_type = [];
        for (var i=0; i < response.drinks.length; i++) {
            drink_type[i] = response.drinks[i].strCategory;
            console.log(drink_type[i]);
        }
    })
	.catch(err => console.error(err));
*/

// Select area where cocktail types will be displayed
var cocktailTypeBody = document.querySelector(".cocktail-container");

for (i = 0; i < drink_type.length; i++) {
    var cocktailColumn = document.createElement("div");
    cocktailColumn.className = "col mb-4"
    // Create the container (card) for each cocktail category
    var cocktailCard = document.createElement("div");
    cocktailCard.className = "card";
    // Create the cocktail category image
    var cocktailImage = document.createElement("img");
    cocktailImage.src = drinkImages[i];
    cocktailImage.setAttribute("alt", "Image of " + drink_type[i]);
    cocktailImage.className = "cocktail_type";
    // Create button to go to the category page
    var cocktailTypeLink = document.createElement("button");
    cocktailTypeLink.textContent = drink_type[i];
    cocktailTypeLink.setAttribute("href", "./Ordinary_Drink.html");
    cocktailTypeLink.className = "btn btn-primary";
    // Append new elements to the main container
    if (i % 4 == 0) {
    var cocktailRow = document.createElement("div");
    cocktailRow.className = "row mx-0";
    cocktailTypeBody.appendChild(cocktailRow);
    }
    cocktailCard.appendChild(cocktailImage);
    cocktailCard.appendChild(cocktailTypeLink);
    cocktailColumn.appendChild(cocktailCard);
    cocktailRow.appendChild(cocktailColumn);   
}