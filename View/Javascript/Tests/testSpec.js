describe('DTtest', function(){

  var Social;
  
  
  
  beforeEach(function(){
    angular.mock.module('GamingGen');
    Social = {};
    // angular.mock.inject(function(_Socket_) {
    //   Social = _Socket_;
    // });
  });

  it("Should have a on method", function(){
    expect(Social).to.be.a('object');
  });
  
});