import React from "react";
// import { siteConfig, siteTheme } from "../../../variables/config";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
// import { nanoid } from "nanoid";
// import { socket } from "../../../utils/Socket.services";
// import Loader from 'react-loader-spinner'
import { checkTranslation, imageAddress, translate } from "../../utils/useful";
// import moment from 'jalali-moment'
// import HttpServices from "../../../utils/Http.services";
// import FormViewer from "../../FormViewer";
import Cookies from 'universal-cookie';
// import MessageBox from "../../boxes/MessageBox";
// import { getBoundingClientRect } from "../../../utils/functions";
const cookies = new Cookies();


class MessengerView extends React.Component {

    state = {

        attachmentsList: [
            { name: 'Yonnect drive', icon: '/assets/icons/useful/album.svg', function: 'attachDrive' },
            { name: 'Album', icon: '/assets/icons/useful/album.svg', function: 'attachAlbum' },
            { name: 'File', icon: '/assets/icons/useful/save.svg', function: "attachFile" },
            { name: 'Camera', icon: '/assets/icons/useful/camera.svg', function: 'doNothing' },
            { name: 'Command', icon: '/assets/icons/useful/command.svg', function: 'doNothing' },

            { name: 'Location', icon: '/assets/icons/useful/location.svg', function: 'doNothing' },
            { name: 'Contact', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Form', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Drive', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Task', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Reminder', icon: '/assets/icons/useful/reminder.svg', function: 'doNothing' },
            { name: 'Calendar', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Room', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Format', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Products', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },
            { name: 'Applets', icon: '/assets/icons/useful/save.svg', function: 'doNothing' },


        ]

    }

    componentDidMount() {


    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.checkOusideClicked, true)
    }

    checkOusideClicked = (e) => {
        console.log("checkOusideClicked")
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.forceHide()

        }
    }

    forceHide = () => {
        setTimeout(() => {
            this.showAttachments(false)
        }, 20);
        window.removeEventListener('mousedown', this.checkOusideClicked, true)

    }


    showAttachments = (status) => {
        let newStatus = status == null ? !this.state.showAttachments : status
        this.setState({ showAttachments: newStatus })

        if (newStatus) {
            window.addEventListener('mousedown', this.checkOusideClicked, true)
        }
    }

    doFunction = (prop) => {
        if (prop.function) {
            this[prop.function]()
        }
    }

    doNothing = () => {
        this.forceHide()
    }

    attachAlbum = () => {
        this.setState({ fileLimit: 'image/*,video/*' }, () => {
            this.uploadInput.click()
        })
    }

    attachFile = () => {
        this.setState({ fileLimit: null }, () => {
            this.uploadInput.click()
        })
    }

    attachFiles = (files) => {
        console.log("files")
        console.log(files)
        let final = []
        if (files) {
            Object.values(files).map((prop, index) => {
                final.push(prop)
            })
        }

        console.log(final)
        let withCompression = this.state.fileLimit == null ? false : true
        this.props.passAttachFiles(final, withCompression)
        this.forceHide()
    }


    render() {

        if (this.state.showAttachments) {
            return (
                <div ref={el => this.wrapperRef = el} className="position-absolute  d-flex flex-column" style={{ width: '100%', maxWidth: 250, height: this.props.height * 0.6, maxHeight: 600, overflow: 'auto', left: 10, bottom: 60, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0px 0px 25px #10101020' }}>
                    <div className="  w-100"
                    //  style={{ overflow: "auto" }}
                    >

                        <div className="px-2 w-100 mb-3 mt-2">
                            <div style={{ backgroundColor: '#f6f6f6', borderRadius: 6 }}>
                                <input className="py-2 px-2 w-100" placeholder={translate('Search ...')} style={{ backgroundColor: 'transparent', border: 'none' }} />
                            </div>
                        </div>

                        {this.state.attachmentsList.map((prop, index) => {
                            return (
                                <button className="flexc px-3  my-0 mrd-3 px-1     w-100" key={index} onClick={() => { this.doFunction(prop) }}>
                                    <div className="pb-2 flexcc ">
                                        <div className="flexcc p-2" style={{ borderRadius: 20, background: 'linear-gradient(to top, #007aff, #009aee)' }}>
                                            <img className="invert" src={prop.icon} width="16px" />
                                        </div>
                                    </div>
                                    <div className="flex-1" style={{ borderBottom: '1px solid #f6f6f6' }}>
                                        <p className="text-small text-start pb-2 text-semibold mld-3 " >{prop.name}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <div className="d-none">
                        <input
                            id="upload-input"
                            ref={el => this.uploadInput = el}
                            type="file"
                            multiple={true}
                            accept={this.state.fileLimit}
                            onChange={(e) => { this.attachFiles(e.target.files) }}

                        />
                    </div>
                </div>

            )
        } else {
            return (<></>)
        }
    }

}



const mapStateToProps = state => ({ settings: state.settings, user: state.user, messengers: state.messengers })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(MessengerView);
