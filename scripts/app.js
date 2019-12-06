// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../sw.js')
//     .then(reg => console.log())
//     .catch(err => console.log('service worker not registered', err));
// }









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
                  alert("New update available");
                  resolve(true);
                } else {
                  console.log("new update available");
                  // No update available
                  alert("No update available");
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






// window['isUpdateAvailable']
//   .then(isAvailable => {
//     if (isAvailable) {
//       var text = "<span>New Update available! Reload the web-app to see the latest changes.</span>";
//         M.toast({
//           html: text
//         });
//     }
//   });


















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