pragma solidity ^0.4.17;


//这是一个掷骰子游戏，每个人
contract Lottery{
  //门票
  uint public ticketPriace;

  //开始时间
  uint public startTime;

  //掷骰子游戏，可能出现的情况
  uint public bound;

  //下注时间和等待时间
  uint public gameTime;

  //map用来存储参与的人
  mapping(uint => address[]) public peoples;
  mapping(address => bool) public peoplesRecord;


  //两个事件方便显示
  // Events
  event drawn(address drawer, uint winnerNum, uint numOfWinners);
  event betted(address better, uint betNum);

  //构造函数
  function Lottery(){
    ticketPriace=0.1 ether;
    startTime= now;
    bound=6;
    //
    Clear();
  }

  //清空下注
  function Clear(){
    for(uint i=0;i<bound;i++){
      peoples[i]=new address[];
    }
    peoplesRecord=new address[];
  }

  //下注
  function makeBet(uint betNum,address gambler){
    //验证betNum合法性
    require(betNum>=0&&betNum<6);
    //确认在下注时间内
    if((now-startTime)>gameTime)throw;
    //下注，并做记录
    if(peoplesRecord[gambler]==false){
      peoples[betNum].push(gambler);
      peoplesRecord[gambler]=true;  
      betted(msg.sender,betNum)
    }
  }

  //开奖
  function draw() payable public{
    var resNum=uint256(block.blockhash(block.number-1))%bound;
    //去一部分作为奖金，并进行发奖
    var totalPrize=this.balance * 3 / 4;
    var winners=peoples[resNum]
    if(winners.length>0){
      finalPrize=totalPrize / winners.length;
      for(uint i=0;i<winners.length;i++){
        if(!winners[i].send(finalPrize)) throw;
      }
    }

    //clear
    clear();
    drawn(msg.sender,resNum,winners.length);
  }


}