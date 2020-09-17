import { debuging } from '@config';
import { useTranslation } from '@i18n';
import Alert from '@material-ui/lab/Alert';
import { GraphCategory } from '@services/graphql';
import React from 'react';
import Category from './Category';
import SubCategory from './SubCategory';
import CategorySkeleton from './CategorySkeleton';

const CategoryWrapper = (props) => {
    const {
        openedCategory, showCat, openSub, slideCat, showSubCat, closeSub,
    } = props;
    const { loading, data, error } = GraphCategory.getCategories();
    const { t } = useTranslation(['common']);

    if (loading) return <CategorySkeleton />;
    if (error) {
        return (
            <div>
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                </Alert>
            </div>
        );
    }
    if (!data) {
        return (
            <div>
                <Alert className="m-15" severity="error">
                    {t('common:error:notFound')}
                </Alert>
            </div>
        );
    }

    return (
        <>
            {!openedCategory.length ? (
                <Category
                    data={data.categoryList[0].children.filter((el) => el.include_in_menu)}
                    open={showCat}
                    {...props}
                    onClick={openSub}
                    direction="right"
                    slide={slideCat}
                />
            ) : (
                <SubCategory
                    data={openedCategory}
                    open={showSubCat}
                    {...props}
                    onBack={closeSub}
                />
            )}
        </>
    );
};

export default CategoryWrapper;
