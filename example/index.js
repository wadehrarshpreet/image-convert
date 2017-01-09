const app = require('express')();
const imgConvert = require('image-convert');
//accept url as query parameter
app.get('/convert', function(req, res) {
    if (req.query.url != undefined)
        img = req.query.url;
    imgConvert.fromURL({
        url: img,
        quality: 50, //quality
        output_format: "png", //jpg
        size: "original" //defualt
    }, function(err, response, file) {
        if (!err) {
            console.log(file);
            res.end(response);
        } else {
            res.json({
                "Error": err.message
            })
        }
    });
});
app.listen(3000, function() {
    console.log("Meet me @3k");
});
