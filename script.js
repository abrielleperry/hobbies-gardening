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
        let allData = response.data.map((data) => {
          return data;
        });

        // Display the data in JSON format
        $("#plant-container").append(`<pre>${JSON.stringify(allData, null, 2)}</pre>`);

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
