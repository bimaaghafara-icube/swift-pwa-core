import { withApollo } from '@lib_apollo';
import CategoryPage from '@core_modules/catalog/pages/category';
import ProductPage from '@core_modules/product/pages/default';
import CmsPage from '@core_modules/cms/pages/default';
import ProductLoader from '@core_modules/product/pages/default/components/Loader';
import CategorySkeleton from '@core_modules/catalog/pages/category/components/Skeleton';
import Core from './core';
import LoadingView from '../commons/Backdrop';

const Page = (props) => (
    <Core
        CategoryPage={CategoryPage}
        ProductPage={ProductPage}
        CmsPage={CmsPage}
        LoadingView={LoadingView}
        ProductLoader={ProductLoader}
        CategorySkeleton={CategorySkeleton}
        {...props}
    />
);

/**
 * get slug from query
 * namespacesRequired empty because Catalog page using product and category so only on component
*/
Page.getInitialProps = async ({ query, req }) => ({
    slug: query.slug,
    namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
    url_key: req
        ? `${req.protocol}://${req.get('host')}`
        : `${window.location.protocol
        }//${
            window.location.hostname
        }${window.location.port ? `:${window.location.port}` : ''}`,
});

export default withApollo({ ssr: true })(Page);
