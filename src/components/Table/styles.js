import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    title: {
        '&&': {
            fontWeight: 'bold',
            letterSpacing: 1.5
        }
    },
    divider: {
        '&&': {
            marginBottom: 10
        }
    },
    select: {
        '&&': {
            margin: '0 10px',
            borderRadius: 10,
            height: 40
        }
    }
}));