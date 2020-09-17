/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from '@material-ui/core/Link';
import React from 'react';
import useStyles from '../style';

const ImageDetail = (props) => {
    const {
        handleClick, src, width, height, name,
    } = props;
    const styles = useStyles();
    return (
        <Link onClick={handleClick} style={{ width: '100%' }}>
            <Thumbor
                // eslint-disable-next-line no-nested-ternary
                src={src}
                className={styles.imgFeatured}
                width={width}
                height={height}
                quality={80}
                alt={name}
            />
        </Link>
    );
};

export default ImageDetail;
