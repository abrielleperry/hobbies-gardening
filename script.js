$(document).ready(function () {

  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function loadPlantApi() {
    $.ajax({
      type: "GET",
      url: "https://perenual.com/api/species-list?key=sk-6qY766aabc2dc20ea6394",
      beforeSend: function () {
        showLoader();
      },
      success: function (response) {
        hideLoader();
        response.data.forEach((data) => {
          let imageUrl = data.default_image && data.default_image.small_url ? data.default_image.small_url : 'https://via.placeholder.com/150';
          console.log(imageUrl); // Log the image URL to check if it's correctly assigned
          let otherNames = data.other_name.length > 0 ? data.other_name.join(', ') : 'N/A';
          let plantCard = `
          <div class="plant-card card m-2" style="width: 18rem;">
            <img src="${imageUrl}" alt="${data.common_name}" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">${data.common_name}</h4>
              <h5 class="card-subtitle text-body-secondary">Scientific name: ${data.scientific_name.join(', ')}</h5>
              <h6 class="card-subtitle text-body-secondary">Other names: ${otherNames}</h6>
            </div>
          </div>
          `;
          $("#plant-container").append(plantCard);
        });
        console.log(response);
      },
      error: function (textStatus, errorThrown) {
        hideLoader();
        console.error("Error: " + textStatus, errorThrown);
        alert('Failed to load plant data: ' + errorThrown);
      }
    });
  }

  loadPlantApi();
});
