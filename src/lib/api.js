import axios from 'axios';

export const getAPOD = (date = '') => {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=5FU3LEFp5f4h0vbKJNrq0QMPTMbRqhD6QfBn8MV6&date=${date}`);
}