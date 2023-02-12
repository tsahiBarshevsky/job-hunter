import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    input: {
        '&&': {
            width: '100%',
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
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontSize: 16,
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: '#1d5692',
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    },
    google: {
        '&&': {
            height: 42,
            width: '100%',
            borderRadius: 10,
            zIndex: 1,
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontSize: 16,
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent'
            }
        }
    },
    googleLight: {
        '&&': {
            color: 'black',
            border: '2px solid #00000033'
        }
    },
    googleDark: {
        '&&': {
            color: 'white',
            border: '2px solid #ffffff33'
        }
    },
    switch: {
        '&&': {
            textTransform: 'capitalize',
            textDecoration: 'underline',
            '&:hover': {
                backgroundColor: 'transparent',
            }
        }
    }
}));