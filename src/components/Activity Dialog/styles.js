import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    paper: {
        '&&': {
            borderRadius: 15,
            width: 450,
            '@media (max-width: 400px)':
            {
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
            width: '100%',
            marginBottom: 10
        }
    },
    button: {
        '&&': {
            height: 40,
            borderRadius: 5,
            zIndex: 1,
            marginTop: 10,
            width: '100%',
            color: 'white',
            backgroundColor: '#1d5692',
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
        },
        '&:hover': {
            backgroundColor: '#1d5692CC'
        }
    }
}));