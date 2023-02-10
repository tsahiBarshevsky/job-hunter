import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    bold: {
        '&&': {
            fontWeight: 'bold'
        }
    },
    warning: {
        '&&': {
            color: '#9f2b10'
        }
    },
    paper: {
        '&&': {
            borderRadius: 15,
            width: 470,
            '@media (max-width: 600px)':
            {
                width: '100%'
            }
        }
    },
    dialog: {
        cursor: 'default',
    },
    buttons: {
        '&&': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 15
        }
    },
    delete: {
        '&&': {
            height: 40,
            width: 96,
            borderRadius: 10,
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            marginLeft: 15,
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    },
    cancel: {
        '&&': {
            height: 40,
            borderRadius: 10,
            border: '2px solid #1d5692',
            backgroundColor: 'transparent',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            transition: 'all 0.25s ease-in-out',
            padding: '0 20px',
            '&:hover': {
                color: 'white',
                backgroundColor: '#1d5692'
            }
        }
    },
    cancelLight: {
        '&&': {
            color: 'black'
        }
    },
    cancelDark: {
        '&&': {
            color: 'white'
        }
    }
}));