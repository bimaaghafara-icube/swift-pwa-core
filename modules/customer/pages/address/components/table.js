/* eslint-disable no-unused-vars */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@core_modules/customer/plugins/AddressFormDialog';
import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableCell from '@material-ui/core/TableCell';
import _ from 'lodash';
import useStyles from './style';
import { createCustomerAddress, updateCustomerAddress } from '../../../services/graphql';

const TableAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    return (
        <>
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <TableRow className={styles.tableRowResponsive}>
                <TableCell
                    className={[styles.tableCellResponsive, styles.ok].join(' ')}
                    align="left"
                >
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="primary" size="small" />}
                            label=""
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:firstname')}</b>
                        </div>
                        <div className={styles.value}>{firstname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:lastname')}</b>
                        </div>
                        <div className={styles.value}>{lastname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:street')}</b>
                        </div>
                        <div className={styles.value}>{street}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:city')}</b>
                        </div>
                        <div className={styles.value}>{city}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:country')}</b>
                        </div>
                        <div className={styles.value}>{country}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:state')}</b>
                        </div>
                        <div className={styles.value}>{region}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:postcode')}</b>
                        </div>
                        <div className={styles.value}>{postcode}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:phone')}</b>
                        </div>
                        <div className={styles.value}>{telephone}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.value}>
                            <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => setOpen(!open)}>
                                {t('customer:address:editTitle')}
                            </Typography>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableAddress;
