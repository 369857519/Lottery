pragma solidity ^0.4.17;


//这是一个掷骰子游戏，每个人
contract Lottery{
  //门票
  uint public ticketPrice;

  //掷骰子游戏，可能出现的情况
  uint public bound;

  //map用来存储参与的人
  mapping(uint => address[]) public peoples;
  mapping(uint => uint) public lengthOfOneBet;



  //两个事件方便显示
  // Events
  event drawn(address drawer, uint winnerNum, uint numOfWinners);
  event betted(address better, uint betNum);
  event Print(uint value,uint price);

  //构造函数
  function Lottery() public{
    ticketPrice=0.1 ether;
    bound=3;
    //初始化数组
    clear();
  }

  //清空下注
  function clear() public{
    for(uint i=0;i<=bound;i++){
      lengthOfOneBet[i]=0;
    }
  }

  //下注
  function gotoBet(uint betNum) payable public{
    //验证betNum合法性
    require(betNum>0&&betNum<4);
    // //下注，并做记录
    require(msg.value == ticketPrice);
    Print(msg.value,ticketPrice);
    //查看现在的参与者
    var gambler=msg.sender;
    // //如果数组满了，就push进新的元素
    if(peoples[betNum].length==lengthOfOneBet[betNum]||peoples[betNum].length==0){
      peoples[betNum].push(gambler);
    }else{
      peoples[betNum][lengthOfOneBet[betNum]]=gambler;
    }
    lengthOfOneBet[betNum]++;
    //触发一下事件
    betted(gambler,betNum);
  }

  //开奖
  function draw() public{
    uint resNum=uint256(block.blockhash(block.number-1))%bound+1;
    //去一部分作为奖金，并进行发奖
    var totalPrize=this.balance * 4 / 5;
    var winners=peoples[resNum];
    //判断这个下注中的人数是否大于0
    if(lengthOfOneBet[resNum]>0){
      //算一下奖金
      var finalPrize=totalPrize / lengthOfOneBet[resNum];
      for(uint i=0;i<lengthOfOneBet[resNum];i++){
        require(winners[i].send(finalPrize));
      }
    }
    drawn(msg.sender,resNum,lengthOfOneBet[resNum]);
    //clear
    clear();
  }
}