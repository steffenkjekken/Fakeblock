const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts/"; // GET
const createPost = "/social/posts"; // POST
const author = "?_author=true"; // GET
/*export url when time */

const outDiv = document.querySelector("div#container")
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("postInput");
const submitBtn = document.getElementById("submitBtn")

const username = localStorage.getItem("username");

const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
const createPostURL =`${API_BASE_URL}${createPost}`;
//console.log(getAllPostsURL)


const listPosts = (posts, out) => {
    //console.log (posts);
    outDiv.innerHTML = "";
    let newDivs = "";
    for (let object of posts) {
        //console.log(object);

        var removeIndex = posts.map(object => object.title).indexOf("");
        removeIndex && posts.splice(removeIndex, 1);

        const editDelete = `<div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown link
        </button>
        <div class="dropdown-menu" aria-labelledby="Edit">
          <button class="dropdown-item" id="updateBtn" data-update="${object.id}">Update</a>
          <button class="dropdown-item" id="deleteBtn" data-delete="${object.id}">Delete</a>
        </div>
      </div>`
        
        newDivs += `
        <div class="card p-2 mt-1 d-flex position-relative">
            <p class="card-text">${object.title} ${object.body}</p>
            <p class="card-text">${object.id} ${object.author.name}</p>
            <img src="${object.media}" class="" alt="">
            ${username === object.author.name ? editDelete :""}
        </div>`
        /* image code
            <div class="col-3 col-lg-2 p-3">
                <img src="${object.image}" 
                class="img-thumbnail float-start rounded-circle ratio-1x1"  alt="...">
            </div>
        */
    }
    outDiv.innerHTML = newDivs;

    const deleteBtn = document.querySelectorAll("button#deleteBtn")

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-delete");
            deletePosts(getAllPostsURL + id)
        })
    });
};

let postCollection = [];

async function getAllPosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const options = {
            method: 'GET', 
            headers: {
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
        listPosts(posts, outDiv)

    } catch(error) {
        console.warn(error);
    }
};

getAllPosts(getAllPostsURL + author);

/*KAOS*/
async function postPost(url, entry) {

    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(entry),
      };
        const response = await fetch(url, postData);
        console.log(response);
        document.location.reload();
        const answer = await response.json();
        console.log(answer);
    }
        catch (error) {
        console.log(error);
    }
};

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const bodyValue = bodyInput.value;

    const entry = {
        title: title,
        body: bodyValue,
    };
    console.log(entry);

    if (titleInput.value && bodyInput.value) {
        titleInput.value = "";
        bodyInput.value = "";
    } else {
        const errorMsg = document.querySelector(".errorMsg");
    }

postPost(createPostURL, entry);
});

async function deletePosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        //console.log(accessToken)
        const options = {
            method: 'DELETE', 
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const posts = await response.json();
        console.log(posts);
        document.location.reload();

    } catch(error) {
        console.warn(error);
    }
};


const searchBar = document.querySelector("input#searchBar");
searchBar.addEventListener("keyup", filterPost);

function filterPost () {
    const filterQuery = searchBar.value;
    console.log(filterQuery);

    const filtered = postCollection.filter((post)=>{
        const filteredAuthor = post.author.name.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;
        const filteredPost = post.title.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;

        return filteredAuthor || filteredPost;
    })
    listPosts(filtered);
}
