/**
 * 游戏初始化
 * @returns 
 */
window.DDL_FetchInit = function () {
  const result = {
    code: 1, //1成功，0失败
    msg: "获取数据失败，请刷新页面", // 失败提示信息
    userStarsTotal: 0, // 活动星星总值
    userTodayStars: 0,  // 当日已获得星愿值
    luckFloorNum: 7, // 触发幸运星的层数，每多少层触发
    luckStarNum: 66, // 获得幸运星数量
  };
  console.log("gameDataInit......", result.code === 1 ? "初始化完成" : "初始化失败");
  return result;
};

/**
 * 获取星愿值
 * @returns 
 */
window.DDL_FetchGetStar = function () {
  const result = {
    code: 1, // 1成功，0失败
    msg: "", // 失败提示信息
  };
  console.log("luckData......", result.code);
  return result;
};

/**
 * 游戏结束提交
 * @param {*} gameData 
 * @returns 
 */
window.DDL_FetchSubmit = function (gameData) {
  console.log("游戏结束：", gameData);
  // debugger
  const result = {
    code: 1, // 1成功，0失败
    msg: "传送数据失败，请刷新页面", // 失败提示信息
  };
  console.log("gameEnd......", result.code);
  return result;
};