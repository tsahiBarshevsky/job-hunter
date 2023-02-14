import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    error: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            color: red[500]
        }
    },
    paper: {
        '&&': {
            borderRadius: 15,
            width: 480,
            '@media (max-width: 600px)': {
                width: '100%'
            }
        }
    },
    dialog: {
        cursor: 'default',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    input: {
        '&&': {
            width: '100%'
        }
    },
    margin: {
        '&&': {
            marginBottom: 10
        }
    },
    button: {
        '&&': {
            height: 40,
            width: '100%',
            borderRadius: 10,
            zIndex: 1,
            marginTop: 15,
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontFamily: `'Poppins', sans-serif`,
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    }
}));