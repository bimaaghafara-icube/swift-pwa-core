import { makeStyles } from '@material-ui/core/styles';
import {
    FONT_6,
    FONT_8,
    FONT_10,
    FONT_12,
    FONT_14,
    FONT_16,
    FONT_24,
} from '@theme/typography';
import {
    PRIMARY, RED, GREEN, ORANGE, WHITE, GRAY_SECONDARY,
} from '@theme/colors';

const useStyles = makeStyles(() => ({
    default: {
        color: PRIMARY,
    },
    white: {
        color: WHITE,
    },
    red: {
        color: RED,
    },
    green: {
        color: GREEN,
    },
    orange: {
        color: ORANGE,
    },
    gray: {
        color: GRAY_SECONDARY,
    },
    root: {
        margin: 5,
        // color: PRIMARY,
    },
    p: {
        fontSize: 10,
        fontWeight: '400',
    },
    h1: {
        fontWeight: 'bold',
        ...FONT_24,
    },
    span: {
        ...FONT_12,
        fontWeight: '400',
        margin: 5,
    },
    lettercapitalize: {
        'text-transform': 'capitalize',
    },
    letteruppercase: {
        'text-transform': 'uppercase',
    },
    letterlowercase: {
        'text-transform': 'lowercase',
    },
    title: {
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    semiBold: {
        fontWeight: '500',
    },
    regular: {
        fontWeight: '300',
    },
    italic: {
        fontStyle: 'italic',
    },
    label: {
        ...FONT_12,
        margin: 0,
    },
    left: {
        textAlign: 'left',
    },
    right: {
        textAlign: 'right',
    },
    center: {
        textAlign: 'center',
    },
    underline: {
        textDecoration: 'underline',
    },
    size6: {
        ...FONT_6,
    },
    size8: {
        ...FONT_8,
    },
    size10: {
        ...FONT_10,
    },
    size12: {
        ...FONT_12,
    },
    size14: {
        ...FONT_14,
    },
    size16: {
        ...FONT_16,
    },
}));

export default useStyles;
