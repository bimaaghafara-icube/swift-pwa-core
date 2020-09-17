/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';
import ModalPickupInformation from '../ModalPickupInformation';
import ModalSelectStore from '../ModalSelectStore';
import gqlService from '../../../../services/graphql';
import useParentStyles from '../style';

export default (props) => {
    const {
        t, checkout, setCheckout,
    } = props;
    const classes = useStyles();
    const styles = useParentStyles();
    const { cart } = checkout.data;
    let listStores = [];
    const pickupStores = gqlService.getPickupStore({
        variables: { cart_id: cart.id },
        skip: typeof cart === 'undefined',
    });
    if (!pickupStores.loading && pickupStores.data && !pickupStores.error) {
        listStores = pickupStores.data.getPickupStore.store;
    }
    const [openModal, setOpenModal] = React.useState({
        openModalInfo: false,
        openModalSelectStore: false,
    });
    const handleOpen = (state) => {
        setOpenModal({
            ...openModal,
            [state]: !openModal[state],
        });
    };
    return (
        <div className={styles.block}>
            <ModalPickupInformation
                open={openModal.openModalInfo}
                setOpen={() => handleOpen('openModalInfo')}
                setCheckout={setCheckout}
                checkout={checkout}
            />
            <ModalSelectStore
                open={openModal.openModalSelectStore}
                setOpen={() => handleOpen('openModalSelectStore')}
                setCheckout={setCheckout}
                checkout={checkout}
                listStores={listStores}
            />
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:pickupInformation:label')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (Object.keys(checkout.pickupInformation).length > 0) && (
                            <div className="column">
                                <div className="row">
                                    <Typography>
                                        {`${t('checkout:pickupInformation:pickupPerson')} : `}
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.pickup_person_name}
                                    </Typography>
                                </div>
                                <div className="row">
                                    <Typography>
                                        {`${t('common:form:phoneNumber')} : `}
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.pickup_person_phone}
                                    </Typography>
                                </div>
                                <div className="row">
                                    <Typography>
                                        Email :
                                    </Typography>
                                    <Typography type="semiBold">
                                        {checkout.pickupInformation.pickup_person_email}
                                    </Typography>
                                </div>
                            </div>
                        )
                    }
                    <Button variant="text" className="clear-margin-padding" onClick={() => handleOpen('openModalInfo')}>
                        <Typography variant="span" letter="uppercase" type="bold">
                            {t('checkout:pickupInformation:changePickupInformation')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <Typography>
                {t('checkout:pickupInformation:pickupAtLabel')}
            </Typography>
            <div className={classNames(styles.cardPoint, classes.card)}>
                <div className="column">
                    {
                        (Object.keys(checkout.selectStore).length > 0) && (
                            <>
                                <Typography variant="span" type="bold">
                                    {checkout.selectStore.name}
                                </Typography>
                                <Typography>
                                    {checkout.selectStore.street}
                                    <br />
                                    {checkout.selectStore.city}
                                    <br />
                                    {checkout.selectStore.region}
                                    <br />
                                    {checkout.selectStore.country_id}
                                    <br />
                                    {checkout.selectStore.postcode}
                                    <br />
                                    {checkout.selectStore.telephone}
                                </Typography>
                            </>
                        )
                    }
                    {
                        pickupStores.loading || !pickupStores.data ? (
                            <Skeleton variant="text" animation="wave" width={270} height={30} />
                        ) : (
                            <Button variant="text" className="clear-margin-padding" onClick={() => handleOpen('openModalSelectStore')}>
                                <Typography variant="span" letter="uppercase" type="bold">
                                    {t('checkout:pickupInformation:changePickupLocation')}
                                </Typography>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
