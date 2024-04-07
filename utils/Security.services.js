class Security {

    hashData = (params, api, cb) => {
        // cb(JSON.stringify(data))
        cb({ route: api.route, content: params })
    }

    notHashData = (params, api, cb) => {
        // cb(JSON.stringify(data))
        cb(params)
    }

}

export default Security