<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">搜索</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <h1 class="col-md-12">demo演示</h1>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">时间控件</h2>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>开始时间</label>
                                    <input id="startTime" type="text" class="form-control" v-model="params.startTime" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>结束时间</label>
                                    <input id="endTime" type="text" class="form-control" v-model="params.endTime" />
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">加载中效果</h2>
                            <div class="col-md-12">
                                <button type="button" class="btn btn-primary pull-left" @click="loading">满屏加载</button>
                                <button type="button" class="btn btn-default pull-left" @click="corloading">角落加载</button>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">顶部提示框</h2>
                            <div class="bs-example col-md-12">
                                <div class="alert alert-success" role="alert">
                                    <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
                                </div>
                                <div class="alert alert-info" role="alert">
                                    <strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it's not super important.
                                </div>
                                <div class="alert alert-warning" role="alert">
                                    <strong>Warning!</strong> Better check yourself, you're <a href="#" class="alert-link">not looking too good</a>.
                                </div>
                                <div class="alert alert-danger" role="alert">
                                    <strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">IOS开关</h2>
                            <div class="col-md-1">
                                <label class="iosCheck">
                                    <input type="checkbox" v-model="theFirstChecked"><i></i></label>
                            </div>
                            <div class="col-md-5">
                                {{ theFirstChecked || false }}
                            </div>
                            <div class="col-md-1">
                                <label class="iosCheck">
                                    <input type="checkbox" checked="checked" v-model="theLastChecked"><i></i></label>
                            </div>
                            <div class="col-md-5">
                                {{ theLastChecked }}
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">进度条</h2>
                            <div class="col-md-12">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                                        <span class="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                                        60%
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                        <span class="sr-only">40% Complete (success)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
                                        <span class="sr-only">45% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">下拉菜单</h2>
                            <div class="col-md-12">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                                        Action <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">弹出层和弹出框</h2>
                            <div class="col-md-6">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                                    Launch demo modal
                                </button>
                            </div>
                            <div class="col-md-6">
                                <button type="button" class="btn btn-success btn-lg" @click="sweetSuccess">Success</button>
                                <button type="button" class="btn btn-danger btn-lg" @click="sweetError">Error</button>
                                <button type="button" class="btn btn-warning btn-lg" @click="sweetWarning">Warning</button>
                                <button type="button" class="btn btn-info btn-lg" @click="sweetAjax">Ajax</button>
                            </div>
                            <!-- Modal -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 50px">图表chart</h2>
                            <div class="col-md-6">
                                <canvas id="myChart1" width="400" height="400"></canvas>
                            </div>
                            <div class="col-md-6">
                                <canvas id="myChart2" width="400" height="400"></canvas>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 30px">查看大图</h2>
                            <div class="col-md-3" v-for="n in 4">
                                <a data-lightbox="m" href="http://res.meng2u.com/user_icon/024/928/YNmwblJvoM8GjfXf.jpg"><img src="http://res.meng2u.com/user_icon/024/928/YNmwblJvoM8GjfXf.jpg" width="200" height="200" alt="" /></a>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 30px">联动城市选择</h2>
                            <div class="col-md-12 docs-methods">
                                <form class="form-inline">
                                    <div id="distpicker">
                                        <div class="form-group">
                                            <div style="position: relative;">
                                                <input id="city-picker3" class="form-control" readonly type="text" value="江苏省/常州市/溧阳市" data-toggle="city-picker">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-warning" id="reset" type="button">重置</button>
                                            <button class="btn btn-danger" id="destroy" type="button">确定</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">上传组件</h2>
                            <div class="col-md-12">
                                <div id="demoUpload"></div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 30px">输入框自动补全</h2>
                            <div class="col-md-12 autoComplete" style="position: relative">
                                <div class="form-group">
                                    <label for="autocomplete">随便输入个abc试试</label>
                                    <input id="autocomplete" type="text" class="form-control" name="autocomplete" placeholder="随便Enter" maxlength="16" @keyup="autocomplete" v-model="autoValue" />
                                </div>
                                <div class="list-group" v-show="autodata.length != '0'">
                                    <a href="javascript:void(0)" class="list-group-item" v-for="single in autodata" v-text="single.text" @click="completetext"></a>
                                </div>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 20px">Tooltips提示</h2>
                            <div class="col-md-12">
                                <button type="button" id="showTooltips1" class="btn btn-default" data-content="Contents..." data-placement="top">Success</button>
                                <button type="button" id="showTooltips2" class="btn btn-default" data-title="Title" data-content="Contents..." data-placement="right">Success</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import common from '../../components/common';
