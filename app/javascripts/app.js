// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import lottery_artifacts from '../../build/contracts/Lottery.json'

//小项目临时用dom操作解决一下
var d=document;

//获取Lottery
var Lottery = contract(lottery_artifacts);

//没有写用户系统，先用缓存搞一下
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    //设置provider
    Lottery.setProvider(web3.currentProvider);


    //
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      //列出所有的用户
      var select=d.getElementsByClassName('accountsSelect')[0]
      for(var i=1;i<accounts.length;i++){
        var option=d.createElement('option');
        option.setAttribute('value',accounts[i]);
        option.text=accounts[i];
        select.append(option);
      }
    });
  },

  gotoBet:function(currentBet,currentAccount){
    var that=this;
    Lottery.deployed().then(function(instance) {
      instance.gotoBet(currentBet,currentAccount);
    }).then(()=>{
      alert('请重新选择账号和bet')
      that.setState('交易成功')
    }).catch(()=>{
      that.setState('下注失败')
    })
  },


  setState:function(text){
    d.getElementsByClassName('stateDisplay')[0].innerHtml=text;
  }
};

window.addEventListener('load', function() {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    App.start();
    Lottery.web3.eth.defaultAccount=Lottery.web3.eth.coinbase
    //投注时间
    d.getElementsByClassName('ensureBet')[0].onclick=function(){
      var currentAccount=d.getElementsByClassName('accountsSelect')[0].value;
      var currentBet=d.getElementsByClassName('betSelect')[0].value;
      App.gotoBet(currentBet,currentAccount)
    }
});
