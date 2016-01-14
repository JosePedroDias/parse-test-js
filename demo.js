var parseJsFile = require('./index');

var pad = function(n) {
	return new Array(n+1).join(' ');
};

parseJsFile('exampleTestFile.js', function(err, o) {
	console.log(err, o);
});
