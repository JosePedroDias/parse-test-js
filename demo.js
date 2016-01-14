var parseTestJs = require('./index');

var pad = function(n) {
	return new Array(n+1).join(' ');
};

parseTestJs('exampleTestFile.js', function(err, o) {
	if (err) { throw err; }
	
	o.forEach(function(n) {
		console.log([
			pad(n.column),
			'(', n.line, ') ',
			n.type,
			n.label
		].join(''));
	});

	console.log(err, o);
});
