import React from "react";
// import Dropzone from 'react-dropzone'
// import Cropper from 'react-cropper';
// import Button from "../CustomButton.jsx";
// import Modal from "../Modal.jsx";
import { checkTranslation, imageAddress } from '../../utils/useful'
import CustomDropZone from "../CustomDropZone.jsx";



class FileInput extends React.Component {

    state = {
        images: [],
        files: [],
        oldFiles: null

        // showVideo: false,

    }


    componentDidMount() {
        // console.log(this.props.data)
        if (this.props.data) {
            let data = JSON.parse(JSON.stringify(this.props.data))
            this.setState({ oldFiles: Array.isArray(data) ? data : [data] })
        } else {
            this.setState({ oldFiles: null })
        }
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
                    this.setState({ oldFiles: Array.isArray(data) ? data : [data] })
                } else {
                    this.setState({ oldFiles: [], files: [], images: [] })
                }
            } else {
                this.setState({ oldFiles: null })

            }
        }

    }


    render() {
        // const dropzoneRef = React.createRef();
        let info = this.props.header.information

        return (
            <div className={"text-center "} style={{ width: '100%', textAlign: 'center', height: info.singleRow ? '28px' : 'auto' }}>

                {((this.state.images?.length > 0 || this.state.oldFiles?.length > 0) && info && info.single) ? (<div></div>) : (

                    // <Dropzone
                    //     ref={dropzoneRef}
                    //     multiple={false}
                    //     // accept='image/jpeg'
                    //     onDrop={this.onDrop.bind(this)}
                    //     style={{ flex: 1, cursor: 'pointer' }}
                    // >
                    <CustomDropZone information={info} onDrop={this.chooseFile}>

                        <div className="pt-3" style={{ width: '100%', textAlign: 'center' }}>
                            <img src={'/images/submit.svg'} width={60} />
                            <p style={{ opacity: 1, fontSize: 12, marginTop: 6, color: '#007aff', textTransform: '', fontWeight: '500' }}>Choose File</p>
                        </div>
                    </CustomDropZone>

                )}


                <div className="p-0 m-0 mt-1 mb-2" style={{ display: 'inline-flex', flexWrap: 'wrap' }}>

                    {this.state.oldFiles && Array.isArray(this.state.oldFiles) && this.state.oldFiles.map((prop, index) => {
                        return (
                            <div key={index} style={{ position: 'relative' }}>
                                <a href={imageAddress(prop)} target="_blank">
                                    <img className={"m-1 mt-3"} src={'/images/file.svg'} height="60px" style={{ borderRadius: 4 }} />
                                    <p style={{ maxWidth: 90 }} className="text-center text-smaller">{prop?.name}</p>
                                </a>
                                <div onClick={() => { this.removeOldFile(index) }} style={{ position: 'absolute', top: 5, left: 0, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer' }}><p style={{ color: '#fff', marginTop: 4 }}>X</p></div>
                            </div>
                        )
                    })}

                    {this.state.images.map((prop, index) => {
                        console.log(prop)
                        return (
                            <div style={{ position: 'relative', marginLeft: 5, marginRight: 5, textAlign: 'center' }}>
                                <img className={"m-1 mt-3"} src={'/images/file.svg'} height="60px" style={{ borderRadius: 4 }} />
                                <p className="text-smaller" style={{ fontSize: 12, maxWidth: '80px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{prop?.name}</p>
                                <div onClick={() => { this.removeFile("key", index) }} style={{ position: 'absolute', top: 5, left: 0, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer' }}><p style={{ color: '#fff', marginTop: 4 }}>X</p></div>
                            </div>
                        )
                    })}
                </div>




            </div>
        );
    }


    chooseFile = (newFiles, newImages) => {

        let images = this.state.images
        let files = this.state.files
        console.log(newFiles)

        if (this.props.header.information.single) {
            images = newFiles
            files = Array.isArray(newFiles) ? newFiles[0] : newFiles
        } else {
            if (!Array.isArray(images)) {
                images = []
            }
            if (!Array.isArray(files)) {
                files = []
            }
            images = [...images, ...newFiles]
            files = [...files, ...newFiles]
        }

        // console.log('ChooseImage')
        console.log(files)
        console.log(images)


        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, this.props.extra)

    }



    removeOldFile(index) {
        var oldFiles = this.state.oldFiles
        oldFiles.splice(index, 1)
        this.setState({ oldFiles })
        this.props.changeValue(this.props.header.key, oldFiles, this.props.extra)
    }


    onDrop(files) {
        // const newImage = URL.createObjectURL(files[0])
        // document.getElementById("myImage").src = newImage
        // document.getElementById("mySource").src = newImage
        // this.setState({ showVideo: false })
        // this.setState({ image: newImage })
        // this.refs.croperModal.showModal()
        // this.setState({ showVideo: true })
        // this.setState({ files: files })

        var allFiles = this.state.files
        // var dataURL = this.refs.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
        // images.push(dataURL)
        // files.push(this.blobToFile(this.dataURLtoFile(dataURL),'a.jpeg'))
        // var file = this.dataURLtoFile(dataURL, 'a.jpg');
        allFiles.push(files[0])
        this.setState({ files: allFiles })
        this.props.changeFiles(allFiles, this.props.headerkey, 'file')

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

export default FileInput;
