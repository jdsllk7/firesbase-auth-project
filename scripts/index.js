// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged_out');
const loggedInLinks = document.querySelectorAll('.logged_in');
const doc = document.querySelectorAll('.doc');
const agent = document.querySelectorAll('.agent');
const adminItems = document.querySelectorAll('.admin');
const hide_ui = document.querySelectorAll('.hide_ui');


const brand_logo = document.querySelector('.brand-logo');
const doc_home_card = document.querySelector('.doc_home_card');
const agent_cards = document.querySelector('.agent_cards');
const agent_list = document.querySelector('.agent_list');
const agent_form = document.querySelector('.agent_form');
const accountDetails = document.querySelector('.account_details');
const guideList = document.querySelector('.guides');
const login_btn = document.getElementById("login_btn");
const records_submit_btn = document.getElementById("records_submit_btn");
const email_profile = document.getElementById("email_profile");



//ADMIN UI
function admin() {
  localStorage.setItem("state", "admin");
  console.log('admin');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'none');
  adminItems.forEach(item => item.style.display = 'block');
}


//AGENT UI
function agent_home() {
  localStorage.setItem("state", "agent_home");
  console.log('agent_home');
  adminItems.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'block');
  doc.forEach(item => item.style.display = 'none');
  agent_list.style.display = 'none';
  agent_form.style.display = 'none';
  agent_cards.style.display = 'block';
}

function agent_reviewed_records() {
  localStorage.setItem("state", "agent_reviewed_records");
  console.log('agent_reviewed_records');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'block');
  agent_form.style.display = 'none';
  agent_cards.style.display = 'none';
  agent_list.style.display = 'block';
}

function agent_send_records() {
  localStorage.setItem("state", "agent_send_records");
  console.log('agent_send_records');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'block');
  agent_list.style.display = 'none';
  agent_cards.style.display = 'none';
  agent_form.style.display = 'block';
}

function agent_map() {
  localStorage.setItem("state", "agent_map");
  console.log('agent_map');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'block');
  agent_list.style.display = 'none';
  agent_form.style.display = 'none';
  agent_cards.style.display = 'none';
}


//Doctor UI
function doc_home() {
  localStorage.setItem("state", "doc_home");
  console.log('doc_home');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'block';
}

function doc_med_response() {
  localStorage.setItem("state", "doc_med_response");
  console.log('doc_med_response');
}

function doc_med_history() {
  localStorage.setItem("state", "doc_med_history");
  console.log('doc_med_history');
}

function doc_map() {
  localStorage.setItem("state", "doc_map");
  console.log('doc_map');
}

//Logged Out
function logged_out() {
  localStorage.setItem("state", "logged_out");
  // console.log('logged_out');
  hide_ui.forEach(item => item.style.display = 'none');
  adminItems.forEach(item => item.style.display = 'none');
  loggedInLinks.forEach(item => item.style.display = 'none');
  loggedOutLinks.forEach(item => item.style.display = 'block');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'none');
}



function home(viewUI) {
  if (viewUI.includes("agent") === true) {
    agent_home();
  } else if (viewUI.includes("doc") === true) {
    doc_home();
  } else if (viewUI.includes("admin") === true) {
    admin();
  }
}





//Monitor Users
const setupUI = (user) => {

  var state = localStorage.getItem("state");
  // console.log(state);
  var user_type = localStorage.getItem("user");

  //If Someone is Logged In
  if (user) {

    // Toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

    if (user_type === "Command Center") {
      brand_logo.innerHTML = user_type;
      if (state === "admin") {
        admin();
      }

    } else if (user_type === "Doctor") {
      brand_logo.innerHTML = user_type;
      if (state === "doc_home") {
        doc_home();
      } else if (state === "doc_med_response") {
        doc_med_response();
      } else if (state === "doc_med_history") {
        doc_med_history();
      } else if (state === "doc_map") {
        doc_map();
      }

    } else if (user_type === "Health Agent") {
      brand_logo.innerHTML = user_type;
      if (state === "agent_home") {
        agent_home();
      } else if (state === "agent_reviewed_records") {
        agent_reviewed_records();
      } else if (state === "agent_send_records") {
        agent_send_records();
      } else if (state === "agent_map") {
        agent_map();
      }
    }



    //If User Is an ADMIN
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }

    // Print out account info on model
    db.collection('users').doc(user.uid).get().then(doc => {
      email_profile.innerHTML = user.email;
      const html = `
      Logged in as <span id="user_id" data-id="${user.uid}">${user.email}</span>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });




    //If Someone has Logged Out
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    logged_out();
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

// const user_id = document.getElementById("user_id");