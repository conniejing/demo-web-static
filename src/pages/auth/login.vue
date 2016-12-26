<template>
    <section class="content-header">
        <h1 class="text-center">登录</h1>
    </section>
    <section class="content" style="width:300px">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <validator name="validation">
                <form>
                    <div class="box-body">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>用户名</label>
                                <input type="text" class="form-control" v-model="user.username" v-validate:username="['required']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.username.required">{{ $validation.username.required }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>密码</label>
                                <input type="password" class="form-control" v-model="user.password" v-validate:password="['required']" initial="off" @keyup.enter="onSubmit">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.password.required">{{ $validation.password.required }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary pull-right" @click.stop.prevent="onSubmit">登录</button>
                            <button type="button" class="btn btn-default" v-link="{ path: '/register' }">注册</button>
                        </div>
                    </div>
                </form>
            </validator>
        </div>
    </section>
</template>

<script>
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
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit: function() {
            var self = this;
            this.$validate(true, function(e) {
                if (!self.$validation.invalid) {
                    var params = {
                        'userName': self.user.username,
                        'pwd': self.user.password
                    }
                    commonAjax.ajaxGetJson(api.auth.login, params, function(data) {
                        if (data) {
                            //把user存入sessionStorage
                            sessionStorage.setItem('user', JSON.stringify(data));
                            //把userRole存入sessionStorage
                            sessionStorage.setItem('userRole', self.user.username);
                            self.$dispatch('setNickName', data.nickName);
                            // 根据后台返回的用户权限设置导航栏
                            // 暂时用input数据测试
                            // self.$dispatch('setSidebar', data.userRole);
                            self.$dispatch('setSidebar', self.user.username);
                            self.callout.success = '登录成功，2秒后自动跳转...';
                            setTimeout(function() {
                                router.go({
                                    name: 'vehicleList'
                                });
                            }, 1800);
                        }
                    });
                }
            })
        }
    }
}
</script>
