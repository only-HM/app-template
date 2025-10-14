AnnieRoot.pages= AnnieRoot.pages||{};
AnnieRoot.pages.Pages= function(){
	var s=this;
	annie.Sprite.call(s);
	/*_a2x_need_start*/s.game=null;s.gamemax=null;s.gametip=null;s.gamewin=null;s.luckdouble=null;s.luckstar=null;/*_a2x_need_end*/
	annie.initRes(s,"pages","Pages");
};
annie.A2xExtend(AnnieRoot.pages.Pages,annie.Sprite);