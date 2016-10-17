define(function(require, exports, module) {

    //加载datepicker
    require('bootstrap-datetimepicker');
    require('jquery.datetimepicker');
    //加载其他插件
    require('lightbox');
    require('chart');
    require('zyupload');
    require('sweetalert');
    require('area');
    require('popover');

    var api = require("api");
    var commonAjax = require('commonAjax');
    var common = require('common');
    //加载分页组件
    //获取每页多少条参数
    var pageCount = require('pagination').pageCount;

    var demo = Vue.extend({
        template: require('./demo.html'),
        data: function() {
            return {
                pagination: {
                    pageSize: '',   //本页多少条
                    totalSize: '',  //一共多少条
                    page: ''        //当前页数
                },
                vehicleList: [],
                params:{
                    carPlate: '',
                    // vehicleModel: '',
                    auditStatus: ''
                },
                //顶部消息提示数据
                callout: {
                    failed: '',
                    info: '',
                    warning: '',
                    success: '',
                    autoclose: true
                },
                //autocomplete获取的数据
                autodata:[]
            }
        },
        route: {
            data: function(transition) {
                if(common.noLoginRedirect()){
                    //通过路由的query对象设置初始搜索参数
                    this.params.carPlate = this.$route.query.carPlate;
                    // this.params.vehicleModel = this.$route.query.vehicleModel;
                    this.params.auditStatus = this.$route.query.auditStatus;

                    //获取ajax请求参数
                    var params = this.$route.query;
                    //TODO 需要对接userId
                    params.userId = common.getUserId();
                    commonAjax.ajaxGetJson(api.vehicle.list, params, function(data){

                        //调用 transition.next(data) 会为组件的 data 相应属性赋值。
                        //例如，使用 { a: 1, b: 2 } ，路由会调用
                        //component.$set('a', 1) 以及 component.$set('b', 2) 。
                        //在调用 transition.next() 前组装好data
                        var total = {
                            "vehicleList": data.rows,
                            "pagination": {
                                "pageSize": data.pageSize,
                                "totalSize": data.totalRows,
                                "page": data.pageNo
                            }
                        }
                        transition.next(total);
                    });
                }
            },
            //当组件被创建而且将要切换进入的时候被调用
            //对外提供组件对象
            activate: function(transition) {
                exports.vComp = this;
                transition.next();
            }
        },
        methods: {
            loading: function() {
                common.UI.setload();
                setTimeout(function () {
                    common.UI.removeload();
                },2000)
            },
            corloading: function () {
                common.UI.setcornerload();
                setTimeout(function () {
                    common.UI.removecornerload();
                },2000)
            },
            sweetSuccess: function () {
                swal({title: "成功了哦",text: "分分钟就成功了呀...",type: "success",timer: 800});
            },
            sweetError: function () {
                swal("出问题了", "这个问题前所未见，我正在修复中...", "error");
            },
            sweetWarning: function () {
                swal("注意：", "这是一个警告框，我实在是编不出内容了...", "warning");
            },
            sweetAjax: function () {
                swal({
                    title: "一个请求框!",
                    text: "在这里输入信息并请求到后台...",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Write something",
                    showLoaderOnConfirm: true
                }, function(inputValue) {

                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("您什么都没有写呀......");
                        return false;
                    }else if (inputValue.length > 8) {
                        swal.showInputError("内容太多啦，不超过8个字哦!");
                        return false;
                    }else {
                        //在这里发送Ajax请求，请求的回调函数再关闭这个框框
                        setTimeout(function () {
                            swal({title: "成功了哦",text: "分分钟就成功了呀...",type: "success",timer: 800});
                        },2000);
                    }
                });
            },
            autocomplete: function () {
                //假数据
                var datajson = [
                    {id:"101",text:"搜索到的信息1"},
                    {id:"102",text:"搜索到的信息2"},
                    {id:"103",text:"搜索到的信息3"},
                    {id:"104",text:"搜索到的信息4"},
                    {id:"105",text:"搜索到的信息5"}
                ];
                if(this.autoValue.length < 3 && this.autoValue.length > 0){
                    this.autodata = datajson;
                }else{
                    this.autodata = [];
                }

            },
            completetext: function (event) {
                this.autoValue = event.target.innerHTML;

                //不操作DOM完全不知道怎么做呀
                event.target.parentNode.style.display = "none";
            }
        },
        events: {
            //
        },
        ready: function () {
            //初始化时间控件
            $("#startTime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',autoclose: true,minuteStep: 1});
            $("#endTime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',autoclose: true,minuteStep: 1});
            //结束时间需大于开始时间
            $(document).on('change', '#startTime', function() {
                var TimeValue = $(this).val();
                if(TimeValue != ""){
                    $("#endTime").datetimepicker('setStartDate', TimeValue);
                }
            });
            $(document).on('change','#endTime',function(){
                var TimeValue = $(this).val();
                if(TimeValue != "") {
                    $("#startTime").datetimepicker('setEndDate', TimeValue);
                }
            });


            //初始化图表chart
            //http://www.bootcss.com/p/chart.js/docs/
            var data = [
                {
                    value: 30,
                    color:"#F38630"
                },
                {
                    value : 50,
                    color : "#E0E4CC"
                },
                {
                    value : 100,
                    color : "#69D2E7"
                }
            ];
            var defaults = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke : true,

                //String - The colour of each segment stroke
                segmentStrokeColor : "#fff",

                //Number - The width of each segment stroke
                segmentStrokeWidth : 2,

                //Boolean - Whether we should animate the chart
                animation : true,

                //Number - Amount of animation steps
                animationSteps : 100,

                //String - Animation easing effect
                animationEasing : "easeOutBounce",

                //Boolean - Whether we animate the rotation of the Pie
                animateRotate : true,

                //Boolean - Whether we animate scaling the Pie from the centre
                animateScale : false,

                //Function - Will fire on animation completion.
                onAnimationComplete : null
            }
            var ctx = document.getElementById("myChart").getContext("2d");
            var myNewChart = new Chart(ctx).Pie(data,defaults);


            //初始化上传组件
            $("#demoUpload").zyUpload({
                width:"100%",// 宽度
                height:"auto",// 宽度
                itemWidth:"120px",// 文件项的宽度
                itemHeight :"100px",// 文件项的高度
                url:"",
                multiple:true,// 是否可以多个文件上传
                dragDrop:false,// 是否可以拖动上传文件
                del:true,// 是否可以删除文件
                finishDel:false, // 是否在上传文件完成后删除预览
            });



            //Tooltips 提示框
            //https://github.com/sandywalker/webui-popover
            $('#showTooltips1').webuiPopover();
            $('#showTooltips2').webuiPopover({animation:'pop'});
            


            //三级联动，地区组件
            _init_area();

            var Gid  = document.getElementById ;
            var showArea = function(){
                Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" +
                    Gid('s_city').value + " - 县/区" +
                    Gid('s_county').value + "</h3>"
            }
            Gid('s_county').setAttribute('onchange','showArea()');



            //自动补全
            //

            //这个位置有bug，先记着，这个位置的断点不会被执行
            //debugger;


        }
    });

    exports.demo = demo;
});
