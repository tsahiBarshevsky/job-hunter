import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { PulseLoader } from "react-spinners";
import { Button, TextField, InputAdornment, Typography } from '@mui/material';
import { MdOutlineAlternateEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../utils/themeContext';
import { notify } from '../../../utils/firebaseErrors';
import useStyles from '../styles';
import '../authentication.sass';

// Firebase
import { authentication } from '../../../utils/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const Registration = ({ toggleMode }) => {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const provider = new GoogleAuthProvider();

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
                notify(error.message);
                setDisabled(false);
            });
    }

    const onSignInWithGoogle = () => {
        signInWithPopup(authentication, provider)
            .then(() => navigate('/dashboard'))
            .catch((error) => {
                notify(error.message);
            });
    }

    return (
        <div className={`auth-box auth-box-${theme}`}>
            <Typography
                className={classes.title}
                variant="h4"
            >
                Welcome to Job Hunter!
            </Typography>
            <Typography
                className={classes.subtitle}
                variant="h6"
            >
                A powerful job tracker
            </Typography>
            <form onSubmit={onRegister}>
                <Typography className={classes.text}>Email Address</Typography>
                <div className={`input-wrapper input-wrapper-${theme} wrapper-space`}>
                    <TextField
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.input}
                        autoComplete="off"
                        placeholder="john@email.com"
                        type="email"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (<MdOutlineAlternateEmail className="start-adornment" />),
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <Typography className={classes.text}>Password</Typography>
                <div className={`input-wrapper input-wrapper-${theme} wrapper-space`}>
                    <TextField
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.input}
                        autoComplete="off"
                        placeholder="6+ characters required"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (< MdLock className="start-adornment" />),
                            endAdornment: (
                                <InputAdornment position="end"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <MdVisibilityOff className="eye" />
                                        :
                                        <MdVisibility className="eye" />
                                    }
                                </InputAdornment>
                            ),
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <Typography className={classes.text}>First Name</Typography>
                <div className={`input-wrapper input-wrapper-${theme} wrapper-space`}>
                    <TextField
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={classes.input}
                        autoComplete="off"
                        placeholder="What's your first name?"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (<BiUser className="start-adornment" />),
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <Typography className={classes.text}>Last Name</Typography>
                <div className={`input-wrapper input-wrapper-${theme} `}>
                    <TextField
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={classes.input}
                        autoComplete="off"
                        placeholder="What's your last name?"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (<BiUser className="start-adornment" />),
                            classes: {
                                input: classes.text
                            }
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    disabled={disabled}
                >
                    {disabled ? <PulseLoader color='white' size={8} /> : "Sign Up"}
                </Button>
                <Typography className={`or or-${theme}`}>
                    <span className={`span span-${theme}`}>Or</span>
                </Typography>
                <Button
                    variant="contained"
                    className={clsx(classes.google, theme === 'light' ? classes.googleLight : classes.googleDark)}
                    startIcon={<FcGoogle />}
                    onClick={onSignInWithGoogle}
                >
                    Sign In With Google
                </Button>
                <div className="message">
                    <Typography className={classes.text} variant="caption">
                        Already have an account?
                    </Typography>
                    <Button
                        variant="text"
                        disableRipple
                        className={classes.switch}
                        onClick={() => toggleMode('login')}
                    >
                        <Typography className={classes.text} variant="caption">
                            Sign In!
                        </Typography>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Registration;