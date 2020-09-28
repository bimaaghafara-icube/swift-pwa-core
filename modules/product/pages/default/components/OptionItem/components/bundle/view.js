import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@common_button';
import Typography from '@common_typography';
import useStyles from '../../style';
import Customize from './components/customize';

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        padding: 0,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
    root: {
        padding: 0,
        display: 'block',
    },
}))(MuiAccordionDetails);

const BundleView = (props) => {
    const { t, data } = props;
    const [open, setOpen] = React.useState(false);
    const styles = useStyles();
    return (
        <div>
            <Accordion square expanded={open} onChange={() => setOpen(!open)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Button
                        className={styles.btnAddToCard}
                        color="primary"
                        onClick={() => {}}
                        loading={false}
                    >
                        <Typography
                            align="center"
                            type="bold"
                            letter="uppercase"
                            color="white"
                            variant="span"
                        >
                            {t('product:addToCart')}
                        </Typography>
                    </Button>
                </AccordionSummary>
                <AccordionDetails>
                    <Customize data={data.data ? data.data.products : {}} t={t} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default BundleView;
