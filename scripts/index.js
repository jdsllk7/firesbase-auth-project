// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged_out');
const loggedInLinks = document.querySelectorAll('.logged_in');
const doc = document.querySelectorAll('.doc');
const agent = document.querySelectorAll('.agent');
const adminItems = document.querySelectorAll('.admin');
const hide_ui = document.querySelectorAll('.hide_ui');

const current_data_counter_display = document.querySelectorAll('.current_data_counter_display');
const history_data_counter_display = document.querySelectorAll('.history_data_counter_display');
const reviewed_data_counter_display = document.querySelectorAll('.reviewed_data_counter_display');

const locate_name = document.querySelector('.locate_name');
const map_ui = document.querySelector('.map_ui');
const home_loader = document.querySelector('.home_loader');
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
var doc_unreviewed_records = 0;
var doc_med_response_list_count = 0;
var doc_med_history_list_count = 0;


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
  map_ui.style.display = 'none';
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
  map_ui.style.display = 'none';
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
  map_ui.style.display = 'none';
}



//Doctor UI
function doc_home() {
  localStorage.removeItem('map_state');
  localStorage.setItem("state", "doc_home");
  console.log('doc_home');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'block';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'none';
  map_ui.style.display = 'none';
}

function doc_med_response() {
  localStorage.removeItem('map_state');
  localStorage.setItem("state", "doc_med_response");
  console.log('doc_med_response');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'block';
  doc_med_history_ui.style.display = 'none';
  map_ui.style.display = 'none';
}

function doc_med_history() {
  localStorage.removeItem('map_state');
  localStorage.setItem("state", "doc_med_history");
  console.log('doc_med_history');
  adminItems.forEach(item => item.style.display = 'none');
  doc.forEach(item => item.style.display = 'block');
  agent.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'block';
  map_ui.style.display = 'none';
}

function mapping(name,lat,long) {
  locate_name.innerHTML = name;
  localStorage.setItem("name", name);
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);
  localStorage.setItem("map_state", "map_ui");
  console.log('map_ui');
  adminItems.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'none';
  agent_list.style.display = 'none';
  agent_form.style.display = 'none';
  agent_cards.style.display = 'none';
  map_ui.style.display = 'block';
  location.assign('index.html');
}
function map_redirect(){
  localStorage.setItem("map_state", "map_ui");
  console.log('map_ui');
  adminItems.forEach(item => item.style.display = 'none');
  doc_home_card.style.display = 'none';
  doc_med_response_ui.style.display = 'none';
  doc_med_history_ui.style.display = 'none';
  agent_list.style.display = 'none';
  agent_form.style.display = 'none';
  agent_cards.style.display = 'none';
  map_ui.style.display = 'block';
}


//Logged Out
function logged_out() {
  localStorage.removeItem('map_state');
  localStorage.setItem("state", "logged_out");
  console.log('logged_out');
  var text = "<span>Status: You're logged out!</span>";
  M.toast({
    html: text
  });
  hide_ui.forEach(item => item.style.display = 'none');
  adminItems.forEach(item => item.style.display = 'none');
  loggedInLinks.forEach(item => item.style.display = 'none');
  loggedOutLinks.forEach(item => item.style.display = 'block');
  doc.forEach(item => item.style.display = 'none');
  agent.forEach(item => item.style.display = 'none');
  map_ui.style.display = 'none';
}



