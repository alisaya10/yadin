import React from "react";
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper';
// import Button from "../CustomButton.jsx";
import Modal from "../Modal.jsx";
import { checkTranslation, imageAddress } from '../../utils/useful'
import CustomDropZone from "../CustomDropZone.jsx";


class ImageInput extends React.Component {

    state = {
        images: [],
        files: [],
        oldImages: null
        // showVideo: false,
    }

    componentDidMount() {
        // console.log("IMAFE")
        // console.log(this.props.data)

        if (this.props.data) {
            let data = JSON.parse(JSON.stringify(this.props.data))
            // console.log(data)
            this.setState({ oldImages: Array.isArray(data) ? data : [data] })
        } else {
            this.setState({ oldImages: null })
        }
        // console.log(this.props.files)
        if (this.props.files) {
            let files = Array.isArray(this.props.files) ? [...this.props.files] : [this.props.files]

            //files = JSON.parse(JSON.stringify(files))
            files.forEach((file, index) => {
                // console.log(file)
                files[index] = URL.createObjectURL(file)
            });
            this.setState({ images: files })
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.data != this.props.data) {
            if (this.props.data) {
                let data = JSON.parse(JSON.stringify(this.props.data))
                // console.log(data)
                if (data && data != '' && data != []) {
                    this.setState({ oldImages: Array.isArray(data) ? data : [data] })
                } else {
                    this.setState({ oldImages: [] })
                }
            } else {
                this.setState({ oldImages: null, images: [], files: [] })

            }
        }

    }



    showImage(imageAddress) {
        this.setState({ selectedImage: imageAddress })
        this.imageModal.showModal()
    }

    render() {
        // const dropzoneRef = React.createRef();
        let info = this.props.header.information
        // console.log(this.state.oldImages)
        return (

            <div className={"text-center "} style={{ width: '100%', textAlign: 'center', height: info.singleRow ? '28px' : 'auto' }}>

                {((this.state.images?.length > 0 || this.state.oldImages?.length > 0) && info && info.single) ? (<div></div>) : (

                    <CustomDropZone information={info} onDrop={this.chooseImage}>
                        <div className="text-center w-100 flexcc mt-2" style={{ cursor: 'pointer', flexDirection: info.singleRow ? 'row' : 'column' }}>
                            <img src={'/images/cloud.svg'} width={info.singleRow ? 26 : 50} />
                            {!info.singleRow && (
                                <p className="text-smaller mb-2" style={{ fontWeight: '500', color: '#007aff' }}>{info.placeholder ? checkTranslation(info.placeholder) : checkTranslation("Choose image")}</p>
                            )}
                        </div>
                    </CustomDropZone>

                )
                }

                {
                    (((Array.isArray(this.state.oldImages) && this.state.oldImages.length > 0) || (Array.isArray(this.state.images) && this.state.images.length > 0))) && (
                        <div className="p-0 m-0 mt-1 mb-2" style={{ display: 'inline-flex', flexWrap: 'wrap' }}>

                            {this.state.oldImages && Array.isArray(this.state.oldImages) && this.state.oldImages.map((prop, index) => {
                                return (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img className={"m-1 "} src={imageAddress(prop, "mini", 'small')} height={info.singleRow ? "25px" : "60px"} style={{ borderRadius: 4 }} />
                                        <div onClick={() => { this.removeOldFile(index) }} style={{ position: 'absolute', top: 1, left: 0, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 22, height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer' }}><p style={{ color: '#fff', marginTop: 4 }}>X</p></div>
                                    </div>
                                )
                            })}


                            {this.state.images.map((prop, index) => {
                                return (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img className={"m-1 "} src={prop} height={info.singleRow ? "25px" : "60px"} style={{ borderRadius: 4 }} />
                                        <div onClick={() => { this.removeFile("key", index) }} style={{ position: 'absolute', top: 1, left: 0, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 22, height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer' }}><p style={{ color: '#fff', marginTop: 0 }}>X</p></div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }



                <Modal ref={el => this.imageModal = el} maxWidth={500}>
                    <img src={this.state.selectedImage} style={{ width: '100%' }} />
                </Modal>


            </div >

        );
    }




    chooseImage = (newFiles, newImages) => {

        let images = this.state.images
        let files = this.state.files

        // console.log('ChooseImage')
        // console.log(this.props.header.information.single)

        if (this.props.header.information.single) {
            images = newImages
            files = Array.isArray(newFiles) ? newFiles[0] : newFiles
        } else {
            if (!Array.isArray(images)) {
                images = []
            }
            if (!Array.isArray(files)) {
                files = []
            }
            images = [...images, ...newImages]
            files = [...files, ...newFiles]
        }

        // console.log('ChooseImage')
        console.log(files)

        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, this.props.extra)

    }

    onDrop(filesInput) {

        // console.log('onDrop')

        const newImage = URL.createObjectURL(filesInput[0])

        this.setState({ image: newImage, type: filesInput[0].type })

        // if (this.props.info.copper) {
        //     this.croperModal.showModal()
        // } else {

        var images = this.state.images
        var files = this.state.files
        images.push(newImage)

        files.push(filesInput[0])
        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, this.props.extra)


        // }

        // this.setState({ showVideo: true })
        // this.setState({ file: files[0] })
    }


    urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    dataURLtoFile(dataurl, filename) {
        // var mime = 'image/jpeg';
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        // this.setState({testBlob:bstr})

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }


        var ia = new Uint8Array(bstr.length);
        for (var i = 0; i < bstr.length; i++) {
            ia[i] = bstr.charCodeAt(i);
        }
        // return new File([u8arr], filename, {type:mime});
        // return new Blob([u8arr], {type:mime});
        return new Blob([ia], { type: mime });
    }

    blobToFile = (blob, fileName) => {
        // var b: any = theBlob;
        var myBlob = blob
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        myBlob.lastModifiedDate = new Date();
        myBlob.name = fileName;

        //Cast to a File() type
        return new File(myBlob);
    }


    _crop() {
        // image in dataUrl
        var images = this.state.images
        var files = this.state.files
        let options = { imageSmoothingQuality: 'medium' }
        // console.log()
        if (this.state.type != 'image/png') {
            options.fillColor = '#fff'
        }
        var dataURL = this.refs.cropper.getCroppedCanvas(options).toDataURL(this.state.type, 1)

        images.push(dataURL)
        // files.push(this.blobToFile(this.dataURLtoFile(dataURL),'a.jpeg'))
        var file = this.dataURLtoFile(dataURL, 'a.jpg');
        files.push(file)
        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, this.props.extra)

        // this.setState({croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()})

        // var file = this.dataURLtoFile(dataURL, 'a.jpg');
        // this.setState({ file: file });
    }


    removeOldFile(index) {
        var oldImages = this.state.oldImages
        oldImages.splice(index, 1)
        this.setState({ oldImages })
        // console.log(oldImages)

        this.props.changeValue(this.props.header?.key, oldImages, this.props.extra)
    }



    removeFile(key, index) {
        var images = this.state.images
        var files = this.state.files
        images.splice(index, 1)
        if (Array.isArray(files)) {
            files.splice(index, 1)
        } else {
            files = null
        }
        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, this.props.extra)

    }
}

export default ImageInput;
