$(document).ready(function () {
  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function fetchPageData(page) {
    return $.ajax({
      type: "GET",
      url: `https://perenual.com/api/species-list?key=sk-6qY766aabc2dc20ea6394&page=${page}`,
      beforeSend: function () {
        showLoader();
      }
    });
  }

  function loadPlantApi() {
    const totalPages = 337;
    let currentPage = 1;

    function processPage() {
      if (currentPage > totalPages) {
        hideLoader();
        return;
      }

      fetchPageData(currentPage)
        .done(function (response) {
          response.data.forEach((data) => {
            let imageUrl = data.default_image && data.default_image.small_url ? data.default_image.small_url : 'https://via.placeholder.com/150';
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
          currentPage++;
          processPage();
        })
        .fail(function (textStatus, errorThrown) {
          console.error("Error: " + textStatus, errorThrown);
          alert('Failed to load plant data: ' + errorThrown);
          hideLoader();
        });$(document).ready(function () {
  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function fetchPageData(page) {
    return $.ajax({
      type: "GET",
      url: `https://perenual.com/api/species-list?key=sk-MUcv66aba393b03a26392&page=${page}`,
      beforeSend: function () {
        showLoader();
      }
    });
  }

  function renderPlantData(data) {
    data.forEach((data) => {
      let imageUrl = data.default_image && data.default_image.small_url ? data.default_image.small_url : 'https://via.placeholder.com/150';
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
  }

  function loadPlantApi() {
    const totalPages = 337;
    let currentPage = 1;

    function processPage() {
      if (currentPage > totalPages) {
        hideLoader();
        return;
      }

      let cachedData = sessionStorage.getItem(`plantDataPage${currentPage}`);

      if (cachedData) {
        renderPlantData(JSON.parse(cachedData));
        currentPage++;
        processPage(); // Fetch the next page
      } else {
        fetchPageData(currentPage)
          .done(function (response) {
            sessionStorage.setItem(`plantDataPage${currentPage}`, JSON.stringify(response.data));
            renderPlantData(response.data);
            currentPage++;
            processPage(); // Fetch the next page
          })
          .fail(function (textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
            alert('Failed to load plant data: ' + errorThrown);
            hideLoader();
          });
      }
    }

    processPage(); // Start fetching pages
  }

  loadPlantApi();
});

    }

    processPage(); // Start fetching pages
  }

  loadPlantApi();
});
