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

    @property(cc.Node)
    player: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        let target_position = this.player.getPosition();

        //target_position.y = cc.misc.clampf(target_position.y,0,213);
        //target_position.x = cc.misc.clampf(target_position.x,0,525);

        let current_position = this.node.getPosition();
        
        current_position.lerp(target_position,0.1,current_position);

        this.node.setPosition(current_position);
        
    }
}
