import Radio from '@common_radio';
import Button from '@common_button';
import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from './style';
import CheckboxSettings from './checkbox';
import CheckboxView from './checkbox/view';
import Layout from '../../../components/layout';

const subData = [{ value: 'subscribed', label: 'Subscribtion' }];

const SettingPage = (props) => {
    const styles = useStyles();
    const {
        t, customer, setSettings, dataLang, lang, setLang, handleSave,
    } = props;
    return (
        <Layout {...props}>
            <div className={classNames('col-md-6', styles.container)}>
                <div className={styles.block}>
                    {typeof customer.is_subscribed !== 'undefined' ? (
                        <CheckboxSettings
                            name="is_subscribed"
                            t={t}
                            value={customer.is_subscribed ? ['subscribed'] : []}
                            setSettings={setSettings}
                            data={subData}
                            CheckboxView={CheckboxView}
                        />
                    ) : <Skeleton variant="rect" height={80} />}

                </div>
                <div className={styles.block}>
                    <Radio
                        label={t('customer:setting:language')}
                        flex="column"
                        valueData={dataLang}
                        value={lang}
                        onChange={setLang}
                    />
                </div>
                <div className={styles.footer}>
                    <Button
                        rootClassName={styles.btnContainer}
                        className={styles.btnSave}
                        onClick={handleSave}
                    >
                        {t('common:button:save')}
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingPage;
