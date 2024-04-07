import React from 'react';
// import { Slider, RangeSlider } from 'rsuite';
// import '../../../node_modules/rsuite/styles/index.less';
// import { Button } from 'rsuite';
// import '../../node_modules/rsuite/dist/rsuite.min.css';

class SliderController extends React.Component {

    state = {

    }



    render() {

        return (
            <div className="w-100 ">
                {/* <div className="flexcc mb-4 " >
                    <Slider style={{ width: '100%', maxWidth: "700px" }}
                        progress
                        defaultValue={50}
                        onChange={value => {
                            console.log(value);
                        }}
                    />
                </div>
                <div className="flexcc mb-4">
                    <RangeSlider defaultValue={[50, 100]} style={{ width: '100%', maxWidth: "700px" }} />


                </div>
                <div>
                    <div className="flexcc mb-5">
                        <Slider style={{ width: '100%', maxWidth: "700px" }}
                            defaultValue={50}
                            min={10}
                            step={10}
                            max={100}
                            graduated
                            progress
                            renderMark={mark => {
                                return mark;
                            }}
                        />
                    </div>
                    <div className="row w-100 h-100 ">

                        <div className="col-6 flexcc" style={{ height: '200px', maxHeight: "700px" }}>
                            <RangeSlider min={0} step={10} max={100} defaultValue={[10, 50]} vertical graduated />

                        </div>
                        <div className="col-6 flexcc">
                            <Slider
                                defaultValue={50}
                                min={0}
                                step={10}
                                max={100}
                                graduated
                                vertical
                                progress
                                renderMark={mark => {
                                    return <span>{mark}</span>;
                                }}
                            />
                        </div>
                    </div>

                </div> */}
            </div>
        )

    }
}


export default SliderController;