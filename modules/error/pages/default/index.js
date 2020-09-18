import { storeConfig as ConfigSchema } from '@services/graphql/schema/config';
import Core from './core';
import Content from './components';
import graphRequest from '../../../../api/graphql';

const Error = (props) => <Core {...props} Content={Content} />;

Error.getInitialProps = async () => {
    const storeConfig = await graphRequest(ConfigSchema);
    return {
        namespacesRequired: ['common'],
        storeConfig,
    };
};

export default Error;
