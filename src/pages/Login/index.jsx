import React from 'react';
import { Button } from '@mui/material';

// Firebase
import { authentication } from '../../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginPage = () => {
    const provider = new GoogleAuthProvider();

    const onSignInWithGoogle = () => {
        signInWithPopup(authentication, provider)
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <div>
            <Button onClick={onSignInWithGoogle}>Sign in with google</Button>
        </div>
    )
}

export default LoginPage;