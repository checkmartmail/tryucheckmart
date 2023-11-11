var value;

function getUrlParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  value = urlParams.get('value');
  if (value === null) {
    value = "0002";
  }

}

getUrlParameter();

const product_to_be_added = value;
//console.log(product_to_be_added);
//const hashedphone = "8bbacac96f87bc57bc9da5f0e0b0c0e1ac53f02be32ff2e8e346bc08f1ec0694";
//const hashedpassword = "5fccfcc2bc5d995babff5c815e729a15c3c68ca89bd500bce86fb44f313bef70";
function updateAddtobag() {

  var userdata_for_add_to_bag_buttom = JSON.parse(localStorage.getItem("user"));

  if (userdata_for_add_to_bag_buttom && userdata_for_add_to_bag_buttom.bag) {
    //console.log(userdata_for_add_to_bag_buttom.bag);
    //console.log(product_to_be_added);

    if (userdata_for_add_to_bag_buttom.bag.includes(product_to_be_added)) {

      //console.log('already');

      document.getElementById("add_to_bag_button").innerText = "Remove from bag"

    }
  } else {
    //console.log('no bag bag');
    customalert("warning", "You are not logged in", "")
  }


}

updateAddtobag()









function add_to_history() {
  var history_data = localStorage.getItem("history");
  


  if (history_data) {
    //console.log(history_data);


    if (history_data.includes(value)) {

      //console.log('already in history');
      var parder_history=JSON.parse(history_data);
      
      
      if (parder_history.length > 0) {
      // Pop (remove and return) the last value from the array
      var index = parder_history.indexOf(value);
      
      // Pop (remove and return) "0004" from the array
      const poppedValue = parder_history.splice(index, 1)[0];
      
      parder_history.push(value);
      
      localStorage.setItem("history", JSON.stringify(parder_history));
      // Return the popped value ("0004")
      //console.log("popped");
      
      
      }
      //document.getElementById("add_to_bag_button").innerText="Remove from bag"

    }else{
      var parder_history=JSON.parse(history_data);
      
      parder_history.push(value);
      
      localStorage.setItem("history", JSON.stringify(parder_history));
      
    }
  } else {
    
    var history_to_be_created = [value];

    localStorage.setItem("history", JSON.stringify(history_to_be_created));

    


  }



}






add_to_history()









// Inline JavaScript function to add a blue dot with bubble animation
document.querySelectorAll(".add-dot-button").forEach(button => {
  button.addEventListener("click", (e) => {
    const dot = document.createElement("div");
    dot.classList.add("blue-dot");
    dot.style.left = (e.clientX - button.getBoundingClientRect().left - 5) + "px"; // Adjust for dot size
    dot.style.top = (e.clientY - button.getBoundingClientRect().top - 5) + "px"; // Adjust for dot size
    button.appendChild(dot);

    // Remove the dot after the animation completes
    dot.addEventListener("animationend", () => {
      button.removeChild(dot);
    });
  });
});




//http://localhost:7700/checkmart%20products.html?value=hi





var ptoductsdata;
var product_json;
fetch("products.json").then(response => {
  return response.json();
}).then(data => {
  ptoductsdata=data;
  product_json = data[value];
  //home

  refresh(product_json);
  callit();
  

});


function refresh() {
  update_product_nane(product_json);
  update_rating(product_json);
  update_pricebox(product_json);
  update_amazon_redirecy_href(product_json);
  update_color_galary(product_json);
  update_keyPoints(product_json);
  update_about_this_product(product_json);

  //update product_visuals
  update_product_image(product_json, 0);
  update_image_gallery(product_json);
  document.getElementsByClassName("gallery_image_div")[0].style.border = "3rem solid dodgerblue";
  document.getElementsByClassName("gallery_image_div")[0].style.borderRadius = "9rem";

};




function update_product_nane(product_json) {

  let name = document.querySelector("#name_heading p");
  name.innerText = product_json["name"];

}



