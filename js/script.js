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
const formDiv = document.querySelector("div#mailDiv")
const emailAlert = document.querySelector("#emailHelp")
const passwordAlert = document.querySelector("#passwordHelp")
const or = document.querySelector("#orLine")
const modal = document.querySelector("#exampleModal")

//console.log (form, emailInput, passwordInput, loginButton, registerButton);

function changeId (){
    firstRegisterButton.id = "register";
}

function addInput (){
    let newInput = document.createElement("div");
    newInput.className = "form mb-3 mt-3";
    newInput.innerHTML = `<label for="floatingName">Name</label>
    <input type="name" class="form-control" id="floatingName" placeholder="Name">`
    let nameHelp = document.createElement("small");
    nameHelp.innerHTML = `<p>We need name</p>`;
    Object.assign(nameHelp, {
        id: "nameHelp",
        class: "form-text text-alert",
        style: "color:red;"
    })
    newInput.appendChild(nameHelp);
    formDiv.prepend(newInput);
}

firstRegisterButton.addEventListener("click", (e) => {
    e.preventDefault();
    addInput();
    loginButton.remove();
    or.remove();
    console.log(e)
}, {once : true}
);

const nameAlert = document.querySelector("#nameHelp")
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

           if (response.status === 201){
            modal.style.display ="block";
            function Timer() {
                var counter = 5;
                var myTimer = setInterval(function() {
                  document.getElementById("modal-time").innerHTML = counter;
                  counter--;
                  if (counter < 0) {
                    clearInterval(myTimer);
                    window.location="index.html";
                  }
                }, 1000);
              }
              Timer();
           }
       }
       catch (error) {
           console.log(error);
       }
    }
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    registerUser(registerUrl, loginData);
    }
});


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
        console.log(answer.message);

        if (resonse.status === 200){
            localStorage.setItem('username', answer.name);
            localStorage.setItem('accessToken', answer.accessToken);
            window.location.href = '/homepage.html'
        }

        else if (answer.message === "Invalid email or password") {
            errorDiv.innerHTML = answer.message;
        }

    } catch(error) {
        console.warn(error);
    }
}
validateEmail(email);
validatePassword(password);
loginUser(loginURL, loginData);
});

emailInput.addEventListener('keyup', addToSessionStorage); 
passwordInput.addEventListener('keyup', addToSessionStorage);

function addToSessionStorage() {
    /** @todo secure the data a bit before setting Session Storage */
    console.log(this.name, this.value);
    sessionStorage.setItem(this.name, this.value); 
}

let validated = true;
let errorMessage = ""

function validateName(name) {
    if ( name.match(/^[a-zA-Z0-9_]+$/)) {
            nameHelp.innerHTML = "";
            validated = true
        } else {
            nameHelp.innerHTML = "<p>The name value must not contain punctuation symbols apart from underscore (_).</p>";
            validated = false
        }
        if (!name) { 
            nameHelp.innerHTML = "<p>Name missing</p>";
            validated = false;
    }
}

function validateEmail(email) {
    if ( email.match( /(noroff.no|stud.noroff.no)/ ) ) {
        emailAlert.innerHTML = "";
        validated = true
        } else {
        emailAlert.innerHTML = "<p>You need a noroff email to login</p>";
        validated = false
        }
        if (!email) { 
        emailAlert.innerHTML = "<p>Email missing</p>";
        validated = false;
    }
}

function validatePassword(password) {
    if ( password.match(/[a-zA-Z0-9]{8,}/) ) {
        passwordAlert.innerHTML = "";
        validated = true
        } else {
        passwordAlert.innerHTML = "<p>The password value must be at least 8 characters.</p>";
        validated = false
        }
        if (!password) { 
        passwordAlert.innerHTML = "<p>Password missing</p>";
        validated = false;
    }
}
