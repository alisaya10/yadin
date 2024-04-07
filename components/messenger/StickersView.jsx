import React, { useRef, useState } from 'react'
import { translate } from '../../utils/useful'
import { emojiCategories, emojis } from '../../variables/emoji'
import FixedView from '../FixedView'
// import FixedView from '../FixedView'


class StickersView extends React.Component {

    state = {
        isOpen: false,
        currentTab:'emojis',
        groups: [
            {key:"emojis", icon: 'https://cdn-icons-png.flaticon.com/512/2274/2274528.png' },
            {key:"stickers", icon: 'https://cdn-icons-png.flaticon.com/512/2527/2527750.png' },

        ]
    }
    showBox = () => {

        this.fixedView.showView()
        this.setState({ isOpen: true })
    }

    onHide = () => {
        this.setState({ isOpen: false, searchText: null, searchResult: null })


    }

    onSelect = (type, prop) => {
        // this.onHide()
        // this.fixedView.hideView()
        this.props.onSelect(type, prop)
    }




    searchEmojis = (value) => {
        this.setState({ searchText: value })

        if (value && value != '') {
            let searchResult = []

            emojis.forEach(emoji => {
                let added = false
                if (emoji.description.toLowerCase().includes(value.toLowerCase())) {
                    searchResult.push(emoji)
                    added = true
                }

                if (!added) {
                    emoji.tags.forEach(element => {
                        if (element.toLowerCase().includes(value.toLowerCase())) {
                            searchResult.push(emoji)
                        }
                    });
                }

                if (!added) {
                    emoji.aliases.forEach(element => {
                        if (element.toLowerCase().includes(value.toLowerCase())) {
                            searchResult.push(emoji)
                        }
                    });
                }
            });

            this.setState({ searchResult })

        } else {
            this.setState({ searchResult: null })
        }

    }




    render() {

        return (

            <div className=''>

                <button ref={el => this.currentNode = el} onClick={() => { this.showBox() }} className="px-1 flexcc">
                    <img src={'/assets/sticker.svg'} style={{ opacity: 0.5, transition: '0.3s all' }} height={20} />
                </button>

                <FixedView ref={el => this.fixedView = el} nodeRef={this.currentNode} onHide={this.onHide} topOffset={17} zIndex={5} xOffset={25} rightAlign={true}>
                    <div className="  pb-2  d-flex flex-column w-100" style={{ overflow: 'auto', height: 350, maxWidth: 320, minWidth: 320, boxShadow: '0px 0px 30px #10101030', backgroundColor: '#fff', borderRadius: 6 }}>
                       
                        <div className='flexcb px-2 mb-2 pt-2 pb-2' style={{ zIndex: 1, borderBottom: '1px solid #f6f6f6', position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                            <div className='flexc w-100 ' >
                                {this.state.groups.map((prop, index) => {
                                    return (
                                        <button className=' flexcc ' style={{padding:5, backgroundColor:this.state.currentTab == prop.key ? '#eee':null, borderRadius:20}}>
                                            <img src={prop.icon} height={20} />
                                        </button>
                                    )
                                })}


                            </div>


                            <button className='px-1 '>
                                <img src={'/assets/icons/useful/plus-c.png'} height={20} />
                            </button>

                        </div>
                        <div className=" w-100 px-2">
                            <div style={{ backgroundColor: '#f6f6f6', borderRadius: 6 }}>
                                <input onChange={(e) => this.searchEmojis(e.target.value)} className="py-2 px-2 w-100" placeholder={translate('Search ...')} style={{ backgroundColor: 'transparent', border: 'none' }} />
                            </div>
                        </div>
                        <div className=''>

                            {this.state.searchResult && (
                                <div className='d-flex flex-wrap mt-2 justify-content-start'>

                                    {this.state.searchResult.map((prop, index) => {
                                        return (
                                            <button onClick={() => this.onSelect('emoji', prop)} className=' flexcc' style={{ width: "12.5%" }}>
                                                <code>
                                                    <span className='' style={{ fontSize: 25 }}>{prop.emoji}</span>
                                                </code>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            {this.state.searchResult?.length == 0 && (
                                <div className='text-center mt-3'>
                                    <p className='text-small opacity-5'>{translate("Found Nothing")}</p>
                                </div>
                            )}




                            {!this.state.searchResult && emojiCategories.map((category, i) => {
                                return (
                                    <div className='mt-3'>
                                        <p className='px-2 text-smaller text-uppercase opacity-5 text-semibold'>{translate(category.name)}</p>
                                        <div className='d-flex flex-wrap mt-2 justify-content-start'>
                                            {emojis.map((prop, index) => {
                                                if (category.name == prop.category)
                                                    return (
                                                        <button onClick={() => this.onSelect('emoji', prop)} className=' flexcc' style={{ width: "12.5%" }}>
                                                            <code>
                                                                <span className='' style={{ fontSize: 25 }}>{prop.emoji}</span>
                                                            </code>
                                                        </button>
                                                    )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </FixedView>
            </div>


        )
    }

}

export default StickersView
