/*
Fetch Fundamentals
In this example we're going to get the top news stories from 
1. Select all stories and get stories button.
    - Add an event listener on the button that will load the stories
    (function for this cretaed below.)
2. Create a function that will load all of the story ids.
    - you'll use the fetch api on the top stories endpoint to do this.
    - Documentation for top stories api endpoint https://github.com/HackerNews/API#new-top-and-best-stories
3. Create a function that will fetch the story data using the id and
    display is on the page.
    - you'll use the fetch api on the items end point to do this.
    - Documentation for items api endpoint https://github.com/HackerNews/API#items
    - The HTML 
    <a href="URL HERE" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">TITLE HERE</h5>
        <small>STORY SCORE HERE</small>
        </div>
        <p class="mb-1">TIMESTAMP HERE </p>
        <small>AUTHOR HERE</small>
    </a>
4. Create a function that will convert the date into something readable
    rather than a timestamp.

*/

const BASE_URL = 'https://hacker-news.firebaseio.com'
let getStoriesButton = document.querySelector(".fetch-stories")
let allStories = document.querySelector(".hn-stories")

const loadTopstories = () => {
    const TOP_STORIES_URL = ` ${BASE_URL}/v0/topstories.json?print=pretty`
    fetch(TOP_STORIES_URL)
    .then((response) => {
        return response.json()
    }).then((storyIds)=> {
        console.log(storyIds)
        let topTenStoryIds = storyIds.splice(0,10)
        console.log("topTenStoryIds")
        console.log(topTenStoryIds)

        //loop through each item
        topTenStoryIds.map((storyId)=> {
            console.log(storyId)
            createStoryItem(storyId)
        })
    })
}

const createStoryItem = (id) => {
    const STORY_URL = `${BASE_URL}/v0/item/${id}.json?print=pretty`
    fetch(STORY_URL)
    .then((response) => {
        return response.json()
    }) .then((storyData) => {
        console.log("createStoryItem successful")
        console.log(storyData)
        allStories.innerHTML += `<a href="${storyData.url}" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${storyData.title}</h5>
        <small>${storyData.score}</small>
        </div>
        <p class="mb-1">${convertUnixTimeStamp(storyData.time)}</p>
        <small>${storyData.by}</small>
    </a>`
    })
}

const convertUnixTimeStamp = (timestamp) => {
    let date = new Date(timestamp * 1000)
    let options = {weekday: "long", year: "numeric", month: "long", day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

getStoriesButton.addEventListener("click", ()=> {
    loadTopstories()
})
