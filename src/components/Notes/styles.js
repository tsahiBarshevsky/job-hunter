import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    input: {
        '&&': {
            margin: '0 10px 5px',
            color: 'black'
        }
    },
    button: {
        '&&': {
            height: 32,
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: '#1d5692',
            borderRadius: 10,
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    },
    cancel: {
        '&&': {
            marginLeft: 10
        }
    },
    divider: {
        '&&': {
            marginTop: 10,
            marginBottom: 15
        }
    }
}));