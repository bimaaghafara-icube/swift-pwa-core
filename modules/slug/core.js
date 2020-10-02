import Error from '@core_modules/error/pages/default';
import { cmsPages } from '@root/swift.config.js';
import { getResolver as getLocalResolver, setResolver } from '@helper_localstorage';
import { getResolver } from './services/graphql';

const ContainerResolver = (props) => {
    const {
        slug, storeConfig, CategoryPage, ProductPage, CmsPage, LoadingView, ...other
    } = props;
    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    const {
        error, loading, data,
    } = getResolver(url);
    if (error) return <Error statusCode={500} />;
    if (loading) {
        return (
            <main>
                <LoadingView open />
            </main>
        );
    }
    const resolver = data.urlResolver ? data.urlResolver : {};
    const contentProps = { slug, storeConfig };

    if (resolver.type === 'CATEGORY') {
        return <CategoryPage {...contentProps} categoryId={resolver.id} {...other} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <ProductPage {...contentProps} {...other} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <CmsPage {...contentProps} {...other} />;
    }
    return <Error statusCode={404} storeConfig={storeConfig} />;
};

const LocalContainerResolver = (props) => {
    const {
        slug, storeConfig, CategoryPage, ProductPage, CmsPage, LoadingView, resolver, ...other
    } = props;
    const localResolver = resolver;

    React.useEffect(() => {
        setResolver(null);
    }, [resolver]);

    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    const contentProps = { slug, storeConfig };

    if (localResolver.type === 'CATEGORY') {
        return <CategoryPage {...contentProps} categoryId={localResolver.id} {...other} />;
    }
    if (localResolver.type === 'PRODUCT') {
        return <ProductPage {...contentProps} {...other} />;
    }
    if (localResolver.type === 'CMS_PAGE') {
        return <CmsPage {...contentProps} {...other} />;
    }
    return <Error statusCode={404} storeConfig={storeConfig} />;
};

const Slug = (props) => {
    let resolver;
    if (typeof window !== 'undefined') {
        resolver = getLocalResolver();
    }

    if (!resolver || typeof window === 'undefined') {
        return <ContainerResolver {...props} />;
    }

    return (
        <LocalContainerResolver
            resolver={resolver}
            {...props}
        />
    );
};

export default Slug;
