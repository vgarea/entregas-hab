import config from './config.js'

const axios = require('axios').default;


const apiKey = config.apiKey
const BASE_URL = 'https://ws.audioscrobbler.com/'
const URL_GEO = '2.0/?method=geo.gettopartists&country=spain&api_key='+apiKey+'&format=json'
const URL_GEO2 = '/2.0/?method=geo.gettoptracks&country=spain&api_key='+apiKey+'&format=json'
const URL_TAGS = '/2.0/?method=chart.gettoptags&api_key='+apiKey+'&format=json'

/*
function getArtists(){
    axios.get(`${BASE_URL}${URL_GEO}`)
    .then(function (response){
        //handle success
    })
    .catch(function (erro) {
        //handle error
        console.log(error);
    })
}
*/
async function getArtists() {
    try {
        const responseArtists = await axios.get(`${BASE_URL}${URL_GEO}`);
        console.log(responseArtists);
        return (responseArtists);
    } catch (error){
        console.log(error);
    }
}

async function getTopTracks() {
    try {
        const responseTracks = await axios.get(`${BASE_URL}${URL_GEO2}`);
        console.log(responseTracks);
        return (responseTracks);
    } catch (error){
        console.log(error);
    }
}

async function getTopTags() {
    try {
        const responseTags = await axios.get(`${BASE_URL}${URL_TAGS}`);
        console.log(responseTags);
        return (responseTags);
    } catch (error){
        console.log(error);
    }
}

export default {
    getArtists,
    getTopTags,
    getTopTracks
}