import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Banner from '@common_slick/BannerThumbnail';
import useStyles from './style';

const PopupImage = (props) => {
    const { open, setOpen, banner } = props;
    const styles = useStyles();
    return (
        <Dialog fullScreen open={open} onClose={setOpen}>
            <div className={styles.container}>
                <IconButton className={styles.buttonClose} onClick={setOpen}>
                    <Close color="inherit" fontSize="inherit" />
                </IconButton>
                <Banner
                    data={banner}
                    noLink
                    thumbnail
                    showArrow
                    contentWidth="auto"
                    autoPlay={false}
                    width={960}
                    height={1120}
                />
            </div>
        </Dialog>
    );
};

export default PopupImage;
