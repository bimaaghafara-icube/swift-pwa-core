import Layout from '@layout';
import { getCmsPage } from '../../services/graphql';

const CmsSlug = (props) => {
    const {
        Content, pageConfig, t, slug,
    } = props;
    const { data, error, loading } = getCmsPage({ identifier: slug[0] });

    const Config = {
        title: data && data.cmsPage ? data.cmsPage.title : '',
        headerTitle: data && data.cmsPage ? data.cmsPage.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    return (
        <Layout {...props} pageConfig={pageConfig || Config}>
            <Content
                data={data}
                t={t}
                loading={loading}
                error={error}
            />
        </Layout>
    );
};

export default CmsSlug;
