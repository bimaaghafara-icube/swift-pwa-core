import BannerSlider from './Banner';
import FeaturedProducts from './FeaturedProducts';
import CategoryList from './CategoryList';
import useStyles from './style';

const Content = (props) => {
    const styles = useStyles();
    const {
        BannerSliderSkeleton, BannerView,
        FeaturedSkeleton, FeaturedView,
        CategoryListSkeleton, CategoryListView,
        ...other
    } = props;
    return (
        <div className={styles.container}>
            <BannerSlider
                BannerSliderSkeleton={BannerSliderSkeleton}
                BannerView={BannerView}
                {...other}
            />
            <FeaturedProducts
                FeaturedView={FeaturedView}
                FeaturedSkeleton={FeaturedSkeleton}
                {...other}
            />
            <CategoryList
                CategoryListSkeleton={CategoryListSkeleton}
                CategoryListView={CategoryListView}
                {...other}
            />
        </div>
    );
};

export default Content;
