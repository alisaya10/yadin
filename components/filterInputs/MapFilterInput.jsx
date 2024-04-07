import React from 'react'
import CountiesCodeModal from '../../modals/CountriesCodeList'
import { checkTextTranslation } from '../../utils/useful'
import mapboxgl, { accessToken, setRTLTextPlugin} from "mapbox-gl";
// import ReactMapboxGl, { Marker } from "react-mapbox-gl";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA" });


class MapFilterInput extends React.Component {
    state = {
        selectedCountry: {},
        zoom: [12]
    }

    componentDidMount() {
        // console.log(this.props.data )

    }

    componentDidUpdate(prevprops) {
        if (this.props.data != prevprops && (prevprops == null || prevprops == '')) {
            this.map.center = this.props.data
        }
    }



    initMap() {
        this.setState({ show: true }, () => {

            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/light-v10',
                center: this.props.data ? this.props.data : [51.41, 35.7575],
                zoom: this.state.zoom,
                width: '100%',

                // height: '100%',
                // accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNraDFzeTk0dTA4a24ycm83ODRiaWcwcmcifQ.EP7OhjEvrtOGn6UmGc7CKQ"
                accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA"
            });

            let lat = 51.41
            if (this.props.data) {
                lat = Array.isArray(this.props.data) ? this.props.data[1] : this.props.data.lat
            }





            if (this.props.data) {
                var el = document.createElement('div');
                el.className = 'marker';
                let lng = Array.isArray(this.props.data) ? this.props.data[0] : this.props.data.lng
                let lat = Array.isArray(this.props.data) ? this.props.data[1] : this.props.data.lat

                new mapboxgl.Marker(el)
                    .setLngLat([lng, lat])
                    .addTo(map);
            }
            
            // var filterCircle = mapboxgl.circle(40, -75, 5000, {
            //     opacity: 1,
            //     weight: 1,
            //     fillOpacity: 0.4
            // }).addTo(map);

            map.on('load', function () {

               
                // map.addLayer({
                //     "id": "circle500",
                //     "type": "circle",
                //     "source": "source_circle_500",
                //     "paint": {
                //         "circle-radius": {
                //             stops: [
                //                 [5, 1],
                //                 [15, 1024]
                //                 // [0, 0],
                //                 // [20, this.metersToPixelsAtMaxZoom(20, lat)]
                //             ],
                //             base: 2
                //         },
                //         "circle-color": "red",
                //         "circle-opacity": 0.6
                //     }
                // })
            })

            map.on('move', (e) => {

                // filterCircle.setLatLng(e.latlng);

                this.setState({
                    lng: map.getCenter().lng,//.toFixed(4),
                    lat: map.getCenter().lat,//.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
                // this.props.changeValue(this.props.header.key, [map.getCenter().lng, map.getCenter().lat])
                // console.log(
                //     {
                //         lng: map.getCenter().lng,
                //         lat: map.getCenter().lat,
                //     }
                // )
            });
        })
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

    metersToPixelsAtMaxZoom = (meters, latitude) => {
        return meters / 0.075 / Math.cos(latitude * Math.PI / 180)
    }


    render() {
        return (
            <div className="w-100" style={{ position: 'relative' }}>


                {/* <ReactMapboxGl
                    style="https://www.parsimap.com/styles/street.json"
                    containerStyle={{ height: "200px", width: "100%" }}
                    center={this.props.data ? this.props.data : [51.41, 35.7575]}
                    zoom={this.state.zoom}
                    onMoveEnd={e => this.moveMap(e)}
                    onZoomEnd={e => this.zoomEnd(e)}
                    onStyleLoad={el => this.map1 = el}
                    ref={el => this.map1 = el}
                >
                </ReactMapboxGl> */}

                {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer> */}


                {this.state.show ? (
                    <>
                        <div ref={el => this.mapContainer = el} style={{ overflow: 'hidden', position: 'relative', width: '100%' }} />


                        {!this.props.header?.information?.disabled && (
                            <div className="center-marker"></div>
                        )}
                    </>
                ) : (
                    <button onClick={() => this.initMap()} className="w-100" style={{ fontSize: 14, backgroundColor: '#eee', borderRadius: 4, padding: '6px 10px' }}>Filter Map</button>
                )}
            </div>
        )
    }
}

export default (MapFilterInput);