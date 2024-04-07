import React from 'react';
// import '../../styles/dragdrop.css';


class DragDrop extends React.Component {

    state = {

    }
 allowDrop(ev) {
    ev.preventDefault();
};

 drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};

 drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
};


    render() {

        return (
            <div className="">
                <div className="div1" onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>
                    <img src="/images/icons/smile.svg" draggable={true} onDragStart={(event) => this.drag(event)} id="drag1" width="88" height="31" />
                </div>
                <div className="div1" onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}></div>
            </div>
        )

    }
}


export default DragDrop;