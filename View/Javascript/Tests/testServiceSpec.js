describe('DTtest', function(){

  var Social;
  
  beforeEach(function(){
    angular.mock.module('Socket');
    angular.mock.inject(function(_socket_) {
      Social = _socket_;
    });
  });

  it("Should have a on method", function() {
    expect(Social.on).to.be.a('function');
  });
  
});