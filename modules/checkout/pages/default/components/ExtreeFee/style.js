import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY } from '@theme_color';
import { CreateBorder, CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles(() => ({
    container: {
        ...FlexColumn,
        ...CreateBorder('1px', 0, '1px', 0, GRAY_PRIMARY),
        ...CreatePadding(20, 20, 20, 20),
    },
    title: {
        marginBottom: 0,
        marginLeft: 0,
    },
    checkbox: {
        paddingTop: 0,
        marginTop: 0,
    },
    checkboxContainer: {
        padding: 0,
        marginTop: 0,
    },
    select: {
        marginTop: 0,
    },
    radio: {
        marginTop: 0,
    },
    boxItem: {
        margin: '10px 0px',
        ...FlexColumn,
    },
}));
