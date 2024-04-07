import { siteConfig } from '../variables/config'
import HttpService from '../utils/Http.services';
import i18n from 'i18next';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function translate(key, params) {
    return (
        i18n.t(key, params)
    )
}


function postWishList(status,course,lesson,cb){

   

    let myCourse = typeof course == 'object' ? course?._id : course
    let myLesson = typeof lesson == 'object' ? lesson?._id : lesson

    console.log(status)
    console.log(myCourse)

    HttpService.request('postWishList',{status,course:myCourse,lesson:myLesson},(fetchResult,fetchError)=>{

        console.log(fetchResult)


        cb(fetchResult,fetchError)

    })
}


function msToHMS(secs) {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
        // alert( hours+":"+minutes+":"+seconds);
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



function checkTextTranslation(text) {
    if (text && typeof text == 'string') {
        if (text.includes("{{lang}}")) {
            let newText = text
            newText = newText.replace('{{lang}}', '')
            newText = i18n.t(newText)
            return newText

        } else {
            return text
        }
    }
}


function checkTranslation(text) {
    if (text) {
        if (String(text).includes("{{lang}}")) {
            let newText = String(text)
            newText = newText.replace('{{lang}}', '')
            newText = i18n.t(newText)
            return newText

        } else {
            return text
        }
    }
}



function changeBodyDirection(language) {

    if (language === 'fa') {
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
    }
}


function currentLng() {
    return i18n.language
}


function changeUrlWithLng(lng) {
    let pathname = window.location.pathname.split('/')
    let search = window.location.search;


    for (let index = pathname.length - 1; index >= 0; index--) {
        if (pathname[index] === "") {
            pathname.splice(index, 1)
        }
    }


    if (lng === siteConfig.defaultLng && siteConfig.dontShowUrlForDefaultLng) {
        if (siteConfig.languages.indexOf(pathname[0]) !== -1) {
            // console.log(pathname.splice(0, 1).join('/'))
            pathname.splice(0, 1)
            pathname = pathname.join('/')
                // window.location = '/' + pathname
            window.location = '/' + pathname + (search ?? '')


        }
    } else {

        if (lng !== pathname[0]) {

            if (!pathname[0] || siteConfig.languages.indexOf(pathname[0]) !== -1) {
                pathname[0] = lng
            } else {
                pathname.splice(0, 0, lng)
            }
            // window.location = "/" + pathname.join('/')
            window.location = "/" + pathname.join('/') + (search ?? '')

        }
    }
}


function defaultPathMaker() {
    return siteConfig.dontShowUrlForDefaultLng ? (i18n.language === siteConfig.defaultLng ? '' : '/' + i18n.language) : '/' + i18n.language
}

function pathMaker(path) {
    return defaultPathMaker() + path
}

function imageAddress(image, type, prefered) {
    // console.log(image)
    let imageInfo = {
        profile: { address: 'uploads/', defaultImg: '/images/man-1.svg' },
        product: { address: 'uploads/', defaultImg: '/images/noimageavailable.jpg' },
        resource: { address: 'uploads/', defaultImg: '/images/noimageavailable.png' },
        estate: { address: 'uploads/', defaultImg: '/images/def.jpg' },
        tickeProfile: { address: 'uploads/', defaultImg: '/images/man-1.svg' },
        video: { address: 'uploads/videos/thumbnails/', defaultImg: '/images/noimageavailable.png' },

    }

    let prefixAddress = 'uploads/'
    let defaultImg = ''
    if (imageInfo[type]) {
        prefixAddress = imageInfo[type].address
    }
    if (imageInfo[type] && imageInfo[type].defaultImg) {
        defaultImg = imageInfo[type].defaultImg
    } else {
        defaultImg = '/images/noimageavailable.png'
    }



    if (image && image != '') {

        let imageName = ''
        let myImage = Array.isArray(image) ? image[0] : image

        if (prefered && myImage.sizes && myImage.sizes[prefered]) {
            // console.log("HERE")
            imageName = myImage.sizes[prefered].address

        } else {
            if (typeof myImage === "object" && !Array.isArray(myImage)) {
                // console.log(image.address)
                imageName = myImage.address
            } else {
                imageName = myImage
            }
        }


        let final = siteConfig.assetsDomain + prefixAddress + imageName
            // console.log(final)

        return final
    } else {
        return defaultImg
    }

}


function getToken() {
    let token = cookies.get('token')
        // if (!token) {
        // if (typeof window !== 'undefined') {
        //     token = localStorage.getItem('token')
        // }
        // }
        // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDFiZjdhMTRhN2IyZjZhMWU1YTc0ZCIsImlhdCI6MTY0NTYyNDY2MH0.gZw4bSgVolp0KZt9xoeoSzXCLvrIZRK6bP18wNDZNhc"
    if (typeof token === "undefined") {
        token = null
    }
    return token
}

function getVToken() {
    let token = cookies.get('vtoken')
    if (typeof token === "undefined") {
        token = null
    }
    return token
}

function getUserInfo(cb) {
    HttpService.request("getUserInfo", null, (fetchResult, fetchError, status) => {
        // console.log(status)
        if (fetchError) { if (cb) { cb(null, fetchError.message, status) }; return }
        if (cb) { cb(fetchResult, null, status) }
    })
}




function getOneThing(info, cb) {
    HttpService.request("getOneThing", { id: info.id }, (fetchResult, fetchError, status) => {
        // console.log(status)
        if (fetchError) { if (cb) { cb(null, fetchError.message, status) }; return }
        if (cb) { cb(fetchResult, null, status) }
    })
}



function phoneStandardView(number) {
    let phone = number
    if (number) {
        if (number.includes('-')) {
            phone = number.substring(4, number.length)
        }
        let counter = 0
        while (number[counter] === "0") {
            counter++
        }

        phone = phone.substring(counter, number.length)
        return phone
    }
}



let numbers = { '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹' }

function converNumberToPersian(number) {
    if (number != null) {
        let numberArray = String(number).split('')
        numberArray.forEach((element, index) => {
            if (numbers[element]) {
                numberArray[index] = numbers[element]
            }
        });
        return numberArray.join('')

    }
}


function priceStandardView(priceRef) {
    if (priceRef) {

        let priceArray = String(priceRef).split('')
        let price = ''
            // let j = 0
        for (let i = 0; i < priceArray.length; i++) {
            let element = priceArray[priceArray.length - 1 - i];
            // j++
            price = element + price
                // console.log(price)
            if ((i + 1) % 3 === 0 && i !== priceArray.length - 1) {
                price = ',' + price
            }
            // console.log(price)

        }
        if (price == null) {
            price = 0
        }
        return price

    }
}

function conditionalWidth(rawWidth, media, config) {

    let output = media?.xs

    let defaults = {
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576,
        xs: 0
    }

    // let width = '100%'
    // let display = 'block'

    let minWidth = 0

    if (media) {
        for (const [key, value] of Object.entries(media)) {
            let thisWidth = 0
            if (Number(key)) {
                thisWidth = Number(key)
            } else {
                thisWidth = defaults[key] ?? 0
            }


            if (thisWidth >= minWidth && thisWidth <= rawWidth) {
                minWidth = thisWidth
                output = value
            }
        }
    }


    // console.log(output)

    return output
    // if (!width.includes('%') && !width.includes('px') && Number(width)) {
    //     if (Number(width) <= 12) {
    //         width = String(((Number(width) / 12) * 100) + '%')
    //     }
    // }

    // if (width == 'none') {
    //     display = 'none'
    //     width = 0
    // }



    // if (width != rawWidth) {
    //     this.setState({ width })
    // }
    // if (display != this.state.display) {
    //     this.setState({ display })
    // }
}

function setObject(data, key, value, append, index) {
    // console.log(key)
    // console.log(value)
    // console.log(data)
    if (!data) data = {}

    // if(key)

    if (key && key.includes('.')) {

        // if(key.includes("["))
        let pList = key.split('.');
        let newKey = [...pList]

        pList = pList[0]
        newKey.splice(0, 1)
        newKey = newKey.join('.')
        let newData
        if (pList.includes('[')) {
            let conditions = /\[(.*?)\]/.exec(pList)
            if (conditions) {
                let condition = conditions[1]
                let tempKey = pList.replace(conditions[0], '')
                pList = tempKey
                if (Array.isArray(data[tempKey])) {
                    let arrayIndex = extactArrayElementWithCondition(data[tempKey], condition)
                    if (arrayIndex != null) {
                        data[pList][arrayIndex] = setObject(data[pList][arrayIndex], newKey, value, index)
                    }
                }
            }
        } else {

            // if (pList.includes('*')) {
            //     let keyValue = pList.split('*')
            //     newData = data[keyValue[1]][keyValue[0]]
            //     console.log(newData)
            // } else {
            newData = data[pList]
            data[pList] = setObject(newData, newKey, value, index)
                // }


        }

        return data

    } else {
        if (key.includes('~')) {
            // console.log('~~~~~~~')

            // console.log("******")
            let valueIndex = key.split('~')
                // console.log(data)
                // console.log(valueIndex)
                // console.log(data[valueIndex[0]][valueIndex[1]])
            if (data[valueIndex[0]]) {
                data[valueIndex[0]][valueIndex[1]] = value
            } else {
                data[key] = value
            }

        } else {

            if (append) {
                // console.log("APPLED")
                // console.log(key)
                if (append == 'object') {

                    for (const [nkey, nvalue] of Object.entries(value)) {
                        // console.log(nkey)
                        // console.log(nvalue)
                        if (!data[key]) {
                            data[key] = {}
                        }
                        data[key][nkey] = nvalue
                    }

                } else {

                    data[key] = data[key] ? data[key] : []
                    if (Array.isArray(value)) {
                        data[key] = [...data[key], ...value]
                    } else {


                        data[key] = [...data[key], value]
                    }
                }
            } else {
                if (index != null) {

                    data[index][key] = value
                } else {
                    data[key] = value
                }
                // console.log(key)
                // console.log(value)

            }
        }
        return data

    }

}


function extactArrayElementWithCondition(data, rawCondition) {
    let result
    let regex = /\*(.*?)\*/

    let condition = rawCondition.match(regex)[1]
    if (condition) {
        let sides = rawCondition.split(rawCondition.match(regex)[0])
        data.forEach((element, index) => {
            if (element[sides[0]] == sides[1]) {
                result = index
            }
        });
    }
    return result

}


// function setObject(data, key, value, append, index) {

//     if (!data) data = {}
//     if (key && key.includes('.')) {

//         // if(key.includes("["))
//         let pList = key.split('.');
//         let newKey = [...pList]
//         newKey.splice(0, 1)
//         newKey = newKey.join('.')
//         data[pList[0]] = setObject(data[pList[0]], newKey, value)
//         return data

//     } else {
//         if (append) {
//             data[key] = data[key] ? data[key] : []
//             if (Array.isArray(value)) {
//                 data[key] = [...data[key], ...value]
//             } else {
//                 data[key] = [...data[key], value]
//             }
//         } else {
//             if (index != null) {
//                 data[index][key] = value
//             } else {
//                 data[key] = value
//             }
//         }
//         return data
//     }

// }
function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}


