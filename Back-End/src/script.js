// Client-side JavaScript code

// Fetch the list of uploaded images from the server
function fetchImages() {
    fetch('/getAllImages')
      .then(response => response.json())
      .then(images => {
        const imageContainers = document.querySelectorAll('#image-list'); // Get all image-list divs
  
        images.forEach((image, index) => {
          const img = document.createElement('img');
          img.src = `/imageGet?name=${image}`;
          img.alt = 'Uploaded Image';
  
          const imageList = imageContainers[index % imageContainers.length]; // Select the corresponding image-list div
  
          imageList.innerHTML = ''; // Clear existing content (if any)
          imageList.appendChild(img); // Append the image to the selected image-list div
        });
      })
      .catch(error => console.log(error));
  }
    // Call fetchImages() to load the initial list of uploaded images
    fetchImages();
    