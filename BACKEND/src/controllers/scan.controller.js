const FormData = require('form-data');
const axios = require('axios');
const userModel = require('../models/auth.model');

//This is the controller function that handles the file scanning request and btw it return the scan id only
async function scanFile(req, res) {

     try{
          const formData = new FormData();
    
          formData.append('file', req.file.buffer, req.file.originalname);
    
          const response = await axios.post(
            'https://www.virustotal.com/api/v3/files',
            formData,
            {
              headers: {
                ...formData.getHeaders(),
                'x-apikey': process.env.VT_API_KEY  
              }
            }
          );
          res.json(response.data);
        } catch (err) {
          console.log(err.response?.data || err.message);
          res.status(500).send('VirusTotal API request failed');
        }
    
}
//This is the controller function that handles the request to fetch scan results based on the scan id
async function getScanResults(req, res) {
    try{
        const analysisId = req.params.id;
        const filename = req.query.filename || 'Unknown file';

        const response = await axios.get(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: {
              'x-apikey': process.env.VT_API_KEY
            }
          }
        );

        const analysis = response.data.data.attributes;

        //only record history once VT has finished analyzing, not while its still queued
        if(analysis.status === 'completed'){

            const stats = analysis.stats;
            const verdict = (stats.malicious > 0 || stats.suspicious > 0) ? 'Malicious' : 'Clean';

            //push newest scan and keep only the last 10 (oldest auto-drops off)
            await userModel.findByIdAndUpdate(req.user.id, {
                $push: {
                    scanHistory: {
                        $each: [{ filename, verdict }],
                        $slice: -10
                    }
                }
            });
        }

        res.json(response.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
        res.status(500).send('Failed to fetch analysis results');
      }
}

module.exports = {
    scanFile,
    getScanResults
};