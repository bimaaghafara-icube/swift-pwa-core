import Typography from '@common_typography';
import Button from '@common_button';
import Tune from '@material-ui/icons/Tune';
import useStyles from '../style';

const FilterView = (props) => {
    const {
        products, t, setOpenFilter,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.filterContainer}>
            <Typography variant="p" type="regular" className={styles.countProductText}>
                {products.total_count}
                {' '}
                {t('catalog:product:name')}
            </Typography>
            <div className={styles.filterBtnContainer}>
                <Button
                    variant="text"
                    customRootStyle={{ width: 'fit-content' }}
                    className={styles.btnFilter}
                    onClick={() => setOpenFilter(true)}
                >
                    <Tune className={styles.iconFilter} />
                </Button>
                <Typography type="bold" variant="span" letter="capitalize">
                    {t('catalog:title:shortFilter')}
                </Typography>
            </div>
        </div>
    );
};

export default FilterView;
