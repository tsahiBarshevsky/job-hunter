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
    salary:{
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
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
            padding: '0 20px',
            '&:hover': {
                color: 'white',
                backgroundColor: '#1d5692'
            }
        }
    },
    deleteLight: {
        '&&': {
            color: 'black'
        }
    },
    deleteDark: {
        '&&': {
            color: 'white'
        }
    }
}));