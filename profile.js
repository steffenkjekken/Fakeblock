const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const profileEndpoint = "/social/profiles/"; // GET
const profileDetails = "?_posts=true&_following=true&_followers=true"; // GET

const user = localStorage.getItem('username');
var userName = document.querySelectorAll("#profilecard h2")[0]
console.log(userName);
userName.innerHTML = user;

const getProfileURL = `${API_BASE_URL}${profileEndpoint}${user}`;
const getProfileDetailsURL = `${API_BASE_URL}${profileEndpoint}${user}${profileDetails}`;
console.log(getProfileDetailsURL)

const listData = (posts) => {
    for (let object in posts) {
        console.log(object);
    }
    
}

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
        const posts = await response.json();
        console.log(posts);
        allPosts = posts;
        listData(posts)

    } catch(error) {
        console.warn(error);
    }
};

getProfile(getProfileDetailsURL);
