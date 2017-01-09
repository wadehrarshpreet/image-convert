// Copyright 2016 Arshpreet Wadehra
//
//
const image = require('images');
const request = require('request').defaults({ encoding: null });

module.exports = {
  fromURL : (options, callback)=>{
    let {url, quality,output_format,size} = options;
    if(url == undefined)
      callback("No URL FOUND",null);
    if(quality == undefined)
      quality = 100
    if(output_format == undefined)
      output_format = "jpg"
    try{
      request.get(url, function (err, res, body) {
          var img = image(body);
          var buffer;
          if(size ==undefined || size == "original")//original size
            buffer = image(body).encode(output_format,{quality:quality});
          else
            buffer = image(body).size(size).encode(output_format,{quality:quality});
          callback(null,buffer);
      });
    }
    catch(e){
      callback(e.message,null);
    }
  }
}
