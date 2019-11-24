// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged_out');
const loggedInLinks = document.querySelectorAll('.logged_in');
const doc = document.querySelectorAll('.doc');
const agent = document.querySelectorAll('.agent');
const adminItems = document.querySelectorAll('.admin');
const hide_ui = document.querySelectorAll('.hide_ui');


const doc_med_response_ui = document.querySelector('.doc_med_response_ui');
const doc_med_response_list = document.querySelector('.doc_med_response_list');
const doc_med_history_ui = document.querySelector('.doc_med_history_ui');
const doc_med_history_list = document.querySelector('.doc_med_history_list');
const brand_logo = document.querySelector('.brand-logo');
const progress = document.querySelector('.progress');
const doc_home_card = document.querySelector('.doc_home_card');
const agent_cards = document.querySelector('.agent_cards');
const agent_list = document.querySelector('.agent_list');
const agent_form = document.querySelector('.agent_form');
const accountDetails = document.querySelector('.account_details');
const guideList = document.querySelector('.guides');
const login_btn = document.getElementById("login_btn");
const records_submit_btn = document.getElementById("records_submit_btn");
const email_profile = document.getElementById("email_profile");

var user_id;
var user_email;


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
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'none';
}

function doc_med_response() {
  localStorage.setItem("state", "doc_med_response");
  console.log('doc_med_response');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'block';
  doc_med_history_ui.style.display = 'none';
}

function doc_med_history() {
  localStorage.setItem("state", "doc_med_history");
  console.log('doc_med_history');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'block';
}

function doc_map() {
  localStorage.setItem("state", "doc_map");
  console.log('doc_map');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'none';
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
      user_id = user.uid;
      user_email = doc.data().email;
      email_profile.innerHTML = "Title: " + doc.data().bio + "<br>Location: " + doc.data().town + "<br>Email:" + doc.data().email;
      const html = `
      Email: <span data-id="${user.uid}">${user.email}</span>
        <div>Title: ${doc.data().bio}</div>
        <div>Location: ${doc.data().town}</div>
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







// Agent List
const agentListView = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
        <div class="collapsible-header grey lighten-4"> ${guide.patient_name} </div>
        <div class="collapsible-body white"> ${guide.town} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }

};




// Doc Current List
const doc_current_list = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide1 = doc.data();
      const li1 = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide1.patient_name} </div>
          <div class="collapsible-body white"> ${guide1.town} </div>
        </li>
      `;
      html += li1;
    });
    doc_med_response_list.innerHTML = html;
  } else {
    doc_med_response_list.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }

};



// Doc Achieve List
const doc_achieve_list = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide2 = doc.data();
      const li2 = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide2.patient_name} </div>
          <div class="collapsible-body white"> ${guide2.town} </div>
        </li>
      `;
      html += li2;
    });
    doc_med_history_list.innerHTML = html;
  } else {
    doc_med_history_list.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }

};
console.log(user_id);