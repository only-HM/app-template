AnnieRoot.pf20240801 = AnnieRoot.pf20240801 || {};
var stage, pageRoot, loadingSp, miniLoadingSp, pageCon, soundIcon, loadingNum;
var pageArr = [];
var allPage;
var pageNameArr = ["game", "gamewin", "gamemax", "gametip", "luckstar", "luckdouble"];
var onPageId = "game";
var pageWidth = 800;
var pageHeight = 1250;
var drawCon, inputCon;
var initData, userToken = "", outPageId, drawImgData, initGameData;
var topItemArr = [];
var Encrypt;
pf20240801.Pf20240801 = function () {
	var s = this;
	annie.Sprite.call(s);
	s.loading = null; s.pageCon = null; s.soundbtn = null; s.tip = null;
	annie.initRes(s, "pf20240801", "Pf20240801");
	s.tip.visible = false;
	s.soundbtn.visible = false;
	pageRoot = s;
	loadingSp = pageRoot.loading;
	loadingSp.num_txt.x = 365;
	pageCon = pageRoot.pageCon;
	loadInitData(true);
};
A2xExtend(pf20240801.Pf20240801, annie.Sprite);

function loadInitData(isMainInit) {
	window.gameDataInit(gameDataInitCallback);
}
function gameDataInitCallback(data) {
	if (data.code == 0) {
		tipPlay(data.msg, errCallback);
	} else {
		initGameData = data;
		console.log("初始化数据：", initGameData);
		pageRoot.loadPage();
	}
}
function sendGameDataCallback(data) {
	// debugger
	if (data.code == 0) {
		tipPlay(data.msg, errCallback);
	} else {
		if (initGameData.userTodayStars < oneDayMax) {
			initGameData.userTodayStars = initGameData.userTodayStars + gameScore;
			initGameData.userStarsTotal = initGameData.userStarsTotal + gameScore;
		}
		if (gameEndId == 1) {
			showPop("gamemax", "S");
		} else {
			showPop("gamewin", "S");
		}
	}
}
function errCallback() {
	if (window.errlink) {
		openLink(window.errlink);
	}
}
pf20240801.Pf20240801.prototype.loadPage = function () {
	annie.loadScene("pages", function (per) {
		//加载进度
		var perNum = per;
		perNum = perNum > 100 ? 100 : perNum;
		loadingNum = perNum;
		loadingSp.num_txt.text = perNum + "%";
	}, function (result) {
		if (result.sceneId == result.sceneTotal) {
			allPage = new pages.Pages();
			for (var i = 0; i < pageNameArr.length; i++) {
				var newPage = allPage[pageNameArr[i]];
				newPage.initX = newPage.x;
				newPage.initY = newPage.y;
				if (newPage.instanceType == "annie.MovieClip") {
					newPage.gotoAndStop(1);
				}
				newPage.visible = false;
				pageArr[pageNameArr[i]] = newPage;
				pageCon.addChild(newPage);
			}
			pageArr[onPageId].visible = true;
			pageRoot.pageInit();
			annie.Tween.to(loadingSp, 0.5, { alpha: 0 });
			setTimeout(function () {
				loadingSp.visible = false;
				loadingSp.alpha = 1;
				if (pageArr[onPageId].instanceType == "annie.MovieClip") {
					pageArr[onPageId].gotoAndPlay(2);
				}
			}, 500);
		}
	}, window.cdn);
};
pf20240801.Pf20240801.prototype.pageInit = function () {
	console.log("--- pageInit ---");
	gamewinPageInit();
	luckPageInit();
	floorNumSpInit();
	gameInit();
	setTimeout(gameStart, 1000);
	pageResize();
	pageRoot.btnInit();
};
var stageAddY = 0;
function pageResize() {
	var heightNum = pageRoot.stage.viewRect.height > 1600 ? 1600 : pageRoot.stage.viewRect.height;
	stageAddY = -(heightNum - 1334) / 2;
	allPage.game.totalSp.y += stageAddY * 0.7;
	allPage.game.floorNumSp.y += stageAddY * 0.7;
	allPage.game.timeSp.y += stageAddY * 0.7;
	allPage.game.lineSp.y += stageAddY * 0.7;
}
function luckPageInit() {
	allPage.luckstar.floor_txt.bold = true;
	allPage.luckstar.star_txt.bold = true;
	allPage.luckstar.floor_txt.x -= 5;
	allPage.luckstar.star_txt.x -= 3;

	allPage.luckstar.floor_txt.text = 0;
	allPage.luckstar.star_txt.text = 0;
}
function gamewinPageInit() {
	allPage.gamewin.num_txt.x = 385;

	var tbg = allPage.gamewin.getChildAt(1);
	var imgEle = new Image();
	imgEle.onload = function (e) {
		var bitmap = new annie.Bitmap(imgEle);
		tbg.removeAllChildren();
		tbg.addChild(bitmap);
	}
	imgEle.src = 'resource/other/gamewinbg.png';

	var backbtnSp = new annie.Sprite();
	backbtnSp.x = 295;
	backbtnSp.y = 890;
	allPage.gamewin.addChild(backbtnSp);
	allPage.gamewin.gamewin_backbtn = backbtnSp;
	allPage.gamewin.gamewin_backbtn.name = "gamewin_backbtn";

	var backbtnImgEle = new Image();
	backbtnImgEle.onload = function (e) {
		var bitmap = new annie.Bitmap(backbtnImgEle);
		backbtnSp.addChild(bitmap);

	}
	backbtnImgEle.src = 'resource/other/backbtn.png';
}
function floorNumSpInit() {
	var floorNumSp = new annie.Sprite();
	allPage.game.floorNumSp = floorNumSp;
	floorNumSp.x = 710;
	floorNumSp.y = 130;

	var floorNumTxt = new annie.TextField();
	floorNumSp.num_txt = floorNumTxt;
	floorNumTxt.lineHeight = 50;
	floorNumTxt.textWidth = 84;
	floorNumTxt.textHeight = 50;
	floorNumTxt.textAlign = "center";
	floorNumTxt.x = 0;
	floorNumTxt.y = 74;
	floorNumTxt.color = "#ffffff"
	floorNumTxt.text = "1";
	floorNumTxt.size = 38;
	floorNumTxt.bold = true;
	floorNumTxt.stroke = 8;
	floorNumTxt.strokeColor = "#2898e0";

	var imgEle = new Image();
	imgEle.onload = function (e) {
		var bitmap = new annie.Bitmap(imgEle);
		floorNumSp.addChild(bitmap);
		floorNumSp.addChild(floorNumTxt);
	}
	imgEle.src = 'resource/other/floor_icon.png';
	allPage.game.addChild(floorNumSp);
}

