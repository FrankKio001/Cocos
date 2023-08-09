// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import Player from "./player";
import Camera from "./camera_control";
import Dialog from "./dialog";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(Player)
    player: Player = null;

    @property(cc.Prefab)
    bulletprefab: cc.Prefab = null;

    @property(cc.Prefab)
    icebulletprefab: cc.Prefab = null;

    @property(Camera)
    camera: Camera = null;

    @property(Dialog)
    dialogNode: Dialog = null;

    @property(cc.Node)
    pauseboxNode: cc.Node = null;

    @property(cc.Node)
    storeboxNode: cc.Node = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:
    dialog = null;

    onLoad () {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2 (0, 0);

    }

    start () {
        this.dialog = this.dialogNode.getComponent("dialog");
        this.dialog.init([
            {role: 1, content:"When I'm awake, I found myself in a dungeon.\n (press space key to continue...)"},
            {role: 1, content:"I can feel the evil creature around."},
            {role: 1, content:"I have to find a way to escape!"},
            {role: 2, content:"Press WASD to move."},
            {role: 2, content:"click left mouse button to shoot."},
            {role: 2, content:"click right mouse button to dash.\n (during dashing is immuned)"},
            {role: 2, content:"defeat the boss to escape, good luck!"}, 
        ]);

        this.play_bgm();



        this.node.on('mousedown',function(event){
            let dialog = cc.find("Canvas/dialog");
            if(dialog.active==true)return;
            if(event._button==0){//滑鼠左鍵
                //console.log(this.player.getPosition().x,this.player.getPosition().y);
                let shoot = true;
                if(event._x<563 && event._x>500 && event._y<581 && event._y>518) shoot=false;
                if(this.player.stun) shoot=false;

                if(this.pauseboxNode.active==false && this.storeboxNode.active==false && shoot){
                    //console.log(event);

                    let player_posx = this.player.getPosition().x;
                    let player_posy = this.player.getPosition().y;
                

                    //console.log(player_posx,player_posy);

                    var bullet = null;
                    if(this.player.ice_bullets){
                        bullet = cc.instantiate(this.icebulletprefab);
                    }else{
                        bullet = cc.instantiate(this.bulletprefab);
                    }
                    bullet.setPosition(player_posx,player_posy);
                    var bullet_lv = new cc.Vec2(event._x-300,event._y-300).normalize().multiplyScalar(500);
                    bullet.getComponent(cc.RigidBody).linearVelocity = bullet_lv;
                    cc.find("Canvas").addChild(bullet);

                    if(this.player.shotgun){
                        var bullet2 = null;
                        var bullet3 = null;
                        if(this.player.ice_bullets){
                            bullet2 = cc.instantiate(this.icebulletprefab);
                            bullet3 = cc.instantiate(this.icebulletprefab);
                        }else{
                            bullet2 = cc.instantiate(this.bulletprefab);
                            bullet3 = cc.instantiate(this.bulletprefab);
                        }
                        bullet2.setPosition(player_posx,player_posy);
                        bullet3.setPosition(player_posx,player_posy);

                        var bullet2_lv = new cc.Vec2(event._x-300,event._y-300).normalize().rotate(0.15).multiplyScalar(500);
                        var bullet3_lv = new cc.Vec2(event._x-300,event._y-300).normalize().rotate(-0.15).multiplyScalar(500);
                        bullet2.getComponent(cc.RigidBody).linearVelocity = bullet2_lv;
                        bullet3.getComponent(cc.RigidBody).linearVelocity = bullet3_lv;

                        cc.find("Canvas").addChild(bullet2);
                        cc.find("Canvas").addChild(bullet3);
                    }
                }
                
            }
            if(event._button==2){//滑鼠右鍵

                
                if(this.pauseboxNode.active==false && this.storeboxNode.active==false && this.player.stun==false){
                    let player_posx = this.player.getPosition().x;
                    let player_posy = this.player.getPosition().y;
                

                    if(!this.player.rolling){
                        this.player.become_immune();
                        var player_lv = new cc.Vec2(event._x-300,event._y-300).normalize().multiplyScalar(500);
                        this.player.getComponent(cc.RigidBody).linearVelocity = player_lv;
                        this.player.rolling=true;
                        this.scheduleOnce(()=>{
                            this.player.getComponent(cc.RigidBody).linearVelocity=  new cc.Vec2(0,0);
                            this.player.rolling=false;
                        },0.3)
                    }
                }
                

                

            }
            
        },this)

    }

    pause_game(){
        cc.director.pause();
        this.pauseboxNode.active=true;
        this.stop_bgm();
    }
    resume_game(){
        cc.director.resume();
        this.pauseboxNode.active=false;
        this.play_bgm();
    }
    exit_game(){
        this.stop_bgm();
        cc.director.loadScene("menu");
        
    }

    play_bgm(){
        cc.audioEngine.playMusic(this.bgm,true);
    }

    stop_bgm(){
        cc.audioEngine.stopMusic();
    }
    

    // update (dt) {}
}
