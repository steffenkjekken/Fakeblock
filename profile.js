const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const profileEndpoint = "/social/profiles/"; // GET
const profileDetails = "?_posts=true&_following=true&_followers=true"; // GET
const allPostsEndpoint = "/social/posts";


const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;

const user = localStorage.getItem('username');
var userName = document.querySelectorAll("#profilecard h2")[0]
console.log(userName);
userName.innerHTML = user;

const followCount = document.querySelector("li#following")
const followersCount = document.querySelector("li#followers")
const email = document.querySelector("li#email")
console.log(followCount)

const out = document.querySelector("div.myPosts")

out.innerHTML = "";
let userPosts = "";

const getProfileURL = `${API_BASE_URL}${profileEndpoint}${user}`;
const getProfileDetailsURL = `${API_BASE_URL}${profileEndpoint}${user}${profileDetails}`;
console.log(getProfileDetailsURL)

async function getProfile (url) {
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
        const profile = await response.json()
        console.log(profile)

        followCount.innerHTML = "<strong>Follows</strong> : " + profile.followers.length;
        followersCount.innerHTML = "<strong>Followers</strong> : " + profile.following.length;
        email.innerHTML = "<strong>Email</strong> : " + profile.email;
        
        const myPosts = profile.posts;
        listData(myPosts)

    } catch(error) {
        console.warn(error);
    }
};

getProfile(getProfileDetailsURL);

const listData = (profile) => {

    
    for (let post of profile) {

        let date = new Date(post.created);
        let formatedDate = date.toLocaleString("en-US", {
            dateStyle: 'medium',
            timeStyle: 'medium',
            hour12: false,
        });

        const editDelete = `<div class="dropdown d-flex justify-content-end pt-2">
        <button class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          Update
        </button>
        <div class="dropdown-menu" aria-labelledby="Edit">
          <a href="updatepost.html?id=${post.id}" class="btn btn-primary dropdown-item" id="updateBtn" data-update="${post.id}">Edit</a>
          <button class="dropdown-item" id="deleteBtn" data-delete="${post.id}">Delete</button>
        </div>
      </div>
      `
        console.log("Post: ", post);
    

    userPosts += `<div class="list-group-item list-group-item-action d-flex gap-3 py-3 bg-white">
                <div class="d-flex gap-2 w-100 p-3 justify-content-between">
                    <div>
                        <h5 class="mb-0">${post.title}</h6>
                        <p class="card-text lead py-2">${post.body}</p>
                    </div>
                    <div>
                    <small>${formatedDate}</small>
                    ${localStorage.getItem('username') === post.owner ? editDelete : ""}  
                    </div>       
                </div>
                </div>`;
    };

    out.innerHTML = userPosts;

    const deleteBtn = document.querySelectorAll("button#deleteBtn")

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-delete");
            deletePosts(getAllPostsURL + "/" + id)
        })
    });
};

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


