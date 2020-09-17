import Header from '@common_headermobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Result from './result';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const {
        open, handleOpenDialog, t,
    } = props;

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        <>
            <Dialog
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
                open={open}
                onClose={() => handleOpenDialog(false)}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    <Header
                        LeftComponent={{
                            onClick: () => handleOpenDialog(false),
                        }}
                        pageConfig={{
                            headerTitle: t('trackingorder:trackingInformation'),
                            headerBackIcon: 'close',
                            header: 'relative',
                        }}
                    />
                </DialogTitle>
                <DialogContent>
                    {open ? <Result {...props} /> : null}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalResult;
