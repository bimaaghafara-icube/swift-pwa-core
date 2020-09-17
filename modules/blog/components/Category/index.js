import Core from './core';
import ErrorInfo from '../Info';
import Content from './components';

const Category = (props) => (
    <Core
        Content={Content}
        ErrorInfo={ErrorInfo}
        {...props}
    />
);

export default Category;
