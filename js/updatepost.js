const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
console.log(id)

const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const singlePostsEndpoint = '/social/posts/';
const author = "?_author=true"; // GET
const singlePostURL = `${API_BASE_URL}${singlePostsEndpoint}${id}`;

const titleInput = document.getElementById("titleInput")
const bodyInput = document.getElementById("bodyInput")
const updateBtn = document.getElementById("updateBtn")
const imgInput = document.getElementById("imageInput")



async function getSinglePost (url) {
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
        console.log(response);
        const post = await response.json();
        console.log(post);
        listPost(post)

        //titleInput.style.color = "red";

    } catch(error) {
        console.warn(error);
    }

};

getSinglePost(singlePostURL);


function listPost(post){
    titleInput.innerHTML = `${post.title}`;
    bodyInput.innerHTML = `${post.body}`;
    imgInput.innerHTML = `${post.media}`

}

const updateEndPoint = '/social/posts/'; 
const updateURL = `${API_BASE_URL}${updateEndPoint}`;


async function updatePost (id) {
    const updateIdURL = `${API_BASE_URL}${updateEndPoint}${id}`;
    const title = titleInput.value;
    const bodyValue = bodyInput.value;
    const imgValue = imgInput.value;
    
    const entry = {
        title: title,
        body: bodyValue,
        media: imgValue,
    };
    
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(entry),
      };
        const response = await fetch (updateIdURL, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        window.location = "homepage.html";
    } catch (error) {
        console.log(error);
    };
};

updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (titleInput.value && bodyInput.value && imgInput.value) {
        updatePost(id);    
    }
})


