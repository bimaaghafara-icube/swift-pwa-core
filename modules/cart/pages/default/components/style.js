import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, WHITE_IMPORTANT } from '@theme_color';
import {
    FlexColumn,
    FlexRow,
    CreatePadding,
    CreateMargin,
} from '@theme_mixins';
import { FONT_14, FONT_BIG } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        ...CreatePadding(0, 18, 18, 18),
        marginBottom: 50,
    },
    iconClose: {
        ...FONT_BIG,
    },
    toolbar: {
        ...FlexRow,
        marginBottom: 7,
    },
    toolbarCounter: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    toolbarButton: {
        fontSize: 11,
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        maxWidth: '320px',
    },
    items: {
        ...FlexColumn,
    },
    item: {
        ...FlexRow,
        position: 'relative',
        marginTop: 20,
        '& .product-options': {
            fontSize: 11,
            paddingLeft: 20,
            marginBottom: 20,
        },
    },
    itemImgWrapper: {
        flex: 1,
        maxWidth: 200,
    },
    itemImg: {
        width: '100%',
        display: 'block',
    },
    itemInfo: {
        flex: 2,
        ...CreatePadding(0, 12, 0, 12),
        position: 'relative',
        paddingBottom: 30,
    },
    itemName: {
        textDecoration: 'none',
        color: PRIMARY,
        marginBottom: 4,
        display: 'inline-block',
    },
    itemPrice: {
        position: 'absolute',
        bottom: 0,
        left: 12,
        fontWeight: 'bold',
    },
    itemActions: {
        position: 'absolute',
        right: 12,
    },
    iconBtn: {
        display: 'block',
        padding: 9,
        color: WHITE_IMPORTANT,
        width: 30,
        height: 30,
        fontSize: 14,
        background: '#000',
        margin: '5px 0',
        '&:hover': {
            background: '#fff',
            boxShadow: `inset 0px 0px 0px 1px ${PRIMARY}`,
            color: PRIMARY,
        },
    },
    icon: {
        fontSize: 14,
    },
    crosselTitle: {
        display: 'block',
        ...FONT_14,
    },
    emptyCart: {
        ...CreateMargin(20, 0, 20, 0),
    },
    containerEmpty: {
        [theme.breakpoints.up('sm')]: {
            minHeight: 'calc(100vh - 437px)',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: 400,
            position: 'relative',
            margin: 0,
        },
    },
    butonEmpty: {
        [theme.breakpoints.down('sm')]: {
            bottom: 15,
            position: 'fixed',
            padding: 0,
            left: 0,
            width: '100%',
        },
    },
}));

export default useStyles;
