import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme/mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    bottomButtons: {
        textAlign: 'left',
    },
    tColContent: {
        padding: '14px 0',
    },
    skeletonForm: {
        marginBottom: 20,
    },
}));
