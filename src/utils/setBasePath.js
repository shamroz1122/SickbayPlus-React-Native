import axios from "axios";

const setBasePath = () => {

        axios.defaults.baseURL = 'https://contactreach.co/dev/api'
    
}
export default setBasePath;