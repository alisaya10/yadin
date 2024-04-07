import React from 'react'
// import CountiesCodeModal from '../../modals/CountriesCodeList'
import { checkTextTranslation, priceStandardView } from '../../utils/useful'
import mapboxgl, { accessToken, setRTLTextPlugin } from "mapbox-gl";
import { Map as LeafletMap, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import L from 'leaflet'
import Slider, { SliderTooltip } from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;
// import Slider, { SliderTooltip } from 'rc-slider';

// import MapSearchField from './MapSearchField';

// import ReactMapboxGl, { Marker } from "react-mapbox-gl";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

let apiKey = 'pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA'
// const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA" });

var greenIcon = L.icon({
    iconUrl: '/images/placeholder.svg',
    // shadowUrl: '/images/pin1.png',

    iconSize: [38, 50], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


class MapFilterInputLeaflet extends React.Component {

    state = {
        selectedCountry: {},
        operator: 'location',
        zoom: 13,
        slider: 3,
        radius: 1000,
        position: [35.7575, 51.41]
    }

    componentDidMount() {
        this.setState({ radius: Math.pow(10, this.state.slider) }, () => {
            this.init()
        })

        // setTimeout(() => {
        //     this.setState({showHandler:true})
        // }, 200);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data && this.props.data != this.state.data) {
            this.init()

            // this.map.center = this.props.data
        }
    }

    init() {

        // console.log("INIT")
        if (this.props.data) {
            let data = JSON.parse(JSON.stringify(this.props.data))
            this.setState({ data })
            if (data && Array.isArray(data) && data[0] != null && data[1] != null) {
                // this.setState()
                setTimeout(() => {
                    let object = { position: [Number(data[0]), Number(data[1])] }

                    if (data[2] != null) {
                        object.slider = Number(Math.log10(data[2]))
                        setTimeout(() => {

                            this.setState({ radius: data[2] })
                        }, 50);

                        // console.log(data[2])
                    }
                    object.data = data

                    this.setState(object, () => {

                        this.setState({ show: true })

                    })
                }, 100);

            } else if (data && data.lat != null && data.lng != null) {
                // this.setState()
                setTimeout(() => {
                    let object = { position: [Number(data.lat), Number(data.lng)] }

                    if (data.radius != null) {
                        object.slider = Number(Math.log10(data.radius))
                        setTimeout(() => {

                            this.setState({ radius: data.radius })
                        }, 50);

                        // console.log(data[2])
                    }
                    object.data = data

                    this.setState(object, () => {

                        this.setState({ show: true })

                    })
                }, 100);

            } else {
                this.setState({ show: true })
            }
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

    onChange = (e) => {
        // console.log(e)
        this.setState({ slider: e, radius: Math.pow(10, e).toFixed(0) })

    }


    changeRadius = (e) => {
        setTimeout(() => {

            // console.log(this.state.position)
            let data = { lat: this.state.position[0].toFixed(5), lng: this.state.position[1].toFixed(5), radius: this.state.radius }
            this.setState({ data }, () => {
                this.props.changeValue(this.props.header.key, data, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
            })
        }, 200);

    }

    moveEnd(event) {
        // console.log("END")
        // console.log(event);
        setTimeout(() => {
            let now = (new Date()).getTime()
            // console.log(now)
            // console.log(this.lastMove)
            if (this.lastMove) {
                let difference = now - this.lastMove
                // console.log(difference)

                if (difference >= 1000 && difference < 1500) {
                    this.lastMove = null
                    // console.log("UPDATE!!!!")
                    // console.log(this.state.position)

                    let data = { lat: this.state.position[0].toFixed(5), lng: this.state.position[1].toFixed(5), radius: this.state.radius }
                    console.log(data)
                    this.setState({ data }, () => {
                        this.props.changeValue(this.props.header.key, data, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
                    })
                }
            }
        }, 1000);
    }


    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        return (
            <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={` ${priceStandardView(Math.pow(10, value).toFixed(0))} Meters `}
                // visible={this.props.header?.information?.alwaysShowTooltip ? (this.state.enableTooltips ? (value != null ? true : false) : false) : dragging}
                visible={true}
                placement={this.props.header?.information?.tooltipPosition ?? "bottom"}
                key={index}
            >
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    }


    onMove(event) {
        // console.log("MOVE")
        // console.log(event);
        this.lastMove = (new Date()).getTime()
        let center = event.target.getCenter()
        this.setState({ position: [center.lat, center.lng] }, () => {
        })
    }

    changeZoom(event) {
        // console.log("Zoom")
        setTimeout(() => {
            this.lastMove = null
        }, 500);
        // console.log(event.target.getZoom());
        this.setState({ zoom: event.target.getZoom() })
        // let center = event.target.getCenter()
        // this.setState({position:[center.lat,center.lng]})
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
                    <div className="w-100" style={{ height: 220 }}>
                        <LeafletMap onMoveEnd={e => this.moveEnd(e)} onMove={e => this.onMove(e)} onZoom={e => this.changeZoom(e)} center={this.state.position} zoom={this.state.zoom} scrollWheelZoom={false}  >
                            {/* <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /> */}
                            {/* <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /> */}



                            <TileLayer
                                attribution='© <a href="https://www.iotsmile.com">IoTSmile</a>'
                                tileSize={512}
                                url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
                                // maxZoom= this.props.maxZoom
                                zoomOffset={-1}
                                id='mapbox/light-v10'
                                accessToken='pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA'
                            />

                            <Marker position={this.state.position} icon={greenIcon}>
                                {/* <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup> */}

                                <Circle
                                    center={{ lat: this.state.position[0], lng: this.state.position[1] }}
                                    fillColor="#007aff"
                                    radius={this.state.radius}
                                    // stroke={false}
                                    weight={1}
                                />

                            </Marker>




                            {/* <MapSearchField apiKey={apiKey} /> */}
                        </LeafletMap>


                        <div className="w-100" >
                            {this.state.radius && (
                                <p className="text-small" style={{color:'#789'}}>{this.state.radius} Meters</p>
                            )}
                            <Slider
                                min={1}
                                max={5}
                                value={this.state.slider}
                                onAfterChange={e => this.changeRadius(e)}
                                onChange={e => this.onChange(e)}
                                // step={10}
                                step={0.001}
                                dots={false}
                            // handle={this.handle}
                            // disabled={info?.disabled}
                            // trackStyle={info.trackStyle}
                            // railStyle={info.railStyle}
                            // handleStyle={info.handleStyle}
                            // tooltipPosition={info.tooltipPosition}
                            // handle={true}

                            />
                        </div>

                        <div className="w-100 flexcb mt-1">
                            <p className="text-smallest" style={{ color: '#789' }}>10 M</p>
                            <p className="text-smallest" style={{ color: '#789' }}>100 Km</p>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => this.setState({ show: true })} className="w-100" style={{ fontSize: 14, backgroundColor: '#eee', borderRadius: 4, padding: '6px 10px' }}>Filter Map</button>

                )}

                {/* {this.state.show ? (
                    <>
                        <div ref={el => this.mapContainer = el} style={{ overflow: 'hidden', position: 'relative', width: '100%' }} />


                        {!this.props.header?.information?.disabled && (
                            <div className="center-marker"></div>
                        )}
                    </>
                ) : (
                    <button onClick={() => this.initMap()} className="w-100" style={{ fontSize: 14, backgroundColor: '#eee', borderRadius: 4, padding: '6px 10px' }}>Filter Map</button>
                )} */}
            </div>
        )
    }
}

export default (MapFilterInputLeaflet);