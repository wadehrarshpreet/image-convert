// Copyright 2016 Arshpreet Wadehra
//
//
var image = require('images');
var request = require('request').defaults({
    encoding: null
});
var FileAPI = require('file-api'),
    File = FileAPI.File,
    FileList = FileAPI.FileList,
    FileReader = FileAPI.FileReader;

function GetFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}

function GetFileExtension(url) {
    if (url) {
        var index = url.lastIndexOf(".") + 1;
        return url.substr(index);
    }
}

function dataURLtoFile(dataurl, filename, output_format) {
    var file = new File({
        name: filename + "." + output_format, // required
        type: "image/" + output_format, // optional
        buffer: new Buffer(dataurl, 'base64')
    });
    return file;
}
module.exports = {
    fromURL: function(options, callback) {
        var url = options.url;
        var quality = options.quality;
        var output_format = options.output_format;
        var size = options.size;
        if (url == undefined) callback("No URL FOUND", null, null);
        if (quality == undefined) quality = 100
        if (output_format == undefined) output_format = "jpg"
        var filename = GetFilename(url);
        var extension = GetFileExtension(url);
        if ((extension == "jpg" || extension == "gif" || extension == "png") && (output_format == "jpg" || output_format == "png")) {
            try {
                request.get(url, function(err, res, body) {
                    if (!res) {
                        callback(new Error("Network Error"), null, null)
                        return;
                    }
                    if (res.statusCode != 200) {
                        callback(new Error("Invalid URL"), null, null)
                        return;
                    }
                    var img = image(body);
                    var buffer;
                    if (size == undefined || size == "original") //original size
                        buffer = image(body).encode(output_format, {
                            quality: quality
                        });
                    else buffer = image(body).size(size).encode(output_format, {
                        quality: quality
                    });
                    callback(null, buffer, dataURLtoFile(buffer, filename, output_format));
                });
            } catch (e) {
                callback(e, null, null);
            }
        } else {
            callback(new Error("Unknown File Format"), null, null)
        }
    },
    fromBuffer: function(options, callback) {
        var buf = new Buffer(options.buffer.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var quality = options.quality;
        var output_format = options.output_format;
        var size = options.size;
        if (quality == undefined) quality = 100
        if (output_format == undefined) output_format = "jpg"
        if ((output_format == "jpg" || output_format == "png")) {
            try {
                var img = image(buf);
                var buffer;
                if (size == undefined || size == "original") //original size
                    buffer = img.encode(output_format, {
                        quality: quality
                    });
                else buffer = img.size(size).encode(output_format, {
                    quality: quality
                });
                callback(null, buffer, dataURLtoFile(buffer, new Date().getTime(), output_format));
            } catch (e) {
                callback(e, null, null);
            }
        } else {
            callback(new Error("Unknown File Format"), null, null)
        }
    }
}