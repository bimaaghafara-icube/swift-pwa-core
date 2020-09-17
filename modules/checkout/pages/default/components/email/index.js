import React, { useState } from 'react';

const Email = (props) => {
    const {
        checkout,
        EmailView,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;
    const content = (
        <EmailView
            {...props}
            idButton={id}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
        />
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
