const utils = require('../../../transformations/utils');
/*
safeTraverse,
createProperty,
findPluginsByName,
findPluginsRootNodes,
createOrUpdatePluginByName,
findVariableToPlugin,
isType,
createLiteral,
findObjWithOneOfKeys,
getRequire
*/

module.exports = function(j, ast, webpackProperties) {
	function createAMDProperty(p) {
		if(p.parent.value.type === 'AssignmentExpression') {
			p.value.properties.push(utils.createProperty(j, 'amd', null));
			p.value.properties.filter(node => node.key.value === 'amd').forEach( (prop) => {
				prop.value.type = 'ObjectExpression';
				prop.value.properties = [];
				Object.keys(webpackProperties.amd).forEach( (webpackProp) => {
					prop.value.properties.push(
						utils.createProperty(j, webpackProp, webpackProperties.amd[webpackProp])
					);
				});
			});
		}
	}
	if(webpackProperties['amd'] && typeof(webpackProperties['amd']) === 'object') {
		return ast.find(j.ObjectExpression).filter(p => createAMDProperty(p));
	} else {
		return ast;
	}
};