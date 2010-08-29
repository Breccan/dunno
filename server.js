require.paths.push('source/game/engine');
require.paths.push('source/game');
require.paths.push('./');
require('./lib/mootools').apply(GLOBAL);
require('./source/game/main');
require('./client')
require('./web_server')


