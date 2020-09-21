import { makeStyles } from '@material-ui/core/styles';
import { Centering } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    noMargin: {
        margin: 0,
    },
    spanNew: {
        minWidth: 20,
        height: 20,
        backgroundColor: 'red',
        color: 'white',
        fontWeight: '600',
        fontSize: 10,
        padding: 5,
        borderRadius: 5,
        ...Centering,
    },
}));

export default useStyles;
