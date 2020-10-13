import Error from '@core_modules/error/pages/default';
import { cmsPages } from '@root/swift.config.js';
import { getResolver as getLocalResolver, setResolver } from '@helper_localstorage';
import Layout from '@layout';
import { getResolver } from './services/graphql';

const ContainerResolver = (props) => {
    const {
        CategoryPage, ProductPage, CmsPage,
        resolver, contentProps, storeConfig, ...other
    } = props;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setResolver('');
        }
    }, []);

    if (resolver.type === 'CATEGORY') {
        return <CategoryPage {...contentProps} categoryId={resolver.id} {...other} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <ProductPage {...contentProps} {...other} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <CmsPage {...contentProps} {...other} />;
    }
    return <Error statusCode={404} {...contentProps} />;
};

const Slug = (props) => {
    const {
        slug, storeConfig,
        ProductLoader, CategorySkeleton,
        LoadingView, ...other
    } = props;

    let localResolver;
    if (typeof window !== 'undefined') {
        localResolver = getLocalResolver();
    }

    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    const {
        error, loading, data,
    } = getResolver(url);

    const config = {
        ogContent: {},
    };

    if (error) return <Error statusCode={500} />;
    if (loading) {
        if (localResolver && localResolver.type === 'PRODUCT') {
            return (
                <Layout storeConfig={storeConfig} pageConfig={config}>
                    <ProductLoader />
                </Layout>
            );
        }
        if (localResolver && localResolver.type === 'CATEGORY') {
            return (
                <Layout storeConfig={storeConfig} pageConfig={config}>
                    <CategorySkeleton />
                </Layout>
            );
        }
        return (
            <main style={{ backgroundColor: '#ffffff' }}>
                <LoadingView open />
            </main>
        );
    }
    const resolver = data.urlResolver ? data.urlResolver : {};
    const contentProps = { slug, storeConfig };

    return (
        <ContainerResolver
            resolver={resolver}
            {...other}
            contentProps={contentProps}
        />
    );
};

export default Slug;
