export default {
    methods: {
        resetError: function() {
            this.errors = [];
        },
        validate: function(val){
            this.resetError();
            for (var key in this.validator) {
                if (!this[key](val, this.validator[key])) {
                    var msg = this.errorMsg[key];
                    if (typeof this.validator[key] !== "boolean") {
                        msg += this.validator[key];
                    }
                    this.errors.push(msg);
                }
            }
            if(this.errors.length > 0){
                return false;
            }else{
                return true;
            }
        },
        required: function(val) {
            if (Array.isArray(val)) {
                if (val.length !== 0) {
                    var valid = true;
                    for (var i = 0, l = val.length; i < l; i++) {
                        valid = this.required(val[i]);
                        if (!valid) {
                            break;
                        }
                    }
                    return valid;
                } else {
                    return false;
                }
            } else if (typeof val === 'number' || typeof val === 'function') {
                return true;
            } else if (typeof val === 'boolean') {
                return val;
            } else if (typeof val === 'string') {
                return val.length > 0;
            } else if (val !== null && (typeof val === 'undefined' ? 'undefined' : typeof(val)) === 'object') {
                return Object.keys(val).length > 0;
            } else if (val === null || val === undefined) {
                return false;
            }
        },
        minlength: function(val, min) {
            if (typeof val === 'string') {
                return this.isInteger(min, 10) && val.length >= parseInt(min, 10);
            } else if (Array.isArray(val)) {
                return val.length >= parseInt(min, 10);
            } else {
                return false;
            }
        },
        maxlength: function(val, max) {
            if (typeof val === 'string') {
                return this.isInteger(max, 10) && val.length <= parseInt(max, 10);
            } else if (Array.isArray(val)) {
                return val.length <= parseInt(max, 10);
            } else {
                return false;
            }
        },
        min: function(val, arg) {
            return !isNaN(+val) && !isNaN(+arg) && +val >= +arg;
        },
        max: function(val, arg) {
            return !isNaN(+val) && !isNaN(+arg) && +val <= +arg;
        },
        isInteger: function(val) {
            return (/^(-?[1-9]\d*|0)$/.test(val));
        },
        email: function(val) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
        }
    }
}
