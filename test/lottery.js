var Lottery = artifacts.require("./Lottery.sol");

contract('Lottery', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    return Lottery.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });

  // it("should bet correctly", function() {
  //   var meta;
  //   //    Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_Rand = accounts[(Math.floor(Math.random()*9)+1)];
    
  //   });
  // });
});
