console.log("sasas");
window.isUpdateAvailable = new Promise(function (resolve, reject) {
  // lazy way of disabling service workers while developing
  if ('serviceWorker' in navigator && ['localhost', '127'].indexOf(location.hostname) === -1) {
    // register service worker file
    navigator.serviceWorker.register('../sw.js')
      .then(reg => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log("New update available");
                  // var text = '<span>New Updates Available. Reload to Apply</span><button class="btn-flat toast-action">Okay</button>';
                  // M.toast({
                  //   html: text
                  // });
                  instance_models.open();
                  resolve(true);
                } else {
                  console.log("No update available");
                  // No update available
                  resolve(false);
                }
                break;
            }
          };
        };
      })
      .catch(err => console.error('[SW ERROR]', err));
  }
});
















// Notifications
// Notification.requestPermission(status => {
//   // console.log('Notification Permission Status', status);
// });

// // displayNotification("jdslk");
// function displayNotification(msg) {

//   const options = {
//     body: 'VIEW INCOMING DATA?',
//     vibrate: [100, 50, 100],
//     data: { primaryKey: 1 }
//   };

//   if (Notification.permission === 'granted') {
//     navigator.serviceWorker.getRegistration()
//       .then(reg => {
//         // reg.clear
//         reg.showNotification(msg, options);
//       });
//   }
// }//ene displayNotification() 

// navigator.serviceWorker.getRegistration().then(reg => {
//   reg.pushManager.subscribe({
//     userVisibleOnly: true
//   }).then(sub => {
//     //send sub.toJSON() to server
//   });
// });