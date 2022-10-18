var signInBtn = document.querySelector(".btn")
signInBtn.addEventListener("click", signIn)
logInValidity()


function logInValidity() {
    //check if local storage login is true
    var LoggedIn = localStorage.getItem("login")
    if (LoggedIn == "true") {
        //display homepage if user is logged in
        window.location.href = '/homepage.html';
    } else {
        //if local storage is false, user returns to login page
        return
    }
}

function signIn(event) {
    const forms = document.querySelectorAll('.needs-validation')
    let isValid = true;
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
            } else{
                event.preventDefault()
                var usernameInput = document.querySelector("#exampleFormControlTextarea1")
                var passwordInput = document.querySelector("#inputPassword3")
                localStorage.setItem("username", usernameInput.value)
                localStorage.setItem("password", passwordInput.value)
                localStorage.setItem("login", true)
                window.location.href = '/homepage.html';
            }
           
        }, false)
    })

}








