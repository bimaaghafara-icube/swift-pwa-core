import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        position: 'relative',
        padding: 20,
        maxHeight: 900,
    },
    buttonClose: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: GRAY_SECONDARY,
        fontSize: '3rem',
        zIndex: theme.zIndex.drawer + 9,
    },
}));
