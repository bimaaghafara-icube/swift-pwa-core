import useStyles from '../style';
import Item from './item';

const ItemCart = (props) => {
    const styles = useStyles();
    const {
        data, deleteCart, updateCart, t,
    } = props;
    if (data.length === 0) {
        return <div className={styles.emptyCart}>{t('common:cart:emptyCart')}</div>;
    }
    return (
        <ol className={styles.miniCartItems}>
            {data.map((val, idx) => (
                <Item
                    {...val}
                    key={idx}
                    deleteCart={deleteCart}
                    updateCart={updateCart}
                />
            ))}
        </ol>
    );
};

export default ItemCart;
