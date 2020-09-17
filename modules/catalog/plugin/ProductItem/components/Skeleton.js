import Skeleton from '@material-ui/lab/Skeleton';
import { features } from '@config';
import useStyles from '../style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Skeleton variant="rect" width={features.imageSize.product.width} height={features.imageSize.product.height} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </div>
    );
};

export default ProductItemSkeleton;
