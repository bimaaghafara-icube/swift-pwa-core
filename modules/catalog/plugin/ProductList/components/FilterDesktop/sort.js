/* eslint-disable no-unused-vars */
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

export const sortByDataSearch = [
    { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Relevance' },
    { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
    { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to High)' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (High to Low)' },
];

export const sortByDataCatalog = [
    { value: JSON.stringify({ key: 'position', value: 'ASC' }), label: 'Most Relevance' },
    { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
    { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to High)' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (High to Low)' },
];

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
    },
    sortTitle: {
        marginTop: '16px',
        fontWeight: 'bold',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SortDesktop = (props) => {
    const {
        isSearch, defaultSort, filterValue, setFiltervalue,
    } = props;
    const sortByData = isSearch ? sortByDataSearch : sortByDataCatalog;

    const classes = useStyles();
    const [value, setValue] = React.useState(defaultSort);
    const [selectedFilter, setFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        const savedData = {
            selectedFilter,
        };
        if (event.target.value !== '') {
            savedData.sort = event.target.value;
        }

        setFiltervalue(savedData);
    };
    return (
        <div className={classes.container}>
            <span className={classes.sortTitle}>
                Sort By
            </span>
            <FormControl className={classes.formControl}>
                <NativeSelect
                    value={value}
                    onChange={handleChange}
                    name="sort"
                    className={classes.selectEmpty}
                >
                    {sortByData.map((val, idx) => <option key={idx} value={val.value}>{val.label}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default SortDesktop;
