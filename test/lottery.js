var Lottery = artifacts.require("./Lottery.sol");

contract('Lottery', function(accounts) {
  it("should bet corretly", function() {
    return Lottery.deployed().then(function(instance) {
      var index=parseInt(Math.random()*10)+1;
      var bet=parseInt(Math.random()*3)+1;

      return instance.gotoBet(bet,accounts[index]);
    }).then(function(e) {
      var betNum=e.logs[0].args.betNum.toString(10);
      assert.ok(betNum>0&&betNum<4,'打赌下注不对')
    });
  });
});
