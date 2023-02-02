import React from 'react';
import { Avatar, Divider, Typography, IconButton } from '@mui/material';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import './contactCard.sass';

const ContactCard = ({ contact }) => {
    return (
        <div className="contact-card-container">
            <div className="contact-card-header">
                <div className="user">
                    <Avatar />
                    <Typography>{contact.firstName} {contact.lastName}</Typography>
                </div>
                <div className="actions">
                    <IconButton
                        size="small"
                    >
                        <MdEdit />
                    </IconButton>
                    <IconButton
                        size="small"
                    >
                        <MdDelete />
                    </IconButton>
                </div>
            </div>
            <Divider className="divider" />
            <div className="contact">
                <div className="icon-wrapper">
                    <BsTelephoneFill size={16} />
                </div>
                <Typography>{contact.phone ? contact.phone : "None"}</Typography>
            </div>
            <div className="contact">
                <div className="icon-wrapper">
                    <HiMail size={20} />
                </div>
                <Typography>{contact.email ? contact.email : "None"}</Typography>
            </div>
            {(contact.linkedin || contact.facebook) &&
                <div>
                    <Divider className="divider" />
                    <div className="social-media">
                        {contact.linkedin &&
                            <a href={contact.linkedin} target="_blank" rel="noreferrer">
                                <FaLinkedinIn size={25} />
                            </a>
                        }
                        {contact.facebook &&
                            <a href={contact.linkedin} target="_blank" rel="noreferrer">
                                <FaFacebookF size={21} />
                            </a>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactCard;