import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class SmartInput extends React.Component {
    state = {
        variables: [],
        optionsList: [1, 2, 2, 2, 2,2,2,2]
    }



    componentDidMount() {
        this.editor.addEventListener("DOMCharacterDataModified", this.onChange);
        // this.editor.addEventListener("input", this.editorUpdated);

        this.editor.addEventListener("mouseup", (e) => this.onChange(e, true))
        // this.editor.addEventListener('keypress', (e) => {
        //     console.log(e)
        //     if (e.charCode === 13) {
        //         console.log("REV")
        //         e.preventDefault();
        //     }
        // });

        // this.editor.addEventListener("DOMNodeInserted", this.onChange);

        // this.editor.addEventListener("DOMNodeRemoved", (e) => {
        //     console.log("REMOVED")
        //     console.log(e)
        // }
        // );

        const config = { attributes: true, childList: true, subtree: true };

        this.observer = new MutationObserver(this.observeChanged)
        this.observer.observe(this.editor, config);

    }






    componentWillUnmount() {
        this.editor.removeEventListener("DOMCharacterDataModified", this.onChange);
        this.editor.removeEventListener("input", this.editorUpdated);
        this.editor.removeEventListener('keypress', () => { })
        this.observer.disconnect();

    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value)
        }
    }

    changeAttribute = (attribute, value, boolean) => {
        document.execCommand(attribute, boolean, value)
        // console.log(this.editor.innerHTML)
    }
    // textContent
    // innerHTML

    onPaste = (e) => {
        e.preventDefault();
        const open = new RegExp('<', 'gi');
        const close = new RegExp('>', 'gi');
        const text = (e.originalEvent || e).clipboardData
            .getData('text/plain')
            .replace(open, '&lt')
            .replace(close, '&gt');
        document.execCommand('insertHTML', false, text)
    }

    //  nodeIterator = document.createNodeIterator(
    //     document.body,
    //     NodeFilter.SHOW_ELEMENT,
    //     { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    //     false // this optional argument is not used any more
    // );



    observeChanged = (e) => {
        console.log("OBSERVER")
        console.log(e)
        if (e.removedNodes && e.removedNodes.length > 0) {
            document.execCommand("foreColor", false, "")
        }

        // this.changeAttribute('delete', "")

    }






    editorUpdated = (e) => {
        // console.log(e)
        // let text = this.editor.textContent

        // // console.log(text)
        // if (!text || text == '' || text == ' ' || text == " ") {

        //     this.editor.innerHTML = ''
        //     this.changeAttribute('foreColor', "")
        //     this.changeAttribute('delete', "")
        //     this.setState({ showList: false })
        // }

    }

    onChange = (e, isClick) => {
        // console.log(e)

        let selection = document.getSelection()
        // console.log(selection)
        let node = selection.anchorNode
        // console.log(e.path[0])
        // console.log(node)
        // console.log(selection)
        if (node) {

            let text = String(node.textContent)
            // let lastChar1 = text.charAt(text.length-1)
            // console.log(text)


            // console.log(lastChar1 == ' ')
            // let nodeText = 
            let lastTextArray = text.slice(0, selection.focusOffset)
            lastTextArray = lastTextArray.split(' ')
            // console.log(lastText)
            // lastText = lastText[lastText.length - 1]
            // console.log(node)
            // console.log(lastText+'!!!')
            // console.log(lastText.split(''))
            // console.log(" ".charCodeAt(0))
            // console.log("&nbsp;".charCodeAt(0))
            // console.log("\s".charCodeAt(0))
            // console.log(" ".charCodeAt(0))

            lastTextArray.forEach(lastText => {

                // console.log(lastText)

                let focusOffset = selection.focusOffset

                let range = document.createRange()

                if (node.length >= selection.focusOffset - lastText.length) {
                    range.setStart(node, selection.focusOffset - lastText.length);
                }
                if (node.length >= selection.focusOffset) {
                    range.setEnd(node, selection.focusOffset)
                }

                // console.log(lastText)
                if (lastText.charAt(0) == '@') {

                    if (!this.state.showList) {
                        this.setState({ showList: true })
                        console.log("OPEN")
                    }

                    if (lastText.length == 1 && !isClick) {

                        document.getSelection().removeAllRanges()
                        document.getSelection().addRange(range)
                        console.log("BLUEEEE")
                        this.changeAttribute('foreColor', "007aff")
                        let parent = document.getSelection().anchorNode.parentNode
                        parent.classList.add('cursor-pointer')
                        parent.classList.add('smart-variable')

                        // console.log(parent)
                        // window.getSelection().focusNode.addClass('cursor-pointer')

                    }

                    let lastChar = lastText.charAt(lastText.length - 1)


                    if (node.length >= selection.focusOffset) {
                        // console.log('###')
                        // console.log(selection.focusOffset)
                        range.setStart(node, selection.focusOffset)
                        range.setEnd(node, selection.focusOffset)
                        document.getSelection().addRange(range)
                        // document.getSelection().removeAllRanges()

                    }

                    if ((lastChar == ' ' || lastChar == " ") && !isClick) {
                        // console.log("CLOSE")

                        range.setStart(node, selection.focusOffset)
                        range.setEnd(node, selection.focusOffset)
                        document.getSelection().addRange(range)

                        this.changeAttribute('delete', "")
                        this.changeAttribute('insertHTML', "<span> </span>")
                        setTimeout(() => {
                            this.setState({ showList: false })

                        }, 50);
                    }

                    if (this.editor.textContent == '@') {
                        // console.log("VAEEE")
                        // console.log(selection)
                        document.getSelection().removeAllRanges()
                        range.setStart(node, 1)
                        range.setEnd(node, 1)
                        document.getSelection().addRange(range)
                        // range.setStart(node, 1)
                        // range.setEnd(node, 1)
                        // document.getSelection().addRange(range)

                    }







                    // let newNode = document.createElement("span")
                    // newNode.innerHTML = '&nbsp;'
                    // this.editor.appendChild(newNode)

                    // document.getSelection().removeAllRanges()

                    // document.insertBefore(newNode,this.editor)
                    // console.log(focusOffset)
                    // setTimeout(() => {
                    // console.log(this.editor.childNodes)
                    // let nNode = this.editor.childNodes[this.editor.childNodes-1]
                    // console.log(this.editor.childNodes[this.editor.childNodes-1])
                    // console.log(nNode)
                    // setTimeout(() => {
                    // let nNode = this.findNextNode(node)
                    // console.log(nNode)
                    // if (nNode) {
                    //     range.setStart(nNode, 1);
                    //     range.setEnd(nNode, 1)
                    //     document.getSelection().addRange(range)
                    // }

                    // range.collapse(true)
                    // }, 100);

                    // document.getSelection().removeAllRanges()

                    // this.editor.focus()
                    // console.log(document.getSelection().focusNode)
                    // document.execCommand('foreColor', true, '#abc')
                    // document.execCommand("defaultParagraphSeparator", false, "p");

                    // }, 50);

                    // console.log(node.nextSibling)
                    // document.getSelection().empty()

                    // selection.empty()
                    // range.deleteContents()
                } else {
                    // console.log("HEEEHEHE")
                    if (this.state.showList) {
                        this.setState({ showList: false })
                    }
                    // let parent = document.getSelection().anchorNode.parentNode
                    // console.log("HWERE")
                    // console.log(lastText.charAt(0))
                    // if(lastText.charAt(0) != '@' && !isClick){
                    //     console.log("removeFormat")
                    // document.execCommand("removeFormat", false, "foreColor");
                    // }
                    // console.log(document.getSelection())
                    // if (parent && parent.classList.contains('smart-variable')) {
                    //     this.changeAttribute('foreColor', "#890")
                    //     this.changeAttribute('delete', "")

                    //     document.getSelection().removeAllRanges()


                    // }
                }

            });
            // range.clea

            // ;

            // selection.addRange(range)

            // this.editor.normalize()
            // console.log(this.editor)
            // console.log(document.getSelection())

            var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);

            var t = 'www.google.com';
            // if (t.match(regex)) {
            //     console.log("Successful match");
            // } else {
            //     console.log("No match");
            // }

            // if(e.newValue)
            // if()
        }
    }

    findNextNode(node) {
        // if (!node.parentNode.contains('editor')) {
        // console.log(node)
        let nNode = node.parentNode.nextElementSibling
        // console.log(nNode)
        if (nNode) {
            return nNode
        } else {
            // if (!nNode.classList.contains('editor')) {
            return this.findNextNode(node.parentNode)
            // }
        }
        // }
    }


    optionSelected=(prop)=>{
        
    }


    render() {
        return (
            <div role="presentation " style={{ position: 'relative' }}>
                <button onClick={() => this.changeAttribute()}>TEST</button>
                <div onChange={(e) => console.log("CHANGE")} role={"textbox"} ref={el => this.editor = el} className="editor w-100 h-100" data-placeholder={'Title...'} contentEditable={true} style={{ backgroundColor: '#e2eaf2', padding: '5px 10px', outline: 'none' }}>

                </div>
                {this.state.showList && (
                    <div className="w-100 blur-back py-2" style={{overflow:'auto', height: 200, backgroundColor: '#ffffffdd', borderRadius: '0px 0px 4px 0px', position: 'absolute',boxShadow:'0px 0px 30px #10101020'}}>
                        {this.state.optionsList.map((prop, index) => {
                            return (
                                <div className="w-100 text-start" key={index}>
                                    <button onClick={()=>this.optionSelected(prop)} className="px-3 py-2 w-100 text-start" style={{borderBottom:'1px solid #f2f6f8'}}>
                                        <p>Test Option</p>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default SmartInput;