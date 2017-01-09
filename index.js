// Copyright 2016 Arshpreet Wadehra
//
//
const image = require('images');
const request = require('request').defaults({ encoding: null });

module.exports = {
  fromURL : (url,size,callback)=>{
    let img = url;
    try{
    request.get(img, function (err, res, body) {
        var buffer = image(body).size(size).encode("jpg");
        callback(null,buffer);
    });
    }
    catch(e){
      callback(e.message,null);
    }
  }
}
