let response = await request(arguments.callee.name.toString())
    console.log(`第${times}次遛狗完成: ${JSON.stringify(response)}`);
    resultCode = response.resultCode;
    if (resultCode == 0) {
      let sportRevardResult = await request('getSportReward');
      console.log(`领取遛狗奖励完成: ${JSON.stringify(sportRevardResult)}`);
      } else if (resultCode == 1013) {
      let sportRevardResult = await request('getSportReward', {"version":1});
      console.log(`领取遛狗奖励完成: ${JSON.stringify(sportRevardResult)}`);
      if (sportRevardResult.resultCode == 0) resultCode = 0
    }
    times++;
  } while (resultCode == 0 && code == 0)
  if (times > 1) {
  }
}


// 三餐签到, 每天三段签到时间
async function threeMealInitFun() {
  console.log('准备三餐签到');
  const response = await request("getThreeMealReward");
  console.log(`三餐签到结果: ${JSON.stringify(response)}`);
  if (response.code === '0' && response.resultCode === '0') {
    console.log(`【定时领狗粮】获得${response.result.threeMealReward}g\n`);
  } else {
    console.log(`【定时领狗粮】${response.message}\n`);
  }
}




      else {
        console.log("目前剩余狗粮：【" + foodAmount + "】g,不再继续投食,保留部分狗粮用于完成第二天任务");
        subTitle = $.petInfo.goodsInfo && $.petInfo.goodsInfo.goodsName;
      }
    } else {
      console.log(`初始化萌宠失败:  ${JSON.stringify($.petInfo)}`);
    }
  }


  console.log('喂狗粮任务开始...');
  let finishedTimes = $.taskInfo.feedReachInit.hadFeedAmount / 10; //已经喂养了几次
  let needFeedTimes = 10 - finishedTimes; //还需要几次
  let tryTimes = 20; //尝试次数
  do {
    console.log(`还需要投喂${needFeedTimes}次`);
    const response = await request('feedPets');
    console.log(`本次投喂结果: ${JSON.stringify(response)}`);
    if (response.resultCode == 0 && response.code == 0) {
      needFeedTimes--;
    }
    if (response.resultCode == 3003 && response.code == 0) {
      console.log('剩余狗粮不足, 投喂结束');
      needFeedTimes = 0;
    }
    tryTimes--;
  } while (needFeedTimes > 0 && tryTimes > 0)
  console.log('投喂任务结束...\n');
}





  // 每日签到, 每天一次
async function signInitFun() {
  console.log('准备每日签到');
  const response = await request("getSignReward");
  console.log(`每日签到结果: ${JSON.stringify(response)}`);
  if (response.code === '0' && response.resultCode === '0') {
    console.log(`【每日签到成功】奖励${response.result.signReward}g狗粮\n`);
  } else {
    console.log(`【每日签到】${response.message}\n`);
  }
}


//收取营养液
if (plantBeanRound.bubbleInfos && plantBeanRound.bubbleInfos.length) console.log(`开始收取营养液`)
for (let bubbleInfo of plantBeanRound.bubbleInfos) {
  console.log(`收取-${bubbleInfo.name}-的营养液`)
  await cultureBean(plantBeanRound.roundId, bubbleInfo.nutrientsType)
  console.log(`收取营养液结果:${JSON.stringify($.cultureBeanRes)}`)
}
}