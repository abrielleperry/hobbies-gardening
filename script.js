$(document).ready(function () {

  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function downloadJSON(data, filename) {
    let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  let allData = [];

  function loadPlantApi(page) {
    $.ajax({
      type: "GET",
      url: `https://perenual.com/api/species-list?key=sk-MUcv66aba393b03a26392&page=${page}`,
      beforeSend: function () {
        showLoader();
      },
      success: function (response) {
        hideLoader();
        allData = allData.concat(response.data);

        console.log(response);

        // Load next page if there are more pages
        if (page < 337) {
          loadPlantApi(page + 1);
        } else {
          // All pages have been loaded, enable the download button
          $("#download-button").prop('disabled', false);
        }
      },
      error: function (textStatus, errorThrown) {
        hideLoader();
        console.error("Error: " + textStatus, errorThrown);
        alert('Failed to load plant data: ' + errorThrown);
      }
    });
  }

  // Create a button for downloading the JSON file
  $("body").append('<button id="download-button" disabled>Download JSON</button>');

  // Attach event listener to the button
  $("#download-button").click(function() {
    downloadJSON(allData, 'plant_data.json');
  });

  loadPlantApi(1); // Start loading from page 1
});
