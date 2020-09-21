import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AddressFormDialog from '@core_modules/customer/plugins/AddressFormDialog';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '../ModalAddress';
import useStyles from '../style';

const CLOSE_ADDRESS_DIALOG = 750;

const AddressView = (props) => {
    const styles = useStyles();
    const {
        data, checkout, setAddress, setCheckout, t, dialogProps, loading, address, content, manageCustomer, ...other
    } = props;
    const { dest_latitude, dest_longitude } = (data && data.cart && data.cart.dest_location) || {};

    const [openAddress, setOpenAddress] = React.useState(false);

    return (
        <div className={styles.block}>
            <ModalAddress
                open={openAddress}
                setOpen={(status) => setOpenAddress(status)}
                t={t}
                checkout={checkout}
                setAddress={setAddress}
                setCheckout={setCheckout}
                manageCustomer={manageCustomer}
                {...other}
            />
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        {...dialogProps}
                        t={t}
                        onSubmitAddress={async (dataAddress) => {
                            const { cart } = checkout.data;
                            let state = { ...checkout };

                            await setAddress(dataAddress, cart);
                            state.status.addresses = true;
                            setCheckout(state);

                            _.delay(() => {
                                state = { ...checkout };
                                state.status.openAddressDialog = false;
                                setCheckout(state);
                                state.status.addresses = false;
                                setCheckout(state);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => {
                            setCheckout({
                                ...checkout,
                                status: {
                                    ...checkout.status,
                                    openAddressDialog: false,
                                },
                            });
                        }}
                        pageTitle={t('checkout:address:addTitle')}
                        {...other}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            variant="outlined"
                            // href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setCheckout({
                                            ...checkout,
                                            status: {
                                                ...checkout.status,
                                                openAddressDialog: true,
                                            },
                                        });
                                    }
                                    : () => setOpenAddress(true)
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
            {!(loading.addresses || loading.all) && (!dest_latitude || !dest_longitude) && (
                <Alert style={{ fontSize: 10 }} severity="warning">{t('customer:address:emptyPinPointMessage')}</Alert>
            )}
        </div>
    );
};

export default AddressView;
