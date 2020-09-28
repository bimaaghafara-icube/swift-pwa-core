import { debuging } from '@config';
import { useTranslation } from '@i18n';
import Alert from '@material-ui/lab/Alert';
import { GraphCategory } from '@services/graphql';
import React from 'react';
import Router from 'next/router';
import { localResolver as queryResolver } from '@services/graphql/schema/local';
import Category from './Category';
import SubCategory from './SubCategory';
import CategorySkeleton from './CategorySkeleton';

const CategoryWrapper = (props) => {
    const {
        openedCategory, showCat, openSub, slideCat, showSubCat, closeSub,
    } = props;
    const {
        loading, data, error, client,
    } = GraphCategory.getCategories();
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

    const handleClickMenu = async (cat, type = 'CATEGORY') => {
        const link = cat.url_key;
        if (link) {
            await client.writeQuery({
                query: queryResolver,
                data: {
                    resolver: {
                        id: cat.id || '1',
                        type,
                    },
                },
            });
            Router.push(
                '/[...slug]',
                `/${link}`,
            );
        }
    };

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
                    handleClickMenu={handleClickMenu}
                />
            ) : (
                <SubCategory
                    data={openedCategory}
                    open={showSubCat}
                    {...props}
                    onBack={closeSub}
                    handleClickMenu={handleClickMenu}
                />
            )}
        </>
    );
};

export default CategoryWrapper;
