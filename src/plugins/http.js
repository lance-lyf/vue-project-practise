import axios from 'axios'
const myHttpServer = {}
myHttpServer.install = function (Vue) {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    Vue.prototype.$http = axios
}
export default myHttpServer