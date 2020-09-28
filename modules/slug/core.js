import Error from '@core_modules/error/pages/default';
import { cmsPages } from '@root/swift.config.js';
import { useQuery } from '@apollo/client';
import { localResolver as queryResolver } from '@services/graphql/schema/local';
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
        error, loading, data, client,
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

    React.useEffect(() => {
        if (data && data.urlResolver && typeof window !== 'undefined') {
            client.writeQuery({
                query: queryResolver,
                data: {
                    resolver: data.urlResolver,
                },
            });
        }
    }, [data]);

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

const Slug = (props) => {
    const {
        slug, storeConfig, CategoryPage, ProductPage, CmsPage, LoadingView, ...other
    } = props;
    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;

    const localResolver = useQuery(queryResolver);
    let resolver = {};

    if (typeof window !== 'undefined' && localResolver.data && localResolver.data.resolver) {
        resolver = localResolver.data.resolver;
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
    }
    return <ContainerResolver {...props} />;
};

export default Slug;
