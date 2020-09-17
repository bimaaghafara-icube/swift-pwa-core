import ViewMobile from './view/mobile';
import ViewDesktop from './view/desktop';

const CustomerView = (props) => (
    <>
        <ViewDesktop {...props} />
        <ViewMobile {...props} />
    </>
);

export default CustomerView;
