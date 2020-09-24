import useStyles from '../style';
import Item from './item';

const ItemCart = (props) => {
    const styles = useStyles();
    const { data, deleteCart, updateCart } = props;
    if (data.length === 0) {
        return <div className={styles.emptyCart}>YOU HAVE NO ITEMS IN YOUR SHOPPING CART.</div>;
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
