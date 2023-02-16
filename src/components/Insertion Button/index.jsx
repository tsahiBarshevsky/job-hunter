import React from 'react';
import { IconButton } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import './insertionButton.sass';

const InsertionButton = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            aria-label="add"
            className="button-container"
        >
            <BsPlusLg
                color="#ffffff"
                size={20}
            />
        </IconButton>
    )
}

export default InsertionButton;