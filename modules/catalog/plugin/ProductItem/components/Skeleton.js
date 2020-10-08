import Skeleton from '@material-ui/lab/Skeleton';
import { features } from '@config';
import useStyles from '../style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer} style={{ width: '95%', paddingLeft: 10, paddingRight: 10 }}>
            <Skeleton variant="rect" width={features.imageSize.product.width} height={features.imageSize.product.height} />
            <Skeleton variant="text" width={features.imageSize.product.width} />
            <Skeleton variant="text" width={features.imageSize.product.width} />
        </div>
    );
};

export default ProductItemSkeleton;