import callout from '../../components/Callout.vue';
import '../../vendors/plugins/special/lightbox-2.6.min';
import '../../vendors/plugins/special/zyupload';
import '../../vendors/plugins/special/jquery.webui-popover';
import '../../vendors/plugins/special/sweetalert';
// import ChineseDistricts from '../../vendors/plugins/special/citydata';
import '../../vendors/plugins/special/city';
import Chart from 'chart.js';
export default {
    data: function() {
        return {
            pagination: {
                pageSize: '',
                totalSize: '',
                page: ''
            },
            vehicleList: [],
            params: {
                carPlate: '',
                // vehicleModel: '',
                auditStatus: ''
            },
            // 顶部消息提示数据
            callout: {
                failed: '',
                info: '',
                warning: '',
                success: '',
                autoclose: true
            },
            // autocomplete获取的数据
            autodata: []
        };
    },
    components: {
        callout
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                transition.next();
            }
        }
    },
    methods: {
        loading: function() {
            common.UI.setload();
            setTimeout(function() {
                common.UI.removeload();
            }, 2000);
        },
        corloading: function() {
            common.UI.setcornerload();
            setTimeout(function() {
                common.UI.removecornerload();
            }, 2000);
        },
        sweetSuccess: function() {
            swal({
                title: '成功了哦',
                text: '分分钟就成功了呀...',
                type: 'success',
                timer: 800
            });
        },
        sweetError: function() {
            swal('出问题了', '这个问题前所未见，我正在修复中...', 'error');
        },
        sweetWarning: function() {
            swal('注意：', '这是一个警告框，我实在是编不出内容了...', 'warning');
        },
        sweetAjax: function() {
            swal({
                title: '一个请求框!',
                text: '在这里输入信息并请求到后台...',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: 'slide-from-top',
                inputPlaceholder: 'Write something',
                showLoaderOnConfirm: true
            }, function(inputValue) {
                if (inputValue === false) return false;
                if (inputValue === '') {
                    swal.showInputError('您什么都没有写呀......');
                    return false;
                } else if (inputValue.length > 8) {
                    swal.showInputError('内容太多啦，不超过8个字哦!');
                    return false;
                } else {
                    // 在这里发送Ajax请求，请求的回调函数再关闭这个框框
                    setTimeout(function() {
                        swal({
                            title: '成功了哦',
                            text: '分分钟就成功了呀...',
                            type: 'success',
                            timer: 800
                        });
                    }, 2000);
                }
            });
        },
        autocomplete: function() {
            // 假数据
            var datajson = [{
                id: '101',
                text: '搜索到的信息1'
            }, {
                id: '102',
                text: '搜索到的信息2'
            }, {
                id: '103',
                text: '搜索到的信息3'
            }, {
                id: '104',
                text: '搜索到的信息4'
            }, {
                id: '105',
                text: '搜索到的信息5'
            }];
            if (this.autoValue.length < 3 && this.autoValue.length > 0) {
                this.autodata = datajson;
            } else {
                this.autodata = [];
            }
        },
        completetext: function(event) {
            this.autoValue = event.target.innerHTML;
            event.target.parentNode.style.display = 'none';
        }
    },
    events: {
        //
    },
    ready: function() {
        // 初始化时间控件
        $('#startTime').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            autoclose: true,
            minuteStep: 1
        });
        $('#endTime').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            autoclose: true,
            minuteStep: 1
        });
        // 结束时间需大于开始时间
        $(document).on('change', '#startTime', function() {
            var TimeValue = $(this).val();
            if (TimeValue !== '') {
                $('#endTime').datetimepicker('setStartDate', TimeValue);
            }
        });
        $(document).on('change', '#endTime', function() {
            var TimeValue = $(this).val();
            if (TimeValue !== '') {
                $('#startTime').datetimepicker('setEndDate', TimeValue);
            }
        });
        // 初始化图表chart
        // http://www.bootcss.com/p/chart.js/docs/
        var ctx1 = document.getElementById("myChart1");
        var myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        var ctx2 = document.getElementById("myChart2");
        var myChart2 = new Chart(ctx2,{
            type: 'pie',
            data: {
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            },
            options: ''
        });



        // 初始化上传组件
        $('#demoUpload').zyUpload({
            width: '100%', // 宽度
            height: 'auto', // 宽度
            itemWidth: '120px', // 文件项的宽度
            itemHeight: '100px', // 文件项的高度
            url: '',
            multiple: true, // 是否可以多个文件上传
            dragDrop: false, // 是否可以拖动上传文件
            del: true, // 是否可以删除文件
            finishDel: false, // 是否在上传文件完成后删除预览
        });

        // Tooltips 提示框
        // https://github.com/sandywalker/webui-popover
        $('#showTooltips1').webuiPopover();
        $('#showTooltips2').webuiPopover({
            animation: 'pop'
        });

        // 三级联动，地区组件
//        var $citypicker1 = $('#city-picker1');
//
//        $citypicker1.citypicker();
//
//        var $citypicker2 = $('#city-picker2');
//
//        $citypicker2.citypicker({
//            province: '江苏省',
//            city: '常州市',
//            district: '溧阳市'
//        });

        var $citypicker3 = $('#city-picker3');

        $('#reset').click(function () {
            $citypicker3.citypicker('reset');
        });

        $('#destroy').click(function () {
            $citypicker3.citypicker('destroy');
        });

        $('[data-toggle="city-picker"]').citypicker();






        //Gid('s_county').setAttribute('onchange', 'showArea()');
        // 自动补全
        //
        // 这个位置有bug，先记着，这个位置的断点不会被执行
        // debugger;
    }
};
</script>
