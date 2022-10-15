const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2166d63f3bmsha8b42c9fb49325dp19da12jsn773413f61e67',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

//DELCARE ALL VARIABLES
 var liqOption = "";
 var cocktailId = 0;
 var select = document.getElementById('floatingSelect'); 
 var choice = $('#floatingSelect').val(); 
const recipeContainer = document.querySelector(".recipe-container");
const modal = document.querySelector('#my-modal');
const modalHeader = document.querySelector('#my-modal-header');
const closeBtn = document.querySelector('.close');
var modalIngredients = document.querySelector('#ingredients');
var modalRecipe = document.querySelector('#recipe');
var modalIngredientsAndAmounts = document.querySelector('#amounts');
var shot = [] ; //VARIABLE FOR SHOT GLASS MEASUREMENT
var booze = []; //THE ALCOHOL OR LIQUID REQUIRED FOR RECIPE

 
//EVENT LISTENERS FOR CLOSING MODAL
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

//MODAL FUNCTION FOR DISPLAYING COCKTAIL RECIPES
function openModal() {
    modal.style.display = 'block';
  }  
  // CLOSE MODAL ON 'X' CLICK
  function closeModal() {
    modal.style.display = 'none';
  }  
  // CLOSE MODAL IF CLICKED ANYWHERE OUTSIDE
  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  }
 //USE LIQUOR SELECTED FROM DROPDOWN MENU WHICH IS THEN USED BY THE getCocktail() FUNCTION
 function liquorOption() {
    //CLEAR COCKTAILS FROM PREVIOUS SEARCH
    recipeContainer.textContent = '';
    
    option = select.options[select.selectedIndex];
    console.log("You picked: " + option.value); //THIS IS FOR DEBUG PURPOSES 
    liqOption = option.value;
    //ENSURES THAT A LIQUOR IS SELECTED
    if(liqOption != "Pick your booze"){  
       getCocktail();
    }
}

liquorOption();

//getCocktail() DETERMINES THE COCKTAIL ID WHICH IS PASSED TO getRecipe() IN ORDER TO RETRIEVE RECIPE AND INGREDIENTS
//THIS FUNCTION WAS TRICKY BECAUSE YOU NEED TO PARSE THE ENTIRE OBJECT RETURNED FROM THE API CALL TO EXTRACT THE VALUES YOU NEED
//YOU ALSO THEN NEED TO THEN PROPERLY FORMAT THE TEXT SINCE ITS NOT DONE FOR YOU 
function getRecipe() {
  fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + cocktailId, options)
    .then(response => response.json())
    .then(response => {
      console.log(response.drinks[0].strInstructions);
      console.log(response);
      //RECIPE AND INDREDIENTS WITH MEASUREMENTS THEN PLACED IN MODAL
      modalIngredients.textContent = "";
      modalRecipe.textContent = response.drinks[0].strInstructions;
      modalHeader.textContent = response.drinks[0].strDrink;
      var size = Object.keys(response.drinks[0]).length //THIS PROVIDES LENGTH OF OBJECT
      var objItems = Object.values(response.drinks[0]);
      //CLEAR ARRAYS FOR CLICKED RECIPE SO THAT NEXT CLICKED RECIPE STARTS FROM SCRATCH
      shot = [];
      booze = [];

      //THIS LOOP JUST CHECKS FOR AMOUNT OF EACH INGREDIENT 
      //CONSOLE LOGS LEFT FOR DEBUG
      for (var i = 0; i < size; i++) {
        console.log("Index: " + i + " " + objItems[i]);
        //INDEX SELECTION IS BASED ON WHERE ALCOHOL/LIQUID IS FOUND IN THE RETURNED OBJECT FROM API CALL
        if (i >= 17 && i < 31 && objItems[i] != null) {
          console.log("In FOR loop: " + objItems[i]); 
          booze.push(objItems[i]);
          console.log("booze var now has: " + booze);
        }
        //INDEX SELECTION IS BASED ON WHERE MEASUREMENTS ARE FOUND IN THE RETURNED OBJECT FROM API CALL
        if (i >= 32 && i < 47 && objItems[i] != null) {
          console.log("In FOR loop: " + objItems[i]);
          shot.push(objItems[i]);
          console.log("shot var now has: " + shot);
        }
      }

      console.log("booze array: " + booze + " and shot array: " + shot); //DEBUG PURPOSES 
      //THIS CREATES THE LIST OF INGREDIENTS ALONG WITH THEIR PROPORTIONS
      for (i = 0; i < booze.length; i++) {
        var ul = document.getElementById("ingredients");
        var li = document.createElement("li");
        li.setAttribute('id', "LIST");
        li.appendChild(document.createTextNode(shot[i] + " " + booze[i]));
        ul.appendChild(li);
      }
      openModal();
    })
    .catch(err => console.error(err));
}
//THIS FUNCTION RETRIEVES COCKTAIL NAME, ID, AND IMAGE. 
//THEN IT GENERATES A CARD FOR THE COCKTAIL WITH 'CLICK FOR RECIPE' BUTTON
//IT UPDATES cocktailId SO THAT THE CORRECT RECIPE IS USED
function getCocktail() {

fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i='+ liqOption, options)
	.then(response => response.json())
	.then(response => {

        for(i=0; i<10; i++){
        const pText = document.createTextNode(response.drinks[0].strDrink);
        cocktailId = response.drinks[i].idDrink;
        console.log(response.drinks[i].idDrink);
        const imgUrl = response.drinks[i].strDrinkThumb;
        const aWebsiteImage = document.createTextNode(imgUrl);

        const card = document.createElement("div");
        card.classList.add("card");
    
        const a = document.createElement("a");
        // a.setAttribute("href", '#');
    
        const category = document.createElement("div");
        category.classList.add("category");
        category.innerHTML = liqOption;
    
        const img = document.createElement("img");
        img.setAttribute("src", img);
    
        const title = document.createElement("h2");
        title.classList.add("title");
        title.innerHTML = response.drinks[i].strDrink;
        const description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = "Click for Recipe!";
        const btn = document.createElement("button");
        btn.setAttribute('id', response.drinks[i].idDrink);  
        console.log("New btn ID: " + btn.id);
        btn.innerHTML = "Click for recipe!";  

        recipeContainer.appendChild(card);    
        card.appendChild(a);
        a.appendChild(category);        
        a.appendChild(img);
        a.appendChild(title);
        a.appendChild(btn);        

         btn.addEventListener("click", function () {
             cocktailId = btn.id; //PASS THE BUTTON ID WHICH IS THE DRINK ID 
             getRecipe();
           });

        img.src = response.drinks[i].strDrinkThumb;              
    }}) 

	.catch(err => console.error(err));
} 


