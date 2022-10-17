const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const allPostsEndpoint = "/social/posts"; // GET
const createPost = "/social/posts"; // POST
const author = "?_author=true"; // GET
const ascOrder = "sort=created&sortOrder=asc&";
const descOrder = "sort=created&sortOrder=desc&";
/*export url when time */

const outDiv = document.querySelector("div#container")
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("postInput");
const imgInput = document.getElementById("imageInput");
const submitBtn = document.getElementById("submitBtn")
const titleAlert = document.querySelector("#titleHelp")
const bodyAlert = document.querySelector("#bodyHelp")
const imgAlert = document.querySelector("#imgHelp")
const msg = document.querySelector("#errorMsg")

const username = localStorage.getItem("username");

const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
const createPostURL =`${API_BASE_URL}${createPost}`;
const sortByNewURL =`${API_BASE_URL}${allPostsEndpoint}${author}&${ascOrder}`;
const sortByOldURL =`${API_BASE_URL}${allPostsEndpoint}${author}&${descOrder}`;

//console.log(getAllPostsURL)


const listPosts = (posts, out) => {
    //console.log (posts);
    outDiv.innerHTML = "";
    let newDivs = "";
    for (let object of posts) {

        let date = new Date(object.created);
        let formatedDate = date.toLocaleString("en-US", {
            dateStyle: 'medium',
            timeStyle: 'medium',
            hour12: false,
        });
        //console.log(object);
        const editDelete = `<div class="dropdown d-flex justify-content-end">
        <button class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          Update
        </button>
        <div class="dropdown-menu" aria-labelledby="Edit">
          <a href="updatepost.html?id=${object.id}" class="btn btn-primary dropdown-item" id="updateBtn" data-update="${object.id}">Edit</a>
          <button class="dropdown-item" id="deleteBtn" data-delete="${object.id}">Delete</button>
        </div>
      </div>
      `
        
        newDivs += `
        <div class="card mb-3">
            <div class="card-header pt-3 bg-white d-flex justify-content-between">
                <h5 class="card-title">${object.title}</h5>
                <p class="card-text"><small class="text-muted">#${object.id}</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">${object.body}</p>
                <p class="card-text"><small>From: ${object.author.name}</small></p>
                <img src="${object.media}" class="card-img-top" alt="">
                <p class="small">${formatedDate}</p>
                <a href="singlepost.html?id=${object.id}" class="small">View post</a>
                ${username === object.author.name ? editDelete :""}
            </div>
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
            deletePosts(getAllPostsURL + "/" + id)
        })
    });

};

let allPosts = [];

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
        allPosts = posts;
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
        console.log(response.headers.get('Content-Type'));
        const answer = await response.json();
        console.log(answer);
    }
        catch (error) {
        console.log(error);
    }
};

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const bodyValue = bodyInput.value.trim();
    const imgValue = imgInput.value.trim();

    const entry = {
        title,
        body: bodyValue,
        media: imgValue,
    };
    console.log(entry);

    if (!title) {
        titleAlert.innerHTML = "<p>Title missing</p>";
        return false;
    }

    else {
        titleInput.value = "";
        bodyInput.value = "";
        imgInput.value = "";
        submitBtn.innerHTML = "Post succesfully created";
        submitBtn.setAttribute("disabled", true);
        setTimeout(window.location.reload.bind(window.location), 1500);
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
        console.log(response);
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

    const filtered = allPosts.filter((post)=>{
        const filteredAuthor = post.author.name.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;
        const filteredPost = post.title.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;
        const filteredBody = post.body.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;

        return filteredAuthor || filteredPost || filteredBody;
    })
    listPosts(filtered);
}

const listNew = document.querySelector("#newest");
const listOld = document.querySelector("#oldest");

listOld.addEventListener("click", () => {
    getAllPosts(sortByNewURL);
});

listNew.addEventListener("click", () => {
    getAllPosts(sortByOldURL);
});

