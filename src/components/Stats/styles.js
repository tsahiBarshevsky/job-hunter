import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    bold: {
        '&&': {
            fontWeight: 'bold'
        }
    },
    select: {
        '&&': {
            marginRight: 10,
            borderRadius: 10,
            height: 40
        }
    }
}));