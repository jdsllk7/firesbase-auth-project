// add admin cloud function
// const adminForm = document.querySelector('.admin-actions');
// adminForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const adminEmail = document.querySelector('#admin-email').value;
//   const addAdminRole = functions.httpsCallable('addAdminRole');
//   addAdminRole({
//     email: adminEmail
//   }).then(result => {
//     console.log(result);
//   });
// });


// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  // const email = signupForm['signup-email'].value;
  // const password = signupForm['signup-password'].value;

  // // sign up the user & add firestore data
  // auth.createUserWithEmailAndPassword(email, password).then(cred => {
  //   return db.collection('users').doc(cred.user.uid).set({
  //     bio: signupForm['signup-bio'].value
  //   });
  // }).then(() => {
  //   // close the signup modal & reset form
  //   const modal = document.querySelector('#modal-signup');
  //   M.Modal.getInstance(modal).close();
  //   signupForm.reset();
  //   signupForm.querySelector('.error').innerHTML = '';
  // }).catch(err => {
  //   signupForm.querySelector('.error').innerHTML = err.message;
  // });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  home_out();
  console.log("You've logged out!")
});
// logout2
const logout2 = document.querySelector('#logout2');
logout2.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  home_out();
  console.log("You've logged out!");
  var text = '<span>STATUS: Thank you, Goodbye...</span>';
  M.toast({
    html: text
  });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  login_btn.innerHTML = "<div class='preloader-wrapper small active'><div class='spinner-layer spinner-blue-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    login_btn.innerHTML = "Login";
    home();
    var text = '<span>STATUS: Welcome to TeleHealth...</span>';
    M.toast({
      html: text
    });
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
    login_btn.innerHTML = "Login";
  });

});