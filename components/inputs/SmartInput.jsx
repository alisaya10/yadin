import React from 'react'
// import { checkTextTranslation } from '../../utils/useful'
import { nanoid } from 'nanoid'
import { getBoundingClientRect } from '../../utils/functions'
import { imageAddress } from '../../utils/useful';
// import { findAllByTestId } from '@testing-library/react'
// import { DirectionalLightShadow, DynamicDrawUsage, TriangleFanDrawMode } from 'three'


class SmartInput extends React.Component {
    state = {
        variables: {},
        // optionsList: [
        //     { key: 'variables', label: 'variables' },
        //     { key: 'calculator', label: 'calculator' },
        //     { key: 'function-name', label: 'Function Name' },
        //     { key: 'function-test', label: 'Function test' },
        // ]
    }



    componentDidMount() {

        // console.log(this.props.optionsList)
        this.editor.addEventListener("DOMCharacterDataModified", this.onChange);
        this.editor.addEventListener("input", this.editorUpdated);

        // document.execCommand("defaultParagraphSeparator", false, 'br')

        this.editor.addEventListener("mouseup", (e) => this.onChange(e, true))
        this.editor.addEventListener('keypress', (e) => {
            // console.log(e)
            if (e.charCode === 13) {
                // document.execCommand("defaultParagraphSeparator", false, 'br')

                // document.execCommand("foreColor", true, 'inherit')
                // this.changeAttribute('delete', true,"")
                // this.changeAttribute('insertHorizontalRule', true,"")

                // console.log("REV")
                e.preventDefault();
                {
                    !this.props.header?.information?.singleLine && (
                        this.addNewLine()
                    )
                }
                console.log(this.editor.childNodes)
                // let selection = document.getSelection()
                // console.log(selection)
                // let node = selection.anchorNode

                // this.editor.childNodes.forEach(element => {
                //     if(element == node){
                //         console.log("LINEEEEE")
                //     }
                // });
            }
        });

        // this.editor.addEventListener("DOMNodeInserted", this.onChange);

        // this.editor.addEventListener("DOMNodeRemoved", (e) => {
        //     console.log("REMOVED")
        //     console.log(e)
        // }
        // );

        const config = { attributes: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true };

        this.observer = new MutationObserver(this.observeChanged)
        this.observer.observe(this.editor, config);

        this.initData()

    }






    componentWillUnmount() {
        this.editor.removeEventListener("DOMCharacterDataModified", this.onChange);
        this.editor.removeEventListener("input", this.editorUpdated);
        this.editor.removeEventListener('keypress', () => { })
        window.removeEventListener('mousedown', this.closeList)
        this.observer.disconnect();


    }



    initData() {
        if (this.props.data) {
            this.editor.innerText = this.props.data
        }
    }


    getPosition = () => {
        // console.log("getPosition")
        let rect = getBoundingClientRect(this.wrapperRef)
        // console.log(rect)
        let top = rect.top + 35
        let left = rect.left - 10
        this.setState({ top, left }, () => {
            if (this.list) {
                let lestRect = getBoundingClientRect(this.list)
                if(lestRect.top != top){
                    this.setState({top:65, left:-10})
                }
            }
        })
    }




    addNewLine() {
        let selection = document.getSelection()
        let node = selection.anchorNode
        let div = document.createElement("div");
        let br = document.createElement("br")
        div.appendChild(br)
        div.classList.add('line');

        let line = this.getCurrentNodeParent(node)
        // console.log(line)
        line.parentNode.insertBefore(div, line.nextSibling);
        let range = document.createRange()
        document.getSelection().removeAllRanges()
        range.setStart(div, 0)
        range.setEnd(div, 0)
        document.getSelection().addRange(range)

        this.setState({ showList: false })

    }

    getCurrentNodeParent(node) {
        if (node.parentNode.classList.contains('editor')) {
            return node
        } else {
            return this.getCurrentNodeParent(node.parentNode)
        }
    }


