var originaljson;
var products_json;

function getoriginaljson() {
  return originaljson;
}

function getjsonData() {
  return products_json;
}





document.getElementById('sidebar_search').addEventListener("submit", function() {
  event.preventDefault();
  let search_value = document.getElementById("sidebar_input").value;
  window.location.href = "auto search.html?value=" + search_value;
})




let retryCount = 0;

function loadJsonFilesWithRetries() {
  if (retryCount < 3) {
    console.log('try num ' + retryCount);
    fetch("chackmart.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('chackmart.json - Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        originaljson = data;
        update_OptionBar(data);
        update_banner(data);
        update_rightUp(data);
        update_rightDown(data);
        load_all_banner_images(data);
        // Attempt to load the second JSON file
        fetch("products.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error('products.json - Network response was not OK');
            }
            return response.json();
          })
          .then((data2) => {
            products_json = data2;
            createproductarea(originaljson);
            createfooter();
            provide_search_data();
          })
          .catch((error) => {
            // Handle errors for the second JSON file
            console.error("Error loading products.json:", error);
          });
      })
      .catch((error) => {
        // Handle errors for the first JSON file
        console.error("Error loading chackmart.json:", error);
        retryCount++; // Increment retry count
        loadJsonFilesWithRetries(); // Retry loading the JSON files
      });
  } else {
    // Show an alert if all retries fail
    alert("Failed to load JSON files after 3 attempts");
  }
}

// Start loading JSON files with retries
loadJsonFilesWithRetries();









var boardtimeflag = 0;
var boardtimeflag_Contron = setInterval(function() {
  let left_board_keys = Object.keys(originaljson["board"]["right"]);
  let left_board_value = Object.values(originaljson["board"]["right"]);

  if (boardtimeflag == ((left_board_keys.length) - 1)) {
    boardtimeflag = 0;
  } else {
    boardtimeflag = boardtimeflag + 1;
  };

}, 4000);


function load_all_banner_images(json){
  let left_board_keys = Object.keys(originaljson["board"]["right"]);

  for (let index = 0; index < left_board_keys.length; index++) {
    let createDiv=document.createElement("div");
    createDiv.classList.add("preview_image")
    createDiv.innerHTML=`
    <img src="`+left_board_keys[index]+`">
    `
    document.body.appendChild(createDiv)
  }

  let rihgt_board_keys = Object.keys(originaljson["board"]["left_down"]);
  for (let index2 = 0; index2 < rihgt_board_keys.length; index2++) {
    let element = rihgt_board_keys[index2];
    let createDiv2=document.createElement("div");
    createDiv2.classList.add("preview_image")
    createDiv2.innerHTML=`
    <img src="`+rihgt_board_keys[index2]+`">
    `
    document.body.appendChild(createDiv2)
    
  }
  // var document.createElement("div")
}



function update_OptionBar(json) {
  let keys = Object.keys(json["option_bar"]);
  let total_keys = keys.length;
  let value = Object.values(json["option_bar"]);
  let option_panal = document.getElementById("option_panal");
  for (var i = 0; i < 5; i++) {
    var option = document.getElementsByClassName("option")[i];
    option.href = value[i];
    option.innerText = keys[i];
    //console.log(value[i]);
    //console.log(i);
  }
  if (total_keys > 5) {
    let option_panal_list_items = "";
    for (var l = 5; l < total_keys; l++) {
      option_panal_list_items += `<li><a href="` + value[l] + `">` + keys[l] + `</a></li>`;
      //console.log(value[l]);
    }
    option_panal.innerHTML = `<ul>` + option_panal_list_items + `</ul>`;
  }

}









function update_banner(json) {
  var rightkeys = Object.keys(json["board"]["right"]);
  var rightvalues = Object.values(json["board"]["right"]);
  update_scroll_indicator(rightkeys.length);

  if (update_right) {
    update_right(rightkeys, rightvalues);

  }

  //  update_rightUp();




}









function update_scroll_indicator(dot_count) {
  let scroll_indicator = document.getElementById("scroll_indicator");

  scroll_indicator_html = "";
  for (var i = 0; i < dot_count; i++) {
    if (i == 0) {
      scroll_indicator_html += `<div class="scroll_dot activeScroll_dot"></div>`;
    } else {
      scroll_indicator_html += `<div class="scroll_dot"></div>`;
    }

    scroll_indicator.innerHTML = scroll_indicator_html;
  }


}







var myInterval;

