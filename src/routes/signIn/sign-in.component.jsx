import "./sign-in.styles.scss";
import {signInWithGooglePopup,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../../components/sign-up-component/sign-up-component.jsx";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user}  = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(user);
    }
    return (
        <div className="sign-in">
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser} >SignIn-google-popup</button>
            <SignUpForm/>
        </div>
    );
}

export default SignIn;