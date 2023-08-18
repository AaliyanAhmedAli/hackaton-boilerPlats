import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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


const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
    console.log(fileInput.files[0])
    userProfile.src = URL.createObjectURL(fileInput.files[0])
})

const updateProfile = document.getElementById("update-profile");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
        fullName: fullName.value,
        email: email.value,
        picture: imageUrl
    });
    Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
    })
})


const logoutBtn = document.getElementById("logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "../pages/login.html"
    }).catch((error) => {
        // An error happened.
    });

})
