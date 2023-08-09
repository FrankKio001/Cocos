const { ccclass, property } = cc._decorator
@ccclass
export default class NewClass extends cc.Component {
    // 定義一個 creator 屬性 以便在 creator 中 指定 源
    @property(cc.Prefab)
    monster1_prefab: cc.Prefab = null
    @property(cc.Prefab)
    monster2_prefab: cc.Prefab = null
    @property(cc.Prefab)
    monster3_prefab: cc.Prefab = null
    // LIFE-CYCLE CALLBACKS:
    // 在 start 中 克隆 新節點
    cur_monster: number =0;
    max_monster: number =30;
    x: number = 10;
    y: number = 10;
    tt: number =0;
    start() {
        // 創建 預製節點
        this.cur_monster=0;
        this.max_monster=35;
        this.tt=0;
        //const clone = cc.instantiate(this.source)
        // 將 預製節點 添加到 場景
        //clone.parent = cc.director.getScene()
        //clone.setPosition(100, 100)
        //clone.setAnchorPoint(100, 100)
    }

    update(dt)
    {
        this.tt+=dt;
        if(this.tt>=0.1 && this.cur_monster <= this.max_monster){
            let room = Math.random()*13;
            let type = Math.random()*3;
            this.cur_monster+=1;
            this.tt=0;
            if(room<=1){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(900,10);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(900,10);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(900,10);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=2){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(1674,10);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(1674,10);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(1674,10);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=3){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(2661,10);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(2661,10);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(2661,10);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=4){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(60,900);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(60,900);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(60,900);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=5){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(900,900);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(900,900);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(900,900);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=6){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(1674,900);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(1674,900);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(1674,900);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=7){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(60,1674);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(60,1674);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(60,1674);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=8){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(900,1674);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(900,1674);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(900,1674);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=9){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(1674,1674);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(1674,1674);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(1674,1674);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=10){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(2661,1674);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(2661,1674);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(2661,1674);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=11){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(60,2661);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(60,2661);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(60,2661);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=12){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(1674,2661);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(1674,2661);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(1674,2661);
                    cc.find("Canvas").addChild(moster003);
                }
            }else if(room<=13){
                if(type<=1){
                    let moster001= cc.instantiate(this.monster1_prefab);
                    moster001.setPosition(2661,2661);
                    cc.find("Canvas").addChild(moster001);
                }else if(type<=2){
                    let moster002= cc.instantiate(this.monster2_prefab);
                    moster002.setPosition(2661,2661);
                    cc.find("Canvas").addChild(moster002);
                }else{
                    let moster003= cc.instantiate(this.monster3_prefab);
                    moster003.setPosition(2661,2661);
                    cc.find("Canvas").addChild(moster003);
                }
            }
        }else if(this.tt>=3 && this.cur_monster > this.max_monster){
            this.tt=0;
        }
        
    }
}
