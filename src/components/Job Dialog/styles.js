import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    text: {
        '&&': {
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
    container: {
        '&&': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            minHeight: '85vh'
        }
    },
    details: {
        '&&': {
            width: '75%',
            minHeight: '85vh',
            padding: 15,
            '@media (max-width: 800px)': {
                width: '100%'
            }
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 10
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        margin: '15px 0'
    },
    timelineContainer: {
        '&&': {
            width: '25%',
            height: '85vh',
            color: 'white',
            backgroundColor: '#1d5692',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '10px 15px',
            cursor: 'default',
            '@media (max-width: 800px)': {
                display: 'none'
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
            marginBottom: 15
        }
    },
    icon: {
        width: 20,
        height: 20,
        paddingTop: 3,
        color: 'white',
        borderRadius: '50%',
        transform: 'translateX(-12%)'
    },
    input: {
        '&&': {
            width: '100%',
            marginTop: 10,
            marginBottom: 10
        }
    },
    dialogContentText: {
        fontFamily: `'Poppins', sans-serif`,
        color: 'black'
    },
    cancel: {
        height: 40,
        borderRadius: 5,
        marginRight: 5,
        border: '2px solid #1d5692',
        color: '#1d5692',
        backgroundColor: 'transparent',
        textTransform: 'capitalize',
        transition: 'all 0.25s ease-in-out',
        '&:hover':
        {
            color: 'white',
            backgroundColor: '#1d5692'
        }
    },
    deleteAction: {
        height: 40,
        borderRadius: 5,
        marginLeft: 5,
        color: 'white',
        backgroundColor: '#1d5692',
        textTransform: 'capitalize',
        '&:hover': { backgroundColor: '#1d5692CC' }
    }
}));