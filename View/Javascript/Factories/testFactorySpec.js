describe('testFactory', function() {

  var Socket;
  
  beforeEach(function(){
    angular.mock.module('SocketF');
    angular.mock.inject(function(_socket_) {
      Socket = _socket_;
    });
  });
  
  describe('testSocket.IO', function() {
    it("Should have a on method", function() {
      expect(Socket.on).to.be.a('function');
    });
  
    it("Should have a emit method", function() {
      expect(Socket.emit).to.be.a('function');
    });
  });
  
  describe('testHttpBuffer', function() {
  });
});