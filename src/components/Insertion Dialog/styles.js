import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    paper: {
        '&&': {
            borderRadius: 15,
            width: 350,
            '@media (max-width: 400px)':
            {
                width: '100%'
            }
        }
    },
    dialog: {
        cursor: 'default'
    },
    input: {
        '&&': {
            width: '100%',
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
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontFamily: `'Poppins', sans-serif`,
        }
    },
    buttonColor: {
        '&&': {
            backgroundColor: '#1d5692',
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    }
}));