function update_right(keys, values, status) {
  const divElement = document.querySelector('.dis-left');

  let currentIndex = 0;
  var leftboard = document.querySelector('.dis-left');
  var imglink = keys[currentIndex];

  leftboard.style.backgroundImage = `url("` + imglink + `")`;
  leftboard.style.backgroundSize = "cover";
  update_left_a(values, currentIndex);


  currentIndex++;









  function regulator() {

    var imglink = keys[currentIndex];

    leftboard.style.backgroundImage = `url("` + imglink + `")`;
    leftboard.style.backgroundSize = "cover";

    update_left_a(values, currentIndex);

    if (currentIndex == ((keys.length) - 1)) {
      currentIndex = 0;
    } else {
      currentIndex = currentIndex + 1;
    };

    incriment_scroll_dot((keys.length) - 1);


  }





  function myStopFunction() {
    clearInterval(myInterval);
  }



  if (status === "clear") {
    myStopFunction();
  } else {
    myInterval = setInterval(regulator, 4000);
  }


};









var dotIndex = "0";


function incriment_scroll_dot(total_dots) {


  if (dotIndex == total_dots) {
    dotIndex = 0;
  } else {
    dotIndex++;
  };




  if (dotIndex == 0) {
    var dot_to_leave_class = document.getElementsByClassName("scroll_dot")[total_dots];
  } else {
    var dot_to_leave_class = document.getElementsByClassName("scroll_dot")[dotIndex - 1];
  }

  var dot_to_ocupy_class = document.getElementsByClassName("scroll_dot")[dotIndex];

  dot_to_leave_class.classList.remove('activeScroll_dot');
  dot_to_ocupy_class.classList.add('activeScroll_dot');








}



function decriment_scroll_dot(total_dots) {


  if (dotIndex == 0) {
    dotIndex = total_dots;
  } else {
    dotIndex--;
  };




  if (dotIndex == total_dots) {
    var dot_to_leave_class = document.getElementsByClassName("scroll_dot")[0];
  } else {
    var dot_to_leave_class = document.getElementsByClassName("scroll_dot")[dotIndex + 1];
  }

  var dot_to_ocupy_class = document.getElementsByClassName("scroll_dot")[dotIndex];

  dot_to_leave_class.classList.remove('activeScroll_dot');
  dot_to_ocupy_class.classList.add('activeScroll_dot');








}



function update_left_a(values, currentIndex) {
  link = values[currentIndex];
  document.getElementById("dis_left_a").href = link;
};





function update_rightUp(json) {
  var right_Up_keys = Object.keys(json["board"]["left_up"]);
  var right_Up_values = Object.values(json["board"]["left_up"]);
  var right_Up = document.getElementsByClassName("dis-right1")[0];
  right_Up.style.backgroundImage = `url("` + right_Up_keys[0] + `")`;
  right_Up.style.backgroundSize = "cover";

  document.getElementById("dis_left_up_a").href = right_Up_values[0];

};



function nextboard() {


  const leftboard = document.querySelector('.dis-left');


  var keys = Object.keys(originaljson["board"]["right"]);
  var values = Object.values(originaljson["board"]["right"]);

  if (boardtimeflag == ((keys.length) - 1)) {
    boardtimeflag = 0;
  } else {
    boardtimeflag = boardtimeflag + 1;
  }

  var imglink = keys[boardtimeflag];

  leftboard.style.backgroundImage = `url("` + imglink + `")`;
  leftboard.style.backgroundSize = "cover";

  clearInterval(myInterval);
  clearInterval(boardtimeflag_Contron);
  update_left_a(values, boardtimeflag);
  incriment_scroll_dot((keys.length) - 1);

}


function prevboard() {

  const leftboard = document.querySelector('.dis-left');


  var keys = Object.keys(originaljson["board"]["right"]);
  var values = Object.values(originaljson["board"]["right"]);


  if (boardtimeflag == 0) {
    boardtimeflag = ((keys.length) - 1);
  } else {
    boardtimeflag = boardtimeflag - 1;
  }

  var imglink = keys[boardtimeflag];

  leftboard.style.backgroundImage = `url("` + imglink + `")`;
  leftboard.style.backgroundSize = "cover";

  clearInterval(myInterval);
  clearInterval(boardtimeflag_Contron);
  update_left_a(values, boardtimeflag);
  decriment_scroll_dot((keys.length) - 1);
}








