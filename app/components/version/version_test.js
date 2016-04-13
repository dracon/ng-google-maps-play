'use strict';

describe('b2vGmap1.version module', function() {
  beforeEach(module('b2vGmap1.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
