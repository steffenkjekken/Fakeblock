const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const loginEndpoint = "/social/auth/login"; // POST
const allPostsEndpoint = "/social/posts"; // GET

const form = document.querySelector("form#loginForm");
const emailInput = document.querySelector("input#floatingInput")
const passwordInput = document.querySelector("input#floatingPassword")
const loginButton = document.querySelector("button#signIn");
const firstRegisterButton = document.querySelector("button#firstRegister");
const errorDiv = document.querySelector("div#errorMsg");
const formDiv = document.querySelector("div#passwordDiv")

//console.log (form, emailInput, passwordInput, loginButton, registerButton);

function changeId (){
    firstRegisterButton.id = "register";
}

function addInput (){
    let newInput = document.createElement("div");
    newInput.className = "form-floating mb-3 mt-3";
    newInput.innerHTML = `<input type="name" class="form-control" id="floatingName" placeholder="Name">
    <label for="floatingName">Name</label>`;
    formDiv.append(newInput);
}

firstRegisterButton.addEventListener("click", (e) => {
    e.preventDefault();
    addInput();
    console.log(e)
}, {once : true}
);

const registerButton = document.querySelector("button#register");

document.body.addEventListener("click", (event) => {
    if
    (event.target.id == 'register'){

    event.preventDefault();
    console.log("You've pressed submit...");
    const nameInput = document.querySelector("input#floatingName")

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
 
    /** 
     * Data to be passed to a function that can send it an API endpoint, 
     * or here to a simple funcion that writes it back to the page, 
     * if
    */ 
    const loginData = {
        name,
        email, // equivalent to writing: username: username
        password,
    }
    console.log(loginData);

    const registerUrl = `${API_BASE_URL}${registerEndpoint}`;
/**
 * 
 * @param {string} url 
 * @param {any} data 
 */
   async function registerUser (url, data) {
       console.log(url,data)
       try {
           const postData = {
               method: 'POST',
               headers: {
                   'Content-type': 'application/json',
               },
               body: JSON.stringify(data),
           };
           const response = await fetch (url, postData);
           console.log(response);
           const json = await response.json();
           console.log(json);

           if (response.status === 200){
            window.location.href = '/homepage.html'
        }
       }
       catch (error) {
           console.log(error);
       }
   }

registerUser(registerUrl, loginData);
}
}
);


loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("You've pressed submit...");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
 
    /** 
     * Data to be passed to a function that can send it an API endpoint, 
     * or here to a simple funcion that writes it back to the page, 
     * if
    */ 
    const loginData = {
        email, // equivalent to writing: username: username
        password,
    }
    console.log(loginData);

    const loginURL = `${API_BASE_URL}${loginEndpoint}`;

/**
 * Login an existing user and set access token in Local Storage
 * @param {string} url URL to API endpoint
 * @param {object} data Object with data for user to be logged in
 */
async function loginUser (url, data) {
    try {
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options);

        const resonse = await fetch(url, options); 
        console.log(resonse.status);
        const answer = await resonse.json();
        console.log(answer);

        localStorage.setItem('username', answer.name);
        localStorage.setItem('accessToken', answer.accessToken);

        if (resonse.status === 200){
            window.location.href = '/homepage.html'
        }

    } catch(error) {
        console.warn(error);
    }
}

loginUser(loginURL, loginData);

var validated = true; // Assume the best
var errorMessage = "";
if (!email) { 
    errorMessage += "<p>Email missing</p>";
    validated = false;
}

if (!password) { 
    errorMessage += "<p>Password missing</p>";
    validated = false;
}

if (!validated){
    errorDiv.innerHTML = errorMessage;
    errorDiv.style.color = 'red';
} 


else {
        writeData(loginData);

        sessionStorage.clear();
        form.reset();
        console.log ("Form submitted");

        errorDiv.innerHTML = "<span style='color: green'>Form submitted (not, really...)</span>";
        // form.submit(); // Comment out to prevent form from _actually_ being submitted
    }
}
);



emailInput.addEventListener('keyup', addToSessionStorage); 
passwordInput.addEventListener('keyup', addToSessionStorage);

function addToSessionStorage() {
    /** @todo secure the data a bit before setting Session Storage */
    //console.log(this.name, this.value);
    sessionStorage.setItem(this.name, this.value); 
}

function writeData (messageData) {
    console.log(messageData);
    const out = document.querySelector("div#outputFromFormHandler");
    console.log(out);
    const txt = `<div>
    <p>Email:<br>${messageData.email}</p>
    <p>Password:<br>${messageData.password}</p>
</div>`;
    out.innerHTML = txt;
}
