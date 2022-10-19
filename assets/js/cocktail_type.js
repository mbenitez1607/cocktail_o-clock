// Declare parameters needed for API call
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd3a3321bddmsh2a758ec37d68b6fp15937ejsndbbc83c19643',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
};

// Global variable declarations
var drinkImages = ["./assets/images/Ordinary_Drink.jpg", "./assets/images/Cocktail.jpg",
    "./assets/images/Shake.jpg", "./assets/images/Other.jpg", "./assets/images/Cocoa.jpg",
    "./assets/images/Shot.jpg", "./assets/images/Coffee.jpg", "./assets/images/Homemade.jpg",
    "./assets/images/Punch.jpg", "./assets/images/Beer.jpg", "./assets/images/Soft_drink.jpg"];
var cocktailTypeId = 100;
// Select area (cocktail-container) where cocktail types will be displayed
var cocktailTypeBody = document.querySelector(".cocktail-container");

function getCocktailTypes() {
    // Set page title
    var cocktailTypeTitle = document.querySelector("#jumboTitle");
    cocktailTypeTitle.textContent = "Cocktail Recipes by Type ";

    // Call API to retrieve types of drinks
    fetch('https://the-cocktail-db.p.rapidapi.com/list.php?c=list', options)
        .then(response => response.json())
        .then(function (response) {
            //console.log(response.drinks.length);
            var drink_type = [];
            // Iterate through drink types and display each in a card
            for (var i = 0; i < response.drinks.length; i++) {
                drink_type[i] = response.drinks[i].strCategory;
                //console.log(drink_type[i]);
                // Create a div (column)
                var cocktailColumn = document.createElement("div");
                cocktailColumn.className = "col-sm-3 mb-4"
                // Create the container (card) for each cocktail category
                var cocktailCard = document.createElement("div");
                cocktailCard.className = "card";
                // Create the cocktail category image
                var cocktailImage = document.createElement("img");
                cocktailImage.src = drinkImages[i];
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

                cocktailTypeButton.addEventListener("click", function () {
                    cocktailTypeId = this.id; //PASS THE BUTTON ID
                    // Delete all cards showing drink types
                    resetContent();
                    // Display new cards of selected type
                    showDrinksofType();
                });
            } // End of drink+type loop

            // Display new cards of selected type
            function showDrinksofType() {
                //console.log("ID: " + cocktailTypeId);
                // Update page title
                var cocktailTypeTitle = document.querySelector("#jumboTitle");
                cocktailTypeTitle.textContent = "Cocktail Recipes of Type " + drink_type[cocktailTypeId];

                var buttonContainer = document.createElement("div");
                buttonContainer.className = "container-fluid";
                var backToTypes = document.createElement("button");
                backToTypes.textContent = "Back to Types of Cocktails";
                backToTypes.className = "btn, btn-secondary align-middle p-10";
                backToTypes.addEventListener("click", function () {
                    resetContent();
                    getCocktailTypes();
                });
                buttonContainer.appendChild(backToTypes);
                cocktailTypeBody.appendChild(buttonContainer);

                // Call API to retrieve drinks of the selected type
                fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?c=' + drink_type[cocktailTypeId], options)
                    .then(response => response.json())
                    .then(response => {
                        // Limit the drinks shown to 20 or available drinks. 
                        //This could be set to show all drinks but a carousel-like config 
                        // or various pages would be needed
                        if (response.drinks.length < 20) {
                            drinks = response.drinks.length;
                        } else {
                            drinks = 20;
                        }
                        for (var i = 0; i < drinks; i++) {
                            var cocktailColumn = document.createElement("div");
                            cocktailColumn.className = "col-sm-3 mb-4"
                            // Create the container (card) for each cocktail category
                            var cocktailCard = document.createElement("div");
                            cocktailCard.className = "card";
                            // Create the cocktail category image
                            var cocktailImage = document.createElement("img");
                            cocktailImage.src = response.drinks[i].strDrinkThumb;
                            cocktailImage.setAttribute("alt", "Image of " + response.drinks[i].strDrink);
                            cocktailImage.className = "cocktail_type";
                            // Create button to go to the category page
                            var cocktailTypeButton = document.createElement("button");
                            cocktailTypeButton.innerHTML = response.drinks[i].strDrink;
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

                        }
                    })
                    .catch(err => console.error(err));
            }
            function resetContent() {
                while (cocktailTypeBody.firstChild) {
                    cocktailTypeBody.removeChild(cocktailTypeBody.firstChild);
                }
            }
        }) // End of main fetch call (List cocktail categories / types)
        .catch(err => console.error(err));
}

// Display available cocktail types
getCocktailTypes();