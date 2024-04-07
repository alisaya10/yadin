import React from 'react'
import { translate } from '../utils/useful'

class Pagination extends React.Component {
    state = {
        key: ''
    }


    render() {
        // if (this.props.totalCount) {
        let totalCount = this.props.totalCount ?? 0
        let pages = Math.ceil(totalCount / this.props.limit)

        let array = []
        for (let i = 0; i < pages; i++) {
            array.push(i + 1)
        }

        let dotDone = false

        return (
            <div>
                {pages > 1 && (
                    <>
                        <div className="flexcc w-100" style={{ flexDirection: 'revert', overflow: 'auto' }}>{array.map((prop, index) => {
                            if (index == 0 || index == array.length - 1 || (index > this.props.currentPage - 2 && index < this.props.currentPage + 3)) {
                                dotDone = false

                                return (
                                    <div onClick={() => this.props.changePage(index)} className="flexcc" style={{ margin: 2, backgroundColor: this.props.currentPage == index ? (this.props.color??"#333") : '#ccc', color: this.props.currentPage == index ? "#fff" : '#333', borderRadius: 30, padding: '2px 10px', cursor: 'pointer',minWidth:28,height:28 }}>
                                    <p  >{prop}</p>
                                    </div>
                                )

                            } else {
                                if (!dotDone) {
                                    dotDone = true
                                    return (
                                        <p style={{ margin: 2, borderRadius: 2, padding: '2px 6px', }}>...</p>
                                    )
                                }
                            }
                        })}

                        </div>
                        {/* <div className="flexcc mt-1">
                            <input ref={el => this.input = el} className="" style={{ height: 35, border: '1px solid #eee', borderRadius: 4, width: 80, padding: '4px 6px' }} placeholder={"Page"} />
                            <button onClick={() => this.props.changePage(Number(this.input.value) - 1)} className="" style={{height: 35, backgroundColor: this.props.color??'rgb(0, 82, 204)', borderRadius: 4, padding: '5px 15px', color: '#fff' }}>{translate('Go')}</button>
                        </div> */}
                    </>
                )}
            </div>
        )
        // }
        // }
    }
}

export default (Pagination);