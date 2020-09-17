import Alert from '@material-ui/lab/Alert';
import useStyles from './style';

const ErrorInfo = ({ variant = 'success', text = '' }) => {
    const styles = useStyles();
    return (
        <div className={styles.divMessage}>
            <Alert className="m-15" severity={variant}>{text}</Alert>
        </div>
    );
};

export default ErrorInfo;
