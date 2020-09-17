/* eslint-disable consistent-return */
import gqlService from '../../../../service/graphql';

const BannerSlider = (props) => {
    const {
        storeConfig, t, BannerSliderSkeleton, ErrorInfo, BannerView,
    } = props;
    if (typeof window === 'undefined') {
        return <BannerSliderSkeleton />;
    }
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getBannerSlider();
    if (loading && !data) {
        return <BannerSliderSkeleton />;
    }
    if (error) {
        return (
            <ErrorInfo variant="error" text={t('home:errorFetchData')} />
        );
    }
    if (!data || data.getHomepageSlider.images.length === 0) {
        return (
            <ErrorInfo variant="warning" text={t('home:nullData')} />
        );
    }

    if (data && data.getHomepageSlider) {
        const bannerImages = data.getHomepageSlider.images.map((image) => ({
            imageUrl: image.image_url,
            mobileImageUrl: image.mobile_image_url || image.image_url,
            link: image.url_redirection,
        }));
        return (
            <BannerView
                logoUrl={logoUrl}
                images={bannerImages}
            />
        );
    }

    return null;
};

export default BannerSlider;
