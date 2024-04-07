function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }


    var ia = new Uint8Array(bstr.length);
    for (var i = 0; i < bstr.length; i++) {
        ia[i] = bstr.charCodeAt(i);
    }

    return new Blob([ia], { type: mime });
}



function blobToFile(blob, fileName) {
    var myBlob = blob
    myBlob.lastModifiedDate = new Date();
    myBlob.name = fileName;
    return new File(myBlob);
}




function getBoundingClientRect(element) {
    if (element) {
        var rect = element.getBoundingClientRect();
        let object = {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y
        };

        // if (cb) {
        //     cb(object)
        // }
        return object
    } else {
        return {}
    }
}


export { dataURLtoFile, getBoundingClientRect }