pf20240801.Pf20240801.prototype.btnInit = function (e) {

	allPage.gametip.gametip_closebtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gametip.gametip_okbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));

	allPage.gamewin.gamewin_closebtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gamewin.gamewin_okbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gamewin.gamewin_replaybtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gamewin.gamewin_backbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));

	allPage.gamemax.gamemax_playbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gamemax.gamemax_closebtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.gamemax.gamemax_excbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));


	pageRoot.tip.closebtn.addEventListener(annie.MouseEvent.CLICK, tipClose);

	allPage.luckstar.luckstar_closebtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.luckstar.luckstar_okbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));

	allPage.luckdouble.luckdouble_closebtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));
	allPage.luckdouble.luckdouble_okbtn.addEventListener(annie.MouseEvent.CLICK, this.btnClick.bind(this));

};
var btnClicking = false;
pf20240801.Pf20240801.prototype.btnClick = function (e) {
	if (btnClicking == true) {
		console.log("btnClicking=true");
		return;
	}
	btnClicking = true;
	setTimeout(function () {
		btnClicking = false;
	}, 300);
	var btnId = e.currentTarget.name;
	var pageName = btnId.split("_")[0];
	console.log("btnId:", btnId);
	debugger
	// 功能按钮控制中心
	if (btnId == "gamewin_okbtn") {
		openLink(window.gameover_okbtn_link);
	} else if (btnId == "gamewin_replaybtn") {
		hidePop("gamewin");
		window.gameDataInit(reStartSend);
		gameReset();
	} else if (btnId == "gamewin_closebtn" || btnId == "gamewin_backbtn") {
		openLink(window.gameover_backbtn_link);
	} else if (btnId == "gamemax_excbtn") {
		openLink(window.gamemax_excbtn_link);
	} else if (btnId == "gamemax_closebtn" || btnId == "gamemax_playbtn") {
		hidePop("gamemax");
	} else if (btnId == "luckstar_closebtn" || btnId == "luckstar_okbtn") {
		hidePop("luckstar");
	} else if (btnId == "luckdouble_closebtn" || btnId == "luckdouble_okbtn") {
		hidePop("luckdouble");
	}
	MtaH5Click(btnId);
};
function reStartSend(data) {
	if (data.code == 0) {
		tipPlay(data.msg, errCallback);
	} else {
		initGameData = data;
	}
}
function MtaH5Click(btnId) {
	console.log("MtaH5Click:" + btnId);
}
function openLink(openUrl) {
	// 打开新页面
	debugger
	window.location.href = openUrl;
	return;
}
function showGamePage() {
	if (initData.gameNum < 1) {
		tipPlay("今天的游戏机会用完了，明天再来挑战吧！", null, null, true);
		return;
	}
	gameReset();
	showPage("game", "B");
	setTimeout(gameStart, 1000);
}
var gameCon, lcCon, lc, lastLc, zSp, lcDz, bgCon, zSp0, preLcId;
var tempPoint, lastXY, gameToken;
var boxWidth = 150, boxHeight = 100, lcNum = 1, angle = 0, angleSpeed = 0.05, lcInitSpeed = 5, lcSpeed = 5, lcConXNum = 0;
var winScore = 1000, gameScore = 0, gameData = {}, gameFloorNum = 1;
var addLcArr = [];
var isGameRuning = false, isPutDown = false, isGameCheat = false;
function gameInit() {
	gameCon = allPage.game;
	lcCon = gameCon.boxCon;
	lcDz = gameCon.boxDz;
	zSp = gameCon.zSp;
	zSp0 = gameCon.zSp0;
	lc = gameCon.box;
	lcCon.initX = lcCon.x;
	lcCon.initY = lcCon.y;
	lcDz.initY = lcDz.y;
	gameCon.totalSp.total_txt.x = 63;
	gameCon.totalSp.total_txt.y = 12;
	gameCon.timeSp.time_txt.x = 63;
	gameCon.timeSp.time_txt.y = 13;
	gameCon.lineSp.max_txt.x = -14;
	gameCon.lineSp.max_txt.stroke = 8;
	gameCon.lineSp.max_txt.strokeColor = "#5499FA";

	gameCon.lineSp.numSp.num_txt.x = -2;
	gameCon.lineSp.numSp.num_txt.stroke = 8;
	gameCon.lineSp.numSp.num_txt.strokeColor = "#5499FA";

	gameCon.addEventListener(annie.MouseEvent.MOUSE_UP, gamePutDown);
	gameReset();
}
function gameReset() {
	timeFar = 0;
	zSp.y = -200;
	zSp.x = 490;
	zSp0.y = -200;
	zSp0.x = 490;
	lc.x = 490;
	lc.y = -200;
	lc.id = 1;
	lc.gotoAndStop(lc.id);
	gameCon.timeSp.visible = false;
	gameCon.timeSp.time_txt.text = "30S";
	gameScore = 0;
	gameFloorNum = 1;
	gameCon.floorNumSp.num_txt.text = "1";
	gameData = {};
	angle = 0;
	angleSpeed = 0.05;
	lcNum = 1;
	lcSpeed = 5;
	lcCon.x = lcCon.initX;
	lcCon.y = lcCon.initY;
	lcDz.y = lcDz.initY;
	for (var i = 0; i < addLcArr.length; i++) {
		lcCon.removeChild(addLcArr[i]);
	}
	addLcArr = [];
	lastLc = gameCon.boxCon.box0;
	lc.visible = true;
	lcInit();

	setTimeout(function () {
		gameCon.totalSp.total_txt.text = initGameData.userStarsTotal;
		setStarLineSp();
		gameStart();
	}, 100)
}

