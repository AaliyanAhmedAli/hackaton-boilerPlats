
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB63nN8_9qyMv93NSsSDb-tFWMWiYBuHQs",
  authDomain: "my-all-work.firebaseapp.com",
  projectId: "my-all-work",
  storageBucket: "my-all-work.appspot.com",
  messagingSenderId: "353575692381",
  appId: "1:353575692381:web:acdaf37cfb3ce6657c85b4",
  measurementId: "G-WP0D1RYMRG"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();
const userProfile = document.getElementById("user-profile");


const registerBtn = document.getElementById('register-btn');

registerBtn && registerBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    fullName: fullName.value,
                    email: email.value,
                    password: password.value
                });
                Swal.fire({
                    icon: 'success',
                    title: 'User register successfully',
                })
                localStorage.setItem("uid", user.uid)
                location.href = "profile.html"
            } catch (err) {
                console.log(err)
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})



