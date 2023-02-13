import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`,
            textAlign: 'center'
        }
    },
    title: {
        '&&': {
            fontFamily: `'Bebas Neue', sans-serif`,
            fontWeight: 'bold',
            letterSpacing: 1.5,
            lineHeight: 1,
            textAlign: 'center',
            marginBottom: 10
        }
    },
    button: {
        '&&': {
            height: 40,
            width: 185,
            borderRadius: 10,
            zIndex: 1,
            marginTop: 15,
            color: 'white',
            textTransform: 'capitalize',
            transition: '0.5s ease-out',
            fontSize: 16,
            fontFamily: `'Poppins', sans-serif`,
            backgroundColor: '#1d5692',
            textAlign: 'center',
            '&:hover': {
                backgroundColor: '#1d5692CC'
            }
        }
    }
}));