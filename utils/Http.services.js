// import Auth from '../utils/Auth';
// import Notify from './../Common/Notify';
import { siteConfig, apisList } from '../variables/config';
import Security from './Security.services'
import { getToken, getObject, setObject, getVToken } from './useful'
import cookie from "cookie"

const requestSecurity = new Security()

class HttpService {


    async syncRequest(action, params, context) {
        let api = apisList[action]
        if (api) {
            // await this.checkParams(api, params,async (newParams, paramsError) => {
            // console.log(paramsError)

            // if (!paramsError) {
            // console.log(newParams)

            // await this.handleFiles(api, newParams, () => {

            // await requestSecurity.hashData(params, api, async(hashedData, hashError) => {
            //         if (!hashError) {
            //             console.log(hashedData)
            let hashedData = { route: api.route, content: params }
            console.log("HASH")
            console.log(this.serviceMethod(api, hashedData,context))
            let res = await fetch(siteConfig.domain + 'apiv1', this.serviceMethod(api, hashedData,context))
            let status = res.status
            let err = null
            let result = null
            let json = await res.json()
                // console.log(json)

            if (res.ok) {
                result = json
            } else {
                err = json
            }

            // console.log({ result, err, status })
            // .then(res => this.handleResponseError(res, (result, err, status) => {
            return { result, err, status }
            // })).catch(err => {
            //     return { result: null, err }
            // })

            // } else {
            //     return { result: null, err: "Security prevention" } // TODO: Language
            // }
            // })
            // })
            // } else {
            //     cb(null, paramsError) // TODO: Language
            // }
            // })
        } else {
            return { result: null, err: "Irrelevant request" }

            // cb(null, "Irrelevant request") // TODO: Language
        }
    }




    request(action, params, cb) {
        let api = apisList[action]
        if (api) {
            this.checkParams(api, params, (newParams, paramsError) => {
                // console.log(paramsError)

                if (!paramsError) {
                    // console.log(newParams)

                    this.handleFiles(api, newParams, () => {

                        requestSecurity.hashData(newParams, api, (hashedData, hashError) => {
                            if (!hashError) {
                                console.log(hashedData)
                                fetch(siteConfig.domain + 'apiv1', this.serviceMethod(api, hashedData))
                                    .then(res => this.handleResponseError(res, (result, err, status) => {
                                        cb(result, err, status)
                                    })).catch(err => {
                                        cb(null, err)
                                    })

                            } else {
                                cb(null, { error: "Security prevention" }) // TODO: Language
                            }
                        })
                    })
                } else {
                    cb(null, paramsError) // TODO: Language
                }
            })
        } else {
            cb(null, "Irrelevant request") // TODO: Language
        }
    }


    handleFiles(api, newParams, cb) {
        // console.log("handleFiles")
        // console.log(newParams['**files'])
        // console.log(newParams)
        if (!newParams['**files']) {
            cb()
            return
        }

        let files = newParams['**files']
        let promises = []
        console.log(files)
        for (let [key, value] of Object.entries(files)) {
            // console.log(key)
            // console.log(value)
            if (value) {

                promises.push(new Promise((resolve, reject) => {
                    this.fileUpload(value, newParams['applet'], key, (fileInfo) => {
                        console.log(fileInfo)
                            // let index = null
                            // if (key.includes('*')) {
                            //     console.log(key)
                            //     key = key.split('*')
                            //     index = key[1]
                            //     key = key[0]
                            //     console.log(key)
                            //     console.log(index)
                            // }
                        if (Array.isArray(fileInfo)) {
                            newParams[key] = Array.isArray(newParams[key]) ? newParams[key] : []
                            setObject(newParams, key, [...fileInfo], true)
                        } else {
                            console.log("SETOBJECT")
                            console.log(key)
                            console.log(fileInfo)

                            setObject(newParams, key, fileInfo)
                        }
                        resolve(fileInfo)
                    })

                }))
            }
        }
        // console.log(newParams)
        Promise.all(promises).then(() => {
            delete newParams['**files']
            cb()
        })

    }