function getObject(data, key, splitLevel, level, index) {


    if (data && key) {

        if (key.includes('.') && (splitLevel == null || level == null || splitLevel > (level ? level : 0))) {
            let pList = key.split('.');
            let newKey = [...pList]
            newKey.splice(0, 1).join('.')
            newKey = newKey.join('.')
            return getObject(data[pList[0]], newKey, splitLevel, level ? level + 1 : 1, index)

        } else {

            return data[key]
        }
    } else {
        return null
    }
}


function capitalLetter(text) {
    if (text) {
        let words = text.split(' ')
        let newWords = []
        words.forEach((word, index) => {
            let newWord = word
            newWord = newWord.substr(0, 1).toUpperCase() + newWord.substr(1)
            newWords.push(newWord)
        });
        return newWords.join(' ')
    }
}

function chooseWallpaper(data) {
    // console.log(data)
    if ((data && data[0] && data[0].values && data[0].values.image)) {
        let image = Array.isArray(data[0].values.image) ? data[0].values.image[0] : data[0].values.image
        return siteConfig.assetsDomain + '/images/' + image.address
    }
    // return "/images/cover2.jpeg"
    // return "/images/cover.jpg"

}



function fetchWallpaper(page, options, cb) {
    console.log(page)
    HttpService.request('getValuesWithData', { applet: 'wallpapers', filter: { 'values.page': page } }, (fetchResult, fetchError) => {
        console.log(fetchResult)
        if (fetchError) { cb(null, fetchError) }
        if (fetchResult && fetchResult.info) {
            console.log(fetchResult)
            let wallpaper = Array.isArray(fetchResult.info) ? fetchResult.info[0] : fetchResult.info

            wallpaper = imageAddress(wallpaper.values.image)
            cb(wallpaper, fetchError)
        }
    })
}