function setStarLineSp() {
	var fNum = parseInt(initGameData.userTodayStars / window.oneDayMax * 100 + 1)
	fNum = fNum > 101 ? 101 : fNum;
	gameCon.lineSp.gotoAndStop(fNum);
	gameCon.lineSp.max_txt.text = window.oneDayMax;
	gameCon.lineSp.numSp.num_txt.text = initGameData.userTodayStars;
}

var testTime0, testTime1, testTime2, testTimeArr = [];
function gameStart() {
	annie.Tween.to(zSp, 0.5, { y: 490, ease: annie.Tween.backOut });
	annie.Tween.to(zSp0, 0.5, { y: 490, ease: annie.Tween.backOut });
	annie.Tween.to(lc, 0.5, { y: 490, ease: annie.Tween.backOut });
	setTimeout(function () {
		gameCon.addEventListener(annie.Event.ENTER_FRAME, gameRuntime);
		isGameRuning = true;
		testTime0 = new Date().getTime();
	}, 500)

}
function gameTimeStop() {
	isGameRuning = false;
}
function gameTimeRun() {
	isGameRuning = true;
}
function gameMouseMove(e) {
	lc.x = e.stageX;
}
function gamePutDown(e) {
	if (isPutDown == false && isGameRuning == true) {
		isPutDown = true;
		zSp.gotoAndPlay(2);
		zSp0.gotoAndPlay(2);
	}
}
function lcInit() {
	lc.x = zSp.x;
	lc.y = zSp.y;
	let id = parseInt(Math.random() * 17 + 1);
	lc.id = id === preLcId ? id === 17 ? id - 1 : id + 1 : id;
	preLcId = lc.id;
	lc.gotoAndStop(lc.id);
	lcSpeed = lcInitSpeed;
	var tempNum = lcNum > 20 ? (lcNum - 15) : 0;
	angleSpeed = 0.08 + tempNum * 0.005 * 0.5;
	var luckFloor = parseInt(initGameData.luckFloorNum);
	if ((lcNum % luckFloor) == (luckFloor % luckFloor)) {
		// 获取额外星愿值
		window.sendLuck(getLuckStarEnd);
	}
}
function getLuckStarEnd(data) {
	if (data.code == 1) {
		initGameData.userStarsTotal = initGameData.userStarsTotal + initGameData.luckStarNum;
		allPage.game.totalSp.total_txt.text = initGameData.userStarsTotal;
		allPage.luckstar.floor_txt.text = initGameData.luckFloorNum;
		allPage.luckstar.star_txt.text = initGameData.luckStarNum;
		showPop("luckstar", "S");
	}
}
var timeFar = 0, lv2Num = 30, zSpSpeed = 0;
function gameRuntime(e) {
	if (isGameRuning == true) {
		if (isGameCheat) {
			angle = 0;
			angleSpeed = 0;
		}

		if (lcNum > lv2Num) {
			lcConXNum += angleSpeed / 2;
			var xr = ((lcNum - lv2Num) * 10) > 400 ? 400 : ((lcNum - lv2Num) * 10);
			lcCon.x = 490 + Math.sin(lcConXNum) * xr;
		}

		zSpSpeed = angleSpeed > 0.16 ? 0.16 : angleSpeed;
		angle += zSpSpeed * 0.8;
		zSp.x = 490 + Math.sin(angle) * 200;
		zSp.y = 440 + Math.cos(angle) * 50;
	}
	if (isPutDown == true && isGameRuning == true) {
		lastXY = { x: lastLc.x + lcCon.x, y: lastLc.y + lcCon.y };

		lcSpeed += 3;
		lc.y += lcSpeed;
		if (lc.y > lastXY.y - boxHeight) {
			testTime1 = new Date().getTime();
			testTime2 = (testTime1 - testTime0) / 1000;
			testTimeArr.push({ f: gameFloorNum, t: testTime2 });
			if (Math.abs(lc.x - lastXY.x) < boxWidth / 2) {
				lc.y = lastXY.y - boxHeight;
				isPutDown = false;
				addLC(lc.x, lc.y);
				addScore();
				lcInit();
			} else if (Math.abs(lc.x - lastXY.x) < boxWidth) {
				lc.y = lastXY.y - boxHeight;
				isPutDown = false;
				gameOver(true);
			} else if (lc.y > 1300) {
				lc.y = 1300;
				isPutDown = false;
				gameOver();
			}
		}
	} else if (isGameRuning == true) {
		lc.x = zSp.x;
		lc.y = zSp.y;
	}
	zSp0.x = zSp.x;
	zSp0.y = zSp.y;
}
function addScore() {
	gameFloorNum += 1;
	allPage.game.floorNumSp.num_txt.text = gameFloorNum;
	if (initGameData.userTodayStars + gameScore >= window.oneDayMax) {
		return;
	}
	gameScore += 1;
	var todayScore = initGameData.userTodayStars + gameScore;
	var fNum = parseInt(todayScore / window.oneDayMax * 100 + 1)
	console.log("addScore:", gameScore, fNum);
	gameCon.lineSp.gotoAndStop(fNum);
	gameCon.lineSp.numSp.num_txt.text = initGameData.userTodayStars + gameScore;

	gameCon.saeSp.x = lc.x;
	gameCon.saeSp.y = lc.y - 150;
	gameCon.saeSp.alpha = 1;
	gameCon.saeSp.scaleX = 0.3;
	gameCon.saeSp.scaleY = 0.3;
	annie.Tween.to(gameCon.saeSp, 0.5, { alpha: 0, scaleX: 1.2, scaleY: 1.2 });

	gameData.floorNum = window.en(gameFloorNum);
	if (todayScore >= window.oneDayMax) {
		sendGameEnd(1);

	}
}
function addPaoPao() {
	var pao = new pages.PAOPAO();
	pao.x = lastLc.x - 100;
	pao.y = lastLc.y;
	pao.scaleX = pao.scaleY = 0.3;
	pao.alpha = 0;
	pao.paoSp.gotoAndStop(parseInt(Math.random() * 3 + 1));
	annie.Tween.to(pao, 0.2, { scaleX: 1, scaleY: 1, alpha: 1, ease: annie.Tween.cubicOut });
	lcCon.addChild(pao);
	addLcArr.push(pao);
}
function addLC(x, y) {
	var ax = x - lcCon.x;
	var ay = y - lcCon.y;
	var alc = new pages.BOX();
	alc.x = ax;
	alc.gotoAndStop(lc.id);
	alc.y = -lcNum * boxHeight;
	addLcArr.push(alc);
	lcCon.addChild(alc);
	lastLc = alc;
	lcNum++;
	if (lcNum > 1) {
		annie.Tween.to(lcCon, 0.4, { y: lcCon.y + boxHeight * 0.95 });
		annie.Tween.to(lcDz, 0.4, { y: lcDz.y + boxHeight * 0.95 });
	}
	setTimeout(function () {
		if (addLcArr.length > 10) {
			var tempLc = addLcArr[0];
			addLcArr.splice(0, 1);
			lcCon.removeChild(tempLc);
			tempLc = null;
		}
	}, 500);
}
function gameOver(isLcHit) {
	console.log("gameOver", isLcHit);
	isGameRuning = false;
	allPage.gamewin.num_txt.text = gameScore + "星";
	if (isLcHit == true) {
		var lrNum = (lc.x - lastXY.x > 0) ? 1 : -1;
		var disNum = lc.x - lastXY.x;
		lc.visible = false;
		addLC(lc.x, lc.y);
		lastLc.anchorX = -disNum * 1.2 + boxWidth / 2 * lrNum;
		lastLc.anchorY = 20;
		var tNum = 0.6;
		annie.Tween.to(lastLc, tNum, { x: lastLc.x + lrNum * boxWidth / 2, rotation: lrNum * 90, ease: annie.Tween.circularIn });
		setTimeout(function () {
			annie.Tween.to(lastLc, 0.4, { y: lcCon.y > 1250 ? (lastLc.y + 500) : -20 });
		}, tNum * 1000 + 50);
		setTimeout(function () {
			sendGameEnd(0);
		}, 1500);
	} else if (gameScore >= winScore) {
		sendGameEnd(0);
	} else {
		sendGameEnd(0);
	}
}
var gameEndId = 0;
function sendGameEnd(typeId) {
	gameEndId = typeId || 0;

	gameData.gameScore = gameScore;
	// gameData.floorNum = window.en(gameFloorNum);
	gameData.floorNum = gameFloorNum;
	// debugger
	if (initGameData.userTodayStars >= window.oneDayMax) {
		console.log("todayScore is max");
		gameData.gameScore = 0;
		window.sendGameData(gameData, sendGameDataCallback);
	} else if (gameScore <= 0) {
		console.log("gameScore is 0");
		showPop("gamewin", "S");
	} else {
		window.sendGameData(gameData, sendGameDataCallback);
	}
}
function test(gd) {
	var gdArr = [];
	var arrA = String(gd).split("a");
	for (var i = 1; i < arrA.length - 1; i++) {
		var arrB = arrA[i].split("b");
		gdArr.push(arrB);
	}
	var gds = 0;
	for (var i = 0; i < gdArr.length; i++) {
		gds += (gdArr[i][1] - gdArr[i][0]);
		// 游戏数据每层分数相加
	}
	var isOk = true;
	for (var i = 0; i < gdArr.length - 1; i++) {
		if ((gdArr[i + 1][0] - gdArr[i][0]) > 83) {
			// 游戏数据每层相差的距离
			isOk = false;
			console.log(i, gdArr[i], gdArr[i + 1]);
			break;
		}
	}
	console.log("test1:", gameScore, arrA[arrA.length - 1] - 613);
	console.log("test2:", gameScore, gds);
	console.log("test3:", isOk);
}

