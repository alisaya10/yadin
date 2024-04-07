import React from 'react'

class StagesManager extends React.Component {
    state = {
        stage: 0,
        mainOpacity: 1,
        lastStages: [],
    }


    changeStage = (newStage, cb, back) => {
        if (newStage !== this.state.stage && this.state.mainOpacity==1) {
            this.setState({ mainOpacity: 0 })
            let lastStages = this.state.lastStages
            if (back) {
                lastStages.splice(lastStages.length - 1, 1)
            } else {
                lastStages.push(this.state.stage)
            }
            // console.log(lastStages)
            setTimeout(() => {
                this.setState({ stage: newStage, mainOpacity: 1, lastStages }, () => {
                    if (cb) { cb(newStage) }
                    if (this.props.changeCB) {
                        this.props.changeCB(newStage)
                    }
                })
            }, 500);
        }
        // }
    }

    nextStage = (cb) => {
        let stage = this.state.stage
        if (typeof stage === 'string') {
            this.props.children.forEach((child, index) => {
                if (child.props.stageName === this.state.stageName) {
                    stage = child.props.stage
                    // if(this.props.children[index+1]){
                    //     stage = this.props.children[index+1]
                    // }
                }
            });
        }
        if (typeof stage === 'number') {
            this.changeStage(stage + 1, (newStage) => {
                if (cb) { cb(newStage) }
                if (this.props.changeCB) {
                    this.props.changeCB(newStage)
                }
            })
        }
    }

    lastStage = (cb) => {

        let stage = this.state.lastStages[this.state.lastStages.length - 1]
        if (stage !== null) {
            this.changeStage(stage, (newStage) => {
                if (cb) { cb(newStage) }
                if (this.props.changeCB) {
                    this.props.changeCB(newStage)
                }
            }, true)
        }
    }

    // getCurrentStageName=()=>{
    //     return 
    // }

    render() {
        if (this.props.children) {
            var children = []
            if (Array.isArray(this.props.children)) {
                var children = this.props.children.map(function (child, i) {

                    if (((typeof this.state.stage == 'string') && (child.props.stageName === this.state.stage)) || ((typeof this.state.stage == 'number') && (child.props.stage === this.state.stage)) || child.props.stage === null) {
                        return React.cloneElement(child,
                            { key: i, lastStage: this.lastStage, nextStage: this.nextStage, changeStage: this.changeStage }
                        )
                    }
                    return
                }, this);
            } else {
                var children = React.cloneElement(this.props.children,
                    { lastStage: this.lastStage, nextStage: this.nextStage, changeStage: this.changeStage }
                )

            }
            // console.log(children)
            return (
                <section className={"w-100 "}  style={{minHeight:'100%', opacity: this.state.mainOpacity, transition: 'all 0.3s' }}>

                    {children}

                </section>
            )
        }
        else {
            return <div></div>
        }
    }
}

export default (StagesManager);