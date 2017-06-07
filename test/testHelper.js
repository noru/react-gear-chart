import jq from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactTestUtils from 'react-dom/test-utils'
import jsdom from 'jsdom'
import chai, { expect } from 'chai'
import chaiJquery from 'chai-jquery'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
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

function mockHistory(component) {
  component.childContextTypes = { history: PropTypes.object }
  component.prototype.getChildContext = () => ({ history: createHistory() })
}

// Helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value)
  }
  ReactTestUtils.Simulate[eventName](this[0])
}

export { mockHistory, expect }
