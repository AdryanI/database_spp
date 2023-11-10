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
  function search() {
    var searchValue = document.getElementById('searchInput').value;

    // Kirim permintaan AJAX ke server dengan nilai pencarian
    fetch(`/search-create-data?query=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        // Perbarui tampilan dengan hasil pencarian
        if(data.length > 0){
          const firstRes = data[0];

          document.getElementById('nisn').value = firstResult.nisn;
          document.getElementById('nama').value = firstResult.nama;
          document.getElementById('id_kelas').value = firstResult.id_kelas;
          document.getElementById('nomor_telp').value = firstResult.nomor_telp;
          document.getElementById('id_spp').value = firstResult.id_spp;
        } else {
              // Jika tidak ada hasil pencarian, kosongkan nilai kolom input
              document.getElementById('nisn').value = '';
              document.getElementById('nama').value = '';
              document.getElementById('id_kelas').value = '';
              document.getElementById('nomor_telp').value = '';
              document.getElementById('id_spp').value = '';
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
    // Call fetchImages() to load the initial list of uploaded images
    fetchImages();
    