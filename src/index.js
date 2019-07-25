API_URL = 'http://localhost:3000/profile'
//parent function that loads everything
function displayPage(){
    loadprofile()
    .then(data => createPageEl(data))
}
function loadprofile(){
    return fetch(API_URL)
    .then(res => res.json())
    .then(data => data)
}
function updatePostLikes(){
    return fetch(API_URL)
    .then(res => res)
}
function createPageEl(data){
    console.log(data)
    buildPortfolioHeader(data)
    data.post.forEach(post => buildPosts(post))
}

function buildPortfolioHeader(data){
    console.log(data.name)
    let headerH1 = document.getElementById('name')
    let headerImg = document.getElementById('avatar')
    headerH1.innerText = data.name
    headerImg.src = data.avatar
}
function buildPosts(post){
    console.log(post.content)
    let postDiv = document.createElement('div')
    postDiv.id = 'single-post-container'

    let postContent = document.createElement('h3')
    postContent.innerText = post.content
    
    //add event listener to make update
    let postlikeButton = document.createElement('button')
    postlikeButton.innerText = `Likes: ${post.likes}`
    postlikeButton.addEventListener('click',updatePostLikes)
    let portfolio = document.querySelector('section')
    portfolio.appendChild(postDiv)

    let postContainer = document.getElementById('single-post-container')
    
    postContainer.appendChild(postContent)
    postContainer.appendChild(postlikeButton)
   
    post.comments.forEach(comment => buildComments(comment))
}

function buildComments(comment){
    let commentDiv = document.createElement('div')
    commentDiv.id = 'comment-container'
    let commentContent = document.createElement('p')
    commentContent.innerText = comment.content
    //needs event listener 
    let commentLikes = document.createElement('button')
    commentLikes.innerHTML = `Likes: ${comment.likes}`
    let postContainer = document.getElementById('single-post-container')
    postContainer.appendChild(commentDiv)
    let commentContainer = document.getElementById('comment-container')
    commentContainer.appendChild(commentContent)
    commentContainer.appendChild(commentLikes)
}
function main(){
    displayPage()
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    main();
})