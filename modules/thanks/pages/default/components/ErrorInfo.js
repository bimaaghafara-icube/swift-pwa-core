import Alert from '@material-ui/lab/Alert';
import useStyles from './style';

export default ({ variant, text }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Alert className="m-15" severity={variant}>
                {text}
            </Alert>
        </div>
    );
};
