const postContainer = document.querySelector(".post-container")
const loading = document.querySelector(".loader")
const filter = document.querySelector(".filter")

//globals 
let limit = 3;
let page = 1;


//fetch post from API
const getPosts = async () => {
    const reponse = await fetch(`https://jsonplaceholder.typicode.com/users/1/posts?_limit=${limit}`);

    const data = await reponse.json();

    return data;
}



//show posts in dom 
const showPosts = async () => {
    const posts = await getPosts();

    posts.forEach(post => {
        const postElement = document.createElement("div")
        postElement.classList.add("post")
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
               ${post.body}
            </p>
        </div>
        `;

        postContainer.appendChild(postElement)
    })
}



showPosts()