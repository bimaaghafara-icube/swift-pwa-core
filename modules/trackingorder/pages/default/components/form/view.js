import Button from '@common_button';
import TextField from '@common_textfield';
import Modal from '../modal';
import useStyles from '../style';

const FormTemplate = (props) => {
    const {
        formik, handleOpenDialog, orderField, openDialog, t,
    } = props;
    const styles = useStyles();
    return (
        <>
            <Modal open={openDialog} handleOpenDialog={handleOpenDialog} orderField={orderField} {...props} />
            <form className={styles.container} onSubmit={formik.handleSubmit}>
                <TextField
                    label={t('trackingtrackingorder:email')}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.email && formik.errors.email)
                    }
                    errorMessage={
                        (formik.touched.email && formik.errors.email)
                    || null
                    }
                />
                <TextField
                    label={t('trackingorder:orderId')}
                    name="order_id"
                    value={formik.values.order_id}
                    onChange={formik.handleChange}
                    error={
                        !!(formik.touched.order_id && formik.errors.order_id)
                    }
                    errorMessage={
                        (formik.touched.order_id && formik.errors.order_id) || null
                    }
                />
                <div className={styles.bottomButtons}>
                    <Button
                        fullWidth
                        type="submit"
                    >
                        {t('common:search:title')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default FormTemplate;
