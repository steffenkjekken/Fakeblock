

const API_BASE_URL = "https://nf-api.onrender.com";

const getAllPostsURL = `${API_BASE_URL}/api/v1/social/posts?_author=true&_comments=true&_reactions=true`;
const postPostURL = `${API_BASE_URL}/api/v1/social/posts/`;
/*export url when time */

const postForm = document.querySelector("form#postform");
let titleInput = document.getElementById("titleInput");
let bodyInput = document.getElementById("postInput");

async function postPost(url, data) {
    try {
        const accessToken = localStorage.getItem("accessToken");
        //console.log(accessToken);
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
        };
        console.log(url, data, options);
        // opp i api
        const response = await fetch(url, options);
        console.log(response);
        const answer = await response.json();
        if (response.status === 200) {
        console.log("bra");
        window.location = "homepage.html";
        getAllPosts(getAllPostsURL);
        }
        console.log(answer);
    } catch (error) {
        console.warn(error);
    }
    }

postForm.addEventListener("submit", () => {
    let title = titleInput.value.trim();
    let bodyValue = bodyInput.value.trim();

    const entry = {
        title: title,
        body: bodyValue,
      };
    postPost(getAllPostsURL, entry)
});
// const postForm = document.querySelector("form#postform");
// let titleInput = document.getElementById("titleInput");
// let bodyInput = document.getElementById("postInput");



// async function postPost(url, data) {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       //console.log(accessToken);
//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(data),
//       };
//       console.log(url, data, options);
//       // opp i api
//       const response = await fetch(url, options);
//       console.log(response);
//       const answer = await response.json();
//       if (response.status === 200) {
//         console.log("bra");
//         window.location = "../home-feed.html";
//         getAllPosts(getAllPostsURL);
//       }
//       console.log(answer);
//     } catch (error) {
//       console.warn(error);
//     }
//   }
// // async function submitPost (url) {
// //     let title = titleInput.value;
// //     let bodyValue = bodyInput.value;

// //     const entry = {
// //         title,
// //         body: bodyValue,
// //     };
// //     console.log(entry);

// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         const options = {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(entry)
// //         }
// //         await fetch (url, options); 
// //          console.log(response);
// //          //const json = await response.json();
// //          //console.log(json);
// //         document.location.reload();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// postForm.addEventListener("submit", () => {
//     if (bodyInput.value) {
//         submitPost(postPost);
//         bodyInput.value = "";
//     } else {
//         const errorMsg = document.querySelector("div#errorMsg");
//         errorMsg.innerHTML = "Title and Message must be filled out"
//     }
// });
// // const postForm = document.querySelector("form#postform");
// // console.log(postForm)

// // postForm.addEventListener("submit", function (e) {
// //     e.preventDefault;
// //     let body = document.getElementById("postInput").value;
// //     let title = "";
// //     console.log(body);
// //     const accessToken = localStorage.getItem('accessToken');
// //     console.log(accessToken);

// //     fetch("https://nf-api.onrender.com/api/v1/social/posts",{
// //         method: 'POST', 
// //         body: JSON.stringify({
// //             title:title,
// //             body: body,
// //         }),
// //         headers : {
// //             "Content-type": "application/json",
// //             Authorization: `Bearer ${accessToken}`,
// //         },
// //     })

// //     .then(function(response){
// //         return response.json();
// //     })
// // });