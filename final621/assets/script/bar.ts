cc.Class({
    extends: cc.Component,

    properties: {
        bar_sprite: cc.Sprite,

    },

    onLoad: function () {
        //in HP
        this.progress=1;
        //this._ping = true;
        //this.bar = bar_sprite.getComponent(cc.Sprite);
        this.bar_sprite.fillRange = this.progress;
    },

    call(){
        //this._updateProgressBar(this.progressBar, dt);
        //-hp
        //if(this.progress<0.5){
        //this.progress += 0.1;}
        //else{this.progress -= 0.1;}
        this.progress -= 0.1;
        this.bar_sprite.fillRange = this.progress;

    },

    update(dt)
    {
        //自動回HP 的部分
        /* 
        this.schedule(function(){
           this.progress -= 1/10;
            this.bar_sprite.fillRange = this.progress;
        },1,6,0)
        */
    }
 

    
});
/*
cc.Class({
    extends: cc.Component,

    properties: {
        bar_sprite: cc.Sprite,

    },

    onLoad: function () {
        this.progress=0;
        //this._ping = true;
        //this.bar = bar_sprite.getComponent(cc.Sprite);
        this.bar_sprite,fillRange = this.progress;
    },

    call(){
        //this._updateProgressBar(this.progressBar, dt);
        this.progress -= 0.1;
        this.bar_sprite,fillRange = this.progress;
    },


    
    
});
*/
//const {ccclass, property} = cc._decorator;

/*@ccclass
export default class bar extends cc.Component 
{

    life: number = 100;
    progressBar: {
        type: cc.ProgressBar,
        default: null
    }

    onLoad () {
        this.progressBar.progress = this.life/100;
    }

    start () {
        
    }
    

    update(dt)
    {
        this.schedule(function(){
            this.life -= 1/10;

        },1,6,0)
    }
 


}*/
/*
cc.Class({
    extends: cc.Component,

    this.life: number = 100;
    properties: {
        speed: 1,
        progressBar: {
         	type: cc.ProgressBar,
         	default: null
        }
    },

    onLoad: function () {

        //this._ping = true;
        this.progressBar.progress = this.life/100;
    },

    update: function (dt) {
        this._updateProgressBar(this.progressBar, dt);
    },


    
    
});
*/