function update_rating(product_json) {

  let rating_text = product_json["raating"]

  document.getElementById("text_rating").innerText = rating_text;


  let rating_percentage = (rating_text / 5) * 100;


  let rating = document.getElementsByClassName("rating")[0];

  rating.style = `display: inline-flex;
  font-size: 15rem;background: linear-gradient(to right, gold ` + rating_percentage + `%, grey ` + rating_percentage + `%);background-clip: text;
  -webkit-background-clip: text;color: transparent;
  margin-bottom: 10rem;`;



}




function update_pricebox(product_json) {
  let off_Percent = document.querySelector("#price_box h3");
  let dealprice = document.querySelector("#price_box h1");
  let mrp = document.querySelector("#price_box h2");
  let save_money = document.querySelector("#price_box p");


  let c = product_json["dealprice"];
  let a = parseFloat(product_json["dealprice"].replace(/,/g, ''));
  let d = product_json["mrp"];
  let b = parseFloat(product_json["mrp"].replace(/,/g, ''));


  dealprice.innerHTML = "<sup>₹</sup>" + c;
  mrp.innerHTML = "<strike>₹" + d + "</strike>";



  save_money_Innertext = (b - a);
  save_money_Innertext_with_comma = addCommasIndianStyle(save_money_Innertext)


  save_money.innerHTML = `<i class="fa-solid fa-money-check-dollar fa-shake"></i>You save ₹` + save_money_Innertext_with_comma;

  var percentage = (save_money_Innertext / b) * 100;

  const roundedPercentage = Math.round(percentage);

  off_Percent.innerText = "-" + roundedPercentage + "%";


}



