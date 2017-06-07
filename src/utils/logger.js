/* eslint-disable no-console */
const TAG = '[Gear List Chart] '

function warn(msg, ...args) {
  _call('warn', msg, ...args)
}

function error(msg, ...args) {
  _call('error', msg, ...args)
}

function info(msg, ...args) {
  _call('info', msg, ...args)
}

function log(msg, ...args) {
  _call('log', msg, ...args)
}

function _call(name, msg, ...args) {
  if (typeof msg === 'string') {
    console[name](TAG + msg, ...args)
  } else {
    console[name](TAG)
    console[name](msg)
  }
}

export { error, warn, info, log }