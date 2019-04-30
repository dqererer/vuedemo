
var vm = new Vue({
    el:'#vuejs',
    data:{
        isPop:false,
        info:"",
        message:"",
        //type = 1 新增；type = 2 修改
        type:0,
        //要修改的内容的index
        index:0,
        items:[],
        isOver:false
    },  
    methods: {
        add:function(){
            this.info = "新建备忘录";
            //debugger
            this.type = 1;
            this.pop();
        },
        /**
         * 更新记录
         * param {int} index 数组序号
         * return null
         */
        renew:function(index){
             //debugger
            this.info = "修改备忘录";
            var obj = this.items[index]
            this.index = index;
            this.message = obj.text;
           
            this.type = 2;
            this.pop();
        },
        pop:function(){
            this.isPop = true;
        },
        close:function(){
            this.isPop = false;
            this.message = "";
        },
        save:function(){
            //debugger
            if(this.type == 1){
                //把新建的内容封装成对象
                var obj = {
                    text:this.message
                }
                //获取一下当前的localstorage
                var arr = this.getStorage();
                //做一下storage的非空校验
                if(!arr){
                    arr = [];     
                }
                //把新建的对象追加到数组后面
                arr.push(obj);
            }
            else if(this.type == 2){
                var arr = this.items;
                arr[this.index].text = this.message;
                arr.reverse();
            }
            //把这个数组存到localstorage上
            this.setStorage(arr);
            //更新一下date的数据
            this.update();
            //重置一下v-model的初始值
            this.message = "";
            //关闭弹框
            this.close();
        },
        
        getStorage:function(){
            //获取当前localstorage的字符串
            var str = localStorage.getItem("todolist");
            //把取出的字符串转化成数组
            var arr = JSON.parse(str);    
            return arr;
        },
        setStorage:function(arr){
            //把需要存储的数组转化成字符串
            var str = JSON.stringify(arr);
            //存储字符串
            localStorage.setItem("todolist",str);
        },
        update:function(){
            //获取当前的localstorage
            var arr = this.getStorage();
            
             if(arr){
                 //颠倒数组顺序，以便倒序展示
                arr.reverse();
                //将最新的数组同步给date
                this.items = arr;
            }
            else{
                this.items = [];
            }
            
            
        },
        over:function(){
            this.isOver = true;
        },
        leave:function(){
            this.isOver = false;
        },
        remove:function(index){
            debugger
            var arr = this.items;
            arr.splice(index,1);
            arr.reverse();
            this.setStorage(arr);
            this.update();
        }
    },
    created: function () {
        this.update();
      }
})