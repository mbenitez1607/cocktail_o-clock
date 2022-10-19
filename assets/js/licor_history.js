const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd3a3321bddmsh2a758ec37d68b6fp15937ejsndbbc83c19643',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
};
var cocktailTypeBody = document.querySelector(".cocktail-container");
var drinkImages = ["./assets/images/Ordinary_Drink.jpg", "./assets/images/Cocktail.jpg",
    "./assets/images/Shake.jpg", "./assets/images/Other.jpg", "./assets/images/Cocoa.jpg",
    "./assets/images/Shot.jpg", "./assets/images/Coffee.jpg", "./assets/images/Homemade.jpg",
    "./assets/images/Punch.jpg", "./assets/images/Beer.jpg", "./assets/images/Soft_drink.jpg"];

fetch('https://the-cocktail-db.p.rapidapi.com/popular.php', options)
.then(response => response.json())
.then(function (response) {

console.log(response)
var drink_type = [];

var topdrinks=response.drinks.slice(0,11)
// Iterate through drink types and display each in a card
for (var i = 0; i <topdrinks.length; i++) {
    drink_type[i] =topdrinks[i].strDrink;
    //console.log(drink_type[i]);
    // Create a div (column)
    var cocktailColumn = document.createElement("div");
    cocktailColumn.className = "col-sm-3 mb-4"
    // Create the container (card) for each cocktail category
    var cocktailCard = document.createElement("div");
    cocktailCard.className = "card";
    // Create the cocktail category image
    var cocktailImage = document.createElement("img");
    cocktailImage.src =topdrinks[i].strDrinkThumb;
    cocktailImage.setAttribute("alt", "Image of " + drink_type[i]);
    cocktailImage.className = "cocktail_type";
    // Create button to go to the category page
    var cocktailTypeButton = document.createElement("button");
    cocktailTypeButton.innerHTML = drink_type[i];
    cocktailTypeButton.setAttribute("href", "./Ordinary_Drink.html");
    cocktailTypeButton.className = "btn btn-secondary";
    cocktailTypeButton.setAttribute("id", i);
    //console.log("setAtribute id: " + cocktailTypeButton.id);
    // Append new elements to the main container
    if (i % 4 == 0) {
        var cocktailRow = document.createElement("div");
        cocktailRow.className = "row mx-0";
        cocktailTypeBody.appendChild(cocktailRow);
    }
    cocktailRow.appendChild(cocktailColumn);
    cocktailColumn.appendChild(cocktailCard);
    cocktailCard.appendChild(cocktailImage);
    cocktailCard.appendChild(cocktailTypeButton);

    // cocktailTypeButton.addEventListener("click", function () {
    //     cocktailTypeId = this.id; //PASS THE BUTTON ID
    //     // Delete all cards showing drink types
    //     resetContent();
    //     // Display new cards of selected type
    //     showDrinksofType();
    // });
} // End of drink+type loop

})

