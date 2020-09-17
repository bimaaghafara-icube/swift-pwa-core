import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HtmlParser from 'react-html-parser';
import useStyles from '../ExpandDetail/style';
import ListReviews from '../ListReviews';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{ minHeight: 250 }}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const TabsView = (props) => {
    const { dataInfo } = props;
    const styles = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Paper square>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {dataInfo.map((val, idx) => <Tab label={val.title} key={idx} />)}
                    <Tab label="Reviews" />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {dataInfo.map((item, index) => (
                    <TabPanel value={value} index={index} key={index} dir={theme.direction}>
                        {item.type === 'html'
                            ? (
                                <div className={styles.descriptionHtml}>
                                    {item.content && HtmlParser(item.content)}
                                </div>
                            )
                            : item.type === 'array' && (
                                <List>
                                    {
                                        item.content.map((content, idx) => (
                                            <ListItem key={idx}>
                                                <ListItemText
                                                    primary={content.label}
                                                    secondary={content.value}
                                                    classes={{
                                                        primary: styles.listLabel,
                                                        secondary: styles.listValue,
                                                    }}
                                                />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            )}
                    </TabPanel>
                ))}
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <ListReviews {...props} />
                </TabPanel>
            </SwipeableViews>
        </Paper>
    );
};

export default TabsView;