function update_rightDown(json) {
  let rightDown_keys = Object.keys(json["board"]["left_down"]);
  let rightDown_values = Object.values(json["board"]["left_down"]);
  var right_DownCount = rightDown_keys.length;
  var right_DownHtml = "";


  for (var j = 0; j < right_DownCount; j++) {
    var img_link = rightDown_keys[j];
    var href_link = rightDown_values[j];

    right_DownHtml += `<a href="` + img_link + `"><img src="` + href_link + `" alt="not available"></a>
`;
  }
  right_DownHtml += `<a href="` + rightDown_keys[0] + `"><img src="` + rightDown_values[0] + `" alt="not available"></a>`

  document.getElementsByClassName("float-down-container")[0].innerHTML = right_DownHtml;


}





const swipeDiv = document.querySelector(".dis-left");

let startX = 0;

// Function to be called on swipe left
function onSwipeLeft() {
  alert("Swiped left!");
}

// Function to be called on swipe right
function onSwipeRight() {
  alert("Swiped right!");
}

swipeDiv.addEventListener("touchstart", function(e) {
  startX = e.touches[0].clientX;
});

swipeDiv.addEventListener("touchend", function(e) {
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 0) {
    prevboard();
  } else if (deltaX < 0) {
    nextboard();
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






// Function to search JSON data based on the query and calculate relevance

/*
function searchJSONData(data, query) {
  if (!data || !query) {
    return []; // No data or query, return an empty array
  }

  const results = Object.entries(data)
    .map(([key, product]) => ({ key, product, relevance: calculateRelevance(product.name, query) }))
    .filter(({ relevance }) => relevance > 0) // Filter out irrelevant results
    .sort((a, b) => a.relevance - b.relevance) // Sort by relevance, lower values first
    .slice(0, 10); // Get the top 10 results

  return results;
}*/



let jsonData;

function provide_search_data() {
  jsonData = products_json;
}



const searchInput = document.querySelector('.srcinp');
const resultsDiv = document.querySelector('.results');

// Event listener for input changes
searchInput.addEventListener('input', searchthis);

function searchthis() {
  searchactive();
  const query = searchInput.value.toLowerCase().trim();
  if (query === '') {
    resultsDiv.style.display = 'none'; // Hide the results when input is empty
  } else {
    resultsDiv.style.display = 'block'; // Show the results when there's input
    const searchResults = searchJSONData(jsonData, query);
    displayResults(searchResults);
  }
}

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





function createproductarea(data) {
  let all_products = data["products"];
  var present_product_array;
  //console.log(data)
  let total_product_racks = all_products.length;
  //console.log(total_product_racks);
  for (let i = 0; i < total_product_racks; i++) {
    present_product_array = all_products[i];
    // console.log(present_product_array);
    let present_products_array_key = Object.keys(present_product_array);
    let present_products_array_type = present_products_array_key[0];

    if (present_products_array_type == "A") {
      atype(present_product_array);
    } else if (present_products_array_type == "B") {
      btype(present_product_array);

    } else {
      ctype(present_product_array);

    }

  }

  // console.log(Object.keys(present_product_array));

}



function atype(present_array) {
  //console.log("generated A now");
  //console.log(present_array);
  let present_div_keys = Object.keys(present_array);
  let present_div_name = present_array[present_div_keys[1]];
  let present_div_link = present_array[present_div_keys[2]];
  let present_div_products = present_array[present_div_keys[0]];
  let total_present_div_products = present_div_products.length;
  let products_div_elements = ``;

  let bought_json = getjsonData();




  for (var j = 0; j < total_present_div_products; j++) {
    let present_div_product = present_div_products[j];
    let present_div_product_thumbnail = bought_json[present_div_product]["thumbnail"];
    let present_div_product_price = bought_json[present_div_product]["dealprice"];

    products_div_elements += `<div class="td-box">
                  <a href="checkmart%20products.html?value=` + present_div_product + `"><div class="td-box_image_container"><img src="` + present_div_product_thumbnail + `" alt="top deal image"loading="lazy"></div>
                  <h6>₹ ` + present_div_product_price + `</h6></a>
                </div>`;

  }



  //}).then(() => {
  let createDiv = document.createElement('div');
  createDiv.innerHTML = `<section class="todays-deals">
    <h1 style="display: inline-block;" class="tdh1">` + present_div_name + `</h1>
    <a href="` + present_div_link + `" style="color:#007084; text-decoration: none; display: inline;" class="tda">See all details</a>
    <div class="deals-container">` + products_div_elements + `</div>
    </section>`;

  window.body.appendChild(createDiv);
  //})






}



function btype(present_array) {
  //console.log("generated B");
  //console.log(present_array)

  let present_div_keys = Object.keys(present_array);
  let present_div_name = present_array[present_div_keys[1]];
  let present_div_link = present_array[present_div_keys[2]];
  let present_div_products = present_array[present_div_keys[0]];
  let total_present_div_products = present_div_products.length;
  let products_div_elements = ``;

  let bought_json = getjsonData();
  //console.log(present_array)


  for (var j = 0; j < total_present_div_products; j++) {
    let present_div_product = present_div_products[j];
    let present_div_product_thumbnail = bought_json[present_div_product]["thumbnail"];
    let present_div_product_price = bought_json[present_div_product]["dealprice"];
    let present_div_product_name = bought_json[present_div_product]["name"];
    let present_div_product_raating = bought_json[present_div_product]["raating"];
    let present_product_raating_percent = (present_div_product_raating / 5) * 100
    //console.log(present_product_raating_percent);



    products_div_elements += `<div class="main_products">
            <a href="checkmart%20products.html?value=` + present_div_product + `"><div class="main_products_image_container"><img src="` + present_div_product_thumbnail + `" alt="top deal image" loading="lazy"></div>
              
            <div class="rating">
              <div class="rating_stars" style="display: flex;
          justify-content: center;
          font-size: 10rem;
          background: linear-gradient(to right, gold ` + present_product_raating_percent + `%, grey ` + present_product_raating_percent + `%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          box-sizing: border-box;
          margin: 3rem 0rem;padding:0rem;">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <p>` + present_div_product_name + `</p>
            <h2>₹ ` + present_div_product_price + `</h2>
            <h3>Add to bag</h3></a>
    
          </div>`;

  }








  let createDiv = document.createElement('div');
  createDiv.innerHTML = ` <section class="products">
    <h1 style="display: inline-block;" class="tdh1">` + present_div_name + `</h1>
    <a href="` + present_div_link + `" style="color:#007084; text-decoration: none; display: inline;" class="tda">See all details</a>

    <div class="product_container">` + products_div_elements + `</div>
    </section>`;

  window.body.appendChild(createDiv);
  //})



}


function ctype(present_array) {
  //console.log("generated C");
  let present_div_keys = Object.keys(present_array);
  let present_div_name = present_array[present_div_keys[1]];
  let present_div_link = present_array[present_div_keys[2]];
  let present_div_products = present_array[present_div_keys[0]];
  let total_present_div_products = present_div_products.length;
  let products_div_elements = ``;

  let bought_json = getjsonData();
  //console.log(present_array)


  for (var j = 0; j < total_present_div_products; j++) {
    let present_div_product = present_div_products[j];
    let present_div_product_thumbnail = bought_json[present_div_product]["thumbnail"];

    products_div_elements += `<a href=checkmart products.html?value=` + present_div_product + `"><img class="direct_image" src="` + present_div_product_thumbnail + `" alt=""  loading="lazy"></a>`;

  }








  let createDiv = document.createElement('div');
  createDiv.innerHTML = `<section class="todays-deals">
    <h1 style="display: inline-block;" class="tdh1">` + present_div_name + `</h1>
    <a href="` + present_div_link + `" style="color:#007084; text-decoration: none; display: inline;" class="tda">See all details</a>
    <div class="deals-container">` + products_div_elements + `</div>
    </section>`;

  window.body.appendChild(createDiv);
  //})


}






function createfooter() {
  let createDiv = document.createElement('div');
  createDiv.innerHTML = `<footer class="e-commerce-footer">
  <div class="footer-content">
      <div class="footer-section">
          <h3>Contact Us</h3>
          <p>Email-1: checkmart.mail@gmail.com</p>
          <p>Email-2: checkmart.charlies@gmail.com</p>
          <p>Phone: +91 70275-22310</p>
      </div>

      <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="search with code.html">search through code</a></li>
          <li><a href="Terms and Conditions.html">Terms and Conditions</a></li>
          <li><a href="Privacy policy.html">Privacy policy</a></li>
          <li><a href="About Us.html">About Us</a></li>
    </ul>
      </div>

      <div class="footer-section">
          <h3>Stay Connected</h3>
          <p>Follow us on social media:</p>
          <div class="social-icons">
          <a href="https://www.instagram.com/checkmart.in/" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
          <a href="https://www.youtube.com/@CheckMart-vt7gv" target="_blank"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://t.me/CheckMartindia" target="_blank"><i class="fa-brands fa-telegram"></i></a>
          </div>
      </div>
  </div>

  <div class="footer-bottom">
      &copy; 2023 YourStore. All rights reserved.
  </div>
</footer>`;

  window.body.appendChild(createDiv);
}