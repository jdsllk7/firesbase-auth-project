if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .then(reg => console.log())
    .catch(err => console.log('service worker not registered', err));
}

Notification.requestPermission(status => {
  // console.log('Notification Permission Status', status);
});

// displayNotification("jdslk");
function displayNotification(msg) {

  const options = {
    body: 'VIEW INCOMING DATA?',
    vibrate: [100, 50, 100],
    data: { primaryKey: 1 }
  };

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration()
      .then(reg => {
        // reg.clear
        reg.showNotification(msg, options);
      });
  }
}//ene displayNotification() 

// navigator.serviceWorker.getRegistration().then(reg => {
//   reg.pushManager.subscribe({
//     userVisibleOnly: true
//   }).then(sub => {
//     //send sub.toJSON() to server
//   });
// });