import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged , signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB63nN8_9qyMv93NSsSDb-tFWMWiYBuHQs",
  authDomain: "my-all-work.firebaseapp.com",
  projectId: "my-all-work",
  storageBucket: "my-all-work.appspot.com",
  messagingSenderId: "353575692381",
  appId: "1:353575692381:web:acdaf37cfb3ce6657c85b4",
  measurementId: "G-WP0D1RYMRG"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();
const userProfile = document.getElementById("user-profile");


const loginBtn = document.getElementById('login-btn');

loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                Swal.fire({
                    icon: 'success',
                    title: 'User login successfully',
                })
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




document.getElementById('Google').addEventListener('click',()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})