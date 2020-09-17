/* eslint-disable arrow-body-style */
import Carousel from '@common_slick/Caraousel';
import ItemFeatured from './Item';

const FeaturedBrands = (props) => {
    const {
        featured = [], t, desktop, logo,
    } = props;
    return (
        <>
            <h4 align="center">{t('brands:featuredBrands')}</h4>
            <Carousel
                showArrow={desktop}
                slslideLg={logo ? 4 : 6}
                data={featured}
                Item={ItemFeatured}
            />
        </>
    );
};

export default FeaturedBrands;
