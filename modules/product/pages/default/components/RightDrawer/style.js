import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    Centering, FlexRow, CreatePadding, CreateMargin,
} from '@theme_mixins';
import { WHITE, GRAY_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        position: 'absolute',
        right: '0',
        top: '0',
        height: '100vh',
        zIndex: 2,
        width: 35,
    },

    openContainer: {
        width: 175,
    },

    btnOpen: {
        width: 164,
        height: 33,
        ...Centering,
        borderRadius: '10px 10px 0px 0px',
        backgroundColor: WHITE,
        transform: 'rotate(-90deg)',
        position: 'absolute',
        top: '35vh',
        right: -65,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#000000',
        },
    },
    btnOpenLabel: {
        [theme.breakpoints.up('sm')]: {
            color: WHITE,
            fontWeight: 'bold',
        },
    },
    btnOpeActive: {
        right: 120,
    },

    drawerContainer: {
        background: 'transparent',
        overflow: 'hidden',
    },

    contianerBtnDrawer: {
        alingIntems: 'center',
        width: 50,
        height: '100%',
        background: 'transparent',
        position: 'relative',
    },

    btnOpenInDrawer: {
        backgroundColor: WHITE,
        right: -66,
        height: 33,
        transform: 'rotate(-90deg)',
        borderRadius: '10px 10px 0px 0px',
        position: 'absolute',
        top: '35vh',
        width: 164,
        ...Centering,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#000000',
        },
    },

    body: {
        height: '100%',
        width: '50vw',
        [theme.breakpoints.up('sm')]: {
            width: '40vw',
        },
        background: 'transparent',
        position: 'relative',
        ...FlexRow,
    },
    content: {
        height: '100%',
        width: '100%',
        background: WHITE,
        boxShadow: '5px 0px 5px 3px #0000001A',
        ...CreatePadding(12, 12, 12, 12),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alingIntems: 'center',
        overflow: 'auto !important',
    },

    contentMin: {
        height: '100%',
        width: '100%',
        background: WHITE,
        boxShadow: '5px 0px 5px 3px #0000001A',
        ...CreatePadding(12, 12, 12, 12),
        ...Centering,
        alignItems: 'center',
    },

    itemLookContainer: {
        backgroundColor: GRAY_PRIMARY,
        ...Centering,
        ...CreateMargin(12, 12, 12, 12),
        width: 99,
        height: 122,
        margin: 'auto',
    },
    img: {
        width: 50,
        height: 50,
    },
}));
