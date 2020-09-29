/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Router from 'next/router';
import { modules } from '@config';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import Button from '@common_button';
import classNames from 'classnames';
import { localResolver as queryResolver } from '@services/graphql/schema/local';
import { useApolloClient } from '@apollo/client';
import useStyles from '../style';
import Image from './Image';

const MobileView = ({
    products, url_path, category_image, name, right = false, t, id,
}) => {
    const client = useApolloClient();
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const { categoryList } = modules.home;
    const width = desktop ? categoryList.imageSize.desktop.width : categoryList.imageSize.mobile.width;
    const height = desktop ? categoryList.imageSize.desktop.height : categoryList.imageSize.mobile.height;
    const handleClick = async () => {
        await client.writeQuery({
            query: queryResolver,
            data: {
                resolver: {
                    id,
                    type: 'CATEGORY',
                },
            },
        });
        Router.push(
            '/[...slug]',
            `/${url_path}`,
        );
    };
    return (
        <div className={classNames('col-xs-12 row', styles.features)}>
            <div className={classNames('col-xs-12', styles.labelCategory)}>
                <>
                    <a onClick={handleClick}>
                        <Typography letter="capitalize" type="bold" variant="h1" align="center">
                            {name || ''}
                        </Typography>
                    </a>
                </>
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
                                handleClick={handleClick}
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
                        <div className={classNames('col-xs-12', styles.contentMobileFeatured)}>
                            <Carousel data={products} showArrow={desktop} slideLg={category_image ? 4 : 6} Item={ProductItem} />
                        </div>
                        <div className={classNames('col-xs-12', styles.footerFeatured)}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleClick}
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
                            id={category.id}
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
