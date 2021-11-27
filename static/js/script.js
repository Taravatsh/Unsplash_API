// Assignment - Unsplash API

// Add event listener to the search button to query to Unsplash API.
const buttonSearch = document.getElementById("search-image");
buttonSearch.addEventListener('click', queryImage)
// Create a page variable to be able to make the url dynamic for loading more pictures.
var page = "1";

// Make an API call using Fetch.
function queryImage() {

    // Call the removeImage function to remove the grid from previous images and display new images.
    removeImages();

    // Assign the API key to a variable.
    let ACCESS_KEY = "XliLlMK35YTQrvVA74UYb5bqOGly1oKKCS-4G9ui2Lw";

    // Extract the value the user enters.
    let query = document.getElementById("search").value;

    // Define the url to make an API call.
    const url = "https://api.unsplash.com/search/photos/?client_id="+ACCESS_KEY+"&query="+query+"&per_page=20&page="+page;
    
    fetch(url)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayImages(data);

    });
}

// Loop through the returned Json response to get the images.
displayImages = (data) => {
    for(let i = 0;i < data.results.length;i++){

      // Create a div tag to hold the returned images.
      let image = document.createElement("div");
      // Give each element a class name "img".
      image.className = "img";
      image.style.backgroundImage = "url("+data.results[i].urls.regular+")";
      // Open a full image size when the image is clicked on.
      image.addEventListener("click", () => {
          window.open(data.results[i].urls.full);
      })
      // Append the images to the photo-grid id.
      document.getElementById("photo-grid").appendChild(image);
    }
}

// Add event listener to load images button for pagination.
const loadImages = document.getElementById("load-images");
loadImages.addEventListener('click', () => {
    page ++;
    queryImage();
});

// Assign the html page title and href to variables.
const title = window.document.title;
const url =  window.document.location.href;

// Select the share-dialog id and share class from index.html.
const shareButton = document.getElementById("share-dialog");
const resultPara = document.getElementsByClassName('share');

// Create a share dialog.
shareButton.addEventListener('click', () => {
    try {
          navigator.share({
             title:`${title}`,
             url: `${url}`
         }).then(() => {
            resultPara.textContent = 'Web Page shared successfully'
         })
        
    } catch(err) {
        resultPara.textContent = 'Error: Web Sharing is not Supported'
    }
})

// Clear the grid from images.
const grid = document.getElementById("photo-grid");
function removeImages() {

    grid.innerHTML =  "";
}

