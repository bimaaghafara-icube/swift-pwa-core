import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helpers/regex';
import { cmsContactIdentifiers, recaptcha, debuging } from '@config';
import getConfig from 'next/config';
import gqlService from '../../services/graphql';

const { publicRuntimeConfig } = getConfig();

const Contact = (props) => {
    const {
        Content, t, pageConfig, ErrorInfo, Skeleton,
    } = props;
    const Config = {
        title: t('contact:pageTitle'),
        headerTitle: t('contact:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };
    const [message, setMessage] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const recaptchaRef = React.createRef();
    const sitekey = (typeof publicRuntimeConfig !== 'undefined' && recaptcha.siteKey[publicRuntimeConfig.appEnv])
        ? recaptcha.siteKey[publicRuntimeConfig.appEnv] : recaptcha.siteKey.dev;

    const [contactusFormSubmit] = gqlService.contactusFormSubmit();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            message: '',
            telephone: '',
            captcha: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required(t('validate:fullName:required')),
            email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
            message: Yup.string().required(t('validate:message:required')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('validate:required')}`),
            telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('validate:phoneNumber:required')),
        }),
        onSubmit: async (values, { resetForm }) => {
            window.backdropLoader(true);
            fetch('/captcha-validation', {
                method: 'post',
                body: JSON.stringify({
                    response: values.captcha,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => data.json())
                .then((json) => {
                    if (json.success) {
                        contactusFormSubmit({
                            variables: {
                                email: values.email,
                                fullname: values.fullName,
                                message: values.message,
                                telephone: values.telephone,
                            },
                        }).then(() => {
                            resetForm({});
                            setMessage({
                                open: true,
                                variant: 'success',
                                text: t('contact:successSubmit'),
                            });
                        }).catch(() => {
                            setMessage({
                                open: true,
                                variant: 'error',
                                text: t('common:error:fetchError'),
                            });
                        });
                    } else {
                        setMessage({
                            open: true,
                            variant: 'error',
                            text: t('contact:failedSubmit'),
                        });
                    }
                    window.backdropLoader(false);
                })
                .catch(() => {
                    window.backdropLoader(false);
                    setMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });

            recaptchaRef.current.reset();
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };
    const { error, loading, data } = gqlService.getCmsBlocks({ identifiers: [cmsContactIdentifiers] });
    if (error) {
        return (
            <ErrorInfo variant="error" text={debuging.originalError ? error.message.split(':')[1] : props.t('common:error:fetchError')} />
        );
    }

    return (
        <Layout pageConfig={pageConfig || Config} {...props}>
            <Content
                t={t}
                Content={Content}
                handleChangeCaptcha={handleChangeCaptcha}
                formik={formik}
                error={error}
                message={message}
                sitekey={sitekey}
                loading={loading}
                data={data}
                recaptchaRef={recaptchaRef}
                Skeleton={Skeleton}
            />
        </Layout>
    );
};

export default Contact;
