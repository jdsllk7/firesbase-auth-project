// enable offline data
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });


// ADD ADMIN CLOUD FUNCTION
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  progress.style.visibility = "visible";
  status_upgrade_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({
    email: adminEmail
  }).then(result => {
    console.log(result);

    db.collection("users").where("email", "==", adminEmail)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection('users').doc(doc.id).update({
            bio: 'Command Center',
            town: 'base'
          });

          adminForm.reset();
          var text = '<span>STATUS: Privilege Status Upgraded!</span>';
          M.toast({
            html: text
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        var text = "<span>ERROR: Email Doesn't Exist!</span>";
        M.toast({
          html: text
        });
      });

    status_upgrade_btn.innerHTML = "Make admin";
    progress.style.visibility = "hidden";
  });
});








// LISTEN FOR AUTH STATUS CHANGES
var abc = 0;
var xyz = 0;
var abc1 = 0;
var xyz1 = 0;
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });

    //get town for current user
    db.collection("users").where("email", "==", user.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var current_data_count = 0;
          var history_data_count = 0;
          var reviewed_data_count = 0;
          db.collection('guides').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              console.log(change.type);
              if (change) {

                //if send data = 2
                if (change.doc.data().review_state === '2' && change.doc.data().town === doc.data().town) {
                  agentListView(change.doc.data(), doc.data().town, change.doc.id);
                  reviewed_data_count++;
                  // if(abc === 1 && change.doc.data().agent_email === user.email){
                  //   displayNotification('Hello Agent');
                  //   abc=10;
                  // }
                  if (change.doc.data().agent_email === user.email && abc === 0 && localStorage.getItem("map_state") != "map_ui") {
                    // displayNotification('Hello Agent');
                    abc++;
                  }
                  if (change.type === "modified" && change.doc.data().agent_email === user.email && abc1 === 0) {
                    // displayNotification('Hello Agent');
                    abc1++;
                  }
                  
                }
                //if doc review current cases = 1
                if (change.doc.data().review_state === '1' && change.doc.data().town === doc.data().town) {
                  doc_current_list(change.doc.data(), doc.data().town, change.doc.id);
                  current_data_count++;
                  // if(xyz === 1 && change.doc.data().doc_email === user.email){
                  //   displayNotification('Hello Doctor');
                  //   xyz=10;
                  // }
                  if (change.doc.data().doc_email === user.email && xyz === 0 && localStorage.getItem("map_state") != "map_ui") {
                    // displayNotification('Hello Doctor');
                    xyz++;
                  }
                  if (change.type === "modified" && change.doc.data().doc_email === user.email && xyz1 === 0) {
                    // displayNotification('Hello Doctor');
                    xyz1++;
                  }
                  
                }
                //if doc history = 3
                if (change.doc.data().review_state === '3') {
                  doc_history_list(change.doc.data());
                  history_data_count++;
                  // displayNotification();
                }

              } //end if()

            }, err => console.log());
            current_data_counter_display.forEach(item => item.style.display = 'block');
            current_data_counter_display.forEach(item => item.innerHTML = current_data_count);
            history_data_counter_display.forEach(item => item.style.display = 'block');
            history_data_counter_display.forEach(item => item.innerHTML = history_data_count);
            reviewed_data_counter_display.forEach(item => item.style.display = 'block');
            reviewed_data_counter_display.forEach(item => item.innerHTML = reviewed_data_count);

            progress.style.visibility = "hidden";
          }, err => console.log());
        });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
        var text = "<span>ERROR: Email Doesn't Exist!</span>";
        M.toast({
          html: text
        });
      });

  } else {
    progress.style.visibility = "hidden";
    setupUI();
    agentListView([]);
    doc_history_list([]);
    doc_current_list([]);

  }
});









// REGISTER ACCOUNT
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  progress.style.visibility = "visible";

  sigup_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value,
      town: signupForm['town1'].value,
      email: email
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
    var text = '<span>STATUS: Successful. Login as Admin to register another.</span>';
    M.toast({
      html: text
    });
    progress.style.visibility = "hidden";
    console.log("Account Registered");
    sigup_btn.innerHTML = "Submit";
    //logout immediately a registering a user
    auth.signOut();
    brand_logo.innerHTML = 'Tele [Health]';
    logged_out();
    localStorage.setItem("user", "unknown");
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
    sigup_btn.innerHTML = "Submit";
    progress.style.visibility = "hidden";
  });

});








// LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  progress.style.visibility = "visible";
  auth.signOut().then(function () {
    brand_logo.innerHTML = 'Tele [Health]';
    localStorage.setItem("user", "unknown");
    // var text = '<span>STATUS: Thank you, Goodbye...</span>';
    // M.toast({
    //   html: text
    // });
    logged_out();
    console.log("Logged Out");
    location.assign("index.html");
  });
});
// LOGOUT2
const logout2 = document.querySelector('#logout2');
logout2.addEventListener('click', (e) => {
  progress.style.visibility = "visible";
  auth.signOut().then(function () {
    brand_logo.innerHTML = 'Tele [Health]';
    localStorage.setItem("user", "unknown");
    // var text = '<span>STATUS: Thank you, Goodbye...</span>';
    // M.toast({
    //   html: text
    // });
    logged_out();
    console.log("Logged Out");
    location.assign("index.html");
  });
});









// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  progress.style.visibility = "visible";

  login_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {

    db.collection("users").where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log("Logged in as: " + doc.data().bio);

          if (doc.data().bio.includes("Doctor") === true) {
            localStorage.setItem("user", doc.data().bio);
            brand_logo.innerHTML = doc.data().bio;
            doc_home();

          } else if (doc.data().bio.includes("Health Agent") === true) {
            localStorage.setItem("user", doc.data().bio);
            brand_logo.innerHTML = doc.data().bio;
            agent_home();

          } else if (doc.data().bio.includes("Command Center") === true) {
            localStorage.setItem("user", doc.data().bio);
            brand_logo.innerHTML = doc.data().bio;
            admin();
          }
        });
        location.assign("index.html");
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        progress.style.visibility = "hidden";
      });

    // close the sign in modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    login_btn.innerHTML = "Login";

    var text = '<span>STATUS: Welcome to TeleHealth...</span>';
    M.toast({
      html: text
    });
    progress.style.visibility = "hidden";
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
    login_btn.innerHTML = "Login";
    progress.style.visibility = "hidden";
  });

});














// SEND PATCIENT'S DATA
const form2 = document.querySelector('#patient_form_id');
form2.addEventListener('submit', (e) => {
  e.preventDefault();
  progress.style.visibility = "visible";

  if (!lat || lat === 0) {
    var text = '<span class="white-text text-darken-1"><b>Please Select Patient\'s Location<i class="material-icons">room</i></b></span>';
    M.toast({
      html: text
    });
    progress.style.visibility = "hidden";
  } else {
    records_submit_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

    let date = new Date();
    let time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    var patient_temp = '',
      patient_bp1 = '',
      patient_weight = '';
    if (form2.patient_temp.value == null || form2.patient_temp.value == "") {
      patient_temp = 'Non';
    } else {
      patient_temp = form2.patient_temp.value + '℃';
    }

    if (form2.patient_bp2.value == null || form2.patient_bp1.value == "") {
      patient_bp1 = 'Non';
      console.log('Non');
    } else {
      patient_bp1 = form2.patient_bp1.value + '/' + form2.patient_bp2.value + 'mmHg';
    }

    if (form2.patient_weight.value == null || form2.patient_weight.value == "") {
      patient_weight = 'Non';
    } else {
      patient_weight = form2.patient_weight.value + 'kg';
    }

    const patient_info = {
      agent_email: user_email,
      patient_name: form2.patient_name.value,
      patient_age: form2.patient_age.value,
      ageType: form2.ageType.value,
      sex: document.querySelector('input[name=sex]:checked').value,
      patient_temp: patient_temp,
      patient_bp: patient_bp1,
      patient_weight: patient_weight,
      textarea1: form2.textarea1.value,
      priority: form2.priority.value,
      town: form2.town.value,
      location: form2.location.value,
      coordinates: new firebase.firestore.GeoPoint(lat, long),
      agent_sent_date: date.toDateString() + " " + time,
      doc_email: '',
      prescription1: '',
      prescription2: '',
      prescription3: '',
      diagnosis: '',
      extra_doctor_info: '',
      review_date: '',
      review_state: '1'
    };

    db.collection('guides').doc('id' + new Date().valueOf()).set(patient_info).then(() => {
      records_submit_btn.innerHTML = 'submit <i class="material-icons right">open_in_new</i>';
      var text = '<span>STATUS: Data Sent Successful!</span>';
      M.toast({
        html: text
      });
      console.log('Data Sent Successfully');
      form2.reset();
      progress.style.visibility = "hidden";
      lat = 0;
    }).catch(err => {
      records_submit_btn.innerHTML = 'submit <i class="material-icons right">open_in_new</i>';
      console.log(err.message);
      progress.style.visibility = "hidden";
    });
  } //end if-lat


});












