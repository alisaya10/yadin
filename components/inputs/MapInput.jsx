import React from 'react'
import CountiesCodeModal from '../../modals/CountriesCodeList'
import { checkTextTranslation } from '../../utils/useful'
import mapboxgl, { accessToken, setRTLTextPlugin } from "mapbox-gl";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";


setRTLTextPlugin(
    "https://www.parsimap.com/scripts/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js"
);

// const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA" });


class MapInput extends React.Component {
    state = {
        selectedCountry: {},
        zoom: [12]
    }

    componentDidMount() {
        // console.log(this.props.data )
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: this.props.data ? this.props.data : [51.41, 35.7575],
            zoom: this.state.zoom,
            // accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNraDFzeTk0dTA4a24ycm83ODRiaWcwcmcifQ.EP7OhjEvrtOGn6UmGc7CKQ"
            accessToken:"pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA"
        });


        if (this.props.data) {
            var el = document.createElement('div');
            el.className = 'marker';
            let lng = Array.isArray(this.props.data)?this.props.data[0]:this.props.data.lng
            let lat = Array.isArray(this.props.data)?this.props.data[1]:this.props.data.lat

            new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .addTo(map);
        }

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng,//.toFixed(4),
                lat: map.getCenter().lat,//.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
            this.props.changeValue(this.props.header.key, [map.getCenter().lng, map.getCenter().lat])
            // console.log(
            //     {
            //         lng: map.getCenter().lng,
            //         lat: map.getCenter().lat,
            //     }
            // )
        });
    }

    componentDidUpdate(prevprops) {
        if (this.props.data != prevprops && (prevprops == null || prevprops == '')) {
            this.map.center = this.props.data
        }
    }

    // moveMap(e) {
    //     if (e.transform._center.lat != this.props.data?.lat && e.transform._center.lng != this.props.data?.lng)
    //         // console.log(e.transform._center)
    //         this.props.changeValue(this.props.header.key, Object(e.transform._center))

    // }

    // zoomEnd = (e) => {
    //     console.log(this.state.zoom)
    //     if (this.map.getZoom) {
    //         let zoom = this.map.getZoom()
    //         this.setState({ zoom: [zoom] })
    //         console.log(zoom)

    //         // if (this.map.getZoom) {

    //         // }
    //         if (e.transform._center.lat != this.props.data?.lat && e.transform._center.lng != this.props.data?.lng) {

    //         }
    //     }
    //     // console.log(e.transform._center)
    //     // this.props.changeValue(this.props.header.key, Object(e.transform._center))

    // }


    render() {
        return (
            <div className="w-100" style={{ position: 'relative' }}>

                <div ref={el => this.mapContainer = el} style={{ overflow: 'hidden', position: 'relative' }} />
                {/* <Map
                    style="https://www.parsimap.com/styles/street.json"
                    containerStyle={{ height: "200px", width: "100%" }}
                    center={this.props.data ? this.props.data : [51.41, 35.7575]}
                    zoom={this.state.zoom}
                    onMoveEnd={e => this.moveMap(e)}
                    onZoomEnd={e => this.zoomEnd(e)}
                    onStyleLoad={el => this.map = el}
                    ref={el => this.map = el}
                >
                </Map> */}

                {!this.props.header?.information?.disabled && (
                    <div className="center-marker"></div>
                )}
            </div>
        )
    }
}

export default (MapInput);