function togglePin(data, options, cb) {

    HttpService.request('togglePin', data, (fetchResult, fetchError) => {
        console.log(fetchResult)
        if (fetchError) { cb(null, fetchError) }

        cb(fetchResult.pinned)

    })
}


function filterLabelCreator(rawprop) {
    let prop = JSON.parse(JSON.stringify(rawprop))
        // console.log(prop)
    let isArray = false
    if (Array.isArray(prop.value)) {
        isArray = true
    }

    // let label
    let value = prop.value
    if (prop.type == 'PhoneInput') {
        value = phoneStandardView(value)
    }


    if (prop.dictionary) {

        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const element = value[i];
                if (prop.dictionary[element]) {
                    value[i] = prop.dictionary[element]
                }
            }
        } else {
            if (prop.dictionary[value]) {
                value = prop.dictionary[value]
            }
        }
    }

    let label = checkTranslation(prop.label) + ' ' + prop.operator + ' ' + value


    return label
}



function detectBrowser() {
    // Opera 8.0+
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera'
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome'
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari'
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox'
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        return 'IE'
    } else {
        return ''
    }

}










export { msToHMS, getVToken, postWishList, translate, getBoundingClientRect,conditionalWidth, convertToSlug, detectBrowser, togglePin, getOneThing, changeBodyDirection, changeUrlWithLng, currentLng, checkTextTranslation, checkTranslation, pathMaker, imageAddress, getToken, getUserInfo, phoneStandardView, getObject, setObject, capitalLetter, chooseWallpaper, priceStandardView, converNumberToPersian, fetchWallpaper, filterLabelCreator }