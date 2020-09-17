import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import {
    CreateBorder,
    CreatePadding,
    FlexRow,
} from '@theme/mixins';

export default makeStyles(() => ({
    item: {
        ...CreatePadding(17, 17, 17, 17),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_PRIMARY),
        borderRadius: 10,
        cursor: 'pointer',
    },
    active: {
        ...CreateBorder('1px', '1px', '1px', '1px', PRIMARY),
    },
}));