function addCommasIndianStyle(number) {
  if (isNaN(number)) {
    return "Not a valid number";
  }

  // Convert the number to a string
  let numberString = number.toString();

  // Split the number into integer and decimal parts (if any)
  const parts = numberString.split('.');

  // Add commas to the integer part with the correct Indian numbering system format
  parts[0] = parts[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

  // Join the integer and decimal parts (if any)
  return parts.join('.');
}
//console.log(indianFormattedNumber); // Outputs "12,34,56,7890"









function update_amazon_redirecy_href(product_json) {


  document.getElementById("amazon_redirecy_href").href = product_json["amazonlink"];
}


var colorindexglobal = 0;

function update_color_galary(product_json) {
  let keys = Object.keys(product_json["color"]);



  update_colorDivs(product_json);
  update_colorheading(keys, colorindexglobal);

}






function update_colorDivs(product_json) {

  let color_keys = Object.keys(product_json["color"]);
  let total_keys = color_keys.length;


  var color_string = "";

  for (var i = 0; i < total_keys; i++) {
    var color_present_key = color_keys[i]
    var present_color_image = product_json["color"][color_present_key][0];


    var color_string_point = `<div class="colour" onclick="update_page_for_color(` + (i) + `)">
                      <img src="` + present_color_image + `" alt="` + color_present_key + `">
                    </div>`;


    color_string += color_string_point;

  }

  document.getElementById("colours").innerHTML = color_string;


}




function update_colorheading(keys, colorindex) {

  let color_heading_innertext = keys[colorindex];

  let color_heading = document.querySelector("#color_heading h4");

  color_heading.innerText = color_heading_innertext;

  document.getElementsByClassName("colour")[colorindex].style.border = "3rem solid dodgerblue";
  document.getElementsByClassName("colour")[colorindex].style.borderRadius = "9rem";

}






function update_keyPoints(product_json) {
  let keys_values = document.querySelector("#keys_values table");
  let keys_values_keys = Object.keys(product_json["keyspoints"]);
  let keys_values_values = Object.values(product_json["keyspoints"]);


  var keys_values_innerhtml = "";

  for (var i = 0; i < keys_values_keys.length; i++) {


    var keys_values_ponit_innerhtml = `<tr><td>` + keys_values_keys[i] + `</td><td>` + keys_values_values[i] + `</td></tr>`;

    keys_values_innerhtml += keys_values_ponit_innerhtml;

  }

  keys_values.innerHTML = keys_values_innerhtml;


}





function update_about_this_product(product_json) {
  var about_this_product = document.querySelector("#about_this_product ul");
  var about_this_product_values = product_json["aboutthisitem"];

  var about_this_product_innerhtml = "";

  for (var i = 0; i < about_this_product_values.length; i++) {

    var about_this_product_li = `<li>` + about_this_product_values[i] + `</li>`;

    about_this_product_innerhtml += about_this_product_li;

  }

  about_this_product.innerHTML = about_this_product_innerhtml;

}







function update_product_image(product_json, indexofmainimage) {
  let keys = Object.keys(product_json["color"]);
  let image_present_key = keys[colorindexglobal];
  let color_image = product_json["color"][image_present_key][indexofmainimage];
  document.getElementById("product_image").src = color_image;
}


//<img src="products inages/811aBK9bUFL._SL1500_ (1).jpg" alt="" onclick="change_priduct_image(0)">



function update_image_gallery(product_json) {

  let image_gallery = document.querySelector(".image_gallery");
  let keys = Object.keys(product_json["color"]);
  let image_present_key = keys[colorindexglobal];
  let image_present_values = product_json["color"][image_present_key];



  var image_gallery_innerhtml = "";



  for (var i = 0; i < image_present_values.length; i++) {

    let image_gallery_innerhtml_point = `<div class="gallery_image_div"><img id="image_gallery_image` + i + `" src="` + image_present_values[i] + `" alt="" onclick="change_priduct_image(` + i + `)"></div>`;

    image_gallery_innerhtml += image_gallery_innerhtml_point;
  }

  image_gallery.innerHTML = image_gallery_innerhtml;
}




function update_page_for_color(number) {
  //console.log(colorindexglobal);
  colorindexglobal = number;
  //console.log(colorindexglobal);
  refresh();
}

function change_priduct_image(number) {
  //console.log(number);
  update_product_image(product_json, number);
  update_image_gallery(product_json);
  document.getElementsByClassName("gallery_image_div")[number].style.border = "3rem solid dodgerblue";
  document.getElementById("image_gallery_image" + number).style.borderRadius = "9rem";

}

async function AddToBag() {
  var localstorageUser = localStorage.getItem('user');
  var userr;
  if (localstorageUser) {
    // Parse the JSON data from local storage
    userr = JSON.parse(localstorageUser);
    //console.log(userr["phone_number"]);
    //console.log(userr["password"]);
    var hashedphone = await sha256(userr["phone_number"]);
    //console.log(hashedphone);
    var hashedpassword = await sha256(userr["password"]);
    //console.log(hashedpassword);
    pushValueToBagAndStoreInLocalStorage(value);


    updateUserBag(product_to_be_added, hashedphone, hashedpassword);

  } else {
    //console.log('u need to login');
    customalert("error", "You need to login to add it into your bag", "loging in helps the user to get there data back even after years");

  }

}

function viewProduct() {
  window.location.href = product_json["amazonlink"]
}











function pushValueToBagAndStoreInLocalStorage(valueToPush) {
  // Retrieve JSON data from local storage
  var userData = JSON.parse(localStorage.getItem("user"));

  if (userData && userData.bag) {
    // Check if the value is already in the "bag" array
    if (!userData.bag.includes(valueToPush)) {
      // Push the value to the "bag" array
      userData.bag.push(valueToPush);

      // Update the local storage with the modified JSON data
      localStorage.setItem("user", JSON.stringify(userData));
      updateAddtobag()
      customalert("check", "Added to bag", "This.product is added to bag successfully you view it in the bag later")
    } else {
      //console.log("Value already exists in the 'bag' array.");
    }
  } else {
    //console.log("Invalid or missing 'bag' array in user data.");
  }
}









const githubToken = "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";
const githubUsername = 'ankit81413';
const githubRepo = 'Logintest';
const githubFilePath = 'Login.json';

function updateUserBag(product_to_be_added, hashedphone, hashedpassword) {
  // Fetch the JSON data from GitHub
  fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${githubFilePath}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      // Decode the content of the JSON file
      const content = atob(data.content);
      const jsonData = JSON.parse(content);
      jsonData2 = jsonData;

      // Find the user with matching hashedphone and hashedpassword
      const matchingUser = jsonData.users.find(user => user.phone_number === hashedphone && user.password === hashedpassword);

      if (matchingUser) {
        // Check if the product_to_be_added is already in the user's bag
        if (matchingUser.bag.includes(product_to_be_added)) {
          productAlreadyInBag();
        } else {
          // Add the product_to_be_added to the user's bag array
          matchingUser.bag.push(product_to_be_added);

          // Encode the updated JSON data
          const updatedContent = btoa(JSON.stringify(jsonData, null, 2));

          // Update the JSON data on GitHub
          fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${githubFilePath}`, {
              method: 'PUT',
              headers: {
                Authorization: `token ${githubToken}`,
              },
              body: JSON.stringify({
                message: 'Update user bag',
                content: updatedContent,
                sha: data.sha,
              }),
            })
            .then(response => response.json())
            .then(updatedData => {
             //console.log('User bag updated on GitHub:', updatedData);
            })
            .catch(error => {
             //console.error('Error updating user bag on GitHub:', error);
            });
        }
      } else {
       //console.log('No matching user found.');
      }
    })
    .catch(error => {
     //console.error('Error fetching GitHub JSON:', error);
    });
}

function productAlreadyInBag() {
  window.location.href="my bag.html?removable_item="+value;
}

// Example usage:

//updateUserBag(product_to_be_added, hashedphone, hashedpassword);









async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const buffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the buffer to a hexadecimal string
  const hashedArray = Array.from(new Uint8Array(buffer));
  const hashedHex = hashedArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashedHex;
}









let similar_products;


// Function to search for similar products based on tags
function searchThroughTags(pproduct, ptoductsdata) {
  if (!pproduct || !ptoductsdata) {
    console.log("Product number or JSON data not provided.");
    return;
  }

  // Get the tags of the product with the specified product number
  const tagsToMatch = ptoductsdata[pproduct]?.tags || [];
  
  if (tagsToMatch.length === 0) {
    console.log(`No tags found for product number ${pproduct}`);
    return;
  }

  const results = Object.entries(ptoductsdata)
    .filter(([key, product]) => key !== pproduct) // Exclude the original product
    .map(([key, product]) => ({
      key,
      product,
      relevance: calculateTagRelevance(tagsToMatch, product.tags || []),
    }))
    .filter(({ relevance }) => relevance > 0); // Filter out irrelevant results

  // Sort by relevance, higher values first
  const sortedResults = results.sort((a, b) => b.relevance - a.relevance);

  // Extract product numbers from the sorted results
  const similarProductNumbers = sortedResults.map(result => result.key);


  similar_products = similarProductNumbers;
}

// Function to calculate tag relevance based on matching tags
function calculateTagRelevance(tagsToMatch, productTags) {
  if (!tagsToMatch || !productTags) {
    return 0;
  }

  const matchingTags = tagsToMatch.filter(tag => productTags.includes(tag));
  return matchingTags.length;
}



const productNumberToSearch = value; // Replace with the product number you want to search for
function callit() {
searchThroughTags(productNumberToSearch, ptoductsdata);
//console.log(similar_products);
show_similar_producta();


}





function show_similar_producta(){
//console.log(similar_products);
//console.log(ptoductsdata);

var similar_products_container =document.getElementById("all_similar_products");

var total_similar_products=similar_products.length;

var total_products_to_show ;

if (total_similar_products<6) {
  total_products_to_show=total_similar_products;
}else{
  total_products_to_show=5;
}


for (var i = 0; i < total_products_to_show; i++) {
  var present_similar_products=similar_products[i];
  var present_similar_name=ptoductsdata[present_similar_products]["name"];
  var present_similar_thumbnail=ptoductsdata[present_similar_products]["thumbnail"];

  
  
  similar_products_container.innerHTML+=`<a href="checkmart products.html?value=`+present_similar_products+`" class="similar_product">
          <div class="similar_image_container">
            <img src="`+present_similar_thumbnail+`" alt="silimar product" />
          </div>
          <div class="similar_name">
            <h3>`+present_similar_name+`</h3>
          </div>
        </a>`
  
  
  
  
}


}
