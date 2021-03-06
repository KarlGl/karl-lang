var lexer = require('./lexer')
var parser = require('./parser')
var compiler = require('./compiler')
var evaluator = require('./evaluator')
var _ = require('../bower_components/lodash/dist/lodash');

exports.functionRunner = function(functions, input) {
    // terminator...
    if (!functions.length) {
        return input;
    }
    try {
        var output = _.first(functions)(input)
    } catch (exception) {
        return exception.message
    }
    return exports.functionRunner(_.rest(functions), output)
}

exports.allFunctions = [
            lexer.lex,
            parser.parse,
            compiler.eval,
            evaluator.eval
        ]

exports.karl = function(input) {
    return exports.functionRunner(
        exports.allFunctions, input)

}

exports.lexer = lexer
exports.compiler = compiler
exports.parser = parser
exports.evaluator = evaluator
