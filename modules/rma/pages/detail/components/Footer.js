import Typography from '@common_typography';
import React from 'react';
import Button from '@common_button';
import classNames from 'classnames';
import useStyles from './styles';

const Footer = ({
    cancelButton,
    updateButton,
    updateStatusButton,
    detail_rma,
    t,
    confirmCancel,
    handleUpdate,
    actionUpdateStatus,
}) => {
    const styles = useStyles();
    let UpdateStatusButton = () => null;
    let UpdateButton = () => null;
    let CancelButton = () => null;

    if (cancelButton) {
        CancelButton = () => (
            <Button fullWidth variant="outlined" onClick={confirmCancel}>
                <Typography letter="capitalize">{t('rma:view:cancelButton')}</Typography>
            </Button>
        );
    }
    if (updateButton) {
        UpdateButton = () => (
            <Button fullWidth variant="outlined" onClick={() => handleUpdate()}>
                <Typography letter="capitalize">{t('rma:view:updateButton')}</Typography>
            </Button>
        );
    }
    if (updateStatusButton) {
        UpdateStatusButton = () => (
            <>
                <a href={detail_rma.confirm_shipping.print_label_url} download className={styles.btnPrintLabel}>
                    <Button fullWidth variant="outlined">
                        <Typography letter="capitalize">{t('rma:view:printLabel')}</Typography>
                    </Button>
                </a>
                <Button fullWidth variant="outlined" onClick={actionUpdateStatus}>
                    <Typography letter="capitalize">{t('rma:view:confirmShipping')}</Typography>
                </Button>
            </>
        );
    }

    return (
        <div className={classNames(styles.block, styles.footer)}>
            { UpdateButton() }
            { CancelButton() }
            { UpdateStatusButton() }
        </div>
    );
};

export default Footer;
