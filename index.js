var fs = require('fs');
var esprima = require('esprima');
var ew = require('esprima-walk');

var dRgx = /(xd)?describe/;
var iRgx = /(xi)?it/;

var parseJsFile = function(testFilePath, cb) {
	fs.readFile(testFilePath, function(err, data) {
		if (err) { return cb(err); }

		var results = [];
		
		var code = data.toString();
		ast = esprima.parse(code, {loc:true});

		var isRelevantFnName = function(fn) {
			return	fn === 'beforeEach' ||
				fn === 'afterEach' ||
				dRgx.test(fn) ||
				iRgx.test(fn);
		};

		var onNode = function(node) {
			if (node.type !== 'CallExpression') { return; }
			if (!node.callee || !node.callee.name) { return; }
			var n = node.callee.name;
			if (!isRelevantFnName(n)) { return; }
			var s = node.loc.start;
			var l = node.arguments[0].value || '';
			results.push({
				line   : s.line,
				column : s.column,
				type   : n,
				label  : l
			});
		};
		
		ew.walk(ast, onNode);

		cb(results);
	});
};

module.exports = parseJsFile;