    changeInputValue(value) {
        // let value = (target.validity.valid) ? target.value : null
        // if (value !== null) {
        this.props.changeValue(this.props.header.key, this.editor.innerText, this.props.extra)
        // }
    }

    // changeAttribute = (attribute, value, boolean) => {
    //     document.execCommand(attribute, boolean, value)
    //     // console.log(this.editor.innerHTML)
    // }
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
        // console.log("OBSERVER")
        // console.log(e)
        let event = e
        if (!Array.isArray(event)) {
            event = [event]
        }


        event.forEach(element => {
            // console.log(element)
            if (element.removedNodes && element.removedNodes.length > 0) {

                element.removedNodes.forEach(removedNode => {
                    if (removedNode.className?.includes('smart-variable') && removedNode.attributes.id) {
                        // console.log(removedNode.attributes.id.value)
                        let variables = this.state.variables
                        delete variables[removedNode.attributes.id.value]
                    }
                });
                // console.log(element)
                // console.log("RESET")
                // document.execCommand("foreColor", false, "")
            }


            if (element.type == "characterData") {
                if (element.target.parentNode?.className?.includes('smart-variable') && element.target.parentNode?.attributes.id) {
                    if (!element.target.nodeValue.startsWith('@')) {

                        let variables = this.state.variables
                        delete variables[element.target.parentNode?.attributes.id.value]
                        // console.log("HERE!!!!!!!!+!_++_!")
                        let textNode = document.createTextNode(element.target.nodeValue)
                        element.target.parentNode.replaceWith(textNode)

                    }
                }
            }
        });

        // console.log("QWQWWWQWQ ***")
        let selection = document.getSelection()
        let classList = selection.anchorNode?.classList
        if (classList?.contains('line') || classList?.contains('editor')) {
            let anchorNode = selection.anchorNode ?? this.editor
            document.getSelection().removeAllRanges()
            let range = document.createRange()
            // let an
            // console.log(anchorNode)
            range.setStart(anchorNode, 0)
            range.setEnd(anchorNode, 0)
            document.getSelection().addRange(range)
        }

        this.changeInputValue()

        // anchorNode


