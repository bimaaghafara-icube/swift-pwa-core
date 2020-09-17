import Layout from '@layout';

import { setLogin } from '@helpers/auth';
import { setCartId, getCartId } from '@helpers/cartId';
import { expiredToken, custDataNameCookie, recaptcha } from '@config';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

import { regexPhone } from '@helpers/regex';
import getConfig from 'next/config';
import {
    register, otpConfig as queryOtpConfig, mergeCart as mutationMergeCart, getCustomerCartId,
} from '../../services/graphql';
import { getCustomer } from '../../services/graphql/schema';
import Content from './components';

const { publicRuntimeConfig } = getConfig();

const Register = (props) => {
    const { t, storeConfig, pageConfig } = props;
    const config = {
        title: t('register:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('register:title'),
        bottomNav: false,
    };

    const [phoneIsWa, setPhoneIsWa] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);
    const [disabled, setdisabled] = React.useState(false);

    const recaptchaRef = React.createRef();
    const sitekey = (typeof publicRuntimeConfig !== 'undefined' && recaptcha.siteKey[publicRuntimeConfig.appEnv])
        ? recaptcha.siteKey[publicRuntimeConfig.appEnv] : recaptcha.siteKey.dev;

    let cartId = '';

    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000) : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const [getCart, cartData] = getCustomerCartId();
    const [mergeCart, { called }] = mutationMergeCart();
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
    });
    const otpConfig = queryOtpConfig();

    const [sendRegister] = register();

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        password: Yup.string().required(t('validate:password:required')),
        confirmPassword: Yup.string()
            .required(t('validate:confirmPassword:required'))
            // eslint-disable-next-line no-use-before-define
            .test('check-pass', t('validate:confirmPassword.wrong'), (input) => input === formik.values.password),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        whatsappNumber: Yup.string().required(t('validate:whatsappNumber:required')).matches(regexPhone, t('validate:whatsappNumber:wrong')),
        otp: otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_register && Yup.number().required('Otp is required'),
        captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('validate:required')}`),
    });

    const handleSendRegister = (values, resetForm) => {
        sendRegister({
            variables: values,
        })
            .then(async () => {
                resetForm();
                await setIsLogin(1);
                getCart();
                setdisabled(false);
                window.backdropLoader(false);
            })
            .catch((e) => {
                setdisabled(false);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[0] || t('register:failed'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            whatsappNumber: '',
            subscribe: false,
            otp: '',
            captcha: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values, { resetForm }) => {
            setdisabled(true);
            window.backdropLoader(true);
            if (recaptcha.enable) {
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
                            handleSendRegister(values, resetForm);
                        } else {
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('register:failed'),
                            });
                        }
                        window.backdropLoader(false);
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                    });

                recaptchaRef.current.reset();
            } else {
                handleSendRegister(values, resetForm);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const handleWa = () => {
        if (phoneIsWa === false) {
            // eslint-disable-next-line no-use-before-define
            formik.setFieldValue('whatsappNumber', formik.values.phoneNumber);
        }
        setPhoneIsWa(!phoneIsWa);
    };

    const handleChangePhone = (event) => {
        const { value } = event.target;
        if (phoneIsWa === true) {
            formik.setFieldValue('whatsappNumber', value);
        }
        formik.setFieldValue('phoneNumber', value);
    };

    if (cartData.data && custData.data) {
        Cookies.set(custDataNameCookie, {
            email: custData.data.customer.email,
        });
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setLogin(1, expired);
            setCartId(custCartId, expired);
            window.toastMessage({
                open: true,
                text: t('register:success'),
                variant: 'success',
            });
            Router.push('/customer/account');
        } else if (!called && (cartId !== custCartId)) {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            })
                .then(() => {
                    setLogin(1, expired);
                    setCartId(custCartId, expired);
                    window.toastMessage({
                        open: true,
                        text: t('register:success'),
                        variant: 'success',
                    });
                    Router.push('/customer/account');
                })
                .catch((e) => {
                    setdisabled(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message.split(':')[1] || t('register:failed'),
                        variant: 'error',
                    });
                });
        } else {
            Router.push('/customer/account');
        }
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                {...props}
                t={t}
                formik={formik}
                otpConfig={otpConfig}
                setdisabled={setdisabled}
                handleChangePhone={handleChangePhone}
                handleWa={handleWa}
                phoneIsWa={phoneIsWa}
                recaptcha={recaptcha}
                sitekey={sitekey}
                handleChangeCaptcha={handleChangeCaptcha}
                disabled={disabled}
                recaptchaRef={recaptchaRef}
            />
        </Layout>
    );
};

export default Register;
