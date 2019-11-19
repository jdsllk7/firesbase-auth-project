// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const home_cards = document.getElementById("home_cards");
const records = document.getElementById("records");
const patient_form_id = document.getElementById("patient_form_id");


function reviewed_records() {
  localStorage.setItem("state", "reviewed_records");
  home_cards.style.display = "none";
  records.style.display = "block";
  patient_form_id.style.display = "none";
}

function send_records() {
  localStorage.setItem("state", "send_records");
  home_cards.style.display = "none";
  patient_form_id.style.display = "block";
  records.style.display = "none";
}

function home() {
  localStorage.setItem("state", "home");
  home_cards.style.display = "block";
  patient_form_id.style.display = "none";
  records.style.display = "none";
}

const setupUI = (user) => {
  if (user) {
    var state = localStorage.getItem("state");

    if (state == "reviewed_records") {
      reviewed_records();
    } else if (state == "send_records") {
      send_records();
    } else {
      home();
    }
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }

};