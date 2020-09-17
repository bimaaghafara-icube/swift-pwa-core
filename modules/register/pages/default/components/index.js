import Button from '@common_button';
import PasswordField from '@common_password';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import { Checkbox, FormControlLabel } from '@material-ui/core/';
import OtpBlock from '@core_modules/login/plugins/otp';
import classNames from 'classnames';
import { breakPointsUp } from '@helpers/theme';
import ReCAPTCHA from 'react-google-recaptcha';
import useStyles from './style';

const RegisterView = ({
    t,
    formik,
    otpConfig,
    setdisabled,
    handleChangePhone,
    handleWa,
    phoneIsWa,
    recaptcha,
    sitekey,
    handleChangeCaptcha,
    disabled,
    recaptchaRef,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    return (
        <>
            <form className={classNames('col-md-6', styles.container)} onSubmit={formik.handleSubmit}>
                <TextField
                    label={t('common:form:firstName')}
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.firstName && formik.errors.firstName)}
                    errorMessage={(formik.touched.firstName && formik.errors.firstName) || null}
                />
                <TextField
                    label={t('common:form:lastName')}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.lastName && formik.errors.lastName)}
                    errorMessage={(formik.touched.lastName && formik.errors.lastName) || null}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                    errorMessage={(formik.touched.email && formik.errors.email) || null}
                />
                <PasswordField
                    label="Password"
                    showVisible
                    showPasswordMeter
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.password && formik.errors.password)}
                    errorMessage={(formik.touched.password && formik.errors.password) || null}
                />
                <TextField
                    label={t('common:form:confirm')}
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                />
                {otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_register ? (
                    <OtpBlock
                        type="register"
                        setDisabled={setdisabled}
                        phoneProps={{
                            name: 'phoneNumber',
                            value: formik.values.phoneNumber,
                            onChange: handleChangePhone,
                            error: !!(formik.errors.phoneNumber && formik.touched.phoneNumber),
                            errorMessage: (formik.touched.phoneNumber && formik.errors.phoneNumber) || null,
                        }}
                        codeProps={{
                            name: 'otp',
                            value: formik.values.otp,
                            onChange: formik.handleChange,
                            error: !!(formik.touched.otp && formik.errors.otp),
                            errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                            footer: (
                                <FormControlLabel
                                    onChange={handleWa}
                                    className={styles.checkWa}
                                    control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                    label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                                />
                            ),
                        }}
                    />
                ) : (
                    <TextField
                        label={t('common:form:phoneNumber')}
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={handleChangePhone}
                        error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                        errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) || null}
                        footer={(
                            <FormControlLabel
                                onChange={handleWa}
                                className={styles.checkWa}
                                control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                            />
                        )}
                    />
                )}
                {!phoneIsWa && (
                    <TextField
                        label={`${t('common:form:phoneNumber')} Whatsapp`}
                        name="whatsappNumber"
                        value={formik.values.whatsappNumber}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                        errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                    />
                )}
                <div className={styles.footer}>
                    <FormControlLabel
                        value={formik.values.subscribe}
                        onChange={formik.handleChange}
                        name="subscribe"
                        control={<Checkbox name="subscribe" color="primary" size="small" />}
                        label={(
                            <Typography variant="p" letter="capitalize" className="row center">
                                {t('register:subscribe')}
                            </Typography>
                        )}
                        className={recaptcha.enable && styles.subscribe}
                    />

                    {
                        recaptcha.enable ? (
                            <>
                                <ReCAPTCHA
                                    sitekey={sitekey}
                                    onChange={handleChangeCaptcha}
                                    ref={recaptchaRef}
                                />
                                { formik.errors.captcha && (
                                    <Typography color="red">{formik.errors.captcha}</Typography>
                                )}
                            </>
                        ) : null
                    }
                    <Button
                        disabled={disabled}
                        fullWidth={!desktop}
                        className={styles.btnSigin}
                        type="submit"
                    >
                        <Typography variant="title" type="regular" letter="capitalize" color="white">
                            {t('register:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default RegisterView;
