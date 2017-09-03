this.dataJson = {
    "status":0,
    "message":"",
    "result":[
      {
        "addressId":"100001",
        "userName":"JackBean",
        "streetName":"北京市朝阳区朝阳公园1",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":true
      },
      {
        "addressId":"100002",
        "userName":"sanerfang",
        "streetName":"北京市朝阳区朝阳公园2",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":false
      },
      {
        "addressId":"100003",
        "userName":"WangZi",
        "streetName":"北京市朝阳区朝阳公园3",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":false
      },
      {
        "addressId":"100004",
        "userName":"XiaoShenYang",
        "streetName":"北京市朝阳区朝阳公园4",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":false
      },
      {
        "addressId":"100005",
        "userName":"JsdBo",
        "streetName":"北京市朝阳区朝阳公园5",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":false
      },
      {
        "addressId":"100006",
        "userName":"ZhenDe",
        "streetName":"北京市朝阳区朝阳公园6",
        "postCode":"100001",
        "tel":"12345678901",
        "isDefault":false
      }
    ]
  }
var _this = this;
var vm = new Vue({
    el:'.container',
    data:{
        limitNum:3,
        curIndex:0,
        delAddressFlag:false,
        curAddress:'',
        shippingMethod:1,
        addressList:[],
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        },
    },
    methods:{
        getAddressList:function(){
            console.log(_this.dataJson)
            this.addressList = _this.dataJson.result;
            // axios.get("data/address.json").then(function(response){
            //     console.log(response)
            //     var res = response.data;
            //     if(res.status == "0"){
            //         self.addressList = res.result;
            //     }
            // }).catch(function (error) {
            //     console.log(error);
            // });
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        },
        delComfirm:function(item){
            this.delAddressFlag = true;
            this.curAddress = item;
        },
        delAddress:function(){
            var index =  this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delAddressFlag = false;
        }
    },
})