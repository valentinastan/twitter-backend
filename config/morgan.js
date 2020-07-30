const morgan = require('morgan')
const chalk = require('chalk')

morgan.token('reqParams', function(req, res) {
	return JSON.stringify(req.params);
});

morgan.token('reqBody', function(req, res) {
	return JSON.stringify(req.body);
});

function headersSent (res) {
  return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent
}

const colors = {
  redColor: '#ff5050',
  greenColor: '#2ed573',
  yellowColor: '#ffb142',
}

const morganMiddleware = morgan(function (tokens, req, res) {
    var status = headersSent(res)
      ? res.statusCode
      : undefined

    const statusColor = status >= 400 ? colors.redColor // red
        : status >= 300 ? colors.yellowColor // yellow
          : status >= 200 ? colors.greenColor // green
            : 0 // no color

    const responseTime = parseFloat(tokens['response-time'](req, res))
    const responseTimerColor = responseTime <= 200 ? colors.greenColor
      : responseTime <= 300 ? colors.yellowColor
      : colors.redColor

    return [
        '\n\n\n',
        chalk.hex('#ff4757').bold('🍄  Morgan --> '),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex(statusColor).bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#ff5252').bold(JSON.stringify(req.body)),
        chalk.hex('#ff5252').bold(JSON.stringify(req.params)),
        chalk.hex('#ff5252').bold(JSON.stringify(req.query)),
        chalk.hex(responseTimerColor).bold(responseTime.toString() + ' ms'),
        chalk.hex('#34ace0').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(tokens['remote-addr'](req, res)),
        '\n\n\n',
    ].join(' ');
});

module.exports = morganMiddleware