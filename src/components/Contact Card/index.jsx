import React, { useContext } from 'react';
import { Avatar, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaSuitcase, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { BsTelephoneFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { ThemeContext } from '../../utils/themeContext';
import './contactCard.sass';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    name: {
        '&&': {
            lineHeight: 1
        }
    },
    avatar: {
        marginRight: 10
    }
}));

const ContactCard = ({ contact, company, onRemoveContact, onOpenContactDialog }) => {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles();

    return (
        <div className={`contact-card-container contact-card-container-${theme}`}>
            <div className="contact-card-header">
                <div className="user">
                    <Avatar className={classes.avatar} />
                    <div>
                        <Typography
                            className={clsx(classes.text, classes.name)}
                        >
                            {contact.firstName} {contact.lastName}
                        </Typography>
                        <Typography
                            className={classes.text}
                            variant="caption"
                        >
                            {company}
                        </Typography>
                    </div>
                </div>
                <div className="actions">
                    <button
                        onClick={() => onOpenContactDialog('editing', contact)}
                        className={`icon-button icon-button-${theme}`}
                    >
                        <MdEdit />
                    </button>
                    <button
                        onClick={() => onRemoveContact(contact.id)}
                        className={`icon-button icon-button-${theme} trash`}
                    >
                        <FiTrash />
                    </button>
                </div>
            </div>
            <div className="contact-card-content">
                <Divider className="divider" />
                <div className="contact">
                    <div className="icon-wrapper">
                        <FaSuitcase size={16} />
                    </div>
                    <Typography className={classes.text}>{contact.role}</Typography>
                </div>
                <div className="contact">
                    <div className="icon-wrapper">
                        <BsTelephoneFill size={16} />
                    </div>
                    <Typography className={classes.text}>{contact.phone ? contact.phone : "None"}</Typography>
                </div>
                <div className="contact">
                    <div className="icon-wrapper">
                        <HiMail size={20} />
                    </div>
                    <Typography className={classes.text}>{contact.email ? contact.email : "None"}</Typography>
                </div>
                {(contact.linkedin || contact.facebook) &&
                    <div>
                        <Divider className="divider" />
                        <div className="social-media">
                            {contact.linkedin &&
                                <a
                                    className={`social-link social-link-space social-link-${theme}`}
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaLinkedinIn id="linkedin" />
                                </a>
                            }
                            {contact.facebook &&
                                <a
                                    className={`social-link social-link-${theme}`}
                                    href={contact.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaFacebookF id="facebook" />
                                </a>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ContactCard;