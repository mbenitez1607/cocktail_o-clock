var searchbutton=document.querySelector("#random");
console.log (searchbutton)
//calling api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '32b54f1502msh5965281b406f0c0p135a94jsn9e95e476b5e9',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

// target som kind of div or p 
//${response.drinks[0].strInstructionsDE}

// id or class for that div or p 
// .textcontent  = variable

//added event listener to generate buttom
searchbutton.addEventListener("click", cocktail)

function cocktail() {
    fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
    .then(response => response.json())
	.then(response =>{
        // id = name 
        console.log(response)
            //linking api within html as an aray
            //api data as an element 
        document.getElementById('name-of-cocktail').textContent = response.drinks[0].strDrink
        document.getElementById('cocktail-image').setAttribute('src', response.drinks[0].strDrinkThumb); 
        document.getElementById('name-of-ingredients').textContent = `${response.drinks[0].strIngredient1}'${response.drinks[0].strIngredient2} ${response.drinks[0].strIngredient3} ${response.drinks[0].strIngredient4}${response.drinks[0].strIngredient5}`
        document.getElementById(`mesurments`).textContent = `${response.drinks[0].strMeasure1} ${response.drinks[0].strMeasure2}`
        document.getElementById('instruction').textContent = `${response.drinks[0].strInstructions}`


    })
	.catch(err => console.error(err));

}

//var nameOfCocktail= document.querySelector('#name-of-cocktail').textContent = response[0.strCreativeCommonsConfirmed]

