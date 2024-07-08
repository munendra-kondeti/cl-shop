import {useState} from 'react';
import './sign-up-styles.scss';
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { doc } from 'firebase/firestore';
import FormInput from "../form-input/form-input.component.jsx"
import Button from "../button/button.component.jsx";

const defaultFormFields = {
    displayName:'',
    email : '',
    password: '',
    confirmPassword : ''
}

const SignUpForm = ()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password === confirmPassword){
            alert("password do not match");
            return;
        }try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            
            await createUserDocumentFromAuth(user,{displayName})

            resetFormFields();
            

        } catch (error){
            if (error.code === 'auth/email-already-in-use'){
                alert("Cannot create user, email already in use")
            }else{
                console.log(error.message);
            }
        }
    }

    const handleChange = (event) =>{
        const {name,value} = event.target;
        
        setFormFields({...formFields,[name]:value});
    }


    return (
        <div className="sign-up-container">
            <h2>Don't have a account</h2>
            <span>SignUp with your email and password</span>
            <form onSubmit={handleSubmit } >
                <FormInput 
                    label= 'Display name'
                    required type="text" 
                    onChange={handleChange } 
                    name='displayName' 
                    value={displayName}
                />
                <FormInput 
                    label= 'EMail'
                    required type="email" 
                    onChange={handleChange } 
                    name='email' 
                    value={email}
                />
                <FormInput 
                    label= 'password'
                    required type="password" 
                    onChange={handleChange } 
                    name='password' 
                    value={password}
                />
                <FormInput 
                    label= 'confirm password'
                    required type="password" 
                    onChange={handleChange } 
                    name='confirmPassword' 
                    value={confirmPassword}
                />
                <Button children='Sign-up'  type="submit" />
            </form>
        </div>
    );
}

export default SignUpForm;