import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    mobileText: {
        '@media (max-width: 500px)': {
            display: 'none'
        }
    },
    logo: {
        '&&': {
            fontFamily: `'Ephesis', sans-serif`,
            userSelect: 'none',
            lineHeight: 1,
            fontSize: 40,
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'center'
        }
    }
}));