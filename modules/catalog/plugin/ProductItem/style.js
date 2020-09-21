import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, Centering, CreateMargin, ClearMarginPadding, FlexRow,
} from '@theme_mixins';
import { GRAY_PRIMARY, PRIMARY, WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    container: {},
    itemContainer: {
        width: '100%',
        display: 'inline-block',
        height: '100%',
        overflow: 'hidden',
        ...CreateMargin(0, 0, 16, 0),
        position: 'relative',
    },
    badgesNewSales: {
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 5,
        zIndex: 99,
        ...FlexRow,
        justifyContent: 'space-between',
        minWidth: '50%',
    },
    imgItem: {
        width: '100%',
        ...Centering,
        backgroundColor: WHITE,
    },
    imgProduct: {
        width: '100%',
        height: '100%',
    },
    detailItem: {
        height: 'auto',
        ...CreatePadding(14, 14, 14, 14),
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(28, 14, 14, 14),
        },
        position: 'relative',
    },
    descItem: {
        ...FlexColumn,
        maxWidht: '80%',
        position: 'relative',
    },
    clearMarginPadding: {
        ...ClearMarginPadding,
    },
    btnFeed: {
        ...ClearMarginPadding,
        width: 20,
        height: 20,
        position: 'absolute',
        top: '0px',
        right: 5,
        textAlign: 'right',
    },
    productLinkButton: {
        maxWidth: 'calc(100% - 34px)',
    },
    iconFeed: {
        fontSize: 18,
        color: GRAY_PRIMARY,
        fontWeight: '200',
    },
    iconActive: {
        color: PRIMARY,
    },
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
    feedContainer: {
        position: 'absolute',
        width: '20px',
        top: '-4px',
        right: '45px',
        textAlign: 'right',
    },
}));