//DOC SENDING REVIEWED DATA
doc_med_response_list.addEventListener('click', evt => {
  if (evt.target.tagName === 'A') {
    home_loader.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";
    var id = evt.target.getAttribute('data-id');
    var form3 = document.querySelector(`.doc_form[data-id=${id}]`);
    if (form3.prescription1.value &&
      form3.diagnosis.value &&
      form3.extra_doctor_info.value) {

      let date = new Date();
      let time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

      db.collection('guides').doc(id).update({
          doc_email: user_email,
          prescription1: form3.prescription1.value,
          prescription2: form3.prescription2.value,
          prescription3: form3.prescription3.value,
          diagnosis: form3.diagnosis.value,
          extra_doctor_info: form3.extra_doctor_info.value,
          review_date: date.toDateString() + " " + time,
          review_state: '2'
        })
        .then(function () {
          form3.reset();
          console.log("Data successfully updated!");
          var text = '<span class="white-text text-darken-1"><b>Data Uploaded Successfully!<i class="material-icons">error_outline</i></b></span>';
          M.toast({
            html: text
          });
          var medical_data = document.querySelector(`.medical_data[data-id=${id}]`);
          medical_data.style.display = 'none';
          home_loader.innerHTML = '<i class="material-icons white-text">home</i>';
          current_data_counter_display.forEach(item => item.innerHTML = '-');
        }).catch(err => {
          var text = '<span class="white-text text-darken-1"><b>Unexpected Error Occurred...<i class="material-icons">check_box</i></b></span>';
          M.toast({
            html: text
          });
          home_loader.innerHTML = '<i class="material-icons white-text">home</i>';
          console.log(err.message);
        });

    } else {
      var text = '<span class="white-text text-darken-1"><b>Fill In Form Correctly...<i class="material-icons">check_box</i></b></span>';
      M.toast({
        html: text
      });
      console.log('Fill In Form Correctly...');
      home_loader.innerHTML = '<i class="material-icons white-text">home</i>';
    } //end else

  } //end if()
});











//AGENT FINISHED ATTENTING TO...
guideList.addEventListener('click', evt => {
  if (evt.target.tagName === 'A') {
    home_loader.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-yellow-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";
    var id = evt.target.getAttribute('data-id');

    db.collection('guides').doc(id).update({
        review_state: '3'
      })
      .then(function () {
        console.log("We hope your patient gets well soon!");
        var text = '<span class="white-text text-darken-1"><b>We hope your patient gets well soon!</b></span>';
        M.toast({
          html: text
        });
        var medical_data_done = document.querySelector(`.medical_data_done[data-id=${id}]`);
        medical_data_done.style.display = 'none';
        home_loader.innerHTML = '<i class="material-icons white-text">home</i>';
        reviewed_data_counter_display.forEach(item => item.innerHTML = '-');
      }).catch(err => {
        var text = '<span class="white-text text-darken-1"><b>Unexpected Error Occurred...<i class="material-icons">check_box</i></b></span>';
        M.toast({
          html: text
        });
        home_loader.innerHTML = '<i class="material-icons white-text">home</i>';
        console.log(err.message);
      });

  } //end if()
});