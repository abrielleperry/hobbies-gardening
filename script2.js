$(document).ready(function () {

  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function loadPlantApi(page) {
    $.ajax({
      type: "GET",
      url: `https://perenual.com/api/species-list?key=sk-MUcv66aba393b03a26392&page=${page}`,
      beforeSend: function () {
        showLoader();
      },
      success: function (response) {
        hideLoader();
        response.data.forEach((data) => {
          let imageUrl = data.default_image && data.default_image.small_url ? data.default_image.small_url : 'https://via.placeholder.com/150';
          console.log(imageUrl); 
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

        // Load next page if there are more pages
        if (page < 337) {
          loadPlantApi(page + 1);
        }
      },
      error: function (textStatus, errorThrown) {
        hideLoader();
        console.error("Error: " + textStatus, errorThrown);
        alert('Failed to load plant data: ' + errorThrown);
      }
    });
  }

  loadPlantApi(1); // Start loading from page 1
});
