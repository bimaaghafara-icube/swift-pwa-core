import Skeleton from '@material-ui/lab/Skeleton';
import { features } from '@config';
import useStyles from '../style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    console.log(`width sk : ${features.imageSize.product.width}`);
    console.log(`height sk : ${features.imageSize.product.height}`);
    return (
        <div className={styles.itemContainer} style={{ padding: 10 }}>
            <Skeleton variant="rect" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
        </div>
    );
};

export default ProductItemSkeleton;
