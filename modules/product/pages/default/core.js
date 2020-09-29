/* eslint-disable array-callback-return */
import Layout from '@layout';
import Error from 'next/error';
import { StripHtmlTags } from '@helper_text';
import { features, modules } from '@config';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';
import { getCookies } from '@helper_cookies';
import Loading from './components/Loader';
import { getProduct, addWishlist as mutationAddWishlist } from '../../services/graphql';
import Header from './components/header';
import generateSchemaOrg from '../../helpers/schema.org';

const ContentDetail = ({
    t, product,
    Content,
    isLogin,
}) => {
    const item = product.items[0];
    const route = useRouter();

    const reviewValue = parseInt(item.review.rating_summary, 0) / 20;

    React.useEffect(() => {
        let index = 0;
        let categoryProduct = '';
        // eslint-disable-next-line no-unused-expressions
        item.categories.length > 0 && item.categories.map(({ name }, indx) => {
            if (indx > 0) categoryProduct += `/${name}`;
            else categoryProduct += name;
        });
        const tagManagerArgs = {
            dataLayer: {
                pageName: item.name,
                pageType: 'product',
                ecommerce: {
                    detail: {
                        product: [{
                            name: item.name,
                            id: item.sku,
                            price: item.price_range.minimum_price.regular_price.value || 0,
                            category: categoryProduct,
                            dimensions4: item.stock_status,
                            dimensions5: reviewValue,
                            dimensions6: item.review.reviews_count,
                            dimensions7: item.sale === 0 ? 'NO' : 'YES',
                        }],
                    },
                    currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                    impressions: [
                        ...item.related_products.map((val) => {
                            index += 1;
                            return ({
                                name: val.name,
                                id: val.sku,
                                category: categoryProduct,
                                price: val.price_range.minimum_price.regular_price.value,
                                list: `Related Products From ${item.name}`,
                                position: index,
                            });
                        }),
                        ...item.upsell_products.map((val) => {
                            index += 1;
                            return ({
                                name: val.name,
                                id: val.sku,
                                category: categoryProduct,
                                price: val.price_range.minimum_price.regular_price.value,
                                list: `Related Products From ${item.name}`,
                                position: index,
                            });
                        }),
                    ],
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: item.name,
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }, []);

    // const client = useApolloClient();

    const bannerData = [];
    if (item.media_gallery.length > 0) {
        // eslint-disable-next-line array-callback-return
        item.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: item.image.url,
        });
    }

    const [openOption, setOpenOption] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [openImageDetail, setOpenImageDetail] = React.useState(false);
    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: item.price_range,
        priceTiers: item.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: item.__typename,
        specialFromDate: item.special_from_date,
        specialToDate: item.special_to_date,
    });
    const [wishlist, setWishlist] = React.useState(false);

    const [addWishlist] = mutationAddWishlist();

    const handleWishlist = () => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: item.name,
                    label: item.name,
                    ecommerce: {
                        currencyCode: item.price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [{
                                name: item.name,
                                id: item.sku,
                                price: item.price_range.minimum_price.regular_price.value || 0,
                                category: item.categories.length > 0 ? item.categories[0].name : '',
                                list: item.categories.length > 0 ? item.categories[0].name : '',
                                dimensions4: item.stock_status,
                            }],
                        },
                    },
                },
            });
            addWishlist({
                variables: {
                    productId: item.id,
                },
            }).then(async () => {
                await setWishlist(!wishlist);
                await window.toastMessage({ open: true, variant: 'success', text: t('wishlist:addSuccess') });
                route.push('/wishlist');
            }).catch((e) => {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('wishlist:addFailed'),
                });
            });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    let expandData = [];
    if (item.description.html) {
        expandData = [
            ...expandData,
            {
                title: 'Detail',
                type: 'html',
                content: item.description.html,
            },
        ];
    }
    if (item.more_info && item.more_info.length > 0) {
        expandData = [
            ...expandData,
            {
                title: 'More Info',
                type: 'array',
                content: item.more_info,
            },
        ];
    }
    const relateData = item.related_products.map((val) => ({
        ...val,
        name: val.name,
        link: val.url_key,
        imageSrc: val.small_image.url,
        price: val.price_range.minimum_price.regular_price.value,
    }));
    let breadcrumbsData = [];
    if (typeof window !== 'undefined') {
        const lastCategory = getCookies('lastCategory');
        const cat = item.categories.filter(({ url_path }) => url_path === lastCategory);
        if (cat.length > 0) {
            if (cat[0].breadcrumbs && cat[0].breadcrumbs.length > 0) {
                breadcrumbsData = cat[0].breadcrumbs.map((bc) => ({
                    label: bc.category_name,
                    link: `/${bc.category_url_path}`,
                    active: false,
                    id: bc.category_id,
                }));
            }
            breadcrumbsData.push({
                label: cat[0].name,
                link: `/${cat[0].url_path}`,
                active: false,
                id: cat[0].id,
            });
        }

        breadcrumbsData.push({
            label: item.name,
            link: '#',
            active: true,
        });
    }

    const handleOption = () => {
        const { productAvailableToCart } = features;
        // eslint-disable-next-line no-underscore-dangle
        if (productAvailableToCart[item.__typename]) {
            setOpenOption(true);
        } else {
            window.toastMessage({
                variant: 'warning',
                text: t('product:productNotAvailable'),
                open: true,
            });
        }
    };

    const handleOpenImageDetail = () => {
        setOpenImageDetail(!openImageDetail);
    };

    return (
        <Content
            data={product.items[0]}
            t={t}
            openOption={openOption}
            handleOption={handleOption}
            setOpenOption={setOpenOption}
            setBanner={setBanner}
            setPrice={setPrice}
            openShare={openShare}
            setOpenShare={setOpenShare}
            route={route}
            banner={banner}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            breadcrumbsData={breadcrumbsData}
            price={price}
            handleWishlist={handleWishlist}
            reviewValue={reviewValue}
            wishlist={wishlist}
            expandData={expandData}
            relateData={relateData}
            features={features}
            config={modules.catalog.pdp}
            openImageDetail={openImageDetail}
            handleOpenImageDetail={handleOpenImageDetail}
        />
    );
};

