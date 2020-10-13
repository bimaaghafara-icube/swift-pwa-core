/* eslint-disable consistent-return */
import { regexPhone } from '@helper_regex';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCityByRegionId, getCountries as getAllCountries } from '../../services/graphql';

const AddressFormDialog = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = 'ID',
        region = null,
        city = null,
        telephone = '',
        maps = '',
        open,
        t,
        onSubmitAddress,
        loading = false,
        success = false,
        defaultShipping = false,
        defaultBilling = false,
        addressId = null,
        setOpen,
        latitude,
        longitude,
        pageTitle,
        disableDefaultAddress = false,
        Content,
        storeConfig,
    } = props;

    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;

    const [getCountries, gqlCountries] = getAllCountries();
    const [addressState, setAddressState] = useState({
        countries: null,
        dropdown: {
            countries: null,
            region: null,
            city: null,
        },
        value: {
            country: { id: '', label: '' },
            region: { id: '', label: '' },
            city: { id: '', label: '' },
        },
    });

    const [isFromUseEffect, setFromUseEffect] = useState(false);

    const getRegionByLabel = (label, dataRegion = null) => {
        const data = dataRegion || addressState.dropdown.region;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const getRegionByCountry = (dataCountry, countries = null) => {
        let data = countries || addressState.countries;
        data = data.find((item) => item.id === dataCountry);

        if (data) {
            if (data.available_regions) {
                return data.available_regions.map((item) => ({
                    ...item,
                    label: item.name,
                }));
            }
        }

        return null;
    };

    const getCountryByCode = (code, countries = null) => {
        let data = countries || addressState.dropdown.countries;
        data = data.find((item) => item.id === code);
        return data || null;
    };

    const getCityByLabel = (label, dataCity = null) => {
        const data = dataCity || addressState.dropdown.city;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const [mapPosition, setMapPosition] = useState({
        lat: latitude || '-6.197361',
        lng: longitude || '106.774535',
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const AddressSchema = Yup.object().shape({
        firstname: Yup.string().required(t('validate:firstName:required')),
        lastname: Yup.string().required(t('validate:lastName:required')),
        telephone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')),
        postcode: Yup.string().required(t('validate:postal:required')).min(3, t('validate:postal:wrong')).max(20, t('validate:postal:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        region: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: firstname || '',
            lastname: lastname || '',
            telephone: telephone || '',
            street: street || '',
            country: '',
            region: '',
            city: '',
            postcode: postcode || '',
            maps: maps || '',
            defaultBilling: defaultBilling || false,
            defaultShipping: defaultShipping || false,
            regionCode: '',
            regionId: '',
        },
        validationSchema: AddressSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                city: _.isObject(values.city) ? values.city.label : values.city,
                countryCode: values.country.id,
                region: _.isObject(values.region) ? values.region.code : values.region,
                regionCode: _.isObject(values.region) ? values.region.code : null,
                regionId: _.isObject(values.region) ? values.region.id : null,
                addressId,
                latitude: String(mapPosition.lat),
                longitude: String(mapPosition.lng),
            };

            const type = addressId ? 'update' : 'add';
            if (onSubmitAddress) {
                onSubmitAddress(data, type);
            }
        },
    });

    const [getCities, responCities] = getCityByRegionId({});

    useEffect(() => {
        const state = { ...addressState };

        formik.setFieldValue('country', country);
        formik.setFieldValue('region', region);

        getCountries();
        if (gqlCountries.data && open) {
            state.countries = gqlCountries.data.countries;
            state.dropdown.countries = state.countries.map((item) => ({
                id: item.id,
                label: item.full_name_locale,
                available_regions: item.available_regions,
            }));

            if (country) {
                state.dropdown.region = getRegionByCountry(country, gqlCountries.data.countries);
                formik.setFieldValue('country', getCountryByCode(country, state.dropdown.countries));
            }
            setAddressState(state);

            if (_.isArray(state.dropdown.region) && region) {
                const selectedRegion = getRegionByLabel(region);
                formik.setFieldValue('region', selectedRegion);
                if (selectedRegion) {
                    setFromUseEffect(true);
                    getCities({ variables: { regionId: selectedRegion.id } });
                }
            } else {
                formik.setFieldValue('city', city);
            }
        }

        // only set current location for add mode
        if (navigator.geolocation && !addressId) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }

        // update map position after edit data
        if (open && latitude && longitude) {
            setMapPosition({
                lat: latitude,
                lng: longitude,
            });
        }
    }, [open]);

    useEffect(() => {
        if (responCities.data && !responCities.loading && !responCities.error) {
            const state = { ...addressState };
            const { data } = responCities;
            if (data.getCityByRegionId.item.length !== 0) {
                state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
                formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
            } else {
                state.dropdown.city = null;
                formik.setFieldValue('city', null);
                if (isFromUseEffect) {
                    formik.setFieldValue('city', city);
                    setFromUseEffect(false);
                }
            }

            setAddressState(state);
        }
    }, [responCities]);

    return (
        <Content
            t={t}
            open={open}
            setOpen={setOpen}
            pageTitle={pageTitle}
            formik={formik}
            addressState={addressState}
            setFromUseEffect={setFromUseEffect}
            getCities={getCities}
            setAddressState={setAddressState}
            mapPosition={mapPosition}
            handleDragPosition={handleDragPosition}
            disableDefaultAddress={disableDefaultAddress}
            loading={loading}
            success={success}
            gmapKey={gmapKey}
        />
    );
};

export default AddressFormDialog;
