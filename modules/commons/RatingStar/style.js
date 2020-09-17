import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexRow } from '@theme/mixins';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';

export default makeStyles(() => ({
    container: {
        ...FlexRow,
    },
    iconBtn: {
        marginRight: 0,
        padding: 0,
    },
    icon: {
        color: GRAY_PRIMARY,
        '&:hover': {
            color: `${PRIMARY} !important`,
        },
    },
    iconActive: {
        color: PRIMARY,
    },
}));
