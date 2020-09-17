import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormCom = (props) => {
    const { t, email, FormView } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [orderField, setOrderField] = React.useState({});

    const TrackingSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('validate:email:wrong'))
            .required(t('validate:email:required')),
        order_id: Yup.string()
            .required(`${t('trackingorder:orderId')} ${t('validate:required')}`),
    });
    const formik = useFormik({
        initialValues: {
            email: email || '',
            order_id: '',
        },
        validationSchema: TrackingSchema,
        onSubmit: async (values) => {
            setOrderField(values);
            setOpenDialog(true);
        },
    });

    const handleOpenDialog = (val) => {
        setOpenDialog(val);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <FormView {...props} formik={formik} handleOpenDialog={handleOpenDialog} orderField={orderField} openDialog={openDialog} />
                </div>
            </div>
        </>
    );
};

export default FormCom;
