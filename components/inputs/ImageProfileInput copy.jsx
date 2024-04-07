import React from "react";
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper';
import Modal from "../Modal.jsx";
import { siteConfig } from '../../variables/config'
import 'cropperjs/dist/cropper.css'

class ImageProfileInput extends React.Component {

    state = {
        images: [],
        files: [],
        oldImages: null
    }

    componentDidMount() {
        if (this.props.title) {
            let title = JSON.parse(JSON.stringify(this.props.title))
            this.setState({ oldImages: Array.isArray(title) ? title : [title] })
        } else {
            this.setState({ oldImages: null })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title != this.props.title){}
            // console.log(newProps)
    }

    conditionalSettings(param, condition) {
        if (this.props.settings) {
            if (this.props.settings[param] === condition) {
                return true
            }
        }
        return false
    }


    showImage(imageAddress) {
        this.setState({ selectedImage: imageAddress })
        this.imageModal.showModal()
    }

    render() {
        const dropzoneRef = React.createRef();
        let info = this.props.header.information
        return (
            <div className="flexcc w-100">

                <div style={{ border: '1px solid #e0e0e0', backgroundColor: '#fff', width: 80, height: 80, borderRadius: '10%' }}>

                    {(this.state.images.length > 0 && info && info.single) ? (<div></div>) : (

                        <Dropzone
                            ref={dropzoneRef}
                            multiple={!info.single && !info.corpper ? true : false}
                            accept='image/jpeg'
                            onDrop={this.onDrop.bind(this)}
                            style={{ flex: 1, cursor: 'pointer',outline:'none' }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className="text-center w-100 h-100 outline-none" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src={'/images/noImage.png'} className="w-100 h-100" style={{objectFit:'cover',borderRadius: '10%'}} />
                                </div>
                            )}
                        </Dropzone>
                    )}


                    <div className="h-100 w-100">
                        {this.state.images && Array.isArray(this.state.oldImages) && this.state.oldImages.map((prop, index) => {
                            return (
                                <div className="w-100 h-100" style={{ position: 'relative' }}>
                                    <img className="w-100 h-100" style={{borderRadius:'10%',objectFit:'cover'}} onClick={() => this.showImage(siteConfig.siteConfig.contentUrl + prop)} src={siteConfig.contentUrl + prop}  />
                                    <button onClick={() => { this.removeOldFile(index) }} style={{ position: 'absolute', top: 5, left: 0, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer' ,color: '#fff'}}>X</button>
                                </div>
                            )
                        })}


                        {this.state.images.map((prop, index) => {
                            return (
                                <div className="w-100 h-100" style={{ position: 'relative' }}>
                                    <img className="w-100 h-100" style={{borderRadius:'10%',objectFit:'cover'}} onClick={() => this.showImage(prop)} src={prop}/>
                                    <button onClick={() => { this.removeFile("key", index) }} style={{ position: 'absolute', top: 5, left: 5, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer',color:'#fff' }}>X</button>
                                </div>
                            )
                        })}
                    </div>


                    <Modal className="lightiransansfont" ref={el=>this.croperModal=el} maxWidth={700} style={{}}>

                        <div>
                            <Cropper
                                ref={el => this.cropper = el}
                                src={this.state.image}
                                style={{ maxHeight: 400, }}
                                aspectRatio={info.ratio ? (info.ratio.split(':')[0] / info.ratio.split(':')[1]) : null}
                                guides={false}
                                zoomable={false}
                                background={true}
                            />

                            <div className=" ml-auto mr-auto  mt-3 mb-4" style={{ textAlign: 'center', marginBottom: 0 }}>
                                <button onClick={() => { this.croperModal.hideModal(); this._crop(); }} style={{ borderRadius: 30, fontSize: 15, fontWeight: 'bold', padding: '5px 15px', backgroundColor: '#202020', color: '#fff' }}>Add Image</button>
                            </div>
                        </div>
                    </Modal>



                    <Modal ref={el => this.imageModal = el} maxWidth={500}>
                        <img src={this.state.selectedImage} style={{ width: '100%' }} />
                    </Modal>


                </div>

            </div>
        );
    }


    onDrop(filesInput) {
        const newImage = URL.createObjectURL(filesInput[0])
        this.setState({ image: newImage })

        if (this.props.header.information.cropper) {
            this.croperModal.showModal()
        } else {

            var images = this.state.images
            var files = this.state.files
            images.push(newImage)
            files.push(filesInput[0])
            this.setState({ images, files })
            this.props.changeFiles(files, this.props.headerkey, 'file')

        }
    }


    urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }


        var ia = new Uint8Array(bstr.length);
        for (var i = 0; i < bstr.length; i++) {
            ia[i] = bstr.charCodeAt(i);
        }
       
        return new Blob([ia], { type: mime });
    }

    blobToFile = (blob, fileName) => {
        var myBlob = blob
        myBlob.lastModifiedDate = new Date();
        myBlob.name = fileName;
        return new File(myBlob);
    }


    _crop() {
        var images = this.state.images
        var files = this.state.files
        var dataURL = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
        images.push(dataURL)
        var file = this.dataURLtoFile(dataURL, 'a.jpg');
        files.push(file)
        this.setState({ images, files })
        this.props.changeFiles(files, this.props.headerkey, 'file')
    }


    removeOldFile(index) {
        var oldImages = this.state.oldImages
        oldImages.splice(index, 1)
        this.setState({ oldImages })
        this.props.onChange(this.props.headerkey, oldImages, this.props.extra)
    }



    removeFile(key, index) {
        var images = this.state.images
        var files = this.state.files
        images.splice(index, 1)
        files.splice(index, 1)
        this.setState({ images, files })
        this.props.changeFiles(files, this.props.headerkey, 'file')

    }
}

export default ImageProfileInput;
