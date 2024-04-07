import React, { useEffect, useRef } from "react";
import MyUploadAdapter from './MyUploadAdapter'


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
   
};

function Editor({ onChange, editorLoaded, name,data, value }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={data}
                    onChange={onChange}

                // onChange={(event, editor) => {
                //     const data = editor.getData();
                //     // console.log({ event, editor, data })
                //     onChange(data);
                // }}

                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default Editor;
