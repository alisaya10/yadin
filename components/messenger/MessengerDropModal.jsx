import React from "react";
import { getBoundingClientRect } from "../../utils/functions";
import Modal from "../Modal";
import { nameShortener, sizeConvertor } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";


class MessengerDropModal extends React.Component {

    state = {
        text: '',
        view: 'file'
    }

    componentDidMount() {

    }

    showModal = (files, withCompression) => {
        let filePaths = []
        let showAlbum = false
        let view = 'file'
        files.forEach(element => {
            if (element.type.startsWith('image/') || element.type.startsWith('video/')) {
                showAlbum = true
            }
            filePaths.push(URL.createObjectURL(element))
        });

        if (withCompression) {
            view = 'album'
        }

        this.setState({ droppedFiles: files, filePaths, showAlbum, view })

        this.modal.showModal()
    }

    updateInput(element) {

        let shadow = this.inputShadow

        this.setState({ text: element.value }, () => {

            shadow.style.height = 'inherit';
            shadow.style.height = (shadow.scrollHeight) + "px";

            let height = getBoundingClientRect(shadow).height

            // console.log(height)

            element.style.height = height + 'px'
        })
        // console.log(element.scrollHeight)
        // element.style.height = (element.scrollHeight) + "px";
    }



    removeFromDroppedFiles = (file, index) => {
        let droppedFiles = this.state.droppedFiles
        let filePaths = this.state.filePaths

        droppedFiles.splice(index, 1)
        filePaths.splice(index, 1)


        if (droppedFiles.length == 0) {
            this.modal.hideModal()
        }

        this.filesModalContent.style.transition = 'height 0s';
        this.filesModalContent.style.height = 'auto'

        let bound = getBoundingClientRect(this.filesModalContent)

        this.setState({ droppedFiles }, () => {


            let newBound = getBoundingClientRect(this.filesModalContent)
            this.filesModalContent.style.height = bound.height + 'px'


            setTimeout(() => {
                this.filesModalContent.style.transition = 'height 0.5s';
                this.filesModalContent.style.height = newBound.height + 'px'

                setTimeout(() => {
                    if (this.filesModalContent) {
                        this.filesModalContent.style.transition = 'height 0s';
                        this.filesModalContent.style.height = 'auto'
                    }
                }, 500);
            }, 10);

        })
    }

    changeView = (view) => {
        this.setState({ view: view })
    }

    sendFiles = () => {
        this.props.sendFileMessage(this.state.droppedFiles, this.state.view)
        this.modal.hideModal()

    }

