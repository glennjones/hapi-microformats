


An API to parse mircoformats. This is a [HAPI](https://github.com/spumko/hapi/) wrap of [microformat-node](https://github.com/glennjones/microformat-node) project. 



## Errors

The error format can have any combination of 4 properties; code, error, message and validation. The fourth property validation, is added if a input value is in the incorrect format. 
    
    {
      "statusCode": 400,
  		"error": "Bad Request",
  		"message": "the value of html must be a string",
  		"validation": {
    		"source": "path",
    		"keys": [
      		"html"
    		]
  		}
	}







