let isIntervalRunning = false;

let intervalId = setInterval(() => {
   if (!isIntervalRunning) {
      favicon.href = "images/amazon-mobile-logo-white.png";
      isIntervalRunning = true;
   } else {
      favicon.href = "images/amazon-mobile-logo.png"; 
      isIntervalRunning = false;
   }

}, 5000);