import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    input: {
        '&&': {
            width: '100%'
        }
    },
    saveChanges: {
        '&&': {
            height: 40,
            borderRadius: 10,
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    },
    delete: {
        '&&': {
            height: 40,
            borderRadius: 10,
            border: '2px solid #1d5692',
            backgroundColor: 'transparent',
            textTransform: 'capitalize',
            fontFamily: `'Poppins', sans-serif`,
            transition: 'all 0.25s ease-in-out',
            color: 'white',
            '&:hover': {
                backgroundColor: '#1d5692'
            }
        }
    }
}));