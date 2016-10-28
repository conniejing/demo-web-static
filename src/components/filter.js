import common from './common';
import Vue from 'vue';

Vue.filter('date', function(value) {
    if (value > 0) {
        return common.formatDate(value);
    }
    return value;
});

Vue.filter('dateTime', {
    read: function(value) {
        if (value > 0) {
            return common.formatDateTime(value);
        }
        return value;
    }
});
