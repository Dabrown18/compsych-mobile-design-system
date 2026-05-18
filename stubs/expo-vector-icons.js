// Stub for @expo/vector-icons — not available in web gallery
const React = require('react');
const noop = () => null;
module.exports = new Proxy({}, {
  get(_, key) {
    if (key === '__esModule') return true;
    if (key === 'default') return noop;
    return noop;
  }
});
