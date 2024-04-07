import React from "react";
import Loader from 'react-loader-spinner'
import HttpService from '../../utils/Http.services';
import { checkTextTranslation } from "../../utils/useful";


class TagInput extends React.Component {

    state = {
        isOpen: false,
        data: [],
        title: '',
        tempData: [],
        options: [],
        isLoading: false,
        choosen: [],
        lastNewId: 0

    }



    spliter(data) {
        let string = data ? data : ''
        // console.log(string)
        if (string && typeof string == 'string') {
            string = string.replace(/,/g, '-')
            var stringArray = string.split('-')
        }
        // console.log(stringArray)
        // var finalString = source
        // stringArray.forEach(element => {
        //     finalString = finalString[element]
        // });
        return Array.isArray(stringArray) ? stringArray : []
    }



    removeItem(index) {
        let tags = this.props.data
        tags.splice(index, 1)
        // let string = ''
        // tags.forEach((element, i) => {
        //     if (element != '')
        //         string = string + element
        //     if (i != tags.length - 1) {
        //         string = string + '-'
        //     }
        // });
        this.props.changeValue(this.props.header.key, tags)

    }




    changeValue(value) {
        // console.log(this.props.data)
        let tags = this.props.data

        if (!tags) {
            tags = []
        }
        if (value.includes(',') || value.includes('-')) {
            if (tags[tags.length - 1]) {
                tags[tags.length - 1] = tags[tags.length - 1].replace('-', '').replace(',', '')
            }
            tags.push('')
        } else {
            tags[tags.length ? tags.length - 1 : 0] = value
        }
        // console.log(tags)
        // tags.splice(tags.length - 1, 1)
        // tags.push(value)
        // let string = ''
        // tags.forEach(element => {
        //     if (element != '')
        //         string = string + element + '-'
        // });
        // // console.log(string)
        // string = string + value
        // console.log(string)

        // console.log(value)
        // this.props.changeValue(this.props.header.key, string)
        this.props.changeValue(this.props.header.key, tags)

    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    render() {
        // console.log(this.props.data)
        let tags = this.props.data
        if (!tags) {
            tags = []
        }
        // console.log(tags)
        return (
            <div className='mt-0' style={{ width: '100%', position: 'relative' }} >

                {!tags.length && (
                    <div className="h-100 flexc" style={{ position: 'absolute', top: 0 }}>
                        <label className={' mr-1 ml-1 placeholder '}>{checkTextTranslation(this.props.header.information.label)}</label>
                    </div>
                )}

                <div ref={ref => this.setWrapperRef(ref)} >
                    <div style={{ flexWrap: 'wrap', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {tags.map((prop, index) => {
                            if (index != tags.length - 1)
                                return (
                                    <div key={index} className="" style={{ overflow: 'hidden', maxWidth: 'calc(100% - 50px)', display: 'inline-flex', alignItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
                                        <div className="flexcc" key={index} style={{ position: 'relative', padding: 5, backgroundColor: '#78b2d020', borderRadius: 4, marginRight: 2, marginLeft: 2, flexWrap: 'nowrap', paddingLeft: 7, paddingRight: 7, paddingLeft: 25 }}>
                                            <p style={{ whiteSpace: 'nowrap', marginBottom: 0, marginRight: 2, marginLeft: 2, fontSize: 12, marginTop: 0, color: '#202020', width: '100%', }}>{prop}</p>
                                            <img src="/images/close.svg" onClick={() => this.removeItem(index)} style={{ padding: 2, paddingLeft: 0, color: '#78b2d0', width: 18, height: 18, position: 'absolute', left: 7, top: 5 }} />
                                        </div>

                                    </div>
                                )
                        })}
                        <div className={"position-relative mt-0 ml-1 "} style={{ maxWidth: '100%' }}>
                            <input ref={'input'} value={tags[tags.length - 1]} onChange={e => { this.changeValue(e.target.value) }} className='nofocus mediumiransansfont' style={{ overflowWrap: "break-word", backgroundColor: 'transparent', maxWidth: 'calc(100% - 50px)', minWidth: 120, width: tags[tags.length - 1]?.length * 12, border: 'none' }} />
                        </div>
                    </div>


                </div>



            </div>
        );
    }
}


export default TagInput;
