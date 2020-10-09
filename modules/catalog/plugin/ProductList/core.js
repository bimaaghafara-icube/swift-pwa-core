/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
import React from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import TagManager from 'react-gtm-module';
import { getProduct, getProductAgragations } from '../../services/graphql';
import * as Schema from '../../services/graphql/productSchema';
import getCategoryFromAgregations from '../../helpers/getCategory';
import generateConfig from '../../helpers/generateConfig';
import Content from './components';

const Product = (props) => {
    const {
        catId = 0, catalog_search_engine, customFilter, url_path, defaultSort, t,
        categoryPath, ErrorMessage, storeConfig, query, path, availableFilter, ...other
    } = props;

    const [page, setPage] = React.useState(1);
    const [loadmore, setLoadmore] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
    };

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const setFiltervalue = (v) => {
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
    };
    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    config = generateConfig(query, config, elastic, availableFilter);
    const { loading, data, fetchMore } = getProduct(config, {
        variables: {
            pageSize: 8,
            currentPage: 1,
        },
    });
    let products = {};
    products = data && data.products ? data.products : {
        total_count: 0,
        items: [],
    };
    // generate filter if donthave custom filter
    const aggregations = [];
    if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            aggregations.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
    }
    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />;
    };

    const handleLoadMore = () => {
        if (fetchMore && typeof fetchMore !== 'undefined') {
            setLoadmore(true);
            setPage(page + 1);
            fetchMore({
                query: Schema.getProduct({
                    customFilter: typeof customFilter !== 'undefined',
                    search: config.search,
                    pageSize: config.pageSize,
                    currentPage: page + 1,
                    filter: config.filter,
                }),
                variables: {
                    pageSize: 8,
                    currentPage: page + 1,
                },
                updateQuery: (
                    previousResult,
                    { fetchMoreResult },
                ) => {
                    setLoadmore(false);
                    return {
                        products: {
                            ...fetchMoreResult.products,
                            items: [
                                ...previousResult.products.items,
                                ...fetchMoreResult.products.items,
                            ],
                        },
                    };
                },
            });
        }
    };

    React.useEffect(() => {
        if (data && data.products) {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: categoryPath ? `category ${categoryPath}` : '',
                    ecommerce: {
                        currencyCode: storeConfig.base_currency_code || 'IDR',
                        impressions: data.products.items.map((product, index) => {
                            let categoryProduct = '';
                            // eslint-disable-next-line no-unused-expressions
                            product.categories.length > 0 && product.categories.map(({ name }, indx) => {
                                if (indx > 0) categoryProduct += `/${name}`;
                                else categoryProduct += name;
                            });
                            return {
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: categoryProduct,
                                position: index,
                            };
                        }),
                    },
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }, [data]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        handleLoadMore,
        renderEmptyMessage,
        storeConfig,
    };

    return (
        <Content
            {...contentProps}
            {...other}
        />
    );
};

Product.propTypes = {
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

const ProductWrapper = (props) => {
    const router = useRouter();
    const { path, query } = getQueryFromPath(router);

    let availableFilter = [];
    let loadingAgg;
    if (Object.keys(query).length > 0) {
        const { data: agg, loading } = getProductAgragations();
        loadingAgg = loading;
        availableFilter = agg && agg.products ? agg.products.aggregations : [];
    }
    if (loadingAgg) {
        return <span />;
    }
    return (
        <Product
            {...props}
            availableFilter={availableFilter}
            path={path}
            query={query}
        />
    );
};

export default ProductWrapper;
