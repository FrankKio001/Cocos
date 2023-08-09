// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.SpriteFrame)
    closeframe: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    openframe: cc.SpriteFrame = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
            contact.disabled=true;
            this.node.getComponent(cc.Sprite).spriteFrame = this.openframe;
            
        }
    }
    onEndContact(contact, self, other){
        if(other.node.name=="player"){
            this.scheduleOnce(()=>{
                this.node.getComponent(cc.Sprite).spriteFrame = this.closeframe;
            },0.5);
        }
    }
}
