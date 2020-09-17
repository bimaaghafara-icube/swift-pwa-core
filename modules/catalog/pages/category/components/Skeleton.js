import Skeleton from '@common_skeleton';
import ProductListSkeleton from '../../../plugin/ProductList/components/ProductListSkeleton';
import useStyles from './style';

const SkeletonCategory = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Skeleton
                variant="rect"
                xsStyle={{ width: '100vw', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
                lgStyle={{ width: '100%', height: '577px' }}
            />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            <div className="row">
                <div className="hidden-mobile col-lg-2">
                    <Skeleton variant="rect" width="100%" height={705} />
                </div>
                <div className="col-xs-12 col-lg-10">
                    <ProductListSkeleton />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCategory;