        // this.changeAttribute('delete', "")

    }






    editorUpdated = (e) => {
        // console.log(e)
        // let text = this.editor.textContent
        let text = this.editor.innerText

        // console.log(text)
        // // console.log(text)

        if (!text || text == '' || text == ' ' || text == " " || text == '\n') {
            // console.log("INNER HTML")
            this.editor.innerHTML = ''
            // console.log(document.getSelection())
            // document.getSelection().removeAllRanges()
            // let range = document.createRange()
            // range.setStart(this.editor, 0)
            // range.setEnd(this.editor, 0)
            // document.getSelection().addRange(range)

            // this.editor.focus()
            // let span = document.createElement('span')
            // span.innerHTML = 'TETS'
            // span.classList = "TEST"
            // this.editor.appendChild(span)
            // span.remove()
            //     this.changeAttribute('foreColor', "")
            //     this.changeAttribute('delete', "")
            //     this.setState({ showList: false })
        }

    }




    onChange = (e, isClick) => {

        setTimeout(() => {

            // console.log(e)

            let selection = document.getSelection()
            console.log(selection)
            let node = selection.anchorNode
            let offset = selection.focusOffset



            if (node) {


                let currentVariable
                if (node.parentNode.classList.contains('smart-variable')) {
                    currentVariable = node.parentNode.id
                }



                let text = String(node.textContent)
                let range = document.createRange()



                if (currentVariable) {
                    if ((e.prevValue !== e.newValue)) {

                        if ((text.startsWith('@') && text.endsWith('@'))) {

                            // let oldNode = node
                            let textNode = document.createTextNode(e.prevValue)
                            node.replaceWith(textNode)
                            let oldNode = textNode
                            // oldNode.nodeValue = 'RWD'
                            node = document.createTextNode('@')
                            oldNode.parentNode.parentNode.insertBefore(node, oldNode.parentNode.nextSibling);
                            document.getSelection().removeAllRanges()
                            range.setStart(node, 1)
                            range.setEnd(node, 1)
                            document.getSelection().addRange(range)
                            text = String(node.textContent)

                        } else {

                            if (text.charCodeAt(text.length - 1) == 32 || text.charCodeAt(text.length - 1) == 160) {
                                // console.log("DLJDLDKW")
                                // console.log(node.parentNode)
                                // node.parentNode.nodeValue = e.prevValue
                                // console.log(node)
                                // node.nodeValue = "test" 
                                // node.replaceWith(document.createTextNode('test'))
                                let oldNode = node
                                node = document.createTextNode(e.prevValue)
                                oldNode.replaceWith(node)

                                let nextSibling = node.parentNode.nextSibling
                                if (nextSibling && nextSibling.nodeValue && nextSibling.nodeValue != '') {
                                    node = node.parentNode.nextSibling
                                    // console.log(node)
                                    // console.log("NEXT")
                                } else {
                                    let textNode = document.createTextNode(' ');
                                    node.parentNode.parentNode.insertBefore(textNode, node.parentNode.nextSibling);
                                    node = textNode
                                    // console.log("CREATE")
                                }
                                document.getSelection().removeAllRanges()
                                if (!node.length == 0) {
                                    node.innerHTML = ' '
                                }
                                range.setStart(node, 1)
                                range.setEnd(node, 1)
                                document.getSelection().addRange(range)
                                text = String(node.textContent)

                            } else {
                                let textNode = document.createTextNode(text);
                                node.parentNode.replaceWith(textNode)
                                node = textNode
                                document.getSelection().removeAllRanges()
                                // console.log(text)
                                // console.log(text.length)
                                // console.log(offset)
                                range.setStart(node, offset)
                                range.setEnd(node, offset)
                                document.getSelection().addRange(range)
                                let variables = this.state.variables
                                delete variables[currentVariable]
                                // console.log(variables)
                            }
                        }
                    }
                }


                // console.log(node)
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




                    if (lastText.charAt(0) != '@') {
                        // console.log(lastText)
                        lastText = lastText.replace(/ /g, '');
                        lastText = lastText.replace(/ /g, '')
                    }

                    if (node.length >= selection.focusOffset - lastText.length) {
                        range.setStart(node, selection.focusOffset - lastText.length);
                    }
                    if (node.length >= selection.focusOffset) {
                        range.setEnd(node, selection.focusOffset)
                    }


                    // lastText = lastText.replace("&nbsp;","")
                    // lastText = lastText.replace(" ","")
                    // console.log(lastText)
                    if (lastText.charAt(0) == '@') {

                        if (!this.state.showList) {
                            this.openList()
                            // this.setState({ showList: true })
                        }

                        // if (lastText.length == 1 && !isClick) {
                        //     console.log("RANGE")
                        //     document.getSelection().removeAllRanges()
                        //     document.getSelection().addRange(range)
                        //     // console.log("BLUEEEE")
                        //     this.changeAttribute('foreColor', "007aff")
                        //     let parent = document.getSelection().anchorNode.parentNode
                        //     // parent.classList.add('cursor-pointer')
                        //     parent.classList.add('smart-variable')

                        //     // console.log(parent)
                        //     // window.getSelection().focusNode.addClass('cursor-pointer')

                        // }

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

                            // this.changeAttribute('delete', "")
                            // this.changeAttribute('insertHTML', "<span> </span>")
                            setTimeout(() => {
                                // this.setState({ showList: false })
                                this.closeList()
                            }, 50);
                        }

                        if (node.textContent == '@') {
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
                            this.closeList()
                            // this.setState({ showList: false })
                        }
                        // let parent = document.getSelection().anchorNode.parentNode
                        // console.log("HWERE")
                        // console.log(lastText.charAt(0))
                        // if (lastText.charAt(0) != '@' && !isClick) {
                        //     console.log("removeFormat")
                        //     document.execCommand("removeFormat", false, "foreColor");
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
        }, 20);

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


    optionSelected = (prop) => {
        // console.log(prop)
        if (prop.hasChildren) {
            this.setState({ currentParent: prop })
        } else {
            let selection = document.getSelection()
            // console.log(selection)
            let node = selection.anchorNode

            let variables = this.state.variables

            // console.log(selection)

            // for (var i = 0, len = selection.rangeCount; i < len; ++i) {
            //     // html.appendChild(selection.getRangeAt(i).cloneContents());
            //   }

            // console.log(node)
            if (node) {

                let currentVariable
                if (node.parentNode.classList.contains('smart-variable')) {
                    currentVariable = node.parentNode.id
                    delete variables[currentVariable]
                    // console.log("DELEREEE")
                }



                let text = String(node.textContent)
                // console.log(currentVariable)
                // console.log(selection.anchorOffset)
                // console.log(text.length)

                let start, end

                for (let i = selection.anchorOffset; i < text.length; i++) {
                    const char = text[i];
                    // console.log(char)
                    // console.log(char.charCodeAt(0))
                    if (!char || char == '' || char == '@' || char == ' ' || char == ' ' || char == '\n') {
                        end = i
                        break
                    }
                }

                if (!end) {
                    end = text.length
                }

                for (let i = selection.anchorOffset; i > 0; i--) {
                    const char = text[i];
                    if (char == '' || char == '@' || char == ' ' || char == ' ' || char == '\n') {
                        start = i
                        break
                    }
                }

                if (!start) {
                    start = 0
                }

                let word = text.substr(start, end - start)
                // console.log(start)
                // console.log(end)
                // console.log(word)

                let id = nanoid(10)

                let span = this.createSmartVariable("@" + prop.key, id)

                // node.remove()
                let range = document.createRange()
                document.getSelection().removeAllRanges()

                // let parentClasses = node.parentNode.classList
                // let insertNode = node

                // if (!parentClasses.contains('line') && !parentClasses.contains('editor')) {
                //     insertNode = node.parentNode
                //     start = 0
                //     end = 0
                // }

                range.setStart(node, start)
                range.setEnd(node, end)
                document.getSelection().addRange(range)
                // range = document.selection.createRange()
                range.deleteContents();
                // var newspan = document.createElement("span");
                if (!node.parentNode.classList.contains('smart-variable')) {
                    range.insertNode(span)

                } else {
                    // let newSpan = document.createElement("span");
                    // newSpan.innerHTML = ' '
                    if (node.parentNode.parentNode) {
                        node.parentNode.parentNode.insertBefore(span, node.parentNode.nextSibling);
                    }
                    // console.log("QIOUWIODD")
                    // document.getSelection().removeAllRanges()
                    // range.setStart(span, 1)
                    // range.setEnd(span, 1)
                    // document.getSelection().addRange(range)
                    // range.insertNode(span)

                }


                // console.log(span)
                // console.log(span.nextSibling)
                let nextNode = null
                // console.log(span)
                // console.log(span.parentNode)

                let nextSibling = span.nextSibling
                if (nextSibling && nextSibling.nodeValue && nextSibling.nodeValue != '') {
                    nextNode = span.nextSibling

                } else {
                    // if (!span.nextSibling || !span.nextSibling.innerHTML) {
                    // console.log("NEXT DOES NOT EXITS")
                    let newNode = document.createTextNode(' ');
                    // newNode.innerHTML = 
                    // console.log(span.parentNode)
                    if (span.parentNode) {
                        span.parentNode.insertBefore(newNode, span.nextSibling);
                    } else {
                        span.insertBefore(newNode, span.nextSibling);
                    }
                    nextNode = newNode
                }

                document.getSelection().removeAllRanges()
                range.setStart(nextNode, 1)
                range.setEnd(nextNode, 1)
                document.getSelection().addRange(range)




                variables[id] = prop

                // console.log(variables)
                this.closeList()
                // console.log(span.nextSibling)
                // document.getSelection().removeAllRanges()
                // range.setStart(span, end-start-1)
                // range.setEnd(span, end-start-1)
                // document.getSelection().addRange(range)
                // span.parentNode.insertBefore(newspan, span.nextSibling);


                //  selection = document.getSelection()
                // console.log(selection)
                //   node = selection.anchorNode

                //  selection = document.getSelection()
                // console.log(selection)
                // let node = selection.anchorNode


                // let lastTextArray = text.slice(0, selection.focusOffset)
                // lastTextArray = lastTextArray.split(' ')

                // console.log(variables)
                // this.changeAttribute('delete', "")
                // this.changeAttribute('insertHTML', "<span> </span>")
                // this.closeList()
            }
        }
    }


    openList = () => {
        let selection = document.getSelection()
        let node = selection.anchorNode
        let range = selection.getRangeAt(0)

        if (node) {
            let position = getBoundingClientRect(range)
            let editorPosition = getBoundingClientRect(this.editor)

            position.top = position.top - editorPosition.top + 30
            this.setState({ showList: true, listPostion: position })
            window.addEventListener('mousedown', this.closeList)
            window.addEventListener('scroll', this.getPosition, true);
            this.getPosition()
        }
    }

    closeList = (e) => {
        // console.log("MOUSE DOWN")
        if (!e || (this.wrapperRef && !this.wrapperRef.contains(e.target))) {
            this.setState({ showList: false })
            window.removeEventListener('scroll', this.getPosition);
            document.removeEventListener('mousedown', this.closeList);

        }

    }


    createSmartVariable(text, id) {
        var span = document.createElement("span");
        span.classList.add('smart-variable');
        span.setAttribute("id", id);

        span.innerHTML = text

        // TODO: SAVE VARIABLE
        return span
    }

    backList = (prop) => {
        console.log(prop)
        this.props.optionsList.forEach(option => {
            if (prop.parent) {
                if (prop.parent == option.key) {
                    this.setState({ currentParent: option })
                }
            } else {
                this.setState({ currentParent: null })

            }
        });
    }

    render() {
        return (
            <div className="h-100 w-100 text-start" ref={el => this.wrapperRef = el} role="presentation " style={{ position: 'relative', flex: 1, alignSelf: 'stretch' }}>
                <div role={"textbox"} onPaste={(e) => this.onPaste(e)} ref={el => this.editor = el} className="editor w-100 h-100 transpanet-input" data-placeholder={'@ for variables'} contentEditable={true} style={{ outline: 'none', wordBreak: 'break-word' }}>

                </div>
                {this.state.showList && (
                    <div className="w-100 blur-back py-2 " ref={el => this.list = el} style={{ overflow: 'auto', maxHeight: 200, minWidth: 200, width: '100%', maxWidth: 300, backgroundColor: '#ffffffdd', borderRadius: '4px', position: 'fixed', top: this.state.top, left: this.state.left, zIndex: 10, boxShadow: '0px 0px 30px #10101020' }}>
                        {this.state.currentParent && (
                            <div className="flexc w-100 pb-2 px-3 pt-1" style={{ borderBottom: '1px solid #99aabb90' }}>
                                <button className="mrd-2 flexcc" style={{ backgroundColor: '#9ab', borderRadius: 30, width: 24, height: 24 }}><img className="reverse invert" src="/images/nexts.png" width="14px" onClick={() => this.backList(this.state.currentParent)} /></button>
                                <p className="text-bold">{this.state.currentParent?.label}</p>
                            </div>
                        )}

                        {this.props.optionsList?.map((prop, index) => {
                            if (prop.parent == this.state.currentParent?.key)
                                return (
                                    <div className="w-100 text-start" key={prop.key}>
                                        <button onClick={() => this.optionSelected(prop)} className="px-3 py-2 w-100 text-start flexc" style={{ borderBottom: '1px solid #f2f6f8' }}>
                                            {prop.image && (
                                                <img className="mrd-2" src={imageAddress(prop.image, null, 'small')} style={{ width: 26, height: 26, objectFit: 'cover', borderRadius: 20 }} />
                                            )}
                                            <p className="text-smaller text-bold">{prop.label}</p>
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