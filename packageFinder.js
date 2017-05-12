const builder = require('botbuilder');
const searchHelper = require('./searchHelper.js');
const messageHelper = require('./messageHelper.js');
const locationHelper = require('./locationHelper.js');

module.exports = {
    id: 'packageSearch',
    title: 'Package Search',
    dialog: [
        (session) => {
            //Prompt for string input
            builder.Prompts.text(session, 'Whose Package are you searching for?');
        },
        (session, results) => {
            //Sets name equal to resulting input
            const keyword = results.response;

            searchHelper.searchQuery(keyword, (err, result) => {
                if (err) {
                    console.log(`Search query failed with ${err}`);
                    session.endConversation(`Sorry, I had an error when talking to the server.`);
                } else if (result) {
                    console.log(`Search query failed with ${result}`);
                    const message = messageHelper.getPackageCarousel(session, result);
                    session.endConversation(message);
                    //get location from result and send a map to the user session
                    //const location = locationHelper.getLocationCarousel(session, result);
                }
                session.reset('/');
            });

            
        }
    ]
}
