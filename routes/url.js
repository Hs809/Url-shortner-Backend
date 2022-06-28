const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');


router.post('/shorten', async (req,res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL')
    


    // Check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Invalid base Url");
    }
 
    // Create url code and Cross checking repetation of Code
    const urlCode = shortid.generate();


    // Check the long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await  Url.findOne({longUrl})
            
            if(url){
                res.send(url);
            }else{
                const shortUrl = baseUrl+ urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save();
                return res.send(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Server Error...")
        }
    }else{
        res.status(401).json("Invalid Long Url")
    }
})


module.exports = router;
