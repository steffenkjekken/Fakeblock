const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts"; // GET
/*export url when time */

const out = document.querySelector("div#container")
const postForm = document.querySelector("form#postform");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("postInput");
const submitBtn = document.getElementById("submitBtn")


const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
console.log(getAllPostsURL)


const listPosts = (posts, out) => {
    //console.log (posts);
    out.innerHTML = "";
    let newDivs = "";
    for (let object of posts) {
        //console.log(object);

        var removeIndex = posts.map(object => object.title).indexOf("");
        removeIndex && posts.splice(removeIndex, 1);
        
        newDivs += `
        <div class="card flex-row">
            <div class="card-body">
            <p class="card-text">${object.title} ${object.body}</p>
            <p class="card-text">${object.id}</p>
            </div>
        </div>`
        /* image code
            <div class="col-3 col-lg-2 p-3">
                <img src="${object.image}" 
                class="img-thumbnail float-start rounded-circle ratio-1x1"  alt="...">
            </div>
        */
    }
    out.innerHTML = newDivs;
}

let postCollection = [];

async function getAllPosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                'Access-Control-Allow-Headers': "*",
                 "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const posts = await response.json();
        console.log(posts);
        postCollection = posts;
        listPosts(posts, out)

    } catch(error) {
        console.warn(error);
    }
}

getAllPosts(getAllPostsURL);

async function postPost(url, data) {
    try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
        };
        console.log(url, data, options);
        const response = await fetch(url, options);
        console.log(response);
        const answer = await response.json();
        if (response.status === 200) {
            console.log("bra");
            window.location = "/homepage.html";
            getAllPosts(getAllPostsURL);
          }
          console.log(answer);
    } catch (error) {
        console.log(error);
    }
}

submitBtn.addEventListener("click", () => {
    let title = titleInput.value.trim();
    let bodyValue = bodyInput.value.trim();

    const entry = {
        title: title,
        body: bodyValue,
      };
    postPost(getAllPostsURL, entry)
});