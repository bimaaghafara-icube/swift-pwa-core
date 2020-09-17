import Grid from '@material-ui/core/Grid';
import ProductItemSkeleton from '../../ProductItem/components/Skeleton';

const ProductListSkeleton = () => {
    const getClassNames = (el) => {
        if (el <= 2) return 'hidden-xs';
        if (el <= 4) return 'hidden-xs hidden-sm';
        return '';
    };
    return (
        <Grid
            container
        >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                <Grid key={el} item xs={6} sm={4} md={3} className={getClassNames(el)}>
                    <ProductItemSkeleton />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductListSkeleton;
