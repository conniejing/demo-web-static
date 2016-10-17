<template>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 v-else class="box-title">事件信息</h3>
            </div>
            <div class="dl-horizontal">
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>车牌</dt>
                            <dd v-text="vehicle.carPlate"></dd>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <dt>上报时间</dt>
                            <dd v-text="vehicle.uploadTime | dateTime"></dd>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <dt>内容详情</dt>
                            <dd v-text="vehicle.content"></dd>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-md-12">
                        <button id="vehicleEventHandle" v-if="vehicle.handleStatus == 'UNHANDLE'" type="button" class="btn btn-primary" @click="vehicleEventHandle">处理</button>
                        <button type="button" class="btn btn-default" onClick="history.back()">返回</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import commonAjax from '../../components/commonAjax';
import callout from '../../components/Callout.vue';
import api from '../../components/apiConfig';
import common from '../../components/common';
import '../../components/filter';
export default {
    data: function() {
        return {
            vehicle: {
                plateNumber: '',
                eventDate: '',
                eventInfo: ''
            },
            callout: {
                failed: '',
                info: '',
                warning: '',
                success: '',
                autoclose: true
            }
        };
    },
    components: {
        callout
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var params = {
                    id: transition.to.query.id
                };
                commonAjax.ajaxGetJson(api.vehicle.eventInfo, params, function(data) {
                    var result = {
                        'vehicle': data
                    };
                    transition.next(result);
                });
            }
        }
    },
    methods: {
        vehicleEventHandle: function() {
            var id = this.vehicle.id;
            commonAjax.ajaxPUTForm(api.vehicle.eventHandle, {
                id: id,
                'handleStatus': 'HANDLE'
            }, function(data) {
                if (data === true) {
                    vex.dialog.alert({
                        message: '修改成功！',
                        callback: function(value) {
                            if (value) {
                                router.go('/vehicle/event');
                            }
                        }
                    });
                } else {
                    vex.dialog.alert('修改失败！');
                }
            });
        }
    }
};
</script>
