import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
    padding_vertical_40: {
        paddingTop: '40px',
        paddingBottom: '40px',
    },
    border_bottom: {
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    background_grey: {
        background: '#f3f3f3',
    },
    account_clearfix: {
        clear: 'both',
        display: 'block',
    },
    account_wishlist_title: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
    },
    account_wishlist_read_more: {
        paddingRight: '15px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    account_wrapper: {
        background: 'white',
    },
    account_block: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center',
        position: 'relative',
    },
    account_username: {
        margin: 0,
    },
    account_email: {
        margin: 0,
        marginBottom: 15,
    },
    account_point: {
        background: 'black',
        position: 'absolute',
        width: '60%',
        display: 'block',
        margin: 'auto',
        color: 'white',
        left: '20%',
        right: '20%',
        top: '-10%',
    },
    account_point_title: {
        marginBottom: 0,
    },
    account_point_summary: {
        marginTop: 0,
    },
    account_navigation: {
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        padding: 0,
    },
    account_navigation_item: {
        flex: '0 0 auto',
        marginBottom: '10px',
    },
    account_navigation_link: {
        color: 'black',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: 24,
        fontWeight: '700',
    },
    wishlistBlock: {
        background: GRAY_LIGHT,
    },
    margin20: {
        paddingBottom: 20,
    },
    authBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    spanWishlist: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    span: {
        width: '100%',
        height: 20,
        background: GRAY_LIGHT,
    },
    desktopContainer: {
        marginTop: 20,
        paddingLeft: 4,
    },
    infoTitle: {
        fontWeight: 'normal',
    },
    desktopLink: {
        fontSize: 12,
    },
    desktopLinkHeader: {
        fontWeight: 'normal',
        fontSize: 12,
        marginLeft: 30,
    },
}));

export default useStyles;
