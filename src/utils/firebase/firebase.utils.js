import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
  getDoc,
  doc,
  setDoc,
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtVDKe_TabMzbU_9js1zG9zQEJKyCZqr8",
    authDomain: "cl-shopping-db.firebaseapp.com",
    projectId: "cl-shopping-db",
    storageBucket: "cl-shopping-db.appspot.com",
    messagingSenderId: "39448903757",
    appId: "1:39448903757:web:fcdcb96cded7952e211c04"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//   initialize provider 
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account",
  })

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=>{
  const userDocRef = doc(db,'users',userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      })
    } catch (error){
      console.log(error.message);
    }
  }
      return userDocRef;
}