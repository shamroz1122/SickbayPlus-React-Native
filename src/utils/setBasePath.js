import axios from "axios";

const setBasePath = () => {

        axios.defaults.baseURL = 'https://shm.ranksol.com/sickbay/api/'
    
}

export default setBasePath;