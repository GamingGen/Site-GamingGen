describe('testService', function() {

  var SessionService;
  var UserService;
  
  beforeEach(function(){
    angular.mock.module('AuthServices');
    angular.mock.inject(function(_SessionService_, _UserService_) {
      SessionService = _SessionService_;
      UserService = _UserService_;
    });
  });
  
  describe('testAuthService', function() {
    describe('testSessionService', function() {
      it("Should have a setValue method", function() {
        expect(SessionService.setValue).to.be.a('function');
      });
    
      it("Should have a getValue method", function() {
        expect(SessionService.getValue).to.be.a('function');
      });
    
      it("Should have a destroyItem method", function() {
        expect(SessionService.destroyItem).to.be.a('function');
      });
      
      
      it("Should set poney = 'artisanale'", function() {
        var key   = 'poney';
        var value = 'artisanale';
        SessionService.setValue(key, value);
        expect(SessionService.getValue(key)).to.be.equal(value);
      });
      
      it("Should destroy key poney", function() {
        var key   = 'poney';
        var value = 'artisanale';
        SessionService.destroyItem(key);
        expect(SessionService.getValue(key)).to.not.be.equal(value);
      });
    });
    
    describe('testUserService', function() {
      it("Should have a MajCurrentUser method", function() {
        expect(UserService.MajCurrentUser).to.be.a('function');
      });
    
      it("Should have a login method", function() {
        expect(UserService.login).to.be.a('function');
      });
    
      it("Should have a logout method", function() {
        expect(UserService.logout).to.be.a('function');
      });
    
      it("Should have a validate method", function() {
        expect(UserService.validate).to.be.a('function');
      });
    
      it("Should have a currentUser object", function() {
        expect(UserService.currentUser).to.be.a('object');
      });
      
      
      it("Should currentUser have a empty email", function() {
        expect(UserService.currentUser.email).to.be.equal('');
      });
      
      it("Should currentUser have a empty pseudo", function() {
        expect(UserService.currentUser.pseudo).to.be.equal('');
      });
      
      it("Should currentUser have a 0 accessLvl", function() {
        expect(UserService.currentUser.accessLvl).to.be.equal(0);
      });
      
      it("Should currentUser have a empty general", function() {
        expect(UserService.currentUser.general).to.be.equal('');
      });
      
      it("Should currentUser have a empty team", function() {
        expect(UserService.currentUser.team).to.be.equal('');
      });
      
      it("Should currentUser have a currentUser.isLoggedIn = false", function() {
        expect(UserService.currentUser.isLoggedIn).to.be.false;
      });
      
      it("Should currentUser have a currentUser.accessLvl = 999", function() {
        var key   = 'session.access';
        var value = JSON.stringify({desc: 'this is a test', level: 999});
        SessionService.setValue(key, value);
        setTimeout(function() {
          expect(UserService.currentUser.accessLvl).to.be.equal(999);
        }, 0);
        SessionService.destroyItem(key);
      });
    });
  });
  
  describe('testHttpBuffer', function() {
  });
});