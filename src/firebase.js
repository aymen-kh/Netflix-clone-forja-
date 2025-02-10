// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc, 
    collection,
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGniR2Z7AK1P1kfmqNHUGz7WmjMjarQCM",
  authDomain: "netflix-clone-f33dd.firebaseapp.com",
  projectId: "netflix-clone-f33dd",
  storageBucket: "netflix-clone-f33dd.firebasestorage.app",
  messagingSenderId: "99347359322",
  appId: "1:99347359322:web:f49ed11e6c01a0317ada63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name,email,password)=>{
        try {
           const res= await createUserWithEmailAndPassword(auth,email,password);
           const user = res.user;
           await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider:"local",
            email,

           });
        } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(' '))
            
        }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
