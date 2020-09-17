/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const imgError = (image) => {
    image.onerror = '';
    image.src = '/assets/img/placeholder.png';
    return true;
};

const Image = ({
    src, width = 500, height = 500, className = '', alt = 'Image', quality = 100, style = {}, lazy = false, ...other
}) => (
    <div
        // ref={imgContainer}
        style={{
            backgroundColor: '#eee',
            width: '100%',
            position: 'relative',
            paddingTop: `${(height / width) * 100}%`,
        }}
    >
        {!lazy ? (
            <img
                ARIA
                data-pagespeed-no-defer
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                }}
                className={`img ${className}`}
                src={
                    `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:format(webp)/${src}`
                }
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                alt={alt}
                {...other}
            />
        ) : null}
    </div>
);

export default Image;
