// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const send_review_links = document.querySelector('.send_review_links');
const adminItems = document.querySelectorAll('.admin');
const home_cards = document.getElementById("home_cards");
const records = document.getElementById("records");
const patient_form_id = document.getElementById("patient_form_id");
const logged_out_card = document.getElementById("logged_out_card");
const login_btn = document.getElementById("login_btn");
const records_submit_btn = document.getElementById("records_submit_btn");
const admin_card = document.getElementById("admin_card");
const review_links1 = document.getElementById("review_links1");
const review_links2 = document.getElementById("review_links2");
const send_links1 = document.getElementById("send_links1");
const send_links2 = document.getElementById("send_links2");


function reviewed_records() {
  localStorage.setItem("state", "reviewed_records");
  home_cards.style.display = "none";
  records.style.display = "block";
  patient_form_id.style.display = "none";
  logged_out_card.style.display = "none";
  admin_card.style.display = "none";
}

function send_records() {
  localStorage.setItem("state", "send_records");
  home_cards.style.display = "none";
  patient_form_id.style.display = "block";
  records.style.display = "none";
  logged_out_card.style.display = "none";
  admin_card.style.display = "none";
}

function home() {
  localStorage.setItem("state", "home");
  home_cards.style.display = "block";
  patient_form_id.style.display = "none";
  records.style.display = "none";
  logged_out_card.style.display = "none";
  admin_card.style.display = "none";
}

function home_out() {
  localStorage.setItem("state", "home_out");
  home_cards.style.display = "none";
  patient_form_id.style.display = "none";
  records.style.display = "none";
  logged_out_card.style.display = "block";
  admin_card.style.display = "none";
}

function admin() {
  localStorage.setItem("state", "admin");
  home_cards.style.display = "none";
  patient_form_id.style.display = "none";
  records.style.display = "none";
  logged_out_card.style.display = "none";
  admin_card.style.display = "block";
  review_links1.style.display = "none";
  review_links2.style.display = "none";
  send_links1.style.display = "none";
  send_links2.style.display = "none";
  home_link.style.display = "none";
}

function none() {
  localStorage.setItem("state", "none");
  home_cards.style.display = "none";
  patient_form_id.style.display = "none";
  records.style.display = "none";
  logged_out_card.style.display = "none";
  admin_card.style.display = "none";
}
const setupUI = (user) => {
  if (user) {

    var state = localStorage.getItem("state");

    if (state == "reviewed_records") {
      // alert(state);
      reviewed_records();

    } else if (state == "home") {
      // alert(state);
      home();

    } else if (state == "send_records") {
      // alert(state);
      send_records();

    } else {
      // alert(state);
      none();
    }
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
      admin();
    } else {

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
    if (state == "admin") {
      admin();
    }
  } else {

    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    home_out();
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