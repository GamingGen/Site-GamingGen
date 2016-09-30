describe('Social', function(){

  var Social;

  beforeEach(function(){
    angular.mock.module('GamingGen');
    angular.mock.inject(function(_Social_) {
      Social = _Social_;
    });
  });

    it("Should have a getTwitterCount method", function(){
     expect(Social.getTwitterCount).to.be.a('function');
    });

});