// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

let roleMap = {
    1:{
        name:"me",
        url:"role/undead_112"
    },
    2:{
        name:"mysterious sound",
        url:"role/undead_110"
    }
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Sprite)
    role_sprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    textLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    textDataArray = null;
    textIndex = -1;

    nowText = null;
    textEnd:boolean = true;
    tt = 0;

    onLoad () {
        /*this.init([
            {role: 2, content:"大家好，我是魔王"},
            {role: 1, content:"大家好，我是勇者"},
            {role: 2, content:"大家好，我是魔王2"},
            {role: 1, content:"大家好，我是勇者2"},
            {role: 2, content:"大家好，我是魔王3"},
            {role: 1, content:"大家好，我是勇者3"},
            
        ]);*/
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);

    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);
    }

    onKeydown(e){
        if(e.keyCode == cc.macro.KEY.space){
            this.nextTextData();
        }
    }

    public init(textDataArray){
        this.nowText=null;
        this.textEnd=true;
        this.tt=0;

        this.textIndex = -1;
        this.textDataArray = textDataArray;
        this.node.active = true;
        this.nextTextData();
    }

    nextTextData(){
        if(!this.textEnd) return;
        if(++this.textIndex < this.textDataArray.length){
            this.setTextData(this.textDataArray[this.textIndex]);
        }else{
            this.closeDialog();
        }
    }

    setTextData(textData){
        if(this.textEnd==false) return;
        this.textEnd= false;

        this.nameLabel.string=roleMap[textData.role].name;
        this.textLabel.string="";
        this.nowText = textData.content;

        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture)=>{
            this.role_sprite.spriteFrame = texture;
        })
    }

    closeDialog(){
        this.node.active =false;
    }

    start () {

    }

    update (dt) {
        if(this.nowText==null) return;
        this.tt+=dt;

        if(this.tt>=0.03){
            if(this.textLabel.string.length < this.nowText.length){
                this.textLabel.string = this.nowText.slice(0,this.textLabel.string.length+1);
            }else{
                this.textEnd = true;
                this.nowText = null;
            }
            this.tt = 0;
        }
    }
}
