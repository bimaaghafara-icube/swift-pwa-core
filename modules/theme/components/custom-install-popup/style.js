import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, WHITE } from '@theme/colors';

const useStyles = makeStyles(() => ({
    containerMobile: {
        width: '100%',
        height: '100px',
        padding: '10px',
        background: '#bc2494',
        color: '#fff',
        margin: 0,
        display: 'none',
        alignItems: 'center',
    },
    titleMobile: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    iconClose: {
        width: '10%',
    },
    iconCloseButton: {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '65%',
    },
    btnInstallContainer: {
        width: '25%',
    },
    btnInstall: {
        background: WHITE,
        color: PRIMARY,
        fontSize: 11,
        '&:hover': {
            background: WHITE,
        },
    },
    popupInstallDesktop: {
        display: 'none',
        position: 'absolute',
        top: '4px',
        fontSize: 13,
    },
    btnInstallDesktop: {
        fontSize: 11,
    },
}));

export default useStyles;
