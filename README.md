# 博彩游戏

这个项目用来简单里了解一下Ethereum。

我在ganache-cli中放了十个账户，每个账户有100块，然后可以执行一些基本的交易。每个参与赌博游戏的人将被收取0.1Ether。

游戏将会从block的哈希中算出三个结果，1，2，3。如果一些人选了正确的数字，他们将会瓜分奖金。

## 启动方式

  npm install
  
  #启动ganache
  sh startGanache.sh
  
  #migrate，并启动页面服务器
  sh startServer.sh
  

# Lottery

This project is used for redumental learning of Ethereum.

I set 10 accounts in ganache-li, everyone's balance will be set to 100 so that we can test basic transaction. A person who want to participate this game will be charged fo 0.1 ether. 

There will be 3 result which will be calculated from block's hash mod 3 shown as 1,2,3. If some people choose the right number, they will carve up the bonus.

## startup

  npm install
  
  #start ganache
  sh startGanache.sh
  
  #migrate and serve static pages
  sh startServer
