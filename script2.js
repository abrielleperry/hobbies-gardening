$(document).ready(function () {

  function showLoader() {
    $("#loader").show();
  }

  function hideLoader() {
    $("#loader").hide();
  }

  function loadPlantApi() {
    const cachedResponse = localStorage.getItem('plantApiResponse');
    const cacheExpiry = localStorage.getItem('plantApiCacheExpiry');

    if (cachedResponse && cacheExpiry && new Date().getTime() < cacheExpiry) {
      console.log('Using cached data');
      renderPlants(JSON.parse(cachedResponse));
    } else {
      console.log('Fetching data from API');
      fetchAllPages();
    }
  }

  async function fetchAllPages() {
    showLoader();
    let allPlants = [];
    let totalPages = 337;
    let apiKey = "sk-6qY766aabc2dc20ea6394";
    let baseUrl = `https://perenual.com/api/species-list?key=${apiKey}&page=`;

    try {
      for (let page = 1; page <= totalPages; page++) {
        let response = await $.ajax({
          type: "GET",
          url: baseUrl + page,
        });
        allPlants = allPlants.concat(response.data);
        console.log(`Fetched page ${page}`);
      }
      hideLoader();
      console.log('All pages fetched');
      localStorage.setItem('plantApiResponse', JSON.stringify({ data: allPlants }));
      // Set cache expiry to 24 hours
      localStorage.setItem('plantApiCacheExpiry', new Date().getTime() + (24 * 60 * 60 * 1000));
      renderPlants({ data: allPlants });
    } catch (error) {
      hideLoader();
      console.error("Error: ", error);
      alert('Failed to load plant data: ' + error);
    }
  }

  function renderPlants(response) {
    console.log('Rendering plants');
    $("#plant-container").empty();
    response.data.forEach((data) => {
      let imageUrl = data.default_image && data.default_image.medium_url ? data.default_image.small_url : 'images/japanese_maple.png';
      let otherNames = data.other_name.length > 0 ? data.other_name.join(', ') : 'N/A';
      let plantCard = `
      <div class="plant-card card m-2" style="width: 18rem;">
        <img src="${imageUrl}" alt="${data.common_name}" class="card-img-top">
        <div class="card-body">
          <h4 class="card-title">${data.common_name}</h4>
          <h6 class="card-subtitle text-body-secondary">Scientific name: ${data.scientific_name.join(', ')}</h6>
          <h6 class="card-subtitle text-body-secondary">Other names: ${otherNames}</h6>
        </div>
      </div>
      `;
      console.log('Appending plant card:', plantCard);
      $("#plant-container").append(plantCard);
    });
  }

  loadPlantApi();
});
