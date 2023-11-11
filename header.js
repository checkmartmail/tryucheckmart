    const openSidebarButton = document.getElementById('open_sidebar');
    const sidebarBackground = document.getElementById('sidebar_background');
    const closeSidebarButton = document.getElementById('close_sidebar');
    const sidebar = document.getElementById('sidebar');

    openSidebarButton.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent the click event from reaching the document
      sidebar.classList.add('show')
      sidebarBackground.classList.add('opened_sidebar_background');



    });


    closeSidebarButton.addEventListener('click', function() {
      sidebar.classList.remove('show');
      //option_palal.classList.remove('opened_option_panal')
      sidebarBackground.classList.remove('opened_sidebar_background');

    });

    // Add an event listener to the document to close the sidebar when clicking anywhere outside
    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target)) {
        sidebar.classList.remove('show');
        //option_palal.classList.remove('opened_option_panal')

        sidebarBackground.classList.remove('opened_sidebar_background');

      }
    });






    var searchflag = "closed";

    function searchactive() {
      document.querySelector(".form_container").classList.add("form_container_active");
      document.querySelector(".searchform").classList.add("searchform_active");
      document.querySelector(".srcinp").classList.add("srcinp_active");
      document.querySelector(".srcbtn").classList.add("srcbtn_active");
      searchflag = "opened";

    }

    function search_deactive() {
      document.querySelector(".form_container").classList.remove("form_container_active");
      document.querySelector(".searchform").classList.remove("searchform_active");
      document.querySelector(".srcinp").classList.remove("srcinp_active");
      document.querySelector(".srcbtn").classList.remove("srcbtn_active");
      searchflag = "closed";
      //document.querySelector(".results").innerHTML = "";
      document.querySelector(".results").style.display = "none";

    }





    function handleClick(event) {
      if (!event.target.classList.contains('srcinp')) {
        // The click occurred outside the "srcinp" element
        if (searchflag === "opened") {

          search_deactive();
        }


      }
    }

    // Add a click event listener to the entire document
    document.addEventListener('click', handleClick);









    const jsonUrl = 'products.json'; // Replace with your JSON source URL


    let jsonData = null;

    // Fetch JSON data from the specified URL
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        jsonData = data;
      }).catch(error => {
        //console.error('Error fetching JSON data:', error);
      });



    const searchInput = document.querySelector('.srcinp');
    const resultsDiv = document.querySelector('.results');

    // Event listener for input changes
    searchInput.addEventListener('input', function() {
      searchactive();
      const query = searchInput.value.toLowerCase().trim();
      if (query === '') {
        resultsDiv.style.display = 'none'; // Hide the results when input is empty
      } else {
        resultsDiv.style.display = 'block'; // Show the results when there's input
        const searchResults = searchJSONData(jsonData, query);
        displayResults(searchResults);
      }
    });

    // Event listener for form submission (search button click or Enter key)
    document.querySelector('.searchform').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      const query = searchInput.value.toLowerCase().trim();
      if (query !== '') {
        resultsDiv.style.display = 'block'; // Show the results on submission
        const searchResults = searchJSONData(jsonData, query);
        displayResults(searchResults);
      }
    });




    // Function to search JSON data based on the query and calculate relevance
    function searchJSONData(data, query) {
      if (!data || !query) {
        return []; // No data or query, return an empty array
      }

      const results = Object.entries(data)
        .map(([key, product]) => ({ key, product, relevance: calculateRelevance(product.name, query) }))
        .filter(({ relevance }) => relevance > 0) // Filter out irrelevant results

      const tagResults = Object.entries(data)
        .filter(([key, product]) => {
          const tags = product.tags || [];
          return tags.some(tag => tag.toLowerCase().includes(query));
        })
        .map(([key, product]) => ({ key, product, relevance: 0 })); // Tags results have lower relevance

      const mergedResults = [...results, ...tagResults];

      // Remove duplicates based on product key
      const uniqueResults = mergedResults.filter((value, index, self) =>
        self.findIndex(item => item.key === value.key) === index
      );

      return uniqueResults
        .sort((a, b) => a.relevance - b.relevance) // Sort by relevance, lower values first
        .slice(0, 10); // Get the top 10 results
    }





    // Function to calculate relevance based on search query
    function calculateRelevance(name, query) {
      if (!name || !query) {
        return 0; // Handle undefined or empty strings
      }

      const lowerName = name.toLowerCase();
      const queryWords = query.split(' ').filter(Boolean); // Split the query into words and remove empty strings

      const indices = [];
      for (const word of queryWords) {
        const index = lowerName.indexOf(word);
        if (index !== -1) {
          indices.push(index);
        }
      }

      if (indices.length === 0) {
        return 0; // No matches
      }

      // Sort the indices in ascending order
      indices.sort((a, b) => a - b);

      // The relevance is determined by the position of the first match
      return indices[0] + 1; // Adding 1 to prioritize exact matches at the beginning
    }







    // Function to display search results
    function displayResults(results) {
      resultsDiv.innerHTML = '';
      if (results.length === 0) {
        alertNoResultsFound();
      } else {
        results.forEach(({ key, product }) => {
          const resultDiv = document.createElement('div');
          resultDiv.classList.add('result');

          const thumbnailDiv = document.createElement('div');
          thumbnailDiv.classList.add('thumbnail');
          const image = document.createElement('img');
          image.src = product.thumbnail;
          image.style.maxWidth = '100px'; // Adjust the size as needed
          image.style.height = 'auto';
          thumbnailDiv.appendChild(image);

          const detailsDiv = document.createElement('div');
          detailsDiv.classList.add('details');
          const name = document.createElement('h2');
          name.classList.add('name');
          name.textContent = product.name;
          const dealPrice = document.createElement('p');
          dealPrice.classList.add('dealprice');
          dealPrice.textContent = `Price: ${product.dealprice}`;
          detailsDiv.appendChild(name);
          detailsDiv.appendChild(dealPrice);

          resultDiv.appendChild(thumbnailDiv);
          resultDiv.appendChild(detailsDiv);

          resultDiv.addEventListener('click', () => {
            // Log the key of the selected product
            //console.log("Selected Product Key:", key);

            // window.location.href="http://localhost:5500/checkmart%20products.html?value=0001"
            window.location.href = "checkmart products.html?value=" + key;

            // You can perform other actions with the selected product data here
            //console.log("Selected Product Data:", product);
          });

          resultsDiv.appendChild(resultDiv);
        });
      }
    }




    // Function to handle the selected result
    function handleResultSelection(selectedProduct) {
      // You can perform actions with the selected product data here
      //console.log("Selected Product:", selectedProduct);
      //console.log("Selected Product Key:", selectedProduct.key);
    }

    // Function to alert "No results found"
    function alertNoResultsFound() {


      //customalert("warning","NO Result Found","the input you are searching for does not match our database");

      let resultdiv2 = document.querySelector(".results")
      resultdiv2.innerHTML = `<div style="display:flex;padding:20rem;">
              <div style="">
                <i><svg style="font-size:100rem; color:#646464;margin-right:20rem" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32z" />
                  </svg></i>
              </div>
              <div>
                <h1 style="font-size:25rem; margin:5rem;">NO Result found</h1>
                <h3 style="margin-left:5rem;font-size:19rem;">Try any other spelling for better results</h3>
              </div>
            </div>`;


    }



    if (localStorage.getItem("user")) {
      var login_button = document.getElementById("login");
      login_button.innerHTML = `<i class="fa-solid fa-user"></i>Acount`;
      login_button.href = "Account.html"

    }




    document.querySelector(".sidebar_content ul").innerHTML = `
        <li><form id="sidebar_search"><input type="text" id="sidebar_input"></form></li>
        <li><a href="index.html">Home</a></li>
        <li><a href="Account.html">My Account</a></li>
        <li><a href="search with code.html">Search with code</a></li>
        <li><a href="my bag.html">My Bag</a></li>
        <li><a href="About Us.html">About Us</a></li>
        <li><a href="Contact Us.html">Contact Us</a></li>
        <li><a href="Terms and Conditions.html">Terms and Conditions</a></li>
        <li><a href="Privacy policy.html">Privacy Policy</a></li>
        <li><a href="Copyright Policy.html">Copyright Policy</a></li>
        <li><a href="sitemap.html">Site map</a></li>
  `







    document.getElementById('sidebar_search').addEventListener("submit", function() {
      event.preventDefault();
      let search_value = document.getElementById("sidebar_input").value;
      window.location.href = "auto search.html?value=" + search_value;
    })