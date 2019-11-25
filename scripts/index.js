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
      userTown = doc.data().town;
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







/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/
/*********************************USER INTERFACES************************************/










/**************************************AGENT LIST***********************************/
/**************************************AGENT LIST***********************************/
/**************************************AGENT LIST***********************************/
const agentListView = (data) => {
  var somethingness0 = 0;
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      if (guide.review_state === '2' && guide.town === userTown) {
        const li = `
          <li>
            <div class="collapsible-header grey lighten-4"> ${guide.patient_name} </div>
            <div class="collapsible-body white"> ${guide.town} </div>
          </li>
        `;
        html += li;
        somethingness0++;
      }
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  }
  if (somethingness0 === 0) {
    guideList.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  } else {
    somethingness0 = 0;
  }
};













/**************************************DOC CURRENT LIST***********************************/
/**************************************DOC CURRENT LIST***********************************/
/**************************************DOC CURRENT LIST***********************************/
const doc_current_list = (data, town) => {
  var somethingness = 0;
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide1 = doc.data();

      if (guide1.review_state === '1' && guide1.town === town) {

        if (guide1.priority === 'critical') {
        var li1 = `
          <li class="medical_data" data-id="">
          <div class="collapsible-header grey lighten-3">
            <i class="material-icons">person</i>${guide1.patient_name}
            <span class="new badge red" data-badge-caption="Condition: ${guide1.priority}"></span>
          </div>
          <div class="collapsible-body white">
            <span class="black-text">
              <form action="/map" method="GET" class="locate_btn">
                <input type="hidden" name="lat" value="${guide1.coordinates.latitude}" />
                <input type="hidden" name="long" value="${guide1.coordinates.longitude}" />
                <input type="hidden" name="name" value="${guide1.patient_name}" />
                <button type="submit" class="btn-floating btn waves-effect
                  waves-light green darken-3 black-text">
                  <i class="material-icons large">room</i>
                </button>
              </form>
            <form class="doc_form2" data-id="">
              <h6>RESPONSE TIME:</h6>
              <span>Submitted On: ${guide1.agent_sent_date}</span><br>
              
              <br><hr><br>
              <h6>PATIENT'S INFO:</h6>
              <span>Town: ${guide1.town}</span><br>
              <span>Age: ${guide1.patient_age} ${guide1.ageType}</span><br>
              <span>Sex: ${guide1.sex}</span><br>
              <span>Temperature: ${guide1.patient_temp}</span><br>
              <span>Blood Pressure: ${guide1.patient_bp}</span><br>
              <span>Weight: ${guide1.patient_weight}</span><br>
              <br><hr><br>
              <h6>COMMENT:</h6>
              <span>&#9830; ${guide1.textarea1}</span><br>
              <br><hr><br>
              <h6>DIAGNOSIS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea required value="" id="diagnosis" name="diagnosis" class="materialize-textarea" maxlength="200" data-length="200">${guide1.diagnosis}</textarea>
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6>MEDICAL PRESCRIPTION:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input required placeholder="1st Prescription" value="${guide1.prescription1}" id="prescription1" name="prescription1" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="2nd Prescription" value="${guide1.prescription2}" id="prescription2" name="prescription2" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="3rd Prescription" value="${guide1.prescription3}" id="prescription3" name="prescription3" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6>DOCTOR'S COMMENTS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea required placeholder="Add Comment" id="extra_doctor_info" name="extra_doctor_info" class="materialize-textarea" maxlength="200" data-length="200">${guide1.extra_doctor_info}</textarea>
                  </div>
                </div>
              </span><br>
            </span>
            <br>
            <br>
            
          </form>
          </div>
        </li>
      `;
        } else {
          li1 = `
          <li class="medical_data" data-id="">
          <div class="collapsible-header grey lighten-3">
            <i class="material-icons">person</i>${guide1.patient_name}
          </div>
          <div class="collapsible-body white">
            <span class="black-text">
              <form method="GET" class="locate_btn">
                <input type="hidden" name="lat" value="${guide1.coordinates.latitude}" />
                <input type="hidden" name="long" value="${guide1.coordinates.longitude}" />
                <input type="hidden" name="name" value="${guide1.patient_name}" />
                <button type="submit" class="btn-floating btn waves-effect
                  waves-light green darken-3 black-text">
                  <i class="material-icons large">room</i>
                </button>
              </form>
            <form class="doc_form2" data-id="">
              <h6>RESPONSE TIME:</h6>
              <span>Submitted On: ${guide1.agent_sent_date}</span><br>
              
              <br><hr><br>
              <h6>PATIENT'S INFO:</h6>
              <span>Town: ${guide1.town}</span><br>
              <span>Age: ${guide1.patient_age} ${guide1.ageType}</span><br>
              <span>Sex: ${guide1.sex}</span><br>
              <span>Temperature: ${guide1.patient_temp}</span><br>
              <span>Blood Pressure: ${guide1.patient_bp}</span><br>
              <span>Weight: ${guide1.patient_weight}</span><br>
              <br><hr><br>
              <h6>COMMENT:</h6>
              <span>&#9830; ${guide1.textarea1}</span><br>
              <br><hr><br>
              <h6>DIAGNOSIS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea required placeholder="Enter Diagnosis" id="diagnosis" name="diagnosis" class="materialize-textarea" maxlength="200" data-length="200">${guide1.diagnosis}</textarea>
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6>MEDICAL PRESCRIPTION:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="1st Prescription" required value="${guide1.prescription1}" id="prescription1" name="prescription1" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="2nd Prescription" value="${guide1.prescription2}" id="prescription2" name="prescription2" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="3rd Prescription" value="${guide1.prescription3}" id="prescription3" name="prescription3" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6>DOCTOR'S COMMENTS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea placeholder="Add Comment" id="extra_doctor_info" name="extra_doctor_info" class="materialize-textarea" maxlength="200" data-length="200">${guide1.extra_doctor_info}</textarea>
                  </div>
                </div>
              </span><br>
            </span>
            <br>
            <br>
            
          </form>
          </div>
        </li>
  `;
        }




        html += li1;
        somethingness++;
      }
    });
    doc_med_response_list.innerHTML = html;
  } else {
    doc_med_response_list.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  }
  if (somethingness === 0) {
    doc_med_response_list.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  } else {
    somethingness = 0;
  }
};
















/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
const doc_achieve_list = (data) => {
  var somethingness2 = 0;
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide2 = doc.data();
      if (guide2.review_state === '3' && guide2.town === userTown) {
        const li2 = `
          <li>
            <div class="collapsible-header grey lighten-4"> ${guide2.patient_name} </div>
            <div class="collapsible-body white"> ${guide2.town} </div>
          </li>
        `;
        html += li2;
        somethingness2++;
      }
    });
    doc_med_history_list.innerHTML = html;
  } else {
    doc_med_history_list.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  }
  if (somethingness2 === 0) {
    doc_med_history_list.innerHTML = '<h6 class="center-align white-text">Sorry...<br>No matching records in database</h6>';
  } else {
    somethingness2 = 0;
  }
};