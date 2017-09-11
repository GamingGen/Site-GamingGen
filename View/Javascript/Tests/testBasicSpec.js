describe('testDEMO', function(){

  var Social;
  
  var count;
  
  beforeEach(function(){
    angular.mock.module('GamingGen');
    Social = {};
  });

  it("Should have a on method", function() {
    expect(Social).to.be.a('object');
  });

  it("Should have a result : 3", function() {
    count = 3;
    expect(count).to.be.equal(3);
  });
  
});