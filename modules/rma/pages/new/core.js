/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { useRouter } from 'next/router';
import Content from './components';
import { getFormDataRma, getCustomer } from '../../services/graphql';

const CoreNewRma = (props) => {
    const {
        t, Loader, WarningInfo, pageConfig = {},
        storeConfig, ...other
    } = props;
    const config = {
        title: t('rma:history'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rma:history'),
        bottomNav: false,
        ...pageConfig,
    };

    const router = useRouter();
    const { id } = router.query;
    let customerData = {
        email: '',
    };
    const loadCustomerData = getCustomer();
    if (loadCustomerData.data && !loadCustomerData.loading) {
        customerData = loadCustomerData.data.customer;
    }

    const { loading, data, error } = getFormDataRma({
        variables: {
            email: customerData.email,
            order_number: id,
        },
        skip: typeof window === 'undefined' || loadCustomerData.loading,
    });

    let objectData = {
        custom_fields: [],
        items: [],
        allowed_file_extensions: [],
    };

    if (data) {
        objectData = data.getNewFormDataAwRma;
    }

    const contentprops = {
        t,
        loading,
        error,
        WarningInfo,
        loadCustomerData,
        Loader,
        data: objectData,
        customerData,
        storeConfig,
        order_number: id,
    };

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <Content
                {...contentprops}
                {...other}
            />
        </DefaultLayout>
    );
};

CoreNewRma.propTypes = {
    ItemProductView: propTypes.func.isRequired,
    ItemFieldView: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
    pageConfig: propTypes.object,
};

CoreNewRma.defaultProps = {
    Loader: () => {},
    WarningInfo: () => {},
    pageConfig: {},
};

export default CoreNewRma;
