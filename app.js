const postContainer = document.querySelector(".post-container")
const loading = document.querySelector(".loader")
const filter = document.querySelector(".filter")



let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
    const res = await fetch(
        `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();

    return data;
}



//show posts in dom 
const showPosts = async () => {
    const posts = await getPosts();
    console.log(limit, page)
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

//show loading bar
const showLoading = () => {
    loading.classList.add("show")


    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 2500);
}

//filter posts
const filterPosts = (event) => {
    const searchTerm = event.target.value
    const posts = document.querySelectorAll(".post")

    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase()

        if (title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
            post.style.display = "flex"
        } else {
            post.style.display = "none"
        }
    })
}


//show inital post
showPosts()



//listen for scroll height to show loader
window.addEventListener("scroll", () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }

})

filter.addEventListener("input", filterPosts)