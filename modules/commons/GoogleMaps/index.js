/* eslint-disable import/no-extraneous-dependencies */
import {
    compose,
    withProps,
    withHandlers,
    lifecycle,
} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useTranslation } from '@i18n';

const {
    StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const IcubeMaps = compose(
    withProps((props) => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '210px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        isMarkerShown: true,
    })),
    withHandlers({
        handleDragEnd: ({ dragMarkerDone }) => (event) => {
            const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            dragMarkerDone(newPosition);
        },
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const { location } = refs.searchBox.getPlaces()[0].geometry;
                    // unconfirmed deletion, delete line below when it's confirmed unused codes
                    // this.props.getLocation(refs.searchBox.getPlaces());
                    this.props.dragMarkerDone({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                },
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };
    const mapPosition = {
        lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
        lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
    };
    const { t } = useTranslation(['common']);

    return (
        <>
            <GoogleMap
                defaultZoom={17}
                defaultCenter={mapPosition}
                center={mapPosition}
            >
                {props.isMarkerShown && (
                    <Marker
                        draggable
                        onDragEnd={(event) => props.handleDragEnd(event)}
                        position={mapPosition}
                    />
                )}
            </GoogleMap>
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <TextField
                        fullWidth
                        placeholder={t('common:search:location')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="secondary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </StandaloneSearchBox>
            </div>
        </>
    );
});

export default IcubeMaps;
