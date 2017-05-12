const builder = require('botbuilder');
var locationDialog = require('botbuilder-location');

module.exports = {
    getLocationCarousel: (session, items, locationDialog) => {
        // results found
       var message = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
        items.forEach((package) => {
            // custom card for packages
            // update with your specific fields for output
           message.addAttachment(new builder.HeroCard(session).title("Delivery for " + package.Location));
           console.log(`location result ${package.Location}`);
           locationDialog.getLocation(session, 
           {
                prompt: "Where shall i ship your package?"
           }); 

        
        })
        return message;
    }
}