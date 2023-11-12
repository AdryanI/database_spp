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

    function formatNumber(inputId) {
      const inputElement = document.getElementById(inputId);
  
      // Ambil nilai input
      let inputValue = inputElement.value;
  
      // Hapus karakter selain digit
      const numericValue = inputValue.replace(/\D/g, '');
  
      // Konversi menjadi angka dan format dengan tanda koma
      const formattedValue = Number(numericValue).toLocaleString();
  
      // Set nilai input dengan nilai yang sudah diformat
      inputElement.value = formattedValue;
  
      // Tampilkan pesan error jika nilai tidak valid
      if (isNaN(Number(numericValue))) {
          console.error('Error: Input bukan angka!');
      }
  }
  
  // Contoh penggunaan pada elemen input dengan ID 'myInput'
  document.getElementById('nominal').addEventListener('blur', function () {
      formatNumber('nominal');
  });
  
  
    