    fileUpload(files, page, field, cb) {

        // console.log("UPLOAD")
        let fetchAddress = 'files/fileuploader'

        let filesInfo = []
        let count = 0

        let allFiles = Array.isArray(files) ? files : [files]

        allFiles.forEach((file, i) => {

            // if (file.formType === 'ImageInput') {
            //     fetchAddress = 'files/imageuploader'
            // }
            // if (file.formType === 'VideoInput') {
            //     fetchAddress = 'files/videouploader'
            // }
            if (file) {

                const req = new XMLHttpRequest();
                var formData = new FormData();

                formData.append('file', file);


                formData.append('field', field);
                formData.append('page', page);

                console.log(fetchAddress)
                req.open("POST", siteConfig.domain + fetchAddress, true);
                let parent = this

                req.upload.onprogress = function(e) {
                    // console.log(e)
                    let percentage = Math.floor((e.loaded / e.total) * 100)
                        // let uploads = parent.state.uploads
                        // uploads.forEach((upload, index) => {
                        //     if (upload.key == field + i) {
                        //         uploads[index].percentage = percentage
                        //     }
                        // });
                        // parent.setState(uploads)
                }

                req.onload = function(e) {
                    if (req.readyState === 4) {
                        console.log(req)
                        if (req.status === 200) {
                            let data = JSON.parse(req.responseText);
                            // let data = this.handleResponseError(req.responseText)

                            if (!Array.isArray(files)) {
                                filesInfo = data.info
                                cb(filesInfo)
                            } else {
                                filesInfo.push(data.info)
                                count = count + 1
                                if (count === files.length) {
                                    cb(filesInfo)
                                }
                            }

                        } else {
                            cb(false)
                            console.error(req.statusText);
                        }
                    }
                }.bind(this);
                req.onerror = function(e) {
                    console.error(req.statusText);
                };

                req.send(formData);
            } else {
                count = count + 1
                if (count === files.length) {
                    cb(filesInfo)
                }
            }
        });

    }


    urlShaderrequest(action, params, cb) {
        let api = apisList[action]
        if (api) {
            this.checkParams(api, params, (chekcedParams, paramsError) => {
                console.log("HERE")
                if (!paramsError) {
                    requestSecurity.hashData(params, api, (hashedData, hashError) => {
                        if (!hashError) {
                            fetch(siteConfig.domain + '/apiv1', this.serviceMethod(api, hashedData))
                                .then(res => this.handleResponseError(res))
                                .then((data, err) => cb(data, err))
                                .catch(err => {
                                    // console.log('eEEE')
                                    cb(null, err)
                                })
                        } else {
                            cb(null, { error: "Security prevention" }) // TODO: Language
                        }
                    })
                } else {
                    cb(null, { error: paramsError }) // TODO: Language
                }
            })
        } else {
            cb(null, "Irrelevant request") // TODO: Language
        }
    }

    chooseServer() {
        // TODO :FUTURE
    }


    checkParams(api, params, cb) {
        let newParams = {}
        let errors = {}
        api.params.forEach(param => {
            newParams[param.key] = params[param.key]
            if (param.required) {
                if (params[param.key] == null && params[param.key] == '') {
                    // cb(null, {
                    errors[param.key] = '{{lang}}feildIsRequired'
                        // })

                }
                if (param.type && typeof params[param.key] != param.type) {

                    // cb(null, {
                    errors[param.key] = '{{lang}}invalidInputs'
                        // })
                }
            }
        });
        if (api.flexibleParams) {
            cb(params)
        } else {
            // console.log((errors != {}) ? errors : null)

            cb(newParams, errors.length ? errors : null)
        }
    }

    serviceMethod(api, data,context) {
        let request;
        const method = { method: api.method ? api.method.toUpperCase() : 'POST' }
        const Body = { body: JSON.stringify(data) }
        const AddProperty = {};
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', } //, 'Authorization': 'bearer ' + Auth.getToken(), ...custom_header });
        if (api.auth === 'token') {
            let token = getToken()
            if(!token && context){
                // console.log(context.req.cookies?.token)
                token = context.req?.cookies?.token
               
            }
                // console.log(token)
            if (token) {
                // console.log("bearer " + token)
                headers.Authorization = "bearer " + token
            } else {
                /// TO DO
            }
        }

        // if (api.auth === 'vtoken') {
        //     let token = getVToken()
        //     if (token) {
        //         headers.vAuthorization = "bearer " + token
        //     } else {
        //         /// TO DO
        //     }
        // }

        switch (method.method) {
            case 'GET':
                request = {...method, headers, ...AddProperty }
                break;
            case 'POST':
                request = {...method, headers, ...AddProperty, ...Body }
                break;
            case 'DELETE':
                request = {...method, headers, ...AddProperty }
                break;
            case 'PUT':
                request = {...method, headers, ...AddProperty, ...Body }
                break;
            default:
                break;
        }

        // console.log(request)

        return request
    }

    handleResponseError(res, cb) {
        // console.log(res)
        res.json().then(result => {
            // console.log(res)
            if (!res.ok) {

                cb(null, result, res.status)
                    // return { result: null, err: result }
                    // throw new Error("HTTP error, status = " + res.status);
            } else {
                // return { result }
                cb(result, null, res.status)
            }
        }).catch(err => {
            console.log(err)
        })

    }

    async handlerResponseService(data) {
        // console.log('handlerResponseService', data);
        if (data && data.responseMessages) {
            for (let item of data.responseMessages) {
                // await Notify.notifycation({
                //     msg: `${item.name ? item.name + ': ' : ''} ${item.message}`,
                //     type: data.success ? 'success' : 'error',
                //     position: 'bottom-right'
                // })
            }
        }

        return data;
    }

    handleError(error) {
        console.log(error.message);
    }

}


export default new HttpService();