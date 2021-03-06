/**
 * Disallows space before `()` in call expressions.
 *
 * Type: `Boolean`
 *
 * Value: `true`
 *
 * #### Example
 *
 * ```js
 * "disallowSpacesInCallExpression": true
 * ```
 *
 * ##### Valid
 *
 * ```js
 * var x = foobar();
 * ```
 *
 * ##### Invalid
 *
 * ```js
 * var x = foobar ();
 * ```
 */

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(options) {
        assert(
            options === true,
            this.getOptionName() + ' option requires a true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'disallowSpacesInCallExpression';
    },

    check: function(file, errors) {
        file.iterateNodesByType(['CallExpression', 'NewExpression'], function(node) {

            var lastCalleeToken = file.getLastNodeToken(node.callee);
            var roundBraceToken = file.findNextToken(lastCalleeToken, 'Punctuator', '(');

            if (node.type === 'NewExpression' && roundBraceToken === undefined) {
                return;
            }

            errors.assert.noWhitespaceBetween({
                token: file.getPrevToken(roundBraceToken),
                nextToken: roundBraceToken,
                message: 'Illegal space before opening round brace'
            });
        });
    }
};
