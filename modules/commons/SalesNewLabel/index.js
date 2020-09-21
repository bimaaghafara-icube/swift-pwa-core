/* eslint-disable camelcase */
import React from 'react';
import useStyles from './style';

const generateNew = (newFromDate, newToDate) => {
    let showLabelNew = false;
    const nowTime = new Date(Date.now()).getTime();
    if (newFromDate === null && newToDate === null) {
        showLabelNew = false;
    }

    if (newFromDate !== null && newToDate === null) {
        const startTime = new Date(newFromDate).getTime();
        if (nowTime >= startTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate === null && newToDate !== null) {
        const endTime = new Date(newToDate).getTime();
        if (nowTime <= endTime) {
            showLabelNew = true;
        }
    }

    if (newFromDate !== null && newToDate !== null) {
        const startTime = new Date(newFromDate).getTime();
        const endTime = new Date(newToDate).getTime();
        if (nowTime >= startTime && endTime >= nowTime) {
            showLabelNew = true;
        }
    }

    return showLabelNew;
};

const SimpleProductLabel = ({
    newFromDate, newToDate, sale, config,
}) => {
    const styles = useStyles();
    const showLabelNew = generateNew(newFromDate, newToDate);

    return (
        <>
            {
                config.enabled && config.new.enabled && showLabelNew ? (
                    <span className={styles.spanNew}>
                        New
                    </span>
                ) : null
            }
            {
                config.enabled && config.sale.enabled && sale ? (
                    <span className={styles.spanSale}>
                        Sale
                    </span>
                ) : null
            }
        </>
    );
};

const OtherProductLabel = (props) => {
    const {
        newFromDate, newToDate, sale, config,
    } = props;
    const styles = useStyles();
    const showLabelNew = generateNew(newFromDate, newToDate);

    return (
        <>
            {
                config.enabled && config.new.enabled && showLabelNew ? (
                    <span className={styles.spanNew}>
                        New
                    </span>
                ) : null
            }
            {
                config.enabled && config.sale.enabled && sale ? (
                    <span className={styles.spanSale}>
                        Sale
                    </span>
                ) : null
            }
        </>
    );
};

const SalesNewLabel = (props) => {
    const { productType } = props;
    if (productType === 'SimpleProduct') {
        return (
            <SimpleProductLabel
                {...props}
            />
        );
    }

    return (
        <OtherProductLabel
            {...props}
        />
    );
};

export default SalesNewLabel;
