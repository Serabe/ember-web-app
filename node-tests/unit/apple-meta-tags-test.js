/* jshint node: true */
'use strict';

var assert = require('assert');
var appleMetaTags = require('../../lib/apple-meta-tags');

describe('Unit: appleMetaTags()', function() {
  it('returns `web-app-capable` meta tag', function() {
    var manifest = {};
    var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-title` meta tag', function() {
    var manifest = { name: 'foo bar' };
    var expected = '<meta name="apple-mobile-web-app-title" content="foo bar">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it("doesn't include `web-app-title` when manifest.name is not defined", function() {
    var manifest = {};
    var notExpected = 'apple-mobile-web-app-title';

    var actual = JSON.stringify(appleMetaTags(manifest));

    assert.ok(!actual.includes(notExpected));
  });

  it('returns `web-app-status-bar-style` meta tag with default value', function() {
    var manifest = {};
    var expected = '<meta name="apple-mobile-web-app-status-bar-style" content="default">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-status-bar-style` meta tag with custom value', function() {
    var manifest = {
      apple: {
        statusBarStyle: 'black-translucent'
      }
    };
    var expected = '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });
});
