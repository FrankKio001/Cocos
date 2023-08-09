// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import game_manager from "./game_manager"

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.SpriteFrame)
    immune_frame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    default_frame: cc.SpriteFrame = null;

    @property(cc.Node)
    lifebar: cc.Node = null;

    @property(cc.Node)
    coinNode: cc.Node = null;

    @property(cc.Node)
    lifebar_UI_Node: cc.Node = null;

    @property(cc.Node)
    storeboxNode: cc.Node = null;

    @property(cc.Node)
    shotgun_button_node: cc.Node = null;

    @property(cc.Node)
    ice_bullet_button_node: cc.Node = null;

    @property(cc.Node)
    shield_button_node: cc.Node = null;

    @property(cc.Node)
    restore_health_button_node: cc.Node = null;

    @property(cc.Node)
    gm_node: cc.Node = null;

    @property(cc.Prefab)
    gethurt_part_prefab: cc.Prefab = null;

    lv:cc.Vec2 = null;
    speed_v: number = 200;
    speed_h: number = 200;

    life: number = 1;
    coin: number = 0;
    score:number =0;

    immune: boolean = false;
    rolling: boolean =false;
    stun:boolean = false;

    shotgun: boolean =false;
    shield: boolean =false;
    ice_bullets: boolean =false;

    keydown: boolean = false;
    keyup: boolean = false;
    keyleft: boolean = false;
    keyright: boolean = false;

    enemykilled: number =0;

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyup, this);

        this.life=1;
        this.coin=200;
        //this.set_coin0();
        this.ice_bullets=false;
        this.enemykilled=0;
        
    }

    start () {
        

    }

    onKeydown(event){
        let dialog = cc.find("Canvas/dialog");
        if(dialog.active==true)return;
        
        //console.log(this.rolling);
        //if(this.rolling)return;
        

        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        //console.log("keydown");
        if(event.keyCode == cc.macro.KEY.e){
            if(this.getPosition().x < 2840 && this.getPosition().x > 2350 && this.getPosition().y <1115 && this.getPosition().y > 622){
                this.enter_store();
            }
        }

        if(event.keyCode == cc.macro.KEY.a){
            //console.log("keyleft");
            //this.lv.x = -this.speed_h;
            this.keyleft = true;

        }
        if(event.keyCode == cc.macro.KEY.d){
            //console.log("keyright");
            //this.lv.x = this.speed_h;
            this.keyright = true;
        }
        if(event.keyCode == cc.macro.KEY.w ){
            //console.log("keyup");
            //this.lv.y = this.speed_v;
            this.keyup = true;
        }
        if(event.keyCode == cc.macro.KEY.s ){
            //console.log("keydown");
            //this.lv.y = -this.speed_v;
            this.keydown = true;
        }
        //this.node.getComponent(cc.RigidBody).linearVelocity = this.lv.normalize().multiplyScalar(220);
    }

    onKeyup(event){
        //if(this.rolling)return;
        //this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;
        if(event.keyCode == cc.macro.KEY.a){
            //this.lv.x=0;
            this.keyleft = false;
        }
        if(event.keyCode == cc.macro.KEY.d){
            //this.lv.x=0;
            this.keyright = false;
        }
        if(event.keyCode == cc.macro.KEY.w){
            //this.lv.y=0;
            this.keyup = false;
        }
        if(event.keyCode == cc.macro.KEY.s){
            //this.lv.y=0;
            this.keydown = false;
        }
        //this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
        
    }

    public getPosition(){
        return this.node.position;
    }

    update (dt) {
        if(this.immune){
            this.node.getComponent(cc.Sprite).spriteFrame=this.immune_frame;
        }else{
            this.node.getComponent(cc.Sprite).spriteFrame=this.default_frame;
        }

        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if(this.rolling==false){
            if(this.keyleft){
                this.lv.x = -this.speed_h
            }else if(this.keyright){
                this.lv.x = this.speed_h
            }else{
                this.lv.x = 0;
            }

            if(this.keyup){
                this.lv.y = this.speed_v
            }else if(this.keydown){
                this.lv.y = -this.speed_v
            }else{
                this.lv.y = 0;
            }

            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv.normalize().multiplyScalar(220);

            if(this.stun&& this.immune==false){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
            }
        }
    }

    public become_immune(){
        this.immune=true;
        this.scheduleOnce(()=>{
            this.immune=false;
        },0.3);
    }
    public is_immune(){
        return this.is_immune;
    }

    public stunned(){
        this.stun = true;
        this.scheduleOnce(()=>{
            this.stun=false;
        },1);
    }

    get_hurt(){
        //console.log(this.lifebar.getComponent(cc.Sprite).fillRange);
        
        if(this.life>0){
            if(this.shield){
                this.life-=0.08;
            }else{
                this.life-=0.1;
            }
            
            this.lifebar.getComponent(cc.Sprite).fillRange = this.life;
            this.lifebar_UI_Node.getComponent(cc.Sprite).fillRange = this.life;
        }
        if(this.life<=0){
            this.player_die();
        }
        
    }

    player_die(){
        let label =cc.find("Canvas/game_over_label");
        label.active=true;
        label.runAction(cc.scaleBy(3,2,2));

        this.node.runAction(cc.fadeOut(2));

        this.scheduleOnce(()=>{
            this.gm_node.getComponent("game_manager").exit_game();
        },3);

    }

    set_coin0(){
        this.coin=0;
        this.coinNode.getComponent(cc.Label).string="0";
    }
    get_coin(){
        this.coin+=5;
        let coinString = this.coin.toString();
        this.coinNode.getComponent(cc.Label).string=coinString;
    }
    minus_coin(n:number){
        this.coin-=n;
        let coinString = this.coin.toString();
        this.coinNode.getComponent(cc.Label).string=coinString;
    }

    enter_store(){
        cc.director.pause();
        this.storeboxNode.active=true;
    }
    leave_store(){
        cc.director.resume();
        this.storeboxNode.active=false;
    }

    buy_shotgun(){
        if(this.coin>=100){
            this.minus_coin(100);
            this.shotgun=true;
            this.shotgun_button_node.getComponent(cc.Button).interactable=false;
            this.shotgun_button_node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string="purchased";
        }
    }
    buy_ice_bullets(){
        if(this.coin>=75){
            this.minus_coin(75);
            this.ice_bullets=true;
            this.ice_bullet_button_node.getComponent(cc.Button).interactable=false;
            this.ice_bullet_button_node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string="purchased";
        }
    }
    buy_shield(){
        if(this.coin>=50){
            this.minus_coin(50);
            this.shield=true;
            this.shield_button_node.getComponent(cc.Button).interactable=false;
            this.shield_button_node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string="purchased";
        }
    }
    buy_health(){
        if(this.coin>=10){
            this.minus_coin(10);
            this.life=1;
            this.lifebar.getComponent(cc.Sprite).fillRange = this.life;
            this.lifebar_UI_Node.getComponent(cc.Sprite).fillRange = this.life;
        }
        

    }
    defeat_boss(){
        let label =cc.find("Canvas/game_clear_label");
        label.active=true;
        label.runAction(cc.scaleBy(3,2,2));

        this.node.runAction(cc.fadeOut(2));

        this.scheduleOnce(()=>{
            this.gm_node.getComponent("game_manager").exit_game();
        },3);
        
    }

    onBeginContact(contact, self, other){
        if(other.node.group=="wall"){
            //console.log("contactwall");
            //this.become_immune();
        }
        if(other.node.group=="door"){
            //console.log("door");
            contact.disabled=true;
        }
        if(other.node.name=="coin"){
            this.get_coin();
            other.node.destroy();
        }

        if(other.node.group=="monster"||other.node.group=="monster_bullet"){
            //console.log("hit_monster");
            if(this.immune){
                //console.log("hit_immune");
                contact.disabled=true;
            }else if(other.node.name=="moster003"||other.node.name=="moster003_boss"){
                //console.log("ghost");
                contact.disabled=true;

            }else{
                this.get_hurt();
                let hurt_part = cc.instantiate(this.gethurt_part_prefab);

                var w=contact.getWorldManifold();
                hurt_part.setPosition(w.points[0].x-300,w.points[0].y-300);
                //console.log(w.points,this.getPosition());
                cc.find("Canvas").addChild(hurt_part);
            }
        }
    }
}
