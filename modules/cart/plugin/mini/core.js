const MiniCart = (props) => {
    const { Content, open, setOpen } = props;

    return <Content Content={Content} open={open} setOpen={setOpen} />;
};

export default MiniCart;
