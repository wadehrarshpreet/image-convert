# image-convert

Convert Gif to Static JPG

	npm install image-convert


## Usage

``` js
let imgConvert = require('image-convert').fromURL;
imgConvert(<url>,<quality[0..100]>,<output_format>,<size{integer}>,function(err,res){
	if(!err)
		console.log(res);//img buffer
})

```

## License

MIT
