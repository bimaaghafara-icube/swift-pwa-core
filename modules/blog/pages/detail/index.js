/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import DefaultContent from './components';
import CoreBase from './core';
import Skeleton from './components/Skeleton';
import WarningInfo from '../../components/Info';

const DetailPage = (props) => (
    <CoreBase
        Content={DefaultContent}
        Skeleton={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

DetailPage.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(DetailPage));
