const MiniCart = (props) => {
    const {
        Content, open, setOpen, count, t,
    } = props;

    return (
        <Content
            Content={Content}
            open={open}
            setOpen={setOpen}
            count={count}
            t={t}
        />
    );
};

export default MiniCart;
