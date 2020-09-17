import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, CenterAbsolute, FlexColumn, CreateMargin,
} from '@theme/mixins';
import { WHITE } from '@theme/colors';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        ...CreatePadding(30, 70, 30, 70),
        ...FlexColumn,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url("/assets/img/thanks/background.jpg")',
    },
    iconContainer: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 120,
        left: 0,
        ...CenterAbsolute,
    },
    imgIcon: {
        width: '100%',
        height: 230,
        overflow: 'hidden',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    info: {
        marginTop: 20,
        ...FlexColumn,
    },

    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        ...CreatePadding(20, 60, 30, 60),
    },
    btnConfirm: {
        height: 30,
        ...CenterAbsolute,
        fontSize: 10,
    },
    btnConfirmFirst: {
        marginBottom: 15,
    },
    btnConfirmIcon: {
        fontSize: '12px !important',
        marginLeft: -5,
    },
    btnContinue: {
        ...CreateMargin(0, 8, 0, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        ...CenterAbsolute,
        color: WHITE,
        borderRadius: 100,
    },
    textBtn: {
        color: `${WHITE} !important`,
    },

    payment: {
        textTransform: 'lowercase',
    },
    dateOver: {
        marginTop: 15,
    },

    footerDesktop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
    },

    // media query
    '@media (max-width: 280px )': {
        container: {
            padding: '20px 20px !important',
        },
        footer: {
            padding: '20px 20px !important',
        },
    },

    '@media (max-width: 320px )': {
        container: {
            padding: '20px 50px',
        },
        footer: {
            ...CreatePadding(20, 60, 20, 60),
        },
        imgIcon: {
            height: 160,
        },
        iconContainer: {
            width: '50%',
            bottom: 100,
        },
    },
    '@media (min-width: 375px )': {
        iconContainer: {
            width: '60%',
        },
    },
    '@media (min-width: 411px )': {
        iconContainer: {
            width: '55%',
        },
    },
    '@media (min-width: 750px )': {
        iconContainer: {
            width: '300px',
            bottom: '12%',
        },
        imgIcon: {
            height: 280,
        },
    },
    '@media (min-width: 1020px )': {
        iconContainer: {
            width: '400px',
            bottom: '10%',
        },
        imgIcon: {
            height: 350,
        },
    },
}));
