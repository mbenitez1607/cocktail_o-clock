var logOutBtn = document.querySelector("#signOut")
//user clicks logout button
logOutBtn.addEventListener("click",signOutUser)
function signOutUser() {
    //clear e-mail and password and set is localStorage.setItem("login", false)
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.setItem("login", false)
    //redirect to login page
    window.location.href="./index.html"
}

var welcomeUser = document.querySelector(".welcomeUser")
welcomeUser.textContent = ("Welcome " + localStorage.getItem("email") + "!")


//Welcome user when they log in
// dynamically create a h1 tag and make text.content=localStorage.getItem("email")
//append to html


