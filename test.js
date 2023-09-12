document.addEventListener("DOMContentLoaded", function () {
    // Initialize Firebase
    var firebaseConfig  = {
        apiKey: "AIzaSyDJdjvmdJeS7_WYMIHU-zv4b4Fc2D5s-Yo",
       authDomain: "contact-form-7ec86.firebaseapp.com",
       databaseURL: "https://contact-form-7ec86-default-rtdb.firebaseio.com",
       projectId: "contact-form-7ec86",
       storageBucket: "contact-form-7ec86.appspot.com",
       messagingSenderId: "643370383331",
       appId: "1:643370383331:web:61c6ca2a2f257b24ba92d6"
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    // Get a reference to the Firestore database
    const db = firebase.firestore();
  
    // Reference to the qr-scanner element
    const scanner = document.getElementById("scanner");
  
    // Function to start QR code scanner
    function startScanner() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        scanner.start();
      } else {
        console.error("No camera access.");
        guestStatus.innerText = "Camera access error!";
      }
    }
  
    // Rest of your JavaScript code here...
  
    // Add an event listener to the submit button
    submitBtn.addEventListener("click", handleFormSubmit);
  });
  