import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
            fontFamily: `'Poppins', sans-serif`
        }
    },
    date: {
        '&&': {
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: `'Poppins', sans-serif`
        }
    },
    paper: {
        '&&': {
            borderRadius: 20,
            minWidth: '85vh',
            '@media (max-width: 1000px)': {
                minWidth: '90%'
            }
        }
    },
    timelineTitle: {
        '&&': {
            lineHeight: 1.2
        }
    },
    divider: {
        '&&': {
            marginTop: 2,
            marginBottom: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
    }
}));