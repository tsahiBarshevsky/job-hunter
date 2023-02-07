import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    bold: {
        '&&': {
            fontWeight: 'bold',
            lineHeight: 1.5
        }
    }
}));