function home(viewUI) {
  localStorage.removeItem('map_state');
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
  var map_state = localStorage.getItem("map_state");
  // console.log(state);
  var user_type = localStorage.getItem("user");

  //If Someone is Logged In
  if (user) {

    // Toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

    if (user_type === "Command Center") {
      brand_logo.innerHTML = 'Boss';
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
      }
      if (map_state === "map_ui") {
        map_redirect();
      } 

    } else if (user_type === "Health Agent") {
      brand_logo.innerHTML = user_type;
      if (state === "agent_home") {
        agent_home();
      } else if (state === "agent_reviewed_records") {
        agent_reviewed_records();
      } else if (state === "agent_send_records") {
        agent_send_records();
      }
      if (map_state === "map_ui") {
        map_redirect();
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
const agentListView = (guide1, town, id) => {

  guideList.style = 'block';

  if (guide1.review_state === '2' && guide1.town === town) {

    var critical_state = '';
    if (guide1.priority === 'Critical') {
      critical_state = '<span class="new badge red" data-badge-caption="Condition: ' + guide1.priority + '"></span>';
    } else {
      critical_state = ''
    }

    const html = `
          <li class="medical_data_done" data-id="${id}">
          <div class="collapsible-header grey lighten-3">
            <i class="material-icons">person</i>${guide1.patient_name}
            ${critical_state}
          </div>
          <div class="collapsible-body white">
            <span class="black-text">
            Locate Patient<br><br>
              <button onclick="mapping('${guide1.patient_name}',${guide1.coordinates.latitude},${guide1.coordinates.longitude});" 
                class="btn-floating btn waves-effect waves-light green darken-3 black-text" title="Locate Patient">
                <i class="material-icons large">room</i>
              </button>
              <hr>
            <form class="agent_done" data-id="${id}">
              <h6 class="green-text">RESPONSE TIME:</h6>
              <span>Agent's Submit Date:<br> ${guide1.agent_sent_date}</span><br><br>
              <span>Doctor's Submit Date:<br> ${guide1.review_date}</span><br>
              
              <br><hr><br>
              <h6 class="green-text">ATTENDED TO BY:</h6>
              <span>Doctor: ${guide1.doc_email}</span><br>
              <br><hr><br>
              <h6 class="green-text">PATIENT'S INFO:</h6>
              <span>Town: ${guide1.town}</span><br>
              <span>Age: ${guide1.patient_age} ${guide1.ageType}</span><br>
              <span>Sex: ${guide1.sex}</span><br>
              <span>Temperature: ${guide1.patient_temp}</span><br>
              <span>Blood Pressure: ${guide1.patient_bp}</span><br>
              <span>Weight: ${guide1.patient_weight}</span><br>
              <br><hr><br>
              <h6 class="green-text">COMMENT:</h6>
              <span>&#9830; ${guide1.textarea1}</span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S DIAGNOSIS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea readonly placeholder="Enter Diagnosis" value="" id="" name="diagnosis" class="materialize-textarea" maxlength="200" data-length="200">${guide1.diagnosis}</textarea>
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">MEDICAL PRESCRIPTION:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly required placeholder="Enter 1st Prescription" value="${guide1.prescription1}" id="" name="prescription1" type="text">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly placeholder="Enter 2nd Prescription" value="${guide1.prescription2}" id="" name="prescription2" type="text">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly placeholder="Enter 3rd Prescription" value="${guide1.prescription3}" id="" name="prescription3" type="text">
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S COMMENTS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea readonly required placeholder="Add Comment" id="" name="extra_doctor_info" class="materialize-textarea" maxlength="200" data-length="200">${guide1.extra_doctor_info}</textarea>
                  </div>
                </div>
              </span><br>
            </span>
            <a data-id="${id}" class="submit_reviewed_btn btn waves-effect waves-light green darken-3 btn-small white-text">
            <i class="material-icons right">open_in_new</i>Done</a>
          </form>
          </div>
        </li>
      `;
    guideList.innerHTML += html;
  } else {
    // var text = "<span>ERROR: No Data!</span>";
    // M.toast({
    //   html: text
    // });
  }
};













/**************************************DOC CURRENT LIST***********************************/
/**************************************DOC CURRENT LIST***********************************/
/**************************************DOC CURRENT LIST***********************************/

const doc_current_list = (guide1, town, id) => {

  doc_med_response_list.style = 'block'; 

  if (guide1.review_state === '1' && guide1.town === town) {

    var critical_state = '';
    if (guide1.priority === 'Critical') {
      critical_state = '<span class="new badge red" data-badge-caption="Condition: ' + guide1.priority + '"></span>';
    } else {
      critical_state = ''
    }

    const html = `
          <li class="medical_data" data-id="${id}">
          <div class="collapsible-header grey lighten-3">
            <i class="material-icons">person</i>${guide1.patient_name}
            ${critical_state}
          </div>
          <div class="collapsible-body white">
            <span class="black-text">
            Locate Patient<br><br>
              <button onclick="mapping('${guide1.patient_name}',${guide1.coordinates.latitude},${guide1.coordinates.longitude});" 
                class="btn-floating btn waves-effect waves-light green darken-3 black-text" title="Locate Patient">
                <i class="material-icons large">room</i>
              </button>
              <hr>
            <form class="doc_form" data-id="${id}">
              <h6 class="green-text">RESPONSE TIME:</h6>
              <span>Submitted On: ${guide1.agent_sent_date}</span><br>
              
              <br><hr><br>
              <h6 class="green-text">PATIENT'S INFO:</h6>
              <span>Town: ${guide1.town}</span><br>
              <span>Age: ${guide1.patient_age} ${guide1.ageType}</span><br>
              <span>Sex: ${guide1.sex}</span><br>
              <span>Temperature: ${guide1.patient_temp}</span><br>
              <span>Blood Pressure: ${guide1.patient_bp}</span><br>
              <span>Weight: ${guide1.patient_weight}</span><br>
              <br><hr><br>
              <h6 class="green-text">COMMENT:</h6>
              <span>&#9830; ${guide1.textarea1}</span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S DIAGNOSIS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea placeholder="Enter Diagnosis" required value="" id="diagnosis" name="diagnosis" class="materialize-textarea" maxlength="200" data-length="200">${guide1.diagnosis}</textarea>
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">MEDICAL PRESCRIPTION:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input required placeholder="Enter 1st Prescription" value="${guide1.prescription1}" id="prescription1" name="prescription1" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="Enter 2nd Prescription" value="${guide1.prescription2}" id="prescription2" name="prescription2" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input placeholder="Enter 3rd Prescription" value="${guide1.prescription3}" id="prescription3" name="prescription3" type="text" class="validate">
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S COMMENTS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea required placeholder="Add Comment" id="extra_doctor_info" name="extra_doctor_info" class="materialize-textarea" maxlength="200" data-length="200">${guide1.extra_doctor_info}</textarea>
                  </div>
                </div>
              </span><br>
            </span>
            <br>
            <a data-id="${id}" class="submit_reviewed_btn btn waves-effect waves-light green darken-3 btn-small white-text">
            <i class="material-icons right">open_in_new</i>Submit</a>
          </form>
          </div>
        </li>
      `;
    doc_med_response_list.innerHTML += html;
  } else {
    // var text = "<span>ERROR: No Data!</span>";
    // M.toast({
    //   html: text
    // });
  }

}; //end doc_current_list()















/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
/**************************************DOC ACHIEVE/HISTORY LIST***********************************/
const doc_history_list = (guide1) => {
  doc_med_history_list.style = 'block';
  if (guide1.review_state === '3') {

    var critical_state = '';
    if (guide1.priority === 'Critical') {
      critical_state = '<span class="new badge red" data-badge-caption="Condition: ' + guide1.priority + '"></span>';
    } else {
      critical_state = ''
    }

    const html = `
          <li class="medical_data" data-id="">
          <div class="collapsible-header grey lighten-3">
            <i class="material-icons">person</i>${guide1.patient_name}
            ${critical_state}
          </div>
          <div class="collapsible-body white">
            <span class="black-text">
            Locate Patient<br><br>
            <button onclick="mapping('${guide1.patient_name}',${guide1.coordinates.latitude},${guide1.coordinates.longitude});"
                class="btn-floating btn waves-effect waves-light green darken-3 black-text" title="Locate Patient">
                <i class="material-icons large">room</i>
              </button>
              <hr>
            <form class="archives" data-id="">
              <h6 class="green-text">RESPONSE TIME:</h6>
              <span>Agent's Submit Date:<br> ${guide1.agent_sent_date}</span><br><br>
              <span>Doctor's Submit Date:<br> ${guide1.review_date}</span><br>
              
              <br><hr><br>
              <h6 class="green-text">ATTENDED TO BY:</h6>
              <span>Doctor: ${guide1.doc_email}</span><br>
              <span>Health Agent: ${guide1.agent_email}</span><br>
              <br><hr><br>
              <h6 class="green-text">PATIENT'S INFO:</h6>
              <span>Town: ${guide1.town}</span><br>
              <span>Age: ${guide1.patient_age} ${guide1.ageType}</span><br>
              <span>Sex: ${guide1.sex}</span><br>
              <span>Temperature: ${guide1.patient_temp}</span><br>
              <span>Blood Pressure: ${guide1.patient_bp}</span><br>
              <span>Weight: ${guide1.patient_weight}</span><br>
              <br><hr><br>
              <h6 class="green-text">COMMENT:</h6>
              <span>&#9830; ${guide1.textarea1}</span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S DIAGNOSIS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea readonly placeholder="Enter Diagnosis" value="" id="" name="diagnosis" class="materialize-textarea" maxlength="200" data-length="200">${guide1.diagnosis}</textarea>
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">MEDICAL PRESCRIPTION:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly required placeholder="Enter 1st Prescription" value="${guide1.prescription1}" id="" name="prescription1" type="text">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly placeholder="Enter 2nd Prescription" value="${guide1.prescription2}" id="" name="prescription2" type="text">
                  </div>
                </div>
              </span><br>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <input readonly placeholder="Enter 3rd Prescription" value="${guide1.prescription3}" id="" name="prescription3" type="text">
                  </div>
                </div>
              </span><br>
              <br><hr><br>
              <h6 class="green-text">DOCTOR'S COMMENTS:</h6>
              <span>
                <div class="row">
                  <div class="input-field col l8">
                    <textarea readonly required placeholder="Add Comment" id="" name="extra_doctor_info" class="materialize-textarea" maxlength="200" data-length="200">${guide1.extra_doctor_info}</textarea>
                  </div>
                </div>
              </span><br>
            </span>

          </form>
          </div>
        </li>
      `;
    doc_med_history_list.innerHTML += html;
  } else {
    // var text = "<span>ERROR: No Data!</span>";
    // M.toast({
    //   html: text
    // });
  }
};