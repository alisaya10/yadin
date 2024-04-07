import React, { useEffect } from 'react'
// import CountiesCodeModal from '../../modals/CountriesCodeList'
import { checkTextTranslation, priceStandardView } from '../../utils/useful'
// import mapboxgl, { accessToken, setRTLTextPlugin } from "mapbox-gl";
import { Map as LeafletMap, Marker, Popup, TileLayer, Circle, useLeaflet, FeatureGroup, Tooltip } from "react-leaflet";
import L from 'leaflet'
import Slider, { SliderTooltip } from 'rc-slider';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// import MarkerClusterGroup from 'react-leaflet-markercluster';
import moment from 'moment'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;
const provider = new OpenStreetMapProvider();

// import Slider, { SliderTooltip } from 'rc-slider';

// import MapSearchField from './MapSearchField';

// import ReactMapboxGl, { Marker } from "react-mapbox-gl";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// let apiKey = 'pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA'
// const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA" });

// const myCustomColour = '#583470'
// 
const markerHtmlStyles = `
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1rem;
  top: -1rem;
  position: relative;
  border-radius: 2rem 2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

// const colorIcon = L.divIcon({
//     className: "my-custom-pin",
//     iconAnchor: [0, 24],
//     labelAnchor: [-6, 0],
//     popupAnchor: [0, -36],
//     html: `<span style="${markerHtmlStyles}" />`
// })

// const colorIcon1 = L.divIcon({
//     className: "my-custom-pin1",
//     iconAnchor: [0, 24],
//     labelAnchor: [-6, 0],
//     popupAnchor: [0, -36],
//     html: `<span style="${markerHtmlStyles}" />`
// })

// const colorIcon2 = L.divIcon({
//     className: "my-custom-pin2",
//     iconAnchor: [0, 24],
//     labelAnchor: [-6, 0],
//     popupAnchor: [0, -36],
//     html: `<span style="${markerHtmlStyles}" />`
// })

// const colorIcon3 = L.divIcon({
//     className: "my-custom-pin3",
//     iconAnchor: [0, 24],
//     labelAnchor: [-6, 0],
//     popupAnchor: [0, -36],
//     html: `<span style="${markerHtmlStyles}" />`
// })

var greenIcon = L.icon({
    iconUrl: '/images/placeholder.svg',
    // shadowUrl: '/images/pin1.png',

    iconSize: [38, 50], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


const Search = (props) => {
    const { map } = useLeaflet() // access to leaflet map
    const { provider } = props

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
        })

        map.addControl(searchControl) // this is how you add a control in vanilla leaflet
        return () => map.removeControl(searchControl)
    }, [props])

    return null // don't want anything to show up from this comp
}

// const searchControl = new GeoSearchControl({
//     provider: provider,
//   });


class MapLeafletInput extends React.Component {

    state = {
        selectedCountry: {},
        operator: 'location',
        zoom: 13,
        slider: 3,
        radius: 1000,
        position: [35.7575, 51.41]
    }

    componentDidMount() {

        // console.log("!!######### MAP ########")
        // console.log(this.props.data)

        this.setState({ radius: Math.pow(10, this.state.slider) }, () => {
            this.init()
        })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data && this.props.data != this.state.data) {
            this.init()

            // this.map.center = this.props.data
        }
    }

    init() {
        // console.log("######### MAP ########")
        // console.log(this.props.data)
        this.setState({ show: true })

        if (this.props.data) {
            let data = JSON.parse(JSON.stringify(this.props.data))
            this.setState({ data })

            if (data && Array.isArray(data) && data[0] != null && data[1] != null && !data[0].coordinates) {

                setTimeout(() => {
                    let object = { lat: Number(data[0]), lng: Number(data[1]), position: [Number(data[0]), Number(data[1])] }

                    if (data[2] != null) {
                        object.slider = Number(Math.log10(data[2]))
                        setTimeout(() => {

                            this.setState({ radius: data[2] })
                        }, 50);

                        // console.log(data[2])
                    }
                    object.data = data

                    this.setState(object, () => {

                        this.setState({ show: false }, () => {
                            this.setState({ show: true })
                        })

                    })
                }, 100);
            } else if (data && Array.isArray(data)) {
                let markers = []
                let bounds = []
                data.forEach(element => {

                    let object = { id: element.id, cDate: element.cDate, data: element.data, lat: Number(element.coordinates[1]), lng: Number(element.coordinates[0]), position: [Number(element.coordinates[1]), Number(element.coordinates[0])] }
                    markers.push(object)
                    bounds.push([Number(element.coordinates[1]), Number(element.coordinates[0])])
                });
                // console.log("markers")

                console.log(markers)
                this.setState({ markers }, () => {

                    this.setState({ show: false }, () => {
                        setTimeout(() => {
                            this.setState({ show: true }, () => {
                                console.log(this.map)
                                let map = this.map.leafletElement
                                // let layer = this.customAreaRef
                                // console.log(map.leafletElement)

                                // console.log(this.groupRef)

                                // let group = this.groupRef.leafletElement; //get native featureGroup instance
                                if (bounds && bounds.length > 0) {
                                    map.fitBounds(bounds);
                                }

                                setTimeout(() => {
                                    // console.log(this.group)

                                    markers.forEach((markerRef, index) => {
                                        let marker = this['marker-' + markerRef.id]
                                        console.log(marker)
                                        if (marker.leafletElement._icon) {
                                            console.log(marker.leafletElement._icon.className)

                                            marker.leafletElement._icon.className = marker.leafletElement._icon.className + ' marker-' + markerRef.id
                                        }
                                    });
                                }, 500);

                                // this.map.fitBounds(markers)
                            })
                        }, 50);
                    })
                })


            } else if (data && data.lat != null && data.lng != null) {
                setTimeout(() => {
                    let object = { lat: Number(data.lat), lng: Number(data.lng), position: [Number(data.lat), Number(data.lng)] }


                    object.data = data
                    console.log(object)
                    this.setState(object, () => {

                        this.setState({ show: false }, () => {
                            setTimeout(() => {
                                this.setState({ show: true })
                            }, 50);
                        })
                    })
                }, 100);

            } else if (data.coordinates) {
                setTimeout(() => {

                    let object = { lat: Number(data.coordinates[1]), lng: Number(data.coordinates[0]), position: [Number(data.coordinates[1]), Number(data.coordinates[0])] }
                    this.setState(object, () => {

                        this.setState({ show: false }, () => {
                            setTimeout(() => {
                                this.setState({ show: true })
                            }, 50);
                        })
                    })
                }, 100);

            } else {

                this.setState({ show: true })
            }
        }
    }



    // initMap() {
    //     this.setState({ show: true }, () => {

    //         const map = new mapboxgl.Map({
    //             container: this.mapContainer,
    //             style: 'mapbox://styles/mapbox/light-v10',
    //             center: this.props.data ? this.props.data : [51.41, 35.7575],
    //             zoom: this.state.zoom,
    //             width: '100%',

    //             // height: '100%',
    //             // accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNraDFzeTk0dTA4a24ycm83ODRiaWcwcmcifQ.EP7OhjEvrtOGn6UmGc7CKQ"
    //             accessToken: "pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA"
    //         });

    //         let lat = 51.41
    //         if (this.props.data) {
    //             lat = Array.isArray(this.props.data) ? this.props.data[1] : this.props.data.lat
    //         }





    //         if (this.props.data) {
    //             var el = document.createElement('div');
    //             el.className = 'marker';
    //             let lng = Array.isArray(this.props.data) ? this.props.data[0] : this.props.data.lng
    //             let lat = Array.isArray(this.props.data) ? this.props.data[1] : this.props.data.lat

    //             new mapboxgl.Marker(el)
    //                 .setLngLat([lng, lat])
    //                 .addTo(map);
    //         }

    //         // var filterCircle = mapboxgl.circle(40, -75, 5000, {
    //         //     opacity: 1,
    //         //     weight: 1,
    //         //     fillOpacity: 0.4
    //         // }).addTo(map);

    //         map.on('load', function () {


    //             // map.addLayer({
    //             //     "id": "circle500",
    //             //     "type": "circle",
    //             //     "source": "source_circle_500",
    //             //     "paint": {
    //             //         "circle-radius": {
    //             //             stops: [
    //             //                 [5, 1],
    //             //                 [15, 1024]
    //             //                 // [0, 0],
    //             //                 // [20, this.metersToPixelsAtMaxZoom(20, lat)]
    //             //             ],
    //             //             base: 2
    //             //         },
    //             //         "circle-color": "red",
    //             //         "circle-opacity": 0.6
    //             //     }
    //             // })
    //         })

    //         map.on('move', (e) => {

    //             // filterCircle.setLatLng(e.latlng);

    //             this.setState({
    //                 lng: map.getCenter().lng,//.toFixed(4),
    //                 lat: map.getCenter().lat,//.toFixed(4),
    //                 zoom: map.getZoom().toFixed(2)
    //             });
    //             // this.props.changeValue(this.props.header.key, [map.getCenter().lng, map.getCenter().lat])
    //             // console.log(
    //             //     {
    //             //         lng: map.getCenter().lng,
    //             //         lat: map.getCenter().lat,
    //             //     }
    //             // )
    //         });
    //     })
    // }

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

                    if (!this.props.header.information.disabled) {
                        this.setState({ data }, () => {
                            this.props.changeValue(this.props.header.key, data, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
                        })
                    }

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

    selectIcon(index) {

        return colorIcon
    //     switch (index) {
    //         case 0:
    //             return colorIcon1
    //             break;

    //         case 1:
    //             return colorIcon2
    //             break;

    //         case 2:
    //             return colorIcon3
    //             break;

    //         default:
    //             return colorIcon;
    //     }
    }


    render() {
        if (typeof window !== "undefined") {
            return (
                <div className="w-100" style={{ position: 'relative' }}>

                    {this.state.show && (
                        <div className="w-100" style={{ height: this.props.height ?? 220 }}>
                            <LeafletMap ref={el => this.map = el} onMoveEnd={e => this.moveEnd(e)} onMove={e => this.onMove(e)} onZoom={e => this.changeZoom(e)} center={this.state.position} zoom={this.state.zoom} scrollWheelZoom={false}  >

                                <TileLayer
                                    attribution='© <a href="https://www.iotsmile.com">IoTSmile</a>'
                                    tileSize={512}
                                    url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
                                    // maxZoom= this.props.maxZoom
                                    zoomOffset={-1}
                                    id='mapbox/light-v10'
                                    accessToken='pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA'
                                />

                                
                                {!this.props.header.information.disabled && (
                                    <Marker position={this.state.position} icon={greenIcon}>

                                    </Marker>
                                )}



                                {this.props.header.information.disabled && this.state.lat && this.state.lng && (
                                    <Marker position={[this.state.lat, this.state.lng]} icon={greenIcon}>

                                    </Marker>
                                )}

                                    {this.state.markers && Array.isArray(this.state.markers) && this.state.markers.map((prop, index) => {
                                        // console.log(prop)
                                        return (
                                            <Marker id={prop.id} ref={el => this['marker-' + prop.id] = el} position={[prop.lat, prop.lng]} icon={this.selectIcon(index)} key={index}>
                                                {prop.data && (
                                                    <Tooltip>
                                                        <div>
                                                            {Object.keys(prop.data).map((oneKey, index) => {
                                                                return (
                                                                    <p key={index}><span className="text-bold">{oneKey}</span>: {JSON.stringify(prop.data[oneKey])}</p>
                                                                )

                                                            })}

                                                            <p key={index}><span className="text-bold">Date</span>: {moment(prop.cDate).format('YYYY MMM DD')}</p>
                                                            <p key={index}><span className="text-bold">Time</span>: {moment(prop.cDate).format('hh:mm')}</p>

                                                        </div>

                                                    </Tooltip>
                                                )}
                                            </Marker>
                                        )
                                    })}


                                <Search provider={new OpenStreetMapProvider()} />

                            </LeafletMap>



                        </div>

                    )}

                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default (MapLeafletInput);