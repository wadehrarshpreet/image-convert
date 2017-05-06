# image-convert

convert image to different format like gif2jpg jpg2png also manage the quality & size
supported extensions jpg, png and gif

```
npm install image-convert --save
```
or
```
yarn add image-convert 
```

## Usage

``` js
let imgConvert = require('image-convert');
imgConvert.fromURL({
	url:<url>,
	quality: <quality[0..100]>,
	output_format:<output_format>,
	size: <size{integer}>},function(err,buffer,file){//buffer=> base64 encode, file=> file object
	if(!err)
		console.log(res);//img buffer
})

imgConvert.fromBuffer({
	buffer:<buffer base64>,
	quality: <quality[0..100]>,
	output_format:<output_format>,
	size: <size{integer}>},function(err,buffer,file){//buffer=> base64 encode, file=> file object
	if(!err)
		console.log(res);//img buffer
})

```

## Example

``` js
let imgConvert = require('image-convert');
imgConvert.fromURL({
	url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_(large).gif/200px-Rotating_earth_(large).gif",
	quality: 80,//default 100
	output_format:"jpg",//default jpg
	size: 300//default original
},function(err,buffer,file){
	if(!err)
	{
		console.log(res);//img buffer
		console.log(file);
	}
})


imgConvert.fromBuffer({
    buffer: data:image/jpeg;base64,/9j...,//replace with buffer
    quality: 50, //quality
    output_format: "jpg", //jpg
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
```

jpg2gif and png2gif not available

## License

MIT
