import Link from 'next/link';

const HeaderCheckout = ({
    storeConfig,
}) => (
    <div id="header">
        <Link href="/">
            <img
                className="logo"
                src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                alt="logo"
            />
        </Link>
        <style jsx>
            {`
                 #header {
                    height: 170px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                #header img {
                    cursor: pointer;
                }
            `}
        </style>
    </div>
);

export default HeaderCheckout;
