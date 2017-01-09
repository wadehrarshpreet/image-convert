# image-convert

Convert Gif to Static JPG

	npm install image-convert


## Usage

``` js
let imgConvert = require('image-convert').fromURL;
imgConvert({
	url:<url>,
	quality: <quality[0..100]>,
	output_format:<output_format>,
	size: <size{integer}>},function(err,res){
	if(!err)
		console.log(res);//img buffer
})

```

## Example

``` js
let imgConvert = require('image-convert').fromURL;
imgConvert({
	url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_(large).gif/200px-Rotating_earth_(large).gif",
	quality: 100,//quality
	output_format:"jpg",//jpg
	size: "original"//defualt
},function(err,res){
	if(!err)
		console.log(res);//img buffer
})

```

## License

MIT
