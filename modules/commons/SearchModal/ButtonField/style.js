import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, GRAY_SECONDARY } from '@theme/colors';
import { CreateMargin } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    container: {
        width: '100rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: `1px solid ${PRIMARY}`,
        ...CreateMargin(0, 15, 0, 15),
    },
    placeholder: {
        color: `${GRAY_SECONDARY} !important`,
        fontSize: '1rem',
    },
    searchButton: {
        width: '100%',
        justifyContent: 'left',
        padding: 0,
    },
}));

export default useStyles;
