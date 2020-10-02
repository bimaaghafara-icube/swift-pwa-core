import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, WHITE, GRAY_LIGHT } from '@theme_color';
import {
    CreateMargin, CreatePadding, CenterAbsolute, Centering,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
        ...CreatePadding(0, 0, 30, 0),
    },
    category: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...CreateMargin(30, 0, 30, 0),
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: GRAY_PRIMARY,
    },
    logo: {
        position: 'absolute',
        zIndex: 99,
        ...CenterAbsolute,
    },
    titleLogo: {
        fontWeight: 'bold',
        fontFamily: 'Playfair Display',
        color: WHITE,
    },
    imgLogo: {
        ...CreateMargin(15),
        width: 100,
        height: '100%',
    },
    skeletonWrapper: {
        padding: '0 0 12px 0',
        width: '100%',
        postion: 'relative',
        '& .logo': {
            width: 100,
            top: 5,
            position: 'absolute',
            zIndex: 99,
            ...CenterAbsolute,
        },
    },
    skeleton: {
        marginBottom: '8px',
    },
    divMessage: {
        minHeight: 100,
        width: '100%',
        ...Centering,
    },
    labelCategory: {
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
    contentContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 70,
        [theme.breakpoints.down('sm')]: {
            // marginLeft: '20px',
            // marginRight: 'auto',
            marginTop: 10,
            marginBottom: 10,
        },
        [theme.breakpoints.up('sm')]: {
            width: 750,
        },
        [theme.breakpoints.up('md')]: {
            width: 970,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1170,
        },
    },
    features: {
        marginTop: 20,
        marginBottom: 30,
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            marginTop: 10,
            marginBottom: 10,
        },
    },
    featuresBox: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        border: `1px solid ${GRAY_LIGHT}`,
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            margin: '0',
            boxShadow: 'unset',
            border: '0',
        },
    },
    contentFeatured: {
        transition: '0.3s',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        // padding: '20px 20px 0px 10px',
    },
    contentMobileFeatured: {
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    footerFeatured: {
        paddingBottom: 20,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '0',
        },
    },
    imgFeaturedContainer: {
        padding: 0,
    },
    imgFeatured: {
        width: '100%',
        height: '100%',
    },
    imgFeaturedItem: {
        width: '100%',
        ...Centering,
        backgroundColor: WHITE,
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20px',
        },
    },
    skeletonDesktop: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
