const request = require('request');
const conf = require('./config.js')
var AZURE_SEARCH_NAME = "vjpackagesearch";
var AZURE_INDEX_NAME = "temp";
var AZURE_SEARCH_KEY = "A76FC746FEA3B4E1E3FECA8DF94E97B2";
    
//queryString = 'https://' + searchName + '.search.windows.net/indexes/' + indexName + '/docs?api-key=' + searchKey + '&api-version=2015-02-28&';
const rootQueryString = `https://${AZURE_SEARCH_NAME}.search.windows.net/indexes/${AZURE_INDEX_NAME}/docs?api-key=${AZURE_SEARCH_KEY}&api-version=2016-09-01`
console.log('rootQuery: '+rootQueryString);
module.exports = {
    searchQuery: (keyword, callback) => {
        const queryString = `${rootQueryString}&search=${keyword}`;
        console.log('Query String: '+rootQueryString);
        request(queryString, (error, response, body) => {
            if(error) {
                callback(error, null);
            } else {
                const result = JSON.parse(body);
                if(result && result.value) {
                    callback(null, result.value);
                } else {
                    callback(null, null);
                }
            }
        });
    }
}