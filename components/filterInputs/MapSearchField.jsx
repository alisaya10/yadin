import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';

const MapSearchField = ({ apiKey }) => {
    const provider = new MapBoxProvider({
        params: {
            access_token: apiKey
        }
    });

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [])

    return null;
}

export default MapSearchField