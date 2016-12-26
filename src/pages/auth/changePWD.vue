<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">修改密码</h3>
            </div>
            <validator name="validation">
                <form>
                    <div class="box-body">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>旧密码</label>
                                <input type="password" class="form-control" v-model="user.oldPassword" v-validate:old-password="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.oldPassword.required">{{ $validation.oldPassword.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>新密码</label>
                                <input type="password" class="form-control" v-model="user.newPassword" v-validate:new-password="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.newPassword.required">{{ $validation.newPassword.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>确认密码</label>
                                <input type="password" class="form-control" v-model="user.confirmPassword" v-validate:confirm-password="{required: true, confirm: user.newPassword}" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.confirmPassword.required">{{ $validation.confirmPassword.required }}</p>
                                <p v-show="$validation.confirmPassword.confirm">{{ $validation.confirmPassword.confirm }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary" @click.stop.prevent="onSubmit">修改</button>
                            <button type="button" class="btn btn-default" onClick="history.back()">返回</button>
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
import api from '../../components/apiConfig';
import '../../components/commonValidator';
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
            user: {
                newPassword: '',
                confirmPassword: '',
                oldPassword: ''
            }
        };
    },
    route: {
        data: function(transition) {
            common.noLoginRedirect();
            transition.next();
        }
    },
    methods: {
        onSubmit: function() {
            var self = this;
            if (common.noLoginRedirect()) {
                this.$validate(true, function(e) {
                    if (self.$validation.valid) {
                        var params = {
                            'newPassword': self.user.newPassword,
                            'oldPassword': self.user.oldPassword
                        };
                        var obj = JSON.parse(sessionStorage.getItem('user'));
                        var userId = obj.userId;
                        var url = api.auth.updatePwd + userId;
                        commonAjax.ajaxPostJson(url, params, function(result) {
                            if (result) {
                                vex.dialog.alert('修改成功');
                            }
                        });
                    }
                });
            }
        }
    }
};
</script>
