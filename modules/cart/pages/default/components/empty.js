import Typography from '@common_typography';
import Button from '@common_button';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from './style';

const EmptyView = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={classNames(styles.container, 'row center-xs')}>
            <div className="col-xs-12">
                <Typography variant="span" type="regular" align="center">
                    <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
                </Typography>
            </div>
            <div className="col-xs-12">
                <Link href="/">
                    <a>
                        <Button className={styles.toolbarButton}>
                            {t('common:button:continueShopping')}
                        </Button>
                    </a>
                </Link>
            </div>

        </div>
    );
};

export default EmptyView;
