export default {

    /**
     * Json格式GET数据 - 无提示框，无跳转
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxGetJson: function(url, args, success, fail) {

        return this.request(url, args, 'GET', 'json', false, 'application/x-www-form-urlencoded', success, fail, null, null);
    },

    /**
     * Json格式POST数据 - 无提示框，无跳转
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxPostJson: function(url, args, success, fail) {

        this.args = JSON.stringify(args);

        return this.request(url, args, 'POST', 'json', true, 'application/json', success, fail, null, null);
    },

    /**
     * Json格式POST数据 - 无callback，有提示框，有跳转
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {string} redirectUrl - 重定向url
     */
    ajaxPostJsonRedirect: function(url, args, redirectUrl) {

        this.args = JSON.stringify(args);

        return this.request(url, args, 'POST', 'json', true, 'application/json', null, null, true, redirectUrl);
    },

    /**
     * Form格式POST数据 - 无提示框，无跳转
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxPostForm: function(url, args, success, fail) {

        return this.request(url, args, 'POST', 'json', true, 'application/x-www-form-urlencoded', success, fail, null, null);
    },

    /**
     * Form格式POST数据 - 无callback，有提示框，有跳转
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {string} redirectUrl - 重定向url
     */
    ajaxPostFormRedirect: function(url, args, redirectUrl) {

        return this.request(url, args, 'POST', 'json', true, 'application/x-www-form-urlencoded', null, null, true, redirectUrl);
    },

    /**
     * Json格式PUT数据
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxPUT: function(url, args, success, fail) {
        return this.request(url, args, 'PUT', 'json', true, 'application/json; charset=utf-8', success, fail, null, null);
    },

    /**
     * Form格式PUT数据
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxPUTForm: function(url, args, success, fail) {
        return this.request(url, args, 'PUT', 'json', true, 'application/x-www-form-urlencoded', success, fail, null, null);
    },

    /**
     * Json格式DELETE数据
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     */
    ajaxDELETE: function(url, args, success, fail) {

        return this.request(url, args, 'DELETE', 'json', true, 'application/json; charset=utf-8', success, fail, null, null);
    },

    /**
     * ajax请求
     * @param {string} url - 表单提交url
     * @param {object} args - 参数
     * @param {string} method - 请求方式
     * @param {string} dataType - 获取数据格式
     * @param {boolean} async - 请求是否异步
     * @param {string} contentType - 请求数据格式
     * @param {function} success - 成功callback
     * @param {function} fail - 失败callback
     * @param {boolean} showModal - 是否弹出提示框
     * @param {string} redirectUrl - 重定向url
     */
    request: function(url, args, method, dataType, async, contentType, success, fail, showModal, redirectUrl) {
        var returnObj = null;
        var flag = 1;
        $.ajax({
            url: url,
            method: method,
            data: args,
            dataType: dataType,
            async: async,
            contentType: contentType
        }).complete(function(XMLHttpRequest, textStatus) {
            if (success.length === 0 && flag) {
                if (XMLHttpRequest.status === 200) {
                    if (success) { success(); }
                } else {
                    if (fail) { fail(); }
                }
                flag = 0;
            }
        }).error(function(data) {
            if (console && data.responseJSON) {
                console.log(data.responseJSON.message);
            }
            if (data.responseJSON) {
                // vex.dialog.alert(data.responseJSON.message);
            }
            if (fail && flag) {
                fail(data);
            }
        }).success(function(data) {
            if (console) console.info('ajax success:' + data);
            returnObj = data;
            if (success && flag) {
                success(data);
            }
        });
        return returnObj;
    }
};
