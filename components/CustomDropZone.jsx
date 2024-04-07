import React from "react";
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper';
// import Cropper from './Cropper';

import Modal from "./Modal1.jsx";
import 'cropperjs/dist/cropper.css'
import { dataURLtoFile } from "../utils/functions.js";
import { checkTranslation } from "../utils/useful.js";

class CustomDropZone extends React.Component {


    state = {

    }

    render() {
        const dropzoneRef = React.createRef();
        let info = this.props.information

        return (
            <div >

                <Dropzone
                    ref={dropzoneRef}
                    multiple={false}
                    accept={info?.accept ?? 'image/*'}
                    onDrop={this.onDrop.bind(this)}
                    style={{ flex: 1, cursor: 'pointer', outline: 'none' }}
                >
                    {({ getRootProps, getInputProps }) => (

                        <div className=" w-100 h-100 outline-none" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {this.props.children}
                        </div>

                    )}

                </Dropzone>



                <Modal className="" ref={el => this.croperModal = el} maxWidth={700} style={{}}>

                    <div className="pt-2 pb-3" style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                        <Cropper
                            ref={el => this.cropper = el}
                            src={this.state.image}
                            style={{ maxHeight: 400, maxWidth: '100%' }}
                            aspectRatio={info.ratio ? (info.ratio.split(':')[0] / info.ratio.split(':')[1]) : null}
                            guides={true}
                            zoomable={false}
                            background={true}
                            backgroundColor={"#fff"}
                        />

                        {/* <Cropper/> */}


                        <div className=" ml-auto mr-auto  mt-3 mb-4" style={{ textAlign: 'center', marginBottom: 0 }}>
                            <button onClick={() => { this._crop(); }} style={{ borderRadius: 30, fontSize: 15, fontWeight: 'bold', padding: '5px 15px', backgroundColor: '#202020', color: '#fff' }}>{checkTranslation("Add Image")}</button>
                        </div>
                    </div>
                </Modal>



            </div>

        );
    }


    onDrop = (filesInputs) => {

        if (this.props.information.cropper) {
            if (filesInputs[0].type == 'image/jpeg') {
                this.setState({ image: URL.createObjectURL(filesInputs[0]) }, () => {
                    // console.log("HERE")
                    // console.log(this.croperModal)
                    this.croperModal.showModal()
                })
            } else {
                let newImages = []

                filesInputs.forEach(filesInput => {

                    newImages.push(URL.createObjectURL(filesInput))

                });

                this.props.onDrop(filesInputs, newImages)
            }
        } else {

            let newImages = []

            console.log(filesInputs)
            filesInputs.forEach(filesInput => {
                // if (filesInput.type == 'image/jpeg') {
                newImages.push(URL.createObjectURL(filesInput))
                // } else {
                //     newImages.push(null)
                // }
            });

            this.props.onDrop(filesInputs, newImages)
        }
    }


    _crop = () => {

        // console.log(this.cropper.cropper)
        let image = this.cropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
        // images.push(dataURL)
        let file = dataURLtoFile(image, 'image.jpg');
        // files.push(file)
        this.props.onDrop([file], [image])

        this.croperModal.hideModal()
        // this.props.changeFiles(files, this.props.headerkey, 'file')
    }


}

export default CustomDropZone;
