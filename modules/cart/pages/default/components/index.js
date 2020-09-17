import Route from 'next/router';
import Summary from '../../../plugin/Summary';

const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell,
        EditDrawerView, editItem, openEditDrawer, updateItem, SummaryView, ...other
    } = props;
    const handleOnCheckoutClicked = () => {
        Route.push('/checkout');
    };
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-9" style={{ height: '100%' }}>
                <ItemView
                    data={dataCart}
                    t={t}
                    toggleEditMode={toggleEditMode}
                    editMode={editMode}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                />
                <CrossSellView {...props} editMode={editMode} data={crosssell} />
                {editItem.id ? (
                    <EditDrawerView {...props} {...editItem} open={openEditDrawer} toggleOpen={toggleEditDrawer} updateItem={updateItem} />
                ) : null}
                <div className="hidden-desktop">
                    <Summary isDesktop={false} t={t} dataCart={dataCart} {...other} handleActionSummary={handleOnCheckoutClicked} />
                </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3 hidden-mobile">
                <Summary isDesktop t={t} dataCart={dataCart} {...other} handleActionSummary={handleOnCheckoutClicked} />
            </div>
        </div>
    );
};

export default Content;
