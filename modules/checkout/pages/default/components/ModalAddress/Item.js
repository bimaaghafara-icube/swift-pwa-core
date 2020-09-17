import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import React, { useState } from 'react';
import useStyles from './style';

const ItemAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        loadingAddress,
        success,
        t,
        handleOpenNew,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    return (
        <>
            <div className={styles.addressColumn}>
                <div className={[styles.address_content].join(' ')}>
                    <FormControlLabel
                        className={[styles.address_shipping].join(' ')}
                        value={value}
                        checked={checked}
                        control={<Radio color="primary" size="small" />}
                        label={(
                            <>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {`${firstname} ${lastname}`}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {street}
                                    ,
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {city !== '' && `${city}, `}
                                    {region !== '' && `${region}, `}
                                    {country !== '' && `${country}, `}
                                    {postcode !== '' && postcode}
                                </Typography>
                                <Typography className={[styles.address_text].join(' ')} variant="p">
                                    {telephone}
                                </Typography>
                            </>
                        )}
                        labelPlacement="end"
                    />
                    <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => handleOpenNew('update', props)}>
                        {t('customer:address:editTitle')}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default ItemAddress;
