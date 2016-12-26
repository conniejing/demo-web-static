<template>
    <section class="content">
        <callout :autoclose="callout.autoclose" :failed.sync="callout.failed" :info.sync="callout.info" :warning.sync="callout.warning" :success.sync="callout.success"></callout>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">我的信息</h3>
            </div>
            <validator name="validation">
                <form>
                    <div class="box-body">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>用户名</label>
                                <span class="form-control" v-text="user.userName" disabled></span>
                            </div>
                            <div class="form-group">
                                <label>昵称</label>
                                <input type="text" class="form-control" v-model="user.nickName">
                            </div>
                            <div class="form-group">
                                <label>电话</label>
                                <input type="text" class="form-control" v-model="user.phone" v-validate:mobile-phone="['required','numeric']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.mobilePhone.required">{{ $validation.mobilePhone.required }}</p>
                                <p v-show="$validation.mobilePhone.numeric">{{ $validation.mobilePhone.numeric }}</p>
                            </div>
                            <div class="form-group">
                                <label>邮箱</label>
                                <input type="text" class="form-control" v-model="user.email" v-validate:email="['required','email']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.email.required">{{ $validation.email.required }}</p>
                                <p v-show="$validation.email.email">{{ $validation.email.email }}</p>
                            </div>
                            <div class="form-group">
                                <label>驾驶证</label>
                                <input type="text" class="form-control" v-model="user.driverLicense" v-validate:license="['required','numeric']" initial="off">
                            </div>
                            <div class="errors">
                                <p v-show="$validation.license.required">{{ $validation.license.required }}</p>
                                <p v-show="$validation.license.numeric">{{ $validation.license.numeric }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>头像</label>
                                <div>
                                    <img src="http://res.meng2u.com/user_icon/024/928/YNmwblJvoM8GjfXf.jpg" width="256" height="256">
                                </div>
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
                userName: '',
                nickName: '',
                phone: '',
                email: '',
                driverLicense: ''
            }
        };
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                var url = common.replaceUrl(api.auth.myinfo, [{
                    'key': 'userId',
                    'value': '301'
                }]);
                // 获取ajax请求参数
                var params = this.$route.query;
                commonAjax.ajaxGetJson(url, params, function(data) {
                    // 调用 transition.next(data) 会为组件的 data 相应属性赋值。
                    // 例如，使用 { a: 1, b: 2 } ，路由会调用
                    // component.$set('a', 1) 以及 component.$set('b', 2) 。
                    // 在调用 transition.next() 前组装好data
                    var user = {
                        'user': data
                    };
                    transition.next(user);
                });
            }
        }
    },
    methods: {
        onSubmit: function() {
            var self = this;
            this.$validate(true, function(e) {
                if (self.$validation.valid) {
                    // TODO 后台提供接口
                    alert('暂未开放,敬请期待！！');
                }
            });
        }
    }
};
</script>
