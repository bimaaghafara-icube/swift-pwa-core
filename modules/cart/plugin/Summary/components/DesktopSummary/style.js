import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, GRAY_PRIMARY } from '@theme/colors';
import {
    FlexColumn,
    CreateBorder,
    CenterAbsolute,
} from '@theme/mixins';

const useStyles = makeStyles(() => ({
    container: {
        background: GRAY_LIGHT,
        width: '100%',
        height: 'auto',
        padding: 20,
        ...FlexColumn,
        position: 'sticky',
        top: 100,
        marginBottom: 40,
    },
    list: {
        ...CreateBorder('1px', 0, 0, 0, GRAY_PRIMARY),
    },
    btnCheckout: {
        ...CenterAbsolute,
        marginTop: 20,
        minWidth: '90%',
    },
    labelItem: {
        maxWidth: '50%',
    },
    expanItem: {
        background: 'transparent',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
    },

    listProduct: {
        padding: 20,
    },
    imgProduct: {
        width: 75,
        height: 'auto',
    },
    bodyProductItem: {
        ...FlexColumn,
    },
}));

export default useStyles;
