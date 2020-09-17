import classNames from 'classnames';
import useStyles from './style';

const Image = ({
    src, width = 500, height = 500, className = '', alt = 'Image', lazy = false,
}) => {
    const styles = useStyles();
    return (
        <div
        // ref={imgContainer}
            className={styles.thumborContainer}
        >
            {!lazy ? (
                <img
                    data-pagespeed-no-defer
                    className={classNames(styles.thumborImage, className)}
                    src={
                        `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:format(webp)/${src}`
                    }
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    alt={alt}
                />
            ) : null}
        </div>
    );
};

export default Image;
