import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, WHITE, RED } from '@theme/colors';
import {
    CenterAbsolute,
    CreateBorder,
    CreatePadding,
    FlexColumn,
    CreateMargin,
} from '@theme/mixins';

export default makeStyles((theme) => ({
    dialog: {
        background: 'transparent',
    },
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'transparent',
    },
    bannerContainer: {
        backgroundPosition: 'center',
        background: 'transparent',
        height: '100vh',
    },
    img: {
        display: 'block',
        width: 'auto',
    },
    optionContainer: {
        position: 'absolute',
        zIndex: 3,
        ...CenterAbsolute,
        backgroundColor: WHITE,
        width: '95%',
        height: 'auto',
        maxHeight: '60vh',
        borderRadius: 10,
        bottom: 0,
        ...CreateBorder('1px', '1px', 0, '1px', GRAY_PRIMARY),
        ...CreatePadding(15, 14, 70, 14),
        ...FlexColumn,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btnClose: {
        ...CreateMargin(0, 0, 15, 0),
    },
    label: {
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
        },
    },
    sizeContainer: {
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            ...CreateMargin(20, 0, 10, 0),
        },
    },
    classContainer: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    center: {
        justifyContent: 'center',
    },
    btnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            width: 316,
            float: 'left',
        },
        ...CreateMargin(0, 8, 0, 0),
        width: '100%',
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
    },
    textBtnAddToCard: {
        fontSize: 16,
        color: `${WHITE} !important`,
    },
    error: {
        color: RED,
    },
    qty: {
        [theme.breakpoints.down('sm')]: {
            ...CreateMargin(15, 30, 15, 15),
            alignItems: 'center',
        },
        marginBottom: 10,
        ...FlexColumn,
    },
    select: {
        minWidth: '30%',
        width: 'auto',
        maxWidth: '75%',
        marginBottom: 10,
        ...FlexColumn,
    },
    stylesItemOption: {
        width: 30,
        height: 30,
        margin: 10,
    },
}));
