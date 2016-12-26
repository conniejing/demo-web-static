export default {
    data: function(){
        return {
            errors: [],
            errorMsg: {
                required: '不能为空',
                min: '最小值为',
                max: '最大值为',
                minlength: '字数最小长度为',
                maxlength: '字数最大长度为',
                email: '请输入正确的邮箱地址'
            }
        }
    }
}