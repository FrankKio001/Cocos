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

    @property(cc.TiledMap)
    tiledMap: cc.TiledMap = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let tiledsize = this.tiledMap.getTileSize();
        let layer = this.tiledMap.getLayer("wall");
        let layerSize = layer.getLayerSize();

        //this.play_bgm();

        for(let i=0; i<layerSize.width; i++){
            for(let j=0; j<layerSize.height; j++){
                let tiled = layer.getTiledTileAt(i,j,true);
                if(tiled.gid !=0){
                    tiled.node.group="wall";

                    let body =tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledsize.width/2, tiledsize.height/2);
                    collider.size = tiledsize;
                    collider.apply();
                    //console.log("123");
                }
            }
        }

    }

    // update (dt) {}
}
