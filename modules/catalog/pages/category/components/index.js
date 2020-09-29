/* eslint-disable react/no-danger */
import React from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import Typography from '@common_typography';
import Product from '@core_modules/catalog/plugin/ProductList';
import { features } from '@config';
import useStyles from './style';

// sementara di comment dlu, untuk custom filter memakai aggregations product
// import { getFilter } from '../../../services/graphql';

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category.length; index++) {
        data.push(category[index].name);
    }
    return data;
};

const CategoryPage = ({
    data, storeConfig, t, BannerView, BreadcrumbView, TabView, ...other
}) => {
    const styles = useStyles();
    const [value] = React.useState(0);
    const categoryList = data.categoryList[0];
    let dataBanner = [];
    const handleChange = (event, newValue) => {
        Router.push(
            '/[...slug]',
            `/${categoryList.children[newValue - 1].url_path}`,
        );
    };
    if (categoryList.image_path) {
        dataBanner = [
            {
                imageUrl: categoryList.image_path,
                link: categoryList.url_path,
                description: categoryList.description,
            },
        ];
    }
    // sementara di comment dlu, untuk custom filter memakai aggregations product
    // const customFilter = getFilter(categoryList.id);
    let breadcrumbsData = [];
    if (categoryList.breadcrumbs && categoryList.breadcrumbs.length > 0) {
        breadcrumbsData = categoryList.breadcrumbs.map((bc) => ({
            label: bc.category_name,
            link: `/${bc.category_url_path}`,
            active: false,
            id: bc.category_id,
        }));
    }
    breadcrumbsData.push({
        label: categoryList.name,
        link: '#',
        active: true,
    });
    return (
        <>
            <style jsx>
                {`
                    .cms-block-category :global(img) {
                        width: 100%;
                        max-width: 100%;
                    }
                `}
            </style>
            <div className={styles.container}>
                <div className={classNames(styles.breadcrumbs, 'hidden-mobile')}>
                    <BreadcrumbView data={breadcrumbsData} />
                </div>
                {dataBanner.length > 0
                    ? (
                        <div className={styles.headContainer}>
                            <BannerView
                                data={dataBanner}
                                width={features.imageSize.category.width}
                                height={features.imageSize.category.height}
                            />
                            {' '}
                        </div>
                    ) : null}
                <div className={classNames(styles.breadcrumbs, 'hidden-desktop')}>
                    <BreadcrumbView data={breadcrumbsData} />
                </div>
                <Typography variant="h1" className={styles.categoryName}>
                    {categoryList.name}
                </Typography>
                {dataBanner[0] && dataBanner[0].description && (
                    /* eslint-disable-next-line react/no-danger */
                    <div className="cms-container" dangerouslySetInnerHTML={{ __html: dataBanner[0].description }} />
                )}
                <div className="hidden-desktop">
                    <TabView
                        data={categoryTabs(categoryList.children)}
                        onChange={handleChange}
                        value={value}
                    />
                </div>
                {
                    categoryList
                    && (categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PAGE')
                    && categoryList.cms_block
                    && (
                        <div className="cms-block-category" dangerouslySetInnerHTML={{ __html: categoryList.cms_block.content }} />
                    )
                }
                {
                    categoryList
                    && (!categoryList.display_mode || categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PRODUCTS')
                    && (
                        <Product
                            defaultSort={{ key: 'position', value: 'ASC' }}
                            // sementara di comment dlu, untuk custom filter memakai aggregations product
                            // customFilter={customFilter.loading ? [] : customFilter.data.getFilterAttributeOptions.data}
                            catId={categoryList.id}
                            categoryPath={categoryList.url_path}
                            catalog_search_engine={storeConfig.catalog_search_engine}
                            t={t}
                            category={categoryTabs(categoryList.children)}
                            dataTabs={categoryTabs(categoryList.children)}
                            onChangeTabs={handleChange}
                            storeConfig={storeConfig}
                            {...other}
                        />
                    )
                }
            </div>
        </>
    );
};

export default CategoryPage;
