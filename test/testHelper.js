import jq from 'jquery'
import ReactTestUtils from 'react-dom/test-utils'
import jsdom from 'jsdom'
import chai, { expect } from 'chai'
import chaiJquery from 'chai-jquery'
require('console.table')
require("babel-core/register")({
    // Ignore everything in node_modules except node_modules/rcomponents.
    ignore: /node_modules\/(?!lodash-es)/
})

// Global prerequisites to make it work in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = global.document.defaultView

// i18next: to avoid 't' not defined issue
global.mockT = function(key, options) { return key }
const $ = jq(window)

// Set up chai-jquery
chaiJquery(chai, chai.util, $)

// more assertions
chai.use(require('chai-stats'))
chai.use(require('chai-string'))

// Helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value)
  }
  ReactTestUtils.Simulate[eventName](this[0])
}

export { expect }
