import axiousInstance from './axiousInstance'

const apiServices = async (httpMethod, url, reqBody) => {
    const reqconfig = {
        method: httpMethod,
        url,
        data: reqBody
    }

    try {
        const response = await axiousInstance(reqconfig)
        return response
    } catch (err) {
        throw err
    }
}

export default apiServices