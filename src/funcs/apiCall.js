import axios from 'axios'

// const apiRoot = 'https://api.crepchiefnotify.com/api/v1/'
const apiRoot = 'http://18.170.68.164:8000/api/v1/'
// const testApiRoot = 'http://18.170.68.164:8000/api/v1/'

const get = async (endPoint, jwt, expo) => {

    let url = apiRoot + endPoint

    if (expo === '') {

        return {
            status: "failed",
            error: {
                msg: "Expo token isn't set"
            }
        }
    }

    let result = {
        status: "failed",
    }

    try {
        await axios.get(`${url}?&expotoken=${expo}&jwttoken=${jwt}`).then((res) => {
            result.status = "success"
            result.data = res.data
        })
    }
    catch (e) {
        console.log('URL: ', url)
        result.error = {
            msg: "Failed request",
            data: e
        }
    }

    return result
}

const get2 = async (endPoint, vars) => {

    let url = apiRoot + endPoint + '?'

    for (const key in vars) {
        url = url + `&${key}=${vars[key]}`
    }

    let result = {
        status: "failed",
    }

    try {
        await axios.get(url).then((res) => {
            result.status = "success"
            result.data = res.data
        })
    }
    catch (e) {
        result.error = {
            msg: "Failed request",
            data: e
        }
    }

    return result
}

const post = async (endPoint, data) => {

    let url = apiRoot + endPoint

    let result = {
        status: "failed",
    }

    try {
        await axios.post(url, data).then((res) => {
            if (res.data.length !== undefined) {
                result = {
                    status: "failed",
                    error: {
                        msg: "Failed request",
                        data: res.data.error
                    }
                }
            }
            else {
                result.status = "success"
                result.data = res.data
            }
        })
    }
    catch (e) {
        result.error = {
            msg: "Failed request",
            data: e
        }
    }

    return result
}

export const api = {
    get: get,
    get2: get2,
    post: post
}