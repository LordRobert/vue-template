const ROOT_PATH = 'http://route.showapi.com'

let dataServer = ''

let dataPath = (path) => {
    return dataServer + path
}

export default {
    pm25: dataPath(`${ROOT_PATH}/104-29`)

}
