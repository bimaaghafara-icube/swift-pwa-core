import Button from '@material-ui/core/Button';
import { installMessage } from '@config';
import useStyles from './style';

const DesktopInstall = () => {
    const styles = useStyles();
    return (
        <div id="popup-desktop__install" className={styles.popupInstallDesktop}>
            <Button
                id="btn-install"
                variant="contained"
                color="primary"
                className={styles.btnInstallDesktop}
            >
                Install
            </Button>
            {' '}
            {installMessage}
        </div>
    );
};

export default DesktopInstall;
