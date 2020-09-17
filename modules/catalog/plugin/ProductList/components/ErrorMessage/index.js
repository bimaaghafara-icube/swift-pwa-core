import Alert from '@material-ui/lab/Alert';

export default ({ variant, text }) => (
    <div>
        <Alert className="m-15" severity={variant}>
            {text}
        </Alert>
    </div>
);
