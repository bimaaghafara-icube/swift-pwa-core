import Link from 'next/link';
import Router from 'next/router';
import { modules } from '@config';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import { breakPointsUp } from '@helpers/theme';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import useStyles from '../style';
import Image from './Image';

const MobileView = ({
    products, url_path, category_image, name, right = false, t,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const { categoryList } = modules.home;
    const width = desktop ? categoryList.imageSize.desktop.width : categoryList.imageSize.mobile.width;
    const height = desktop ? categoryList.imageSize.desktop.height : categoryList.imageSize.mobile.height;
    return (
        <div className={classNames('col-xs-12 row', styles.features)}>
            <div className={classNames('col-xs-12', styles.labelCategory)}>
                <Link
                    href="[...slug]"
                    as={url_path}
                >
                    <a>
                        <Typography letter="capitalize" type="bold" variant="h1" align="center">
                            {name || ''}
                        </Typography>
                    </a>
                </Link>
            </div>
            <div className={classNames('col-xs-12 row between-lg', styles.featuresBox, right ? 'reverse' : '')}>
                <div
                    className={
                        classNames(category_image ? 'col-xs-12 col-sm-12 col-lg-4' : 'hidden-mobile hidden-desktop', styles.imgFeaturedContainer)
                    }
                >
                    {(category_image) ? (
                        <div className={styles.imgFeaturedItem}>
                            <Image
                                handleClick={() => Router.push(`/${url_path}`)}
                                name={name}
                                src={category_image}
                                width={width}
                                height={height}
                            />
                        </div>
                    ) : null}
                </div>
                <div className={classNames('col-xs-12 col-sm-12', category_image ? 'col-lg-8' : '')}>
                    <div className={classNames('row center-xs', styles.contentFeatured)}>
                        <div className={classNames('col-xs-12')}>
                            <Carousel data={products} showArrow={desktop} slideLg={category_image ? 4 : 6} Item={ProductItem} />
                        </div>
                        <div className={classNames('col-xs-12', styles.footerFeatured)}>
                            <Button
                                href={`/${url_path}`}
                                fullWidth
                                variant="outlined"
                            >
                                {t('common:button:viewAll')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedView = ({ data = [], t }) => {
    const styles = useStyles();
    return (
        <div className={classNames('row center-xs', styles.contentContainer)}>
            {
                data.map((category, i) => {
                    const products = category.products.items.map((product) => ({
                        ...product,
                        name: product.name,
                        url: product.url_key,
                        imageSrc: product.small_image.url,
                        price: product.price_range.minimum_price.regular_price.value,
                    }));
                    return (
                        <MobileView
                            key={i}
                            url_path={category.url_path}
                            products={products}
                            category_image={category.image_path}
                            name={category.name}
                            right={(i + 1) % 2 === 0}
                            t={t}
                        />
                    );
                })
            }
        </div>
    );
};

export default FeaturedView;