const PageDetail = (props) => {
    let product = {};
    const {
        slug, Content, t, isLogin, pageConfig, CustomHeader,
    } = props;
    const {
        loading, data, error,
    } = getProduct(slug[0]);

    if (error || loading || !data) {
        return (
            <Layout pageConfig={{}} CustomHeader={CustomHeader ? <CustomHeader /> : <Header />} {...props}>
                <Loading />
            </Layout>
        );
    }
    if (data) {
        product = data.products;
        if (product.items.length === 0) return <Error statusCode={404} />;
    }

    const schemaOrg = generateSchemaOrg(product.items[0]);

    const config = {
        title: product.items.length > 0 ? product.items[0].name : '',
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        pageType: 'product',
        ogContent: {
            description: {
                type: 'meta',
                value: StripHtmlTags(product.items[0].description.html),
            },
            'og:image': product.items[0].small_image.url,
            'og:image:type': 'image/jpeg',
            'og:description': StripHtmlTags(product.items[0].description.html),
            'og:image:width': features.imageSize.product.width,
            'og:image:height': features.imageSize.product.height,
            'og:image:alt': product.items[0].name || '',
            'og:type': 'product',
            'product:availability': product.items[0].stock_status,
            'product:category': product.items[0].categories && product.items[0].categories.length > 0 && product.items[0].categories[0].name,
            'product:condition': 'new',
            'product:price:currency': product.items[0].price_range.minimum_price.final_price.currency,
            'product:price:amount': product.items[0].price_range.minimum_price.final_price.value,
            'product:pretax_price:currency': product.items[0].price_range.minimum_price.final_price.currency,
            'product:pretax_price:amount': product.items[0].price_range.minimum_price.final_price.value,
        },
        schemaOrg,
    };

    return (
        <Layout pageConfig={pageConfig || config} CustomHeader={CustomHeader ? <CustomHeader /> : <Header />} {...props}>
            <ContentDetail
                product={product}
                t={t}
                Content={Content}
                isLogin={isLogin}
            />
        </Layout>
    );
};

export default PageDetail;
