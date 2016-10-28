<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">消息中心</h3>
            </div>
            <validator name="validation">
                <form>
                    <div class="box-body">
                        <div class="col-md-6">
                            <div class="box box-solid box-warning">
                                <div class="box-header with-border">
                                    <div class="user-block">
                                        <span>你有待处理订单</span>
                                        <span class="badge bg-red pull-right" v-text="untreatedOrdersTotalCount"></span>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <p v-for="untreatedOrder in untreatedOrders | limitBy 10">
                                        <span v-text="untreatedOrder.orderId"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="box box-solid box-warning">
                                <div class="box-header with-border">
                                    <div class="user-block">
                                        <span>你有未读系统消息</span>
                                        <span class="badge bg-red pull-right" v-text="unreadNotificationsTotalCount"></span>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <p v-for="notification in unreadNotifications | limitBy 10">
                                        <span v-text="notification.content"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </validator>
        </div>
    </section>
</template>

<script>
import common from '../../components/common';
import commonAjax from '../../components/commonAjax';
import callout from '../../components/Callout.vue';
import api from '../../components/apiConfig';
export default {
    data: function() {
        return {
            // 顶部消息提示数据
            callout: {
                failed: '',
                info: '',
                warning: '',
                success: '',
                autoclose: true
            },
            unreadNotifications: [],
            unreadNotificationsTotalCount: 0,
            untreatedOrders: [],
            untreatedOrdersTotalCount: 0
        };
    },
    components: {
        callout
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var userId = '301';
                var unreadNotificationUrl = common.replaceUrl(api.auth.unreadNotifications, [{
                    'key': 'userId',
                    'value': userId
                }]);
                var untreatedOrdersUrl = common.replaceUrl(api.auth.untreatedOrders, [{
                    'key': 'userId',
                    'value': userId
                }]);
                var result = {};
                commonAjax.ajaxGetJson(unreadNotificationUrl, null, function(data) {
                    result.unreadNotifications = data.notificationDTOs;
                    result.unreadNotificationsTotalCount = data.totalCount;
                });
                commonAjax.ajaxGetJson(untreatedOrdersUrl, null, function(data) {
                    result.untreatedOrders = data.orders;
                    result.untreatedOrdersTotalCount = data.totalCount;
                });
                transition.next(result);
            }
        }
    },
    methods: {
        onSubmit: function() {
            //
        }
    }
};
</script>
