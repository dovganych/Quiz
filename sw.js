if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register ('service-worker.js', { scope: '/Quiz/' }).then(reg => {
    console.log ('Registration succeeded');
  }).catch(error => {
    console.log ('Registration failed');
  });
}