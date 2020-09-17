import { withTranslation } from '@i18n';
import Content from './components';
import Core from './core';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withTranslation()(Page);
