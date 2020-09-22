import useStyles from '../style';
import Item from './item';

const ItemCart = () => {
    const styles = useStyles();
    return (
        <ol className={styles.miniCartItems}>
            <Item />
            <Item />
            <Item />
        </ol>
    );
};

export default ItemCart;
