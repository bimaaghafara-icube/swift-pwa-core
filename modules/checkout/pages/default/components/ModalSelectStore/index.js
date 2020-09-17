/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import gqlService from '../../../../services/graphql';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalSelectStore = ({
    open, setOpen, checkout, setCheckout,
    listStores = [],
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const [stores, setStores] = React.useState(listStores);
    const [search, setSearch] = React.useState('');
    const [setPickupStore] = gqlService.setPickupStore();
    const [selected, setSelected] = React.useState({
        key: null,
        item: null,
    });
    const [loading, setLoading] = React.useState(false);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleSelect = async (key, item) => {
        setSelected({
            key,
            item,
        });
    };

    const handleSave = async () => {
        await setLoading(true);
        if (Object.keys(checkout.pickupInformation).length > 0) {
            await setPickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                    code: selected.item.code,
                    extension_attributes: checkout.pickupInformation,
                    store_address: {
                        city: selected.item.city,
                        country_code: selected.item.country_id,
                        name: selected.item.name,
                        postcode: selected.item.postcode,
                        region: selected.item.region,
                        street: [selected.item.street],
                        telephone: selected.item.telephone,
                    },
                },
            }).then(async (res) => {
                const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));
                await setCheckout({
                    ...checkout,
                    data: {
                        ...checkout.data,
                        cart: res.data.setPickupStore,
                        paymentMethod,
                    },
                    selectStore: {
                        ...selected.item,
                    },
                    error: {
                        selectStore: false,
                        pickupInformation: false,
                    },
                });
                await setLoading(false);
                setOpen();
            }).catch(() => {
                // console.log(e);
                setLoading(false);
            });
        } else {
            await setCheckout({
                ...checkout,
                selectStore: {
                    ...selected.item,
                },
                error: {
                    ...checkout.error,
                    pickupInformation: true,
                },
            });

            await setLoading(false);
            setOpen();
        }
    };

    const getStyle = (key) => {
        let classname;
        if (key === listStores.length - 1 && key === selected.key) {
            classname = classNames(styles.card, styles.cardActive, styles.cardLast);
        } else if (key === listStores.length - 1) {
            classname = classNames(styles.card, styles.cardLast);
        } else if (key === selected.key) {
            classname = classNames(styles.card, styles.cardActive);
        } else {
            classname = styles.card;
        }
        return classname;
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        const newItem = listStores.filter(
            ({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1,
        );
        setSearch(value);
        setStores(newItem);
    };

    React.useEffect(() => {
        setStores(listStores);
    }, [listStores]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            maxWidth="sm"
            fullWidth={!!isDesktop}
            fullScreen={!isDesktop}
        >
            <AppBar className={styles.appBar}>
                <IconButton className={styles.btnClose} edge="start" onClick={setOpen} aria-label="close">
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className={styles.title}>
                    {t('checkout:pickupInformation:selectStoreLocation')}
                </Typography>
            </AppBar>
            <DialogContent dividers>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <TextField
                            label="Search"
                            value={search}
                            onChange={handleSearch}
                        />
                        {
                            stores.length > 0
                                ? (
                                    stores.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelect(index, item)}
                                            className={getStyle(index)}
                                        >
                                            <Typography variant="span" type="bold">
                                                {item.name}
                                            </Typography>
                                            <Typography>
                                                {item.street}
                                                <br />
                                                {item.city}
                                                <br />
                                                {item.region}
                                                <br />
                                                {item.country_id}
                                                <br />
                                                {item.postcode}
                                                <br />
                                                {item.telephone}
                                            </Typography>
                                        </div>
                                    ))
                                ) : (
                                    <Alert className="m-15" severity="warning">
                                        {t('checkout:storesNotFound')}
                                    </Alert>
                                )
                        }
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className={styles.footer}>
                    <Button loading={loading} className={styles.btnSave} onClick={handleSave}>{t('common:button:save')}</Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default ModalSelectStore;
