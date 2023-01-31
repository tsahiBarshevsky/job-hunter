import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
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
            alignItems: 'flex-start'
            // minHeight: '85vh'
        }
    },
    details: {
        '&&': {
            width: '65%',
            minHeight: '85vh',
            padding: 20
        }
        // [theme.breakpoints.down('sm')]:
        // {
        //     width: '100%'
        // }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 10,
        backgroundColor: 'pink'
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
    saveChanges: {
        height: 40,
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#1d5692',
        textTransform: 'capitalize',
        position: 'absolute',
        bottom: 10,
        right: 20,
        '&:hover': { backgroundColor: '#1d5692CC' }
    },
    delete: {
        height: 40,
        borderRadius: 5,
        border: '2px solid #1d5692',
        color: '#1d5692',
        backgroundColor: 'transparent',
        textTransform: 'capitalize',
        transition: 'all 0.25s ease-in-out',
        position: 'absolute',
        bottom: 10,
        '&:hover':
        {
            color: 'white',
            backgroundColor: '#1d5692'
        }
    },
    timelineContainer: {
        width: '35%',
        height: '85vh',
        color: 'white',
        backgroundColor: '#1d5692',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px 15px',
        // [theme.breakpoints.down('sm')]:
        // {
        //     display: 'none'
        // }
    },
    divider: {
        backgroundColor: '#ffffff4D',
        marginTop: 2,
        marginBottom: 15
    },
    icon: {
        width: 20,
        height: 20,
        paddingTop: 3,
        color: 'white',
        borderRadius: '50%',
        transform: 'translateX(-12%)'
    },
    dialog: {
        cursor: 'default',
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