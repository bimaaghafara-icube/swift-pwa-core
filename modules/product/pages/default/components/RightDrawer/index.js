/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Drawer from '@material-ui/core/Drawer';
import Typography from '@common_typography';
import Link from 'next/link';
import useStyles from './style';

const ItemLook = (props) => {
    const { url_key, small_image: { url, label } } = props;
    const img = url || '/assets/img/noun_Image.svg';
    const styles = useStyles();
    return (
        <div className="col-xs-12 col-lg-3">
            <Link href="[...slug]" as={`${url_key}`}>
                <a>
                    <img
                        // eslint-disable-next-line no-nested-ternary
                        src={url || '/assets/img/placeholder.png'}
                        className={styles.itemLookContainer}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                        alt={label && url ? label : 'Product'}
                    />
                </a>
            </Link>
        </div>
    );
};

const RightDrawer = (props) => {
    const { open = false, setOpen = () => {}, t } = props;
    const data = props.data.upsell_products ? props.data.upsell_products : [];
    const styles = useStyles();
    const contetStyle = data.length > 3 ? styles.content : styles.contentMin;
    return (
        <div className={styles.container}>
            <div className={styles.btnOpen} onClick={setOpen}>
                <Typography
                    className={styles.btnOpenLabel}
                    variant="span"
                    letter="uppercase"
                    type="regular"
                    align="center"
                >
                    { t('product:upsellTitle') }
                </Typography>
            </div>
            <Drawer
                anchor="right"
                open={open}
                onClose={setOpen}
                BackdropProps={{ invisible: true }}
                className={styles.drawerContainer}
                color="transparent"
            >
                <div className={styles.body}>
                    <div className={styles.contianerBtnDrawer}>
                        <div className={styles.btnOpenInDrawer} onClick={setOpen}>
                            <Typography
                                className={styles.btnOpenLabel}
                                variant="span"
                                letter="uppercase"
                                type="regular"
                                align="center"
                            >
                                { t('product:upsellTitle') }
                            </Typography>
                        </div>
                    </div>
                    <div className={contetStyle}>
                        <div className="row" style={{ height: 'fit-content' }}>
                            {
                                data.length > 0
                                && data.map((item, index) => (<ItemLook key={index} {...item} />))
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default RightDrawer;
