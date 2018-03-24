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

window.App = {
  start: function() {
    var self = this;

    //设置provider
    Lottery.setProvider(web3.currentProvider);


    //获取账户列表
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

    //绑定事件
    App.bindContractEvents();
  },

  gotoBet:function(currentBet,currentAccount){
    var that=this;
    Lottery.deployed().then(function(instance) {
      instance.gotoBet(currentBet,currentAccount);
    }).then(()=>{
      that.setState('下注成功')
    }).catch(()=>{
      that.setState('下注失败')
    })
  },

  draw:function(){
    var that=this;
    Lottery.deployed().then(function(instance) {
      instance.draw();
    }).then(()=>{
      that.setState('开奖成功')
    }).catch(()=>{
      that.setState('开奖失败')
    })
  },


  setState:function(text){
    d.getElementsByClassName('stateDisplay')[0].innerHTML=text;
  },

  bindContractEvents:function(){
    var that=this;
    Lottery.deployed().then(function(instance) {
      instance.betted().watch(function(error,e){
        var div=d.createElement('div');
        div.innerHTML="玩家"+e.args.better+'下注'+e.args.betNum.toString(10);
        d.getElementsByClassName('participantsList')[0].append(div)
      });

      
      instance.drawn().watch(function(error,event){
        var div=d.createElement('div');
        div.innerHTML="开始下一局-----------------------------------";
        d.getElementsByClassName('participantsList')[0].append(div)

        d.getElementsByClassName('drawInfo')[0].innerHTML="开奖人:"+event.args.drawer+
        "  中奖人数:"+event.args.numOfWinners.toString(10)+
        "  中奖号码:"+event.args.winnerNum.toString(10)
      });
    }).then(()=>{
      that.setState('绑定事件成功')
    }).catch(()=>{
      that.setState('绑定事件失败')
    })
  }
};

window.addEventListener('load', function() {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    App.start();
    Lottery.web3.eth.defaultAccount=Lottery.web3.eth.coinbase
    //投注
    d.getElementsByClassName('ensureBet')[0].onclick=function(){
      var currentAccount=d.getElementsByClassName('accountsSelect')[0].value;
      var currentBet=d.getElementsByClassName('betSelect')[0].value;
      App.gotoBet(currentBet,currentAccount)
    }

    //开奖
    d.getElementsByClassName('draw')[0].onclick=function(){
      App.draw()
    }
});
