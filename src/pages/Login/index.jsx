import React, { useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Firebase
import { authentication } from '../../utils/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const onSignInWithGoogle = () => {
        signInWithPopup(authentication, provider)
            .then(() => navigate('/dashboard'))
            .catch((error) => {
                alert(error.message);
            });
    }

    const onRegister = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(authentication, email.trim(), password.trim())
            .then(async () => {
                updateProfile(authentication.currentUser, {
                    displayName: `${firstName.trim()} ${lastName.trim()}`
                });
            })
            .then(() => {
                const displayName = `${firstName.trim()} ${lastName.trim()}`;
                navigate('/dashboard', { state: { displayName } })
            })
            .catch((error) => {
                alert(error.message);
                setDisabled(false);
            });
    }

    const onSignIn = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(authentication, email.trim(), password.trim())
            .then(() => navigate('/dashboard'))
            .catch((error) => {
                alert(error.message);
                setDisabled(false);
            })
    }

    return (
        <div>
            <h1>Regisration</h1>
            <form onSubmit={onRegister}>
                <div className="input-wrapper">
                    <TextField
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="Email"
                        type="email"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <MdVisibilityOff />
                                        :
                                        <MdVisibility />
                                    }
                                </InputAdornment>
                            )
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="First name"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="Last name"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <Button type="submit">Register</Button>
            </form>
            <h1>Login</h1>
            <form onSubmit={onSignIn}>
                <div className="input-wrapper">
                    <TextField
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="Email"
                        type="email"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // className={classes.input}
                        autoComplete="off"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <MdVisibilityOff />
                                        :
                                        <MdVisibility />
                                    }
                                </InputAdornment>
                            )
                            // classes: {
                            //     input: classes.text
                            // }
                        }}
                    />
                </div>
                <Button type="submit">Login</Button>
            </form>
            <Button onClick={onSignInWithGoogle}>Sign in with google</Button>
        </div>
    )
}

export default LoginPage;