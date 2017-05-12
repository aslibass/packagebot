const builder = require('botbuilder');
var testimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Suit.jpg/367px-Suit.jpg";
module.exports = {
    getPackageCarousel: (session, items) => {
        // results found
        var message = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
        items.forEach((package) => {
            // custom card for packages
            // update with your specific fields for output
           console.log(`query result ${package.imageURL}`);
            message.addAttachment(
                new builder.HeroCard(session)
                    .title("Delivery for " + package.Name)
                    .subtitle("Package: " + package.Package + " | " + 
                                "Status: " + package.Status  + " | Score: " + package['@search.score'])
                    .text(package.Description)
                    .images([builder.CardImage.create(session, testimg)])
                    //.images([builder.CardImage.create(session, package.imageURL)])
            );
        })
        return message;
    }
}