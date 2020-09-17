import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import formatDate from '@helper_date';
import { confirmPayment } from '../../services/graphql';

const ConfirmPaymentPage = (props) => {
    const { t, pageConfig, Content } = props;
    const Config = {
        title: t('payment:confirmPayment:label'),
        headerTitle: t('payment:confirmPayment:label'),
        bottomNav: false,
        pageType: 'other',
        header: 'relative',
    };
    const [postConfirmPayment] = confirmPayment();
    const validationSchema = Yup.object().shape({
        order_number: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        payment: Yup.string().required(t('payment:confirmPayment:form:validation')),
        account_number: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        account_name: Yup.string().required(t('payment:confirmPayment:form:validation')),
        amount: Yup.number().typeError(t('payment:confirmPayment:form:validNumber'))
            .positive(t('payment:confirmPayment:form:validNumber')).required(t('payment:confirmPayment:form:validation')),
        date: Yup.string().required(t('payment:confirmPayment:form:validation')),
        filename: Yup.string().required(t('payment:confirmPayment:form:validation')),
        image_base64: Yup.string().required(t('payment:confirmPayment:form:validation')),
    });
    const formik = useFormik({
        initialValues: {
            order_number: '',
            payment: '',
            account_number: '',
            account_name: '',
            amount: '',
            date: Date.now(),
            filename: '',
            image_base64: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            window.backdropLoader(true);
            postConfirmPayment({
                variables: {
                    ...values,
                    amount: parseFloat(values.amount),
                    date: formatDate(values.date, 'YYYY-MM-03 HH:mm:ss'),
                },
            }).then(() => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: t('payment:confirmPayment:confirmSuccess'),
                    variant: 'success',
                });
                resetForm({});
            }).catch((e) => {
                window.backdropLoader(true);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('payment:confirmPayment:confirmFailed'),
                    variant: 'error',
                });
            });
        },

    });

    const handleChangeDate = (date) => {
        formik.setFieldValue('date', date);
    };
    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('image_base64', baseCode);
    };
    return (
        <Layout pageConfig={pageConfig || Config} {...props}>
            <Content
                Content={Content}
                handleChangeDate={handleChangeDate}
                handleDropFile={handleDropFile}
                t={t}
                formik={formik}
            />
        </Layout>
    );
};

export default ConfirmPaymentPage;
