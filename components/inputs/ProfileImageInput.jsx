import React from "react";
// import Modal from "../Modal.jsx";
import { siteConfig } from '../../variables/config'
import CustomDropZone from "../CustomDropZone.jsx";
import { imageAddress, translate } from "../../utils/useful.js";
import Modal from "../Modal2";

class ProfileImageInput extends React.Component {

    state = {
        images: [],
        files: [],
        oldImages: null
    }

    componentDidMount() {
        this.init()
    }

    componentDidUpdate(prevProps) {
        console.log('this.props.data',this.props.data);
        if (prevProps.data != this.props.data) {

            // this.init()
        }
    }

    init = () => {
        // console.log(this.props.data)

        if (this.props.data) {
            let data = JSON.parse(JSON.stringify(this.props.data))
            // console.log(Array.isArray(data) ? data : [data])
            console.log('this.props.data',this.props.data);
            this.setState({ oldImages: Array.isArray(data) ? data : [data] })
        } else {
            this.setState({ oldImages: null })
        }
    }


    showImage(imageAddress) {
        this.setState({ selectedImage: imageAddress })
        this.imageModal?.showModal()
    }

    render() {
        let info = this.props.header.information
        // console.log(this.state.oldImages)
        return (
            <div className="profileImageInput d-flex   w-100">

                <div className=" w-100">

                    {(this.state.images?.length > 0 || this.state.oldImages?.length > 0) ? (
                        <div className="d-flex align-items-center  w-100 mr-4 mb-4">
                            <div className="h-100 mx-4">
                                {this.state.oldImages && Array.isArray(this.state.oldImages) && this.state.oldImages.map((prop, index) => {
                                    return (
                                        <div className="profileImageInputContainer " key={index}>
                                            <img className="profileImage" onClick={() => this.showImage(imageAddress(prop))} src={imageAddress(prop, "profile" ,'small')} />
                                        </div>
                                    )
                                })}

                                {this.state.images.map((prop, index) => {
                                    return (
                                        <div className="profileImageInputContainer" key={index}>
                                            <img className="profileImage" onClick={() => this.showImage(prop)} src={prop} />
                                            {/* <button onClick={() => { this.removeFile("key", index) }} style={{ position: 'absolute', top: 5, left: 5, backgroundColor: '#ee5050dd', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, cursor: 'pointer', color: '#fff' }}>X</button> */}
                                        </div>
                                    )
                                })}
                            </div>


                            <div className="  w-100 mt-3">
                                <CustomDropZone information={info} onDrop={this.changeImage}>
                                    <button className={'btn-primary1 my-2 '} style={{ width: 150 }}>
                                        <span className="text-smaller color-gray-2 text-semibold">تغییر تصویر</span>
                                    </button>
                                </CustomDropZone>

                                <button className="btn-primary1 mt-1 " style={{ width: 150 }} onClick={() => { this.removeOldFile(0) }}>
                                    <span className="text-smaller mt-2 text-semibold">حذف تصویر</span>
                                </button>
                            </div>
                        </div>
                    ) : (


                        <CustomDropZone information={info} onDrop={this.chooseImage}>
                            <div className="  flexcc w-100 mb-4 " >
                                <div className="profileImageInputContainer">
                                    <img className="profileImage" src={'/images/man-1.svg'} />
                                </div>
                                <div className="mld-3 " style={{ width: 150 }}>
                                    <button className={'btn-primary1 mt-5 w-100 mr-2'}>
                                        <span className="text-smaller color-gray-2 text-semibold w-100">انتخاب تصویر</span>
                                    </button>
                                </div>
                            </div>
                        </CustomDropZone>


                    )}



                    <Modal ref={el => this.imageModal = el} maxWidth={500}>
                        <div className="flexcc">
                            <img src={this.state.selectedImage} style={{ maxWidth: '100%', maxHeight: '80%', borderRadius: 15 }} />
                        </div>
                    </Modal>


                </div>

            </div>
        );
    }



    chooseImage = (newFiles, newImages) => {

        let images = newImages
        let files = newFiles

        this.setState({ images, files })
        this.props.changeFiles(files, this.props.header?.key, 'image')

    }


    changeImage = (newFiles, newImages) => {

        // let images = this.state.images
        // let files = this.state.files
        // files = files.concat(newFiles)
        // images = images.concat(newImages)

        let images = newImages
        let files = newFiles

        this.setState({ images, files, oldImages: null })
        this.props.changeValue(this.props.header?.key, null, this.props.extra)
        this.props.changeFiles(files, this.props.header?.key, 'image')

    }


    removeOldFile(index) {
        var oldImages = this.state.oldImages
        console.log(oldImages)
        // if (oldImages?.length > 0) {
        oldImages = null //.splice(index, 1)
        this.setState({ oldImages })
        this.props.changeValue(this.props.header?.key, oldImages, this.props.extra)
        setTimeout(() => {
            this.removeFile()
        }, 50);

        // }
    }



    removeFile(key, index) {
        var images = this.state.images
        var files = this.state.files
        // if (images?.length > 0) {
        images = []//.splice(index, 1)
        files = []//.splice(index, 1)
        this.setState({ images, files })
        setTimeout(() => {
            this.props.changeFiles(null, this.props.header?.key, 'file')
        })
        // }

    }
}

export default ProfileImageInput;
