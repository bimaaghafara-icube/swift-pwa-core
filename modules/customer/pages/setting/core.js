import Layout from '@layout';
import { useMutation } from '@apollo/client';
import { languagesLabel } from '@config';
import * as Schema from '../../services/graphql/schema';
import { getCustomerSettings } from '../../services/graphql';

const SettingsPage = (props) => {
    const {
        t, Content, i18n, pageConfig,
    } = props;
    const config = {
        title: t('customer:setting:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:setting:title'),
        bottomNav: false,
    };

    const { languages, language } = i18n;
    const dataLang = [];
    languages.forEach((lang) => {
        dataLang.push({
            label: languagesLabel[lang],
            value: lang,
        });
    });

    const [settings, setSettings] = React.useState({
        is_subscribed: false,
    });

    const [lang, setLang] = React.useState(language);

    const [actUpdateCustomer, resultUpdate] = useMutation(Schema.updateCustomer);
    if (!resultUpdate.loading && typeof window !== 'undefined' && window.backdropLoader) {
        setTimeout(() => {
            window.backdropLoader(false);
        }, 500);
    }
    const handleSave = () => {
        window.backdropLoader(true);
        actUpdateCustomer({
            variables: {
                isSubscribed: settings.is_subscribed,
            },
            context: {
                request: 'internal',
            },
        });
        i18n.changeLanguage(lang);
    };
    let customer = {};
    if (typeof window !== 'undefined') {
        const { data } = getCustomerSettings();
        if (data && data.customer) {
            customer = data.customer;
        }
    }
    React.useEffect(() => {
        if (customer.is_subscribed) {
            setSettings({
                ...{
                    is_subscribed: true,
                },
            });
        }
    }, [customer]);
    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                customer={customer}
                setSettings={setSettings}
                dataLang={dataLang}
                lang={lang}
                setLang={setLang}
                handleSave={handleSave}
            />
        </Layout>
    );
};

export default SettingsPage;
