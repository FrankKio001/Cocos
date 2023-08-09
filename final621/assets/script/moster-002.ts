
const {ccclass, property} = cc._decorator;

import Player from "./player";

import monster_manager from "./em";
 
@ccclass
export default class enemy extends cc.Component 
{

    lv:cc.Vec2 = null;
    speed_normal: number = 200;
    speed_v: number = 90;
    speed_h: number = 90;
    //co: cc.Color = null;
    //cc.Vec4
    co: number = 100;
    die: number = 0;
    finded: number = 0;
    dx: number = 0;
    dy: number = 0;
    dd: number = 0;
    direction: number = 0;

    life: number = 1;
    freeze: boolean = false;
    fadeout: boolean = false;
    escape: boolean = false;

    tt:number = 0;

    @property(cc.Prefab)
    bulletprefab: cc.Prefab = null;

    @property(cc.Prefab)
    coin_prefab: cc.Prefab;

    update(dt)
    {
        var node2 = cc.find("Canvas/player");
        let playerx = node2.getPosition().x;
        let playery = node2.getPosition().y;
        let mosterx = this.node.getPosition().x;
        let mostery = this.node.getPosition().y;
        //console.log(mosterx,mostery); //成功捉player data
        //console.log(playerx,playery);
        this.direction = 0;
        if(playerx > mosterx){this.dx = playerx - mosterx; this.direction += 1;}
        else{this.dx = mosterx -playerx;}
        if(playery > mostery){this.dy = playery - mostery; this.direction += 2;}
        else{this.dy = mostery -playery;}
        this.dd = Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));

        if( this.dd < 300){
            this.finded = 1;
        }
        else{
            this.finded = 0;
            //console.log("can't",this.dd);
        }

        //console.log(this.escape,this.lv);

        var life = this.node .getChildByName('life').getComponent(cc.Sprite).fillRange;
        //console.log(life); //成功捉hp

        if(life<=0){this.die=1;}
        else{this.die=0;}

        if(this.die == 1){
            //變黑
            this.node.getComponent(cc.RigidBody).enabledContactListener=false;
            //this.node.color = cc.color(100,100,100,255);
            //死
            if(this.fadeout==false){
                this.scheduleOnce(()=>{
                    let coin = cc.instantiate(this.coin_prefab);
                    coin.setPosition(this.node.getPosition().x,this.node.getPosition().y);
                    cc.find("Canvas").addChild(coin);

                    let player = cc.find("Canvas/player");
                    player.getComponent("player").enemykilled+=1;

                    let monster_manager = cc.find("Canvas/monster_manager");
                    monster_manager.getComponent("em").cur_monster-=1;

                    this.node.runAction(cc.fadeOut(0.5));
                })
                this.fadeout=true;
            }
            
            this.schedule(function(){
                    
                    this.node.destroy();
            },0.5);
             
        }


        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;
        
        
        if(this.finded == 1){
            //console.log("can",this.dd);
            this.tt+=dt;
            if(this.tt>=1){
                this.shoot();
                this.tt=0;
            }
        }
        else{ 
            this.speed_v = this.speed_normal;
            this.speed_h = this.speed_normal;
            this.rdwalk(dt);
        }
        
        if(this.freeze){
            let freeze_lv = this.lv.multiplyScalar(0.97);
            this.node.getComponent(cc.RigidBody).linearVelocity = freeze_lv;
        }else{
            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
        }

        

        this.dd = 0;
    }

    /*catch(dt){
        //console.log(this.direction);
        //let a = this.dd/this.speed_normal;
            
        
            this.speed_v = this.speed_normal*this.dx/(this.dx+this.dy);
            this.speed_h = this.speed_normal*this.dy/(this.dx+this.dy);
            if(this.direction == 0){//mx,my>pxpy
                this.lv.x -= this.speed_v * dt;
                this.lv.y -= this.speed_h * dt;
            }
            else if(this.direction == 1){//mx<px
                this.lv.x += this.speed_v * dt;
                this.lv.y -= this.speed_h * dt;
            }
            else if(this.direction == 2){//my<py
                this.lv.x -= this.speed_v * dt;
                this.lv.y += this.speed_h * dt;
            }
            else{//4,mx,my<pxpy
                this.lv.x += this.speed_v * dt;
                this.lv.y += this.speed_h * dt;
            }
        
        
        //console.log(this.speed_v,this.speed_h);
    }*/

    shoot(){
        var player = cc.find("Canvas/player");
        let playerx = player.getPosition().x;
        let playery = player.getPosition().y;
        let selfx = this.node.getPosition().x;
        let selfy = this.node.getPosition().y;

        //console.log("shoot");

        var bullet_m = null;
        bullet_m = cc.instantiate(this.bulletprefab);
        bullet_m.setPosition(selfx,selfy);
        var bullet_lv = new cc.Vec2(playerx-selfx,playery-selfy).normalize().multiplyScalar(300);
        bullet_m.getComponent(cc.RigidBody).linearVelocity = bullet_lv;
        cc.find("Canvas").addChild(bullet_m);
    }

    rdwalk(dt){
        if(Math.random() > 0.5)
        {
            //this.node.runAction(cc.fadeOut(1));      
            /*      
            if(this.node.color == cc.color(255,255,255,0) )
            {
                this.node.runAction(cc.show());
            }
            if(this.speed_h == 0)
            {
                //this.node.runAction(cc.fadeIn(1));
            }
            if(this.speed_h != 0){
                this.when_die();
            }
            */
        }
        else
        {
            //this.rdwalk(dt);
            ///*
            this.speed_h=this.speed_normal*(Math.random()-0.5)*10;
            this.speed_v=this.speed_normal*(Math.random()-0.5)*10;

            this.lv.x += this.speed_v * dt;
            this.lv.y += this.speed_h * dt;
            //*/
        }
    }
 

    gethurt(){
        this.life-=0.21;
        if(this.life>0){
            this.node .getChildByName('life').getComponent(cc.Sprite).fillRange = this.life;
        }else{
            this.node .getChildByName('life').getComponent(cc.Sprite).fillRange = 0;
        }
        

    }

    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
            this.lv.x=this.node.getComponent(cc.RigidBody).linearVelocity.x;
            this.lv.x=this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.escape=true;
            this.lv.x = -this.lv.x;
            this.lv.y = -this.lv.y;

            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv.multiplyScalar(0.5);
            this.scheduleOnce(()=>{
                this.escape=false;
            },1);
        }
        if(other.node.name=="bullet"){
            this.gethurt();
        }
        if(other.node.name=="ice_bullet"){
            this.gethurt();
            this.freeze=true;
            //console.log("freeze");
            this.scheduleOnce(()=>{
                //console.log("unfreezes");
                this.freeze = false;
            },5);
        }
    }

}


