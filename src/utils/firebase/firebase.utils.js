import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import {
   getFirestore,
   doc, 
   getDoc,
   setDoc
} from 'firebase/firestore'
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwX4RUM0Dk9n--DTbRkOWPIL4K0xclvNw",
    authDomain: "crwn-clothing-db-309b8.firebaseapp.com",
    projectId: "crwn-clothing-db-309b8",
    storageBucket: "crwn-clothing-db-309b8.appspot.com",
    messagingSenderId: "1043782356641",
    appId: "1:1043782356641:web:998c57296e744961c22ae0"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider(); 
  
  googleProvider.setCustomParameters({ 
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}//NEW 
    ) => {
    if(!userAuth) return; 

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,//new
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; 
    
    return await createUserWithEmailAndPassword(auth, email, password) 

  };