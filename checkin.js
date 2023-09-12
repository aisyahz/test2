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

    // Reference to input fields and submit button
    const guestNameInput = document.getElementById("guestName");
    const guestICInput = document.getElementById("guestIC");
    const guestStatus = document.getElementById("guestStatus");
    const scanBtn = document.getElementById("scanBtn");
    const submitBtn = document.getElementById("submitBtn");
    const video = document.getElementById("video"); // Video element

    // Initialize QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: video, // Use the video element
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment", // Use the rear camera if available
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"],
        },
    }, function (err) {
        if (err) {
            console.error("Error initializing QuaggaJS:", err);
            guestStatus.innerText = "Camera access error!";
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected((data) => {
        handleDetected(data.codeResult.code);
    });

    function startScanner() {
        guestStatus.innerText = "Scanning...";
        Quagga.start();
    }

    function handleDetected(content) {
        Quagga.stop();
        guestStatus.innerText = "QR code detected: " + content;
        // You can handle the detected content here
        // For example, parse JSON data or display it in the input fields
        try {
            const data = JSON.parse(content);
            guestNameInput.value = data.name || '';
            guestICInput.value = data.ic || '';
        } catch (error) {
            console.error("Error parsing QR code data:", error);
            guestStatus.innerText = "Invalid QR code!";
        }
    }

    // Add an event listener to the Scan QR Code button
    scanBtn.addEventListener("click", () => {
        startScanner();
    });

    // Function to handle the form submission
    function handleFormSubmit() {
        // Get the values from the input fields
        const name = guestNameInput.value;
        const ic = guestICInput.value;

        // Save the data to Firestore or your preferred storage
        // Modify this part as per your Firebase configuration
        db.collection("attendance")
            .add({
                name,
                ic,
                checkInTime: new Date(),
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                guestStatus.innerText = "Check-In successful!";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                guestStatus.innerText = "Check-In failed!";
            });
    }

    // Add an event listener to the submit button
    submitBtn.addEventListener("click", handleFormSubmit);
});
