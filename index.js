// Copyright 2016 Arshpreet Wadehra
//
//
const image = require('images');
const request = require('request').defaults({ encoding: null });

module.exports = {
  fromURL : ()=>{
    let quality = 100,output_format="jpg",size=undefined;
    let callback = arguments[arguments.length-1];
    let max_allowed_parameters = 5;
    let min_allowed_parameters = 2;
    if(arguments.length>max_allowed_parameters || arguments.length < min_allowed_parameters)
      arguments[arguments.length-1](new Error("Parameters Mismatch"),null);
    else if(typeof arguments[0] == "function")
      arguments[arguments.length-1](new Error("URL REQUIRED"),null);
    let img = arguments[0];
    if(typeof quality[1] != "function")
      quality = arguments[1];
    if(typeof quality[2] != "function")
      output_format = arguments[2];
    if(typeof quality[3] != "function")
      size = arguments[3];
    try{
      request.get(img, function (err, res, body) {
          var img = image(body);
          var buffer;
          if(size ==undefined)//original size
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
