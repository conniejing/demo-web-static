<style>
.loading-btn {
    position: relative;
    width: 200px;
    height: 100px;
}

.marker {
    color: #000;
    padding: 4px 10px;
    border: 1px solid #fff;
    white-space: nowrap;
    font-size: 12px;
    font-family: "";
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
    position: absolute;
    top: 5px;
    left: 25px;
}
</style>
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
                            <h2 class="col-md-12">加载中效果</h2>
                            <div class="col-md-12">
                                <button type="button" class="btn btn-default pull-left loading-btn" @click="corloading">点击加载
                                    <loading-comp v-show="loading"></loading-comp>
                                </button>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12">Form</h2>
                            <div class="col-md-12">
                                <v-form v-ref:form :action="formParam.submitUrl" :method="formParam.submitMethod" :data-type="formParam.dataType">
                                    <div class="box-body">
                                        <div class="col-md-6">
                                            <v-input label="车牌" field-type="text" name="carPlate" placeholder="川A ABC12" :value.sync="tmpValue.carPlate" :validator="{ required: true, minlength: 3, maxlength: 6}"></v-input>
                                        </div>
                                        <div class="col-md-6">
                                            <v-input label="密码" field-type="password" name="password" :value.sync="tmpValue.password" :validator="{ required: true, minlength: 3, maxlength: 6}"></v-input>
                                        </div>
                                        <div class="col-md-6">
                                            <v-input label="年龄" field-type="number" name="age" :value.sync="tmpValue.age" :validator="{ required: true, min: 0, max: 100 }"></v-input>
                                        </div>
                                        <div class="col-md-6">
                                            <v-input label="邮箱" field-type="email" name="email" :value.sync="tmpValue.email" :validator="{ required: true }"></v-input>
                                        </div>
                                        <div class="col-md-6">
                                            <v-select label="职业" name="career" :value.sync="tmpValue.career" placeholder="--请选择职业--" :items="tmpValue.careerList" :validator="{ required: true }"></v-select>
                                        </div>
                                        <div class="col-md-6">
                                            <v-radio label="性别" name="sex" :value.sync="tmpValue.sex" :items="tmpValue.sexList" :validator="{ required: true }"></v-radio>
                                        </div>
                                        <div class="col-md-6">
                                            <v-checkbox multiple label="车辆品牌" name="car" :value.sync="tmpValue.car" :items="tmpValue.carList" :validator="{ required: true }"></v-checkbox>
                                        </div>
                                        <div class="col-md-6">
                                            <v-checkbox label="是否拥有车" name="has" :value.sync="tmpValue.has" :text="tmpValue.hasText"></v-checkbox>
                                        </div>
                                        <div class="col-md-6">
                                            <vue-datetime-picker label="购买时间" name="picker1" :value.sync="tmpValue.buyBatteryTime" language="zh-CN" :validator="{ required: true }">
                                            </vue-datetime-picker>
                                        </div>
                                        <div class="col-md-6 row">
                                            <div class="col-md-6">
                                                <vue-datetime-picker v-ref:start-picker label="开始时间" name="startTime" :value.sync="tmpValue.startTime" :on-change="onStartDatetimeChanged" :validator="{ required: true }"></vue-datetime-picker>
                                            </div>
                                            <div class="col-md-6">
                                                <vue-datetime-picker v-ref:end-picker label="结束时间" name="endTime" :value.sync="tmpValue.endTime" :on-change="onEndDatetimeChanged" :validator="{ required: true }"></vue-datetime-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <div class="col-md-12">
                                            <button type="submit" class="btn btn-primary" @click.stop.prevent="submit">保存</button>
                                            <button type="button" class="btn btn-default" onClick="history.back()">取消</button>
                                            <button type="button" class="btn btn-default" @click.stop.prevent="reset(tmpValue)">重置</button>
                                        </div>
                                    </div>
                                </v-form>
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
                            <h2 class="col-md-12" style="margin-bottom: 30px">查看大图</h2>
                            <div class="col-md-3" v-for="n in 4">
                                <light-box></light-box>
                            </div>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 30px">多级联动</h2>
                            <linkage linkclass="linkage" :nums="4" introduce="--请选择职业--" linkurl="http://121.42.24.196:8299/yf/linkageData.php?action=data1"></linkage>
                        </div>
                        <div class="row everydemo">
                            <h2 class="col-md-12" style="margin-bottom: 30px">联动城市选择</h2>
                            <area-select width="300px" label="城市选择" name="city" :value.sync="四川省/成都市/锦江区" :validator="{ required: true }"></area-select>

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
import commonAjax from '../../components/commonAjax';
import common from '../../components/common';
import loadingComp from '../../components/Loading.vue'; // 加载组件
import formComps from '../../components/mixins/formComps.js'; // form mixins
import AreaSelect from '../../components/fields/AreaSelect.vue'; // 三级地区选择组件
import Linkage from '../../components/fields/Linkage.vue'; // 多级联动组件
import LightBox from '../../components/fields/Lightbox.vue'; // 查看大图
import '../../vendors/plugins/special/zyupload';
import '../../vendors/plugins/special/jquery.webui-popover';
import '../../vendors/plugins/special/sweetalert';
export default {
    mixins: [formComps],
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
            autodata: [],
            loading: false, // 加载数据
            // form表单数据
            tmpValue: {
                carPlate: 'A',
                password: '',
                age: 18,
                email: 'connie@163.com',
                career: '',
                careerList: [{
                    id: 1,
                    text: '医生'
                }, {
                    id: 2,
                    text: '老师'
                }],
                sex: '',
                sexList: [{
                    id: 1,
                    text: '男'
                }, {
                    id: 2,
                    text: '女'
                }],
                car: [1],
                carList: [{
                    id: 1,
                    text: '大众'
                }, {
                    id: 2,
                    text: '丰田'
                }, {
                    id: 3,
                    text: '云蜂'
                }, {
                    id: 4,
                    text: '宝马'
                }],
                has: false,
                hasText: '拥有',
                buyBatteryTime: null,
                startTime: null,
                endTime: null
            },
            formParam: {
                submitUrl: '',
                submitMethod: '',
                dataType: '',
                message: ''
            }
        };
    },
    components: {
        loadingComp,
        AreaSelect,
        Linkage,
        LightBox
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                transition.next();
            }
        }
    },
    methods: {
        // 加载
        corloading: function() {
            var self = this;
            self.loading = true;
            setTimeout(function() {
                self.loading = false;
            }, 2000);
        },
        // form表单
        reset: function(arg) {
            this.$refs.form.$children.forEach(function(field) {
                field.reset();
            })
        },
        submit: function() {
            if (this.$refs.form.validateForm()) {
                alert('submit');
                this.$refs.form.submitForm();
            }
        },
        onStartDatetimeChanged: function(newStart) {
            var endPicker = this.$refs.endPicker.control;
            endPicker.minDate(newStart);
        },
        onEndDatetimeChanged: function(newEnd) {
            var startPicker = this.$refs.startPicker.control;
            startPicker.maxDate(newEnd);
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
            finishDel: false // 是否在上传文件完成后删除预览
        });
        // Tooltips 提示框
        // https://github.com/sandywalker/webui-popover
        $('#showTooltips1').webuiPopover();
        $('#showTooltips2').webuiPopover({
            animation: 'pop'
        });


        //Gid('s_county').setAttribute('onchange', 'showArea()');
        // 自动补全
        //
        // 这个位置有bug，先记着，这个位置的断点不会被执行
        // debugger;
    }
};
</script>