/**
 * ****************************   提示页面   **********************************
 */
var tipCloseFun = null;
function tipPlay(textStr, closeCallback, isCloseBtnHide, isShareBtnShow) {
	console.log("tipPlay:", textStr);
	pageRoot.tip.txt.text = textStr;
	pageRoot.tip.visible = true;
	pageRoot.tip.anchorX = 400;
	pageRoot.tip.anchorY = 618;
	pageRoot.tip.scaleX = pageRoot.tip.scaleY = 0.5;
	pageRoot.tip.alpha = 0;
	annie.Tween.to(pageRoot.tip, 0.15, { alpha: 1, scaleX: 1, scaleY: 1, ease: annie.Tween.cubicOut });
	if (isCloseBtnHide == true) {
		pageRoot.tip.closebtn.visible = false;
	}
	if (closeCallback) {
		tipCloseFun = closeCallback;
	} else {
		tipCloseFun = null;
	}
}
function tipClose() {
	pageRoot.tip.visible = false;
	if (tipCloseFun) {
		tipCloseFun();
	}
}

/**
 * 显示页面
 */
var slideSpeed = 0.6;
var easeType = annie.Tween.cubicOut;
var showPopNum = 0;
function showPop(pageName, direction, callback) {
	// debugger
	// console.info("showPop", pageName);
	showPopNum++;
	var timeOutNum = slideSpeed * 1000;
	var onPage = pageArr[pageName];
	onPage.x = onPage.initX;
	onPage.y = onPage.initY;
	onPage.visible = true;
	if (direction == "R") {
		onPage.x = pageWidth;
		annie.Tween.to(onPage, slideSpeed, { x: onPage.initX, ease: easeType });
	} else if (direction == "L") {
		onPage.x = -pageWidth;
		annie.Tween.to(onPage, slideSpeed, { x: onPage.initX, ease: easeType });
	} else if (direction == "T") {
		onPage.y = -pageHeight;
		annie.Tween.to(onPage, slideSpeed, { y: onPage.initY, ease: easeType });
	} else if (direction == "B") {
		onPage.y = pageHeight;
		annie.Tween.to(onPage, slideSpeed, { y: onPage.initY, ease: easeType });
	} else if (direction == "A") {
		onPage.alpha = 0;
		annie.Tween.to(onPage, slideSpeed, { alpha: 1 });
	} else if (direction == "S") {
		onPage.anchorX = 400;
		onPage.anchorY = 625;
		onPage.alpha = 0;
		onPage.scaleX = onPage.scaleY = 0.5;
		// debugger
		annie.Tween.to(onPage, slideSpeed, { alpha: 1, scaleX: 1, scaleY: 1, ease: easeType });
	} else if (direction == "P") {
		onPage.alpha = 1;
		onPage.scaleX = onPage.scaleY = 1;
		onPage.gotoAndPlay(2);
	}
	if (callback) {
		setTimeout(callback, timeOutNum);
	}
};
function hidePop(pageName, direction) {
	var delay = slideSpeed * 1000;
	var onPage = pageArr[pageName];
	if (direction == "R") {
		annie.Tween.to(onPage, slideSpeed, { x: pageWidth + 300, ease: easeType });
	} else if (direction == "L") {
		annie.Tween.to(onPage, slideSpeed, { x: -pageWidth - 300, ease: easeType });
	} else if (direction == "T") {
		annie.Tween.to(onPage, slideSpeed, { y: -pageHeight - 300, ease: easeType });
	} else if (direction == "B") {
		annie.Tween.to(onPage, slideSpeed, { y: pageHeight + 300, ease: easeType });
	} else if (direction == "A") {
		annie.Tween.to(onPage, slideSpeed, { alpha: 0 });
	} else if (direction == "S") {
		onPage.anchorX = 400;
		onPage.anchorY = 625;
		annie.Tween.to(onPage, slideSpeed, { alpha: 0, scaleX: 1.3, scaleY: 1.3, ease: easeType });
	} else {
		delay = 1;
	}
	setTimeout(hidePopComplete, delay, pageName)
}
function hidePopComplete(pageName) {
	pageArr[pageName].visible = false;
	showPopNum--;
}
function showPage(pageName, direction, callback) {
	if (onPageId != pageName) {
		var onPage = pageArr[pageName];
		var outPage = pageArr[onPageId];
		onPage.x = onPage.initX;
		onPage.y = onPage.initY;
		onPage.visible = true;
		var timeOutNum = slideSpeed * 1000;
		if (direction == "R") {
			annie.Tween.to(outPage, slideSpeed, { x: -pageWidth - 80, ease: easeType });
			onPage.x = pageWidth - 80;
			annie.Tween.to(onPage, slideSpeed, { x: onPage.initX, ease: easeType });
		} else if (direction == "L") {
			annie.Tween.to(outPage, slideSpeed, { x: pageWidth - 80, ease: easeType });
			onPage.x = -pageWidth - 80;
			annie.Tween.to(onPage, slideSpeed, { x: onPage.initX, ease: easeType });
		} else if (direction == "T") {
			annie.Tween.to(outPage, slideSpeed, { y: pageHeight - 105, ease: easeType });
			onPage.y = -pageHeight - 105;
			annie.Tween.to(onPage, slideSpeed, { y: onPage.initY, ease: easeType });
		} else if (direction == "B") {
			annie.Tween.to(outPage, slideSpeed, { y: -pageHeight - 105, ease: easeType });
			onPage.y = pageHeight - 105;
			annie.Tween.to(onPage, slideSpeed, { y: onPage.initY, ease: easeType });
		} else if (direction == "A") {
			annie.Tween.to(outPage, slideSpeed, { alpha: 0 });
			onPage.alpha = 0;
			annie.Tween.to(onPage, slideSpeed, { alpha: 1 });
		} else {
			timeOutNum = 10;
		}
		outPageId = onPageId;
		onPageId = pageName;
		setTimeout(hidePage, timeOutNum, outPageId);
		if (callback) {
			setTimeout(callback, timeOutNum);
		}
	}
}
function hidePage(pageName) {
	console.log("hidePage:", pageName);
	pageArr[pageName].visible = false;
}
var bgMusic = window.bgMusic || document.getElementById("bgMusic");
function soundInit(btnSp) {
	soundIcon = btnSp;
	soundIcon.visible = true;
	soundIcon.addEventListener(annie.MouseEvent.MOUSE_DOWN, soundIconDown)
	console.log("bgMusic:", bgMusic);
	window.bgMusicPlaying = true;
	bgMusic.play();
	if (bgMusic.paused) {
		pageRoot.addEventListener(annie.MouseEvent.MOUSE_DOWN, bodyDown);
	}
	function bodyDown(event) {
		bgMusic.play();
		pageRoot.removeEventListener(annie.MouseEvent.MOUSE_DOWN, bodyDown);
	}
}
window.bgMusicPlaying = false;
function soundIconDown(event) {
	if (bgMusic.paused) {
		bgMusic.play();
		soundIcon.gotoAndStop(1);
		window.bgMusicPlaying = true;
	} else {
		bgMusic.pause();
		soundIcon.gotoAndStop(2);
		window.bgMusicPlaying = false;
	}
}
function inputHtmlInit(inputHtml) {
	inputHtml.onfocus = function () {

	};
	inputHtml.onblur = function () {
		$("body").scrollTop(0);
	};
}
