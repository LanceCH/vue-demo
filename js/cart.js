this.dataJson = {
  "status":1,
  "result":{
    "totalMoney":109,
    "list":[
      {
        "productId":"600100002115",
        "productName":"黄鹤楼香烟",
        "productPrice":19,
        "productQuantity":1,
        "productImage":"img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机",
            "imgSrc":"img/part-1.jpg"
          }
        ]
      },
      {
        "productId":"600100002120",
        "productName":"加多宝",
        "productPrice":8,
        "productQuantity":5,
        "productImage":"img/goods-2.jpg",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"吸管",
            "imgSrc":"img/part-2.jpg"
          }
        ]
      },
      {
        "productId":"600100002117",
        "productName":"金装黄鹤楼",
        "productPrice":25,
        "productQuantity":2,
        "productImage":"img/goods-1.jpg",
        "parts":[
          {
            "partsId":"10001",
            "partsName":"打火机-1",
            "imgSrc":"img/part-1.jpg"
          },
          {
            "partsId":"10002",
            "partsName":"打火机-2",
            "imgSrc":"img/part-1.jpg"
          }
        ]
      }
    ]
  },
  "message":""
}
//过滤器顺序应在调用的前面
Vue.filter("gMoney",function(value,type){
  return "￥" +value.toFixed(2)+type;
})
var _this = this;

var vm = new Vue({
  el:'#app',
  data:{
      totalMoney:0,
      productList:[],
      checkAllFlag:false,
      delFlag:false,
      curProduct:'',
  },
  filters:{
      amount:function(value){
          return "￥" +value.toFixed(2);
      }
  },
  mounted:function(){
      //this.$nextTick(function () {
          // 代码保证 this.$el 在 document 中
          this.cartView();
        //})
      
  },
  methods:{
      cartView:function(){
          this.productList = _this.dataJson.result.list;
          //this.totalMoney = _this.dataJson.result.totalMoney;

      },
      changeAmount:function(item,value){
          if(value==0){
            item.productQuantity--;
            if(item.productQuantity<1){
              item.productQuantity = 1;
            }
          }else{
            item.productQuantity++;
          }
          //计算总金额
          this.calcTotalPrice();
      },
      selectProduct:function(item){
        if( typeof item.checked == 'undefined'){
          // Vue.set(item,"checked",true);
          this.$set(item,"checked",true);
        }else{
          item.checked = !item.checked;
        }
        //对全选做处理
        var checkAllFlag = true;
        this.productList.forEach(function(item,index){
          console.log('checked:'+item.checked)
          console.log('checkAllFlag:'+checkAllFlag)
          checkAllFlag = checkAllFlag && item.checked;
          console.log(checkAllFlag)
          });
        this.checkAllFlag = checkAllFlag;
        //计算总金额
        this.calcTotalPrice();
      },
      checkAll:function(flag){
        this.checkAllFlag = flag;
        var self = this;
        self.productList.forEach(function(item,index){
          if( typeof item.checked == 'undefined'){
            self.$set(item,"checked",self.checkAllFlag);
          }else{
            item.checked = self.checkAllFlag;
          }
        });
        //计算总金额
        this.calcTotalPrice();  
      },
      calcTotalPrice:function(){
        var self = this;
        self.totalMoney = 0;
        this.productList.forEach(function(item,index){
          if(item.checked){
            self.totalMoney += item.productPrice * item.productQuantity;
          }
        });
      },
      delComfirm:function(item){
        this.delFlag = true;
        this.curProduct = item;

      },
      delProduct:function(){
        var index = this.productList.indexOf(this.curProduct);
        this.productList.splice(index,1);
        this.delFlag = false;
      }
      
  }
})

  