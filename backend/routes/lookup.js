const express = require('express');
const router = express.Router();
const axios = require('axios').default;
// let Lookup = require('../models/lookup.model');

const whoisApiKey = process.env.WHOIS_API_KEY;
const apiURL = "https://www.whoisxmlapi.com/whoisserver/DNSService?&type=_all&outputFormat=JSON&apiKey=" + whoisApiKey + "&domainName=";

async function getDNSRecords(lookupDomain) {
    const apiCall = apiURL + lookupDomain;
    try {
        const apiResponse = await axios.get(apiCall);
        return apiResponse.data;
    }
    catch (err) {
        console.error(err);
    }
}

router.get('/:hostname', async (req, res) => {
    const responseData = await getDNSRecords(req.params.hostname)
    res.send(responseData);
    console.log(`Received request for ${req.params.hostname}`);
});

module.exports = router;

