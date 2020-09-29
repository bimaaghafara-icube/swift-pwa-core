/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@common_typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { localResolver as queryResolver } from '@services/graphql/schema/local';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';

const useStyles = makeStyles({
    root: {
        marginBottom: 0,
    },
});

const CustomBreadcrumb = ({ data = [], variant = 'text' }) => {
    const client = useApolloClient();
    const handleClick = async (url, id) => {
        await client.writeQuery({
            query: queryResolver,
            data: {
                resolver: {
                    id,
                    type: 'CATEGORY',
                },
            },
        });
        Router.push(
            '/[...slug]',
            `${url}`,
        );
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} className={styles.root}>
            <Link color="secondary" onClick={() => Router.push('/')} className={styles.home}>
                <Typography variant="p">Home</Typography>
            </Link>
            {
                variant === 'chip' ? data.map(({
                    label, link, active, id,
                }, index) => (
                    <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link, id)} key={index}>
                        <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                    </Link>
                ))
                    : data.map(({
                        label, link, active, id,
                    }, index) => (
                        <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link, id)} key={index}>
                            <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};

export default (props) => (
    <CustomBreadcrumb {...props} />
);
