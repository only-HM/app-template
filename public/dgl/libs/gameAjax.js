//游戏结束页，点击【开心收下】按钮跳转的链接
var gameover_okbtn_link = "home.html";

//游戏结束页，点击【返回】按钮跳转的链接
var gameover_backbtn_link = "gamehome.html";

//单日星星收集完成弹窗页，点击【去兑好礼】按钮跳转的链接
var gamemax_excbtn_link = "exchange.html";

//出错提示框，点击关闭时跳转的链接
var errlink = "home.html";
var oneDayMax = 30;//每日最高得分限制

/**
 * 请求获得幸运星数据
 * @param {*} callback 
 */
function sendLuck(callback) {
    /**
     * 向后台加载数据，自行写ajax,然后修改callback(luckData)
     */
    new Promise((resolve) => {
        resolve(window.DDL_FetchGetStar && window.DDL_FetchGetStar());
    }).then((res) => {
        callback(res);
    });
}

/**
 * 获取游戏初始数据
 * @param {*} callback 
 */
function gameDataInit(callback) {
    /**
     * 向后台加载数据，自行写ajax,然后修改callback(gameData)
     */
    new Promise((resolve) => {
        resolve(window.DDL_FetchInit && window.DDL_FetchInit());
    }).then((res) => {
        callback(res);
    });
};

/**
 * 游戏结束时提交得分
 * @param {*} gameData { gameScore：游戏星愿值得分, floorNum：游戏楼层得分 }
 * @param {*} callback 
 */
function sendGameData(gameData, callback) {
    console.log(gameData);
    /**
     * 向后台提交游戏得分，自行写ajax,然后callback(reData)
     */
    new Promise((resolve) => {
        resolve(window.DDL_FetchSubmit && window.DDL_FetchSubmit(gameData));
    }).then((res) => {
        callback(res);
    });
}