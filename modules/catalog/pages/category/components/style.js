import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, WHITE } from '@theme_color';
import { FlexColumn } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
    },
    headContainer: {
        position: 'relative',
        backgroundColor: GRAY_PRIMARY,
    },
    headContainerNoBanner: {
        backgroundColor: WHITE,
        height: '40vh',
    },
    header: {
        left: '50%',
        right: '50%',
        top: '11px',
        position: 'absolute',
        borderBottom: 'none',
        fontWeight: 'bold',
    },
    breadcrumbs: {
        padding: 15,
    },
}));

export default useStyles;
