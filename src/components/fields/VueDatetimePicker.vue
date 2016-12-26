<template>
    <div class="form-group">
        <label v-text="label" v-show="label"></label>
        <div class='input-group date'>
            <input class='form-control' :name='name' type='text' />
            <span class='input-group-addon'>
                <i class='fa fa-fw fa-calendar'></i>
            </span>
        </div>
        <div class="errors" v-show="errors.length > 0">
            <p v-for="error in errors" v-text="error"></p>
        </div>
    </div>

    <!-- <div class='input-group date'>
            <label v-text="label"></label>
            <input class='form-control' :name='name' type='text' />
            <span class='input-group-addon'>
                <i class='fa fa-fw fa-calendar'></i>
            </span>
            <div class="errors" v-show="errors.length > 0">
                <p v-for="error in errors" v-text="error"></p>
            </div>
        </div>   -->
</template>

<script>
var DATETIME_PICKER_TOOLTIPS = [
    "today", "clear", "close",
    "selectMonth", "prevMonth", "nextMonth",
    "selectYear", "prevYear", "nextYear",
    "selectDecade", "prevDecade", "nextDecade",
    "prevCentury", "nextCentury",
    "pickHour", "incrementHour", "decrementHour",
    "pickMinute", "incrementMinute", "decrementMinute",
    "pickSecond", "incrementSecond", "decrementSecond",
    "togglePeriod", "selectTime"
];
var DEFAULT_LANGUAGE = "zh-CN";
import validator from '../mixins/validator.js';
import data from '../mixins/errorMsg.js';
export default {
    replace: true,
    inherit: false,
    mixins: [data, validator],
    props: {
        label: {
            type: String,
            required: false,
            default: ""
        },
        value: {
            required: true,
            twoWay: true
        },
        type: {
            type: String,
            required: false,
            default: "datetime"
        },
        language: {
            type: String,
            required: false,
            default: ""
        },
        datetimeFormat: {
            type: String,
            required: false,
            default: "YYYY-MM-DD HH:mm:ss"
        },
        dateFormat: {
            type: String,
            required: false,
            default: "YYYY-MM-DD"
        },
        timeFormat: {
            type: String,
            required: false,
            default: "HH:mm:ss"
        },
        name: {
            type: String,
            required: false,
            default: ""
        },
        validator: {
            type: Object,
            required: false,
            default: null
        },
        onChange: {
            required: false,
            default: null
        }
    },
    beforeCompile: function() {
        this.isChanging = false;
        this.control = null;
    },
    ready: function() {
        // console.debug("datetime-picker.ready");
        var options = {
            useCurrent: false,
            showClear: true,
            showClose: false,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-dot-circle-o',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        };
        // set the locale
        var language = this.language;
        if (language === null || language === "") {
            if (this.$language) {
                language = this.$language;
            } else {
                language = DEFAULT_LANGUAGE;
            }
        }
        options.locale = this.getLanguageCode(language);
        // set the format
        switch (this.type) {
            case "date":
                options.format = this.dateFormat;
                break;
            case "time":
                options.format = this.timeFormat;
                break;
            case "datetime":
            default:
                options.format = this.datetimeFormat;
                break;
        }
        // use the vue-i18n plugin for localize the tooltips
        if (this.$i18n && this.$i18n.datetime_picker) {
            var messages = this.$i18n.datetime_picker;
            var tooltips = $.fn.datetimepicker.defaults.tooltips;
            for (var i = 0; i < DATETIME_PICKER_TOOLTIPS.length; ++i) {
                var name = DATETIME_PICKER_TOOLTIPS[i];
                if (messages[name]) {
                    tooltips[name] = messages[name]; // localize
                }
            }
            options.tooltips = tooltips;
        }
        // create the control
        // $(this.$el).datetimepicker(options);
        $(this.$el).children('.date').datetimepicker(options);
        // this.control = $(this.$el).data("DateTimePicker");
        this.control = $(this.$el).children('.date').data("DateTimePicker");
        // set the date to the current value of the value
        this.control.date(this.value);
        var me = this;
        $(this.$el).children('.date').on("dp.change", function() {
            if (!me.isChanging) {
                me.isChanging = true;
                me.value = me.control.date();
                me.$nextTick(function() {
                    me.isChanging = false;
                    if (me.onChange) {
                        me.onChange(me.value);
                    }
                });
            }
        });
    },
    watch: {
        "value": function(val, oldVal) {
            if (val !== oldVal) {
                this.resetError();
                if (this.validator) {
                    this.validate(val);
                }
            }
            if (!this.isChanging) {
                this.isChanging = true;
                this.control.date(val);
                this.isChanging = false;
                if (this.onChange) {
                    this.onChange(val);
                }
            }
        }
    },
    methods: {
        /**
         * Gets the language code from the "language-country" locale code.
         *
         * The function will strip the language code before the first "-" of a
         * locale code. For example, pass "en-US" will returns "en". But for some
         * special locales, the function reserves the locale code. For example,
         * the "zh-CN" for the simplified Chinese and the "zh-TW" for the
         * traditional Chinese.
         *
         * @param locale
         *    A locale code.
         * @return
         *    the language code of the locale.
         */
        getLanguageCode: function(locale) {
            if (locale === null || locale.length === 0) {
                return "en";
            }
            if (locale.length <= 2) {
                return locale;
            } else {
                switch (locale) {
                    case "zh-CN":
                    case "zh-TW":
                    case "ar-MA":
                    case "ar-SA":
                    case "ar-TN":
                    case "de-AT":
                    case "en-AU":
                    case "en-CA":
                    case "en-GB":
                    case "fr-CA":
                    case "hy-AM":
                    case "ms-MY":
                    case "pt-BR":
                    case "sr-CYRL":
                    case "tl-PH":
                    case "tzm-LATN":
                    case "tzm":
                        return locale.toLowerCase();
                    default:
                        // reserve only the first two letters language code
                        return locale.substr(0, 2);
                }
            }
        }
    }
};
</script>
