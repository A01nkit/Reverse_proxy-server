const express = require('express')
const router = express.Router()
const needle = require('needle')//Used to send request to 3rd party from server.
const apicache = require('apicache')
// Env variable
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


//Initialize cache
let cache = apicache.middleware


router.get('/', cache('2 minutes'), async (req, res) => {
    //As needle does return a promise. therfore, we use async and await.  url.parse(req.url, true).query is depriciated by node community.
    try {
        //const q = req.url.slice(4);
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE, 
            ...req.query// did, "q" instead
        })
        
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body;
        
        res.status(200).json(data)  
    }
    catch (err) {
        res.status(500).json({err})
    }
             
});


module.exports = router