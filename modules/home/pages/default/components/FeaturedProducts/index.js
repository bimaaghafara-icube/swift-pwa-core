/* eslint-disable consistent-return */
import { modules } from '@config';
import gqlService from '../../../../service/graphql';

const FeaturedProducts = ({
    t, ErrorInfo, FeaturedSkeleton, FeaturedView,
}) => {
    if (typeof window === 'undefined') return <FeaturedSkeleton />;
    const { home } = modules;
    const { loading, data, error } = gqlService.getFeaturedProducts({
        url_key: home.featuresProduct.url_key,
    });

    if (loading && !data) return <FeaturedSkeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.categoryList.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (!loading && data && data.categoryList.length > 0) {
        return (
            <FeaturedView
                data={data.categoryList[0].children}
                t={t}
            />
        );
    }
};

export default FeaturedProducts;
