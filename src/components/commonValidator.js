import Vue from 'vue';

Vue.validator('required', {
    message: '不能为空',
    check: Vue.validator('required')
});
Vue.validator('numeric', {
    message: '必须全为数字',
    check: function(val) {
        return /^[-+]?[0-9]+$/.test(val);
    }
});
Vue.validator('email', {
    message: '邮件格式不正确',
    check: function(val) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    }
});
Vue.validator('mobile', {
    message: '手机格式不正确',
    check: function(val) {
        return /^0?(13|15|18|14|17)[0-9]{9}$/.test(val);
    }
});
Vue.validator('url', {
    message: 'Url格式不正确',
    check: function(val) {
        return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val);
    }
});
Vue.validator('confirm', {
    message: '两次密码不一直',
    check: function(val, target) {
        return val === target;
    }
});
