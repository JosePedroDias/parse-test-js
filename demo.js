var parseTestJs = require('./index');

var pad = function(n) {
	return new Array(n+1).join(' ');
};

parseTestJs('exampleTestFile.js', function(err, o) {
	console.log(err, o);
});