    render() {
        let hasText = this.state.text && this.state.text != ''

        return (

            <Modal ref={el => this.modal = el} maxWidth={300} hideCloseBut={true} centerMode={true}>

                <div ref={el => this.filesModalContent = el} className="position-relative flexcb flex-column" style={{ transition: 'all 0.5s', backgroundColor: '#fff', borderRadius: 8 }}>
                    <div className="w-100">
                        <div className="flexcb px-2 pt-2">
                            <div className="flexc">

                                {this.state.showAlbum && (
                                    <button className="flexcc p-0 mrd-3" style={{}} onClick={() => { this.changeView('album') }}>
                                        <img className=" transition-all" src="/assets/icons/useful/album.svg" style={{ opacity: this.state.view == 'album' ? 1 : 0.3, width: 18, height: 18, }} />
                                    </button>
                                )}

                                <button className="flexcc p-0 " style={{}} onClick={() => { this.changeView('file') }}>
                                    <img className=" transition-all" src="/assets/icons/useful/file.svg" style={{ opacity: this.state.view == 'file' ? 1 : 0.3, width: 18, height: 18, }} />
                                </button>

                            </div>

                            <div>
                                <button className="flexcc " style={{ backgroundColor: '#00000010', borderRadius: 30, width: 24, height: 24 }} onClick={() => { this.modal.hideModal() }}>
                                    <img src="/images/close.svg" style={{ width: 12, height: 12, }} />
                                </button>
                            </div>
                        </div>


                        <div className="mt-3 mb-3 h-100" style={{ maxHeight: this.props.height * 0.5, overflow: 'auto' }}>
                            {this.state.view == 'file' && this.state.droppedFiles?.map((prop, index) => {
                                // let src = URL.createObjectURL(prop)
                                return (
                                    <div className="px-2 flexcb pb-1 mt-1 mb-1" key={prop.path}>
                                        <div className="flexc">
                                            {prop.type.startsWith('image/') ? (
                                                <div className="flexcc">
                                                    <img src={this.state.filePaths[index]} height={60} width={60} style={{ borderRadius: 6, objectFit: 'cover' }} />
                                                </div>
                                            ) : prop.type.startsWith('video/') ? (
                                                <div className="flexcc" style={{ pointerEvent: 'none' }}>
                                                    <video  controlsList="nodownload" src={this.state.filePaths[index]} height={60} width={60} style={{ borderRadius: 6, objectFit: 'cover' }} controls={false} autoPlay={true} muted={true} />
                                                </div>
                                            ) : (
                                                <div className="flexcc p-2" style={{ backgroundColor: '#007aff', borderRadius: 40 }}>
                                                    <img className="invert" src={'/assets/icons/useful/file.svg'} height={20} style={{}} />
                                                </div>
                                            )}
                                            <div className="mx-2">
                                                <p className="text-small">{nameShortener(prop.name)}</p>
                                                <p className="text-smaller opacity-5">{sizeConvertor(prop.size)}</p>
                                            </div>
                                        </div>

                                        <div className="flexcc">
                                            <button className="flexcc p-1" onClick={() => this.removeFromDroppedFiles(prop, index)}>
                                                <img className="opacity-2 hover-opacity transition-all" src={'/assets/icons/useful/trash-o.svg'} height={20} style={{}} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}







                            {this.state.view == 'album' && this.state.droppedFiles?.map((prop, index) => {
                                return (
                                    <div className="px-2 flexcb pb-1 mt-1 mb-1" key={prop.path}>
                                        <div className="flexc">
                                            {prop.type.startsWith('image/') ? (
                                                <div className="flexcc position-relative">
                                                    <img className="w-100" src={this.state.filePaths[index]} width={60} style={{ borderRadius: 6, objectFit: 'cover' }} />
                                                    <div className="flexcc position-absolute py-1 px-1" style={{ zIndex: 1, right: 5, bottom: 5, backgroundColor: '#00000080', borderRadius: 8 }}>
                                                        <button className="flexcc p-0 mrd-1" onClick={() => this.removeFromDroppedFiles(prop, index)}>
                                                            <img className=" invert hover-opacity transition-all" src={'/assets/icons/useful/crop.svg'} height={20} style={{}} />
                                                        </button>

                                                        <button className="flexcc p-0" onClick={() => this.removeFromDroppedFiles(prop, index)}>
                                                            <img className=" invert hover-opacity transition-all" src={'/assets/icons/useful/trash-o.svg'} height={20} style={{}} />
                                                        </button>

                                                    </div>
                                                </div>
                                            ) : prop.type.startsWith('video/') ? (
                                                <div className="flexcc position-relative" style={{}}>
                                                    <div className="w-100 flexcc" style={{ zIndex: 0 }}>
                                                        <video  controlsList="nodownload" className="w-100" src={this.state.filePaths[index]} width={60} style={{ borderRadius: 6, objectFit: 'cover' }} controls={false} autoPlay={true} muted={true} />
                                                    </div>
                                                    <div className="flexcc position-absolute py-1 px-1" style={{ zIndex: 1, right: 5, bottom: 5, backgroundColor: '#00000080', borderRadius: 8 }}>

                                                        <button className="flexcc p-0" onClick={() => this.removeFromDroppedFiles(prop, index)}>
                                                            <img className=" invert hover-opacity transition-all" src={'/assets/icons/useful/trash-o.svg'} height={20} style={{}} />
                                                        </button>

                                                    </div>

                                                </div>
                                            ) : (
                                                <div className="flexc ">
                                                    <div className="flexcc p-2" style={{ backgroundColor: '#007aff', borderRadius: 40 }}>
                                                        <img className="invert" src={'/assets/icons/useful/file.svg'} height={20} style={{}} />

                                                    </div>
                                                    <div className="mx-2">
                                                        <p className="text-small">{nameShortener(prop.name)}</p>
                                                        <p className="text-smaller opacity-5">{sizeConvertor(prop.size)}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {/* <div className="mx-2">
                                                <p className="text-small">{nameShortener(prop.name)}</p>
                                                <p className="text-smaller opacity-5">{sizeConvertor(prop.size)}</p>
                                            </div> */}
                                        </div>

                                        {/* <div className="flexcc">
                                            <button className="flexcc p-1" onClick={() => this.removeFromDroppedFiles(prop, index)}>
                                                <img className="opacity-2 hover-opacity transition-all" src={'/assets/icons/useful/trash-o.svg'} height={20} style={{}} />
                                            </button>
                                        </div> */}
                                    </div>
                                )
                            })}


                        </div>
                    </div>
                    <div className="flexc px-2 py-1 w-100" style={{ zIndex: 10, backgroundColor: '#fff', position: 'sticky', position: '-webkit-sticky', bottom: 0, borderRadius: '0px 0px 8px 8px', borderTop: '1px solid #eee' }}>

                        <div className="position-absolute w-100" style={{ zIndex: -1, bottom: 0 }}>
                            <textarea ref={el => this.inputShadow = el} rows={1} value={this.state.text} className="w-100 mt-0" style={{ opacity: 0, padding: '8px 5px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, height: 'inherit', minHeight: 37, maxHeight: 100, }} placeholder="Message ..." />
                        </div>

                        <textarea ref={el => this.input = el} rows={1} value={this.state.text} onChange={(e) => this.updateInput(e.target)} className="w-100 mt-0" style={{ padding: '8px 5px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, maxHeight: 100, }} placeholder="Caption ..." />
                        <button onClick={() => { this.sendFiles() }} className="px-1 flexcc">
                            <img src={'/assets/send-2.svg'} style={{ opacity: 1, transition: '0.3s all' }} height={20} />
                        </button>
                    </div>
                </div>

            </Modal>


        )
    }



}



export default MessengerDropModal
