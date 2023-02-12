import React, { useState, useContext } from 'react';
import { Button, TextField, InputAdornment, Typography } from '@mui/material';
import { MdOutlineAlternateEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../utils/themeContext';
import { Switch } from '../../components';
import useStyles from './styles';
import './homepage.sass';

// Firebase
import { authentication } from '../../utils/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import clsx from 'clsx';

const HomePage = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const provider = new GoogleAuthProvider();

    const toggleMode = (mode) => {
        setMode(mode);
        setEmail('');
        setPassword('');
    }

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
        <div className={`homepage-container homepage-container-${theme}`}>
            <div className="left-container">
                <div className="switch">
                    <Switch
                        sx={{ m: 1 }}
                        onChange={toggleTheme}
                        checked={theme === 'light' ? false : true}
                    />
                </div>
                <div className="auth-container">
                    {mode === 'login' ?
                        <form onSubmit={onSignIn}>
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
                            <div className={`input-wrapper input-wrapper-${theme}`}>
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
                                        startAdornment: (<MdLock className="start-adornment" />),
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
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.button}
                            >
                                Sign In
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
                                    Don't have an account yet?
                                </Typography>
                                <Button
                                    variant="text"
                                    disableRipple
                                    className={classes.switch}
                                    onClick={() => toggleMode('registration')}
                                >
                                    <Typography className={classes.text} variant="caption">
                                        Create one!
                                    </Typography>
                                </Button>
                            </div>
                        </form>
                        :
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
                            >
                                Sign Up
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
                    }

                </div>
            </div >
            <div className="right-container">
            </div>
        </div >
    )
}

export default HomePage;