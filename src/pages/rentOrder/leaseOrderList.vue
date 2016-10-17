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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>租赁开始时间</label>
                                    <input id="startTime" type="text" class="form-control" placeholder="" v-model="params.startTime">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>租赁结束时间</label>
                                    <input id="endTime" type="text" class="form-control" placeholder="" v-model="params.endTime">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>车牌</label>
                                    <input type="text" class="form-control" placeholder="" v-model="params.cardNo">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>车单状态</label>
                                    <select class="form-control" v-model="params.orderStatus">
                                        <option value="NEW">等待车主审核</option>
                                        <option value="ALLOWED">同意用车申请</option>
                                        <option value="NOTALLOWED">拒绝用车申请</option>
                                        <option value="LOANCAR">车主已交车</option>
                                        <option value="LEASED">用车人已拿车</option>
                                        <option value="RETURNCAR">用车人已还车</option>
                                        <option value="FINISH">车主已收车--完成</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 btn-toolbar">
                                <button type="button" class="btn btn-primary pull-right" @click="searchSubmit">搜索</button>
                                <button type="button" class="btn btn-default pull-right" @click="searchReset">重置</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">车辆列表</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table id="vehicleList" class="table table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th>车单号</th>
                                        <th>车牌</th>
                                        <th>租车人</th>
                                        <th>里程</th>
                                        <th>金额</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="leaseOrder in leaseOrderList">
                                        <td v-text="leaseOrder.orderId"></td>
                                        <td  v-if="leaseOrder.vehicle" v-text="leaseOrder.vehicle.carPlate"></td>
                                        <td v-text="leaseOrder.renterName"></td>
                                        <td v-text="leaseOrder.mileage"></td>
                                        <td v-text="leaseOrder.money"></td>
                                        <td v-if="leaseOrder.status==='NEW'">等待车主审核</td>
                                        <td v-if="leaseOrder.status==='ALLOWED'">车主同意租车</td>
                                        <td v-if="leaseOrder.status==='NOTALLOWED'">车主不同意租车</td>
                                        <td v-if="leaseOrder.status==='LOANCAR'">车主已交车</td>
                                        <td v-if="leaseOrder.status==='LEASED'">用车人已拿车</td>
                                        <td v-if="leaseOrder.status==='RETURNCAR'">用车人已还车</td>
                                        <td v-if="leaseOrder.status==='FINISH'">车主已确认收车</td>
                                        <td>
                                            <a v-link="{ path: '/leaseOrder/info/' + (leaseOrder.orderId) }">详情</a>
                                            <a v-if="leaseOrder.status === 'NEW'" v-link="{ path: '/leaseOrder/edit/' + (leaseOrder.orderId) }">等待车主审核</a>
                                            <a v-if="leaseOrder.status === 'ALLOWED'" v-link="{ path: '/leaseOrder/edit/' + (leaseOrder.orderId) }">等待车主交车</a>
                                            <a v-if="leaseOrder.status === 'RETURNCAR'" v-link="{ path: '/leaseOrder/edit/' + (leaseOrder.orderId) }">等待车主收车</a>
                                        </td>
                                        <!--
                                       --NEW("用车人申请待审核"),显示待审核
                                       --ALLOWED("车主审核通过"),显示车主交车
                                       NOTALLOWED("车主审核未通过"),不显示操作
                                       LOANCAR("车主交车待确认"),不显示操作
                                       LEASED("用车人确认拿车---用车中"), 不显示操作
                                       --RETURNCAR("用车人还车--待确认还车"),显示：车主确认收车
                                       FINISH("车主已收车--完成");不显示操作
                                      -->
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-12 tableInfo" v-if="pagination.totalSize =='0'">
                                <i class="tableInfoIcon fa fa-bell"></i>
                                <p class="tableInfoText">没有查询到数据</p>
                            </div>
                        </div>
                        <div class="row">
                            <pagination :page=pagination.page :page-size=pagination.pageSize :total-size=pagination.totalSize></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import common from '../../components/common';
    import commonAjax from '../../components/commonAjax';
    import callout from '../../components/Callout.vue';
    import pagination from '../../components/Pagination.vue';
    import api from '../../components/apiConfig';

    export default{
        data: function(){
            return {
                pagination: {
                    pageSize: '',   //本页多少条
                    totalSize: '',  //一共多少条
                    page: ''        //当前页数
                },
                leaseOrderList: [],
                params:{
                    cardNo: '',
                    startTime: '',
                    endTime:'',
                    orderStatus: ''
                },
                //顶部消息提示数据
                callout: {
                    failed: '',
                    info: '',
                    warning: '',
                    success: '',
                    autoclose: true
                }
            }
        },
        components: {
            callout,
            pagination
        },
        route: {
            data: function(transition){
                if(common.noLoginRedirect()){
                    //通过路由的query对象设置初始搜索参数
                    this.params.cardNo = this.$route.query.cardNo;
                    this.params.startTime = this.$route.query.startTime;
                    this.params.endTime = this.$route.query.endTime;
                    this.params.orderStatus = this.$route.query.orderStatus;

                    //获取ajax请求参数
                    var params = this.$route.query;
                    params.userId = '301';
                    commonAjax.ajaxGetJson(api.leaseOrder.list, params, function(data){

                        //调用 transition.next(data) 会为组件的 data 相应属性赋值。
                        //例如，使用 { a: 1, b: 2 } ，路由会调用
                        //component.$set('a', 1) 以及 component.$set('b', 2) 。
                        //在调用 transition.next() 前组装好data
                        var total = {
                            "leaseOrderList": data.rows,
                            "pagination": {
                                "pageSize": data.pageSize,
                                "totalSize": data.totalRows,
                                "page": data.currentPage
                            }
                        }
                        transition.next(total);
                    });
                    this.initDateTime();
                }
            }
        },
        methods: {
            searchReset: function() {
                this.params = {
                    cardNo: '',
                    startTime: '',
                    endTime:'',
                    orderStatus: ''
                };
            },
            //搜索参数利用路由的query对象传递
            //搜索时需要附带分页信息
            searchSubmit: function() {
                this.$route.query.currentPage = 1;
                this.$route.query.pageSize = this.pagination.pageSize;
                this.$route.query.cardNo = this.params.cardNo;
                if(this.params.startTime != "" && this.params.startTime != undefined){
                    this.$route.query.startTime = Date.parse(this.params.startTime);
                }else{
                    this.$route.query.startTime = this.params.startTime;
                }
                if(this.params.endTime != "" && this.params.endTime != undefined){
                    this.$route.query.endTime = Date.parse(this.params.endTime);
                }else{
                    this.$route.query.endTime = this.params.endTime;
                }
                this.$route.query.orderStatus = this.params.orderStatus;
                var params = this.$route.query;
                router.go({ query: params });
            },
            initDateTime: function() {
                //设置日期控件初始值
                var startTime = parseInt(this.$route.query.startTime);
                if(startTime > 1){
                    var normaldate = common.formatDateTime(startTime);
                    this.params.startTime = normaldate;
                    $("#startTime").datetimepicker('update');
                    $("#endTime").datetimepicker('setStartDate', normaldate);
                }

                var endTime = parseInt(this.$route.query.endTime);
                if(endTime > 1){
                    var normaldate = common.formatDateTime(endTime);
                    this.params.endTime = normaldate;
                    $("#endTime").datetimepicker('update');
                    $("#startTime").datetimepicker('setEndDate', normaldate);
                }
            }
        },
        events: {
            //分页监听事件，用于监听分页参数变动
            //注意：事件名不能更改，利用路由的query对象传递页数参数
            setPage: function(index) {
                this.$route.query.currentPage = index;
                this.$route.query.pageSize = this.pagination.pageSize;
                var params = this.$route.query;
                router.go({ query: params });
            }
        },
        ready: function() {
            $("#startTime").datetimepicker({
                format: 'yyyy-mm-dd hh:ii',
                autoclose: true,
                minuteStep: 5
            });
            $("#endTime").datetimepicker({
                format: 'yyyy-mm-dd hh:ii',
                autoclose: true,
                minuteStep: 5
            });

            this.initDateTime();

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
            //设置日期控件初始值
//            var rentDateMs = parseInt(this.$route.query.rentDate);
//            if(rentDateMs > 1){
//                var date = new Date(rentDateMs);
//                $('#rentDate').datepicker('update', date);
//            }
        }
    }
</script>