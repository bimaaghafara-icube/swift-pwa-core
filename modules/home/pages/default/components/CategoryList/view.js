import SpanCategory from '@common_spancategory';
import classNames from 'classnames';
import useStyles from '../style';

const CategoryListView = (props) => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.contentContainer, styles.category)}>
            <SpanCategory
                {...props}
            />
        </div>
    );
};

export default CategoryListView;
