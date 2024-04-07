import React from "react";
// import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  Editor  from '../Editor';

// import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import MyUploadAdapter from '../MyUploadAdapter'



// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// export default class ClassicEditor extends ClassicEditorBase {}

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// used for making the prop types of this component
// import PropTypes from "prop-types";

// const blocksFromHTML = convertFromHTML('');
// const initialEditorContent = ContentState.createFromBlockArray(
//   blocksFromHTML.contentBlocks,
//   blocksFromHTML.entityMap
// );

// CKEditor.editorConfig = function( config ) {
//     config.language = 'fr';
//     config.uiColor = '#AADC6E';
// };



function MyUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        return new MyUploadAdapter(loader)
    };
}



const editorConfiguration = {

    extraPlugins: [MyUploadAdapterPlugin],
    mediaEmbed: {
        previewsInData: true
    },
    // plugins: [Paragraph, Bold, Italic, Essentials],
    // toolbar: ['bold', 'italic']
    // alignment: {
    //     options: [ 'left', 'right' ]
    // },
    // toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    // heading: {
    //     options: [
    //         { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //         { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //         { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //     ]
    // }
    // plugins: ["Essentials","fontColor"],
    // toolbar: ['bold', 'italic','fontSize','font','fontColor']
    // toolbar: [ 'bold', 'italic' ]
    // plugins: [ Essentials ],

    // toolbar: ["colors",'fontSize','font','fontColor']


    // removePlugins: [ 'Image' ],
    // plugins: [ "FontSizeConfig"],
    // removePlugins: [ 'Heading', 'Link' ],
    // toolbar: [ 'bold', 'italic', 'link' ]

    // toolbar: [ 'heading', '|','fontSize', 'bold', 'italic','', 'link' ,'bulletedList', 'numberedList', 'blockQuote' ],
    // heading: {
    //     options: [
    //         { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //         { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //         { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //     ]
    // }
};


class Header extends React.Component {

    state = {
        categories: [],
        tags: [],
        reviewers: [],
        editorState: ""//EditorState.createWithContent(initialEditorContent)
    }

    componentWillMount() {
        console.log(this.props.data)
        if (this.props.data && this.props.data != '') {
            // const blocksFromHTML = convertFromHTML(this.props.data);
            // const initialEditorContent = ContentState.createFromBlockArray(
            //     blocksFromHTML.contentBlocks,
            //     blocksFromHTML.entityMap
            // );
            this.setState({ editorState: this.props.data })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data) {
            this.setState({ editorState: (this.props.data?this.props.data:'') })

        }
    }

    componentDidMount(){
        this.setState({editorLoaded:true})
    }

    handleChangeSelect = (name, newVal) => {
        this.setState({
            [name]: newVal
        });
    }

    // onEditorStateChange = editorState => {
    //     this.setState({ editorState })
    //     this.props.onChange(this.props.header.key, draftToHtml(convertToRaw(editorState.getCurrentContent())))
    //     // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // }

    onEditorStateChange = editorState => {
        this.setState({ editorState })
        this.props.changeValue(this.props.header.key, editorState)
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }


    conditionalSettings(param, condition) {
        if (this.props.settings) {
            if (this.props.settings[param] == condition) {
                return true
            }
        }
        return false
    }

    render() {
        // console.log(CKEditor.config)
        return (
            <div className='mt-0 w-100'>
                {/* <label className={'mb-2 mr-1 ml-1 ' + (this.conditionalSettings('required', true) ? 'required' : '')} style={{ marginBottom: 3, fontSize: 12, marginTop: 5, color: '#999' }}>{this.props.label}</label> */}
                <div style={{  }}>

                    <Editor
                        // config={editorConfiguration}
                        // editor={ClassicEditor}
                        editorLoaded={this.state.editorLoaded}
                        data={this.state.editorState}
                        // onReady={editor => {
                        //     // You can store the "editor" and use when it is needed.
                        //     console.log('Editor is ready to use!', editor);
                        // }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.onEditorStateChange(data)
                        }}
                        // onBlur={(event, editor) => {
                        //     // console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     // console.log('Focus.', editor);
                        // }}
                    />


                    {/* <CKEditor
                        editor={ClassicEditor}
                        data={this.state.editorState}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    /> */}

                    {/* <CKEditor
                        config={editorConfiguration}
                        editor={ClassicEditor}
                        data={this.state.editorState}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.onEditorStateChange(data)
                            // console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    /> */}
    

                    {/* <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="wysiwig-editor-wrapper"
                        editorClassName="form-control"
                        editorStyle={{ height: 200 }}
                        onEditorStateChange={this.onEditorStateChange}
                    /> */}
                </div>
                {/* <input onChange={e=>{this.props.onChange(this.props.header.key,e.target.value)}} className='mediumiransansfont form-control' defaultValue={this.props.data} style={{backgroundColor:'#f7f7f7', color: '#3b3a40' }}/> */}
            </div>
        );
    }
}

export default Header;
