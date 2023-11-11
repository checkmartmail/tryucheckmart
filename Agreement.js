// Define the CSS styles
const styles = `
    .popup-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-container .popup {
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        max-width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    .popup-container h2 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .popup-container p {
        color: #555;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
    }
    
    .popup-container a {
        font-size: 16px;
        background-color: rgba(229, 246, 255, 1);
        padding: 2px 4px;
        color: dodgerblue;
        border-radius: 5px;
        text-decoration-line: underline;
    }
    
    

    .popup-container .buttons {
        display: flex;
        justify-content: center;
    }

    .popup-container .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        margin: 0 10px;
        transition: background-color 0.3s, color 0.3s;
    }

    .popup-container .btn-agree {
        font-size:12px;
        background-color: #4CAF50;
        color: #fff;
    }

    .popup-container .btn-agree:hover {
        background-color: #45a245;
    }

    .popup-container .btn-cancel {
        font-size:12px;
        background-color: #f44336;
        color: #fff;
    }
    
    .btn-cancel:hover {
        background-color: #e63933;
    }
`;

// Add the CSS styles to the document head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Function to create and display the popup
function showPopup() {
  const hasAgreed = localStorage.getItem('AgreementResponse') === 'Agree';
  const lastAgreeDate = localStorage.getItem('AgreeDate');
  const today = new Date().toLocaleDateString();

  if (!hasAgreed || (lastAgreeDate !== today && !isMoreThanOneDay(lastAgreeDate))) {
    const lastCancelDate = localStorage.getItem('CancelDate');

    if (!lastCancelDate || lastCancelDate !== today) {
      const popupContainer = document.createElement('div');
      popupContainer.classList.add('popup-container');
      popupContainer.style.display = 'none';

      const popup = document.createElement('div');
      popup.classList.add('popup');

      const h2 = document.createElement('h2');
      h2.textContent = 'Agreement';

      const p = document.createElement('p');
      //p.textContent = 'Before using this service, please review and accept our Privacy Policy, Copyright Policy, and Terms & Conditions. Your agreement to these policies is important to us.';
      p.innerHTML = 'Before using this service, please review and accept our <a href="Privacy policy.html">Privacy Policy</a>, <a href="Copyright Policy.html">Copyright Policy</a> , and <a href="Terms and Conditions.html">Terms & Conditions</a> . Your agreement to these policies is important to us.';

      const buttons = document.createElement('div');
      buttons.classList.add('buttons');

      const agreeBtn = document.createElement('button');
      agreeBtn.classList.add('btn', 'btn-agree');
      agreeBtn.textContent = 'I Agree';

      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('btn', 'btn-cancel');
      cancelBtn.textContent = 'Cancel';

      // Append elements to the popup
      buttons.appendChild(agreeBtn);
      buttons.appendChild(cancelBtn);
      popup.appendChild(h2);
      popup.appendChild(p);
      popup.appendChild(buttons);
      popupContainer.appendChild(popup);

      document.body.appendChild(popupContainer);

      popupContainer.style.display = 'flex';

      agreeBtn.addEventListener('click', () => {
        localStorage.setItem('AgreementResponse', 'Agree');
        localStorage.setItem('AgreeDate', today);
        popupContainer.style.display = 'none';
      });

      cancelBtn.addEventListener('click', () => {
        localStorage.setItem('AgreementResponse', 'Cancel');
        localStorage.setItem('CancelDate', today);
        popupContainer.style.display = 'none';
      });
    }
  }
}

// Function to check if it's been more than one day since the last agreement
function isMoreThanOneDay(lastDate) {
  const today = new Date().toLocaleDateString();
  return today !== lastDate;
}

showPopup();