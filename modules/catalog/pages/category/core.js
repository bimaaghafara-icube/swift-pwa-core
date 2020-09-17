import Layout from '@layout';
import { StripHtmlTags } from '@helper_text';
import { getCategory } from '../../services/graphql';
import generateSchemaOrg from '../../helpers/schema.org';

const Page = (props) => {
    const {
        Content, categoryId, storeConfig, SkeletonView, pageConfig = {}, ...other
    } = props;
    const { loading, data } = getCategory({
        productSize: 20,
        id: categoryId,
    });
    const ogContent = {};
    let schemaOrg = null;
    if (data) {
        const category = data.categoryList[0];
        schemaOrg = generateSchemaOrg(category, storeConfig);
        if (data.categoryList[0].description) {
            ogContent.description = StripHtmlTags(data.categoryList[0].description);
        }
    }
    const config = {
        title: loading ? '' : data.categoryList[0].name,
        headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
        header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
        pageType: 'category',
        ogContent,
        schemaOrg,
    };
    if (loading) {
        return (
            <Layout {...props} pageConfig={config}>
                <SkeletonView />
            </Layout>
        );
    }
    return (
        <Layout {...props} pageConfig={config || pageConfig}>
            <Content categoryId={categoryId} storeConfig={storeConfig} data={data} {...other} />
        </Layout>
    );
};

export default Page;
