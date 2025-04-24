//nanoid is a library to generate unique IDs , and these IDs are used to create short URLs,
//  and these short URLs are stored in a MongoDB database using Mongoose.

// const { nanoid } = require('nanoid');  // decrease it version to 3 to avoid error
const shortid =  require('shortid');
const URL = require('../models/Url');


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'URL is required'});

    // const shortID = nanoId(8);
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id : shortID,
    });
    // return res.status(201).json({shortId: shortID});

}

async function handleGetUrlAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    if(!result) return res.status(404).json({error: 'URL not found'});
    return res.status(200).json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetUrlAnalytics,
};