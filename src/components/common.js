var common = {};

import classie from '../vendors/plugins/special/classie';

// 毫秒数时间格式化为”yyyy-mm-dd'
common.formatDate = function(date, split) {
    return this.dateFormat('date', date, split);
};

// 毫秒数时间格式化为'yyyy-mm-dd HH:MM:DD'
common.formatDateTime = function(date, split) {
    return this.dateFormat('time', date, split);
};

// 毫秒数时间格式化
common.dateFormat = function(type, date, split) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    var hour = '' + d.getHours();
    var min = '' + d.getMinutes();
    var sec = '' + d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;
    if (sec.length < 2) sec = '0' + sec;

    var time = [hour, min, sec].join(':');
    if (type !== 'time') {
        if (split) {
            return [year, month, day].join(split);
        } else {
            return [year, month, day].join('-');
        }
    } else {
        if (split) {
            return [year, month, day].join(split) + ' ' + time;
        } else {
            return [year, month, day].join('-') + ' ' + time;
        }
    }
};

/**
 * 替换url中的id
 * @param {string} url - 表单提交url
 * @param {object} args - 参数，数组对象 [{'key' : 'userId','value' : '123123'},{'key' : 'carId','value' : 'asdf1'}]
 * @return {string} url - 替换后url
 */
common.replaceUrl = function(url, args) {
    for (var i = 0, item; item = args[i++];) {
        url = url.replace(item['key'], item['value']);
    }
    url = url.replace(/[{}]/g, '');
    return url;
};

/**
 * 未登录跳转
 * @returns {boolean}
 */
common.noLoginRedirect = function() {
    if (!this.isLogin()) {
        router.go({ path: '/login' });
        return false;
    } else {
        return true;
    }
};

/**
 * 判断是否登录
 * @returns {boolean}
 */
common.isLogin = function() {
    if (sessionStorage.getItem('user')) {
        if (this.getUserId()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * 获取用户userId
 * @returns {*|string} userId
 */
common.getUserId = function() {
    if (sessionStorage.getItem('user')) {
        var obj = JSON.parse(sessionStorage.getItem('user'));
        return obj.userId;
    }
    return false;
};

/**
 * 获取用户名
 * @returns {*|string} nickName
 */
common.getUserName = function() {
    if (sessionStorage.getItem('user')) {
        var obj = JSON.parse(sessionStorage.getItem('user'));
        return obj.nickName;
    }
    return false;
};

// 页面效果
common.UI = {
    setcornerload: function() {
        var corner = document.querySelector('.la-anim-10');
        classie.add(corner, 'la-animate');
    },
    removecornerload: function() {
        var corner = document.querySelector('.la-anim-10');
        setTimeout(function() {
            classie.remove(corner, 'la-animate');
        }, 300);
    },
    setload: function() {
        var zhe = document.querySelector('.bgzhe');
        classie.remove(zhe, 'zhehide');
        zhe.style.display = 'block';
    },
    removeload: function() {
        var zhe = document.querySelector('.bgzhe');
        classie.add(zhe, 'zhehide');
        zhe.style.display = 'none';
    }
};

export default common;
