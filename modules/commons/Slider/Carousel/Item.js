import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import useStyles from './style';

const Item = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <ProductItem
                {...props}
                variants={[]}
                configurable_options={[]}
            />
        </div>
    );
};

export default Item;
