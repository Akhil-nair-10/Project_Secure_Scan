const FormData = require('form-data');
const axios = require('axios');

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
          console.log(err.message);
          res.status(500).send('VirusTotal API request failed');
        }
    
}
//This is the controller function that handles the request to fetch scan results based on the scan id
async function getScanResults(req, res) {
    try{
        const analysisId = req.params.id;
        const response = await axios.get(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: {
              'x-apikey': process.env.VT_API_KEY
            }
          }
        );
        res.json(response.data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Failed to fetch analysis results');
      }
}

module.exports = {
    scanFile,
    getScanResults
};