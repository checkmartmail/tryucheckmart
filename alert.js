function checkInternetConnection() {

  if (navigator.onLine) {

    // Connection is online
  } else {
    // Connection is offline, show an alert
    customalert("error", "Network connection error", "Internet connection is lost now!")

  }
}

// Check the internet connection status every 5 seconds

window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);

setInterval(checkInternetConnection, 3000);







function loadCSSWithRetry(cssUrl, maxRetries, successCallback, retryDelay) {
    var link;
    var retries = 0;

    function loadCSS() {
        link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssUrl;
        document.head.appendChild(link);

        link.onerror = function() {
            retries++;
            if (retries < maxRetries) {
               //console.log("Failed to load CSS. Retrying... (Attempt #" + retries + ")");
                document.head.removeChild(link);
                setTimeout(loadCSS, retryDelay);
            } else {
               //console.error("Failed to load CSS after maximum retries.");
            }
        };

        link.onload = function() {
           //console.log("CSS loaded successfully.");
            if (typeof successCallback === 'function') {
                successCallback();
            }
        };
    }

    // Use a for loop to control retries
    for (var i = 0; i < maxRetries; i++) {
        loadCSS();
    }
}

// Example usage:
var cssUrl = "alert.css";
var maxRetries = 3; // You can adjust the number of retries as needed
var retryDelay = 1000; // Delay in milliseconds between retries

loadCSSWithRetry(cssUrl, maxRetries, function () {
   //console.log("CSS is loaded and ready to use.");
}, retryDelay);


























  // Create a new div element
  var newDiv = document.createElement("div");

  // Optionally, add content or attributes to the div
  newDiv.innerHTML = `<div class="alert_background">
  </div>
  <div class="alertbox">
    <div class="alert">
      <div class="symbol_container">
        <i class="fas fa-solid fa-check check"></i>
      </div>
      <div class="alert_text">
        <h1 class="alert_heading">Error</h1>
        <p class="alert_para">notification message</p>
      </div>
    </div>
    <i class="close closebutton" onclick="removealert()"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></i>
    <div class="progress_bar">
      <div class="progress"></div>
    </div>
  </div>`;

  // Get a reference to the body element
  var body = document.body;

  // Append the new div to the body
  //body.appendChild(newDiv);
  body.insertBefore(newDiv, body.firstChild);


  function customalert(type, heading, message) {
    var alert_background = document.querySelector(".alert_background")

    var progress = document.querySelector(".progress");
    var alert_heading = document.querySelector(".alert_heading");
    var alertbox = document.querySelector(".alertbox");
    var alert_para = document.querySelector(".alert_para");
    var symbol_container = document.querySelector(".symbol_container");
    var progress = document.querySelector(".progress");
    alert_background.classList.add("alert_background_active");
    alertbox.classList.add("alertbox_active");
    progress.classList.add("progress_active");


    if (type === "info") {
      document.querySelector(".symbol_container").innerHTML = `<i class="fa-solid fa-info"></i>`;
      symbol_container.style.backgroundColor = "green";
      progress.style.backgroundColor = "green";
    } else if (type === "warning") {
      document.querySelector(".symbol_container").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
      symbol_container.style.backgroundColor = "orange";
      progress.style.backgroundColor = "orange"

    } else if (type === "error") {
      document.querySelector(".symbol_container").innerHTML = '<i class="fa-solid fa-xmark"></i>';
      symbol_container.style.backgroundColor = "red";
      progress.style.backgroundColor = "red"

    } else {
      document.querySelector(".symbol_container").innerHTML = '<i class="fas fa-solid fa-check check"></i>';
      symbol_container.style.backgroundColor = "blue";
      progress.style.backgroundColor = "blue"

    }



    // alert_background.classList.add("alert_background_active");
    // progress.classList.add("progress_active");

    alert_heading.innerText = heading;
    alert_para.innerText = message;





    setTimeout(removealert, 5000);


  }

  function removealert() {
    document.querySelector(".alert_background").classList.remove("alert_background_active");
    document.querySelector(".alertbox").classList.remove("alertbox_active");
    document.querySelector(".progress").classList.remove("progress_active");
    return "done";
  }





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
