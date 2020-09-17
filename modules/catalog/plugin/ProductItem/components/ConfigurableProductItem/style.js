import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreatePadding, FlexRow } from '@theme/mixins';

export default makeStyles(() => ({
    colorContainer: {
        ...FlexRow,
        ...CreatePadding(10, 10, 0, 0),
    },
    btnColor: {
        ...CreateMargin(0, 5, 0, 0),
    },
}));
