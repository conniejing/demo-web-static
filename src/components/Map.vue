<style scoped>
#paramPanel {
    position: absolute;
    top: 0;
    height: 500px;
    margin-right: 15px;
    width: 100%;
    padding: 0 15px;
}

#paramPanel > div {
    background: rgba(0, 0, 0, 0.42);
    position: relative;
    top: 0;
    left: -15px;
    height: 100%;
}

.selPanel {
    position: relative;
    width: 400px;
    background: #fff;
    height: 350px;
    overflow: auto;
    top: 10%;
    left: 50%;
    margin-left: -200px;
}

.selPanel > h4 {
    margin: 0 0 10px 0;
    padding: 10px;
    background-color: #3c8dbc;
    color: #fff;
}

.selPanel .form-group {
    padding: 10px;
}

.selPanel .checkbox {
    height: 190px;
    overflow: auto;
    margin: 0;
}

.selPanel .checkbox label {
    display: block;
}

.center {
    text-align: center;
}

.data-span {
    font-weight: bold;
    color: #3c8dbc;
}

.data-span.warning,
.pull-right.error,
.pull-right.warning {
    font-weight: bold;
    color: red;
}
.pull-right.warning{
    color: #f39c12;
}
</style>

<template>
    <div id="Amap" :style="style"></div>
    <div id="paramPanel" v-show="paramPanel">
        <div>
            <div class="selPanel">
                <h4>选择参数</h4>
                <v-checkbox multiple label="请选择需要查看的参数" name="car" :value.sync="tmpValue.car" :items="tmpValue.paramList" :validator="{ required: true }"></v-checkbox>
                <div class="col-md-12 center">
                    <button type="button" class="btn btn-primary" @click.stop.prevent="submitParam">确定</button>
                </div>
            </div>
        </div>
    </div>
    <div id="panelData" class="hide">
        <p v-for="item in tmpValue.paramViewData">
            <span>{{item.text}}</span>:
            <span class="data-span" :class="{ warning: item.warning }">{{item.value}}</span>
        </p>
    </div>
</template>
<script>
import vCheckbox from './fields/Checkbox.vue';
import commonAjax from './commonAjax';
export default {
    props: {
        height: { // 画布高度
            type: [Number, String],
            required: false,
            default: "400px"
        },
        imgClass: { // 图标样式
            type: String,
            required: false,
            default: "markerlnglat"
        },
        imgIcon: { // 图标图片
            type: String,
            required: false,
            default: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        }
    },
    components: {
        vCheckbox
    },
    data: function() {
        return {
            amap: null,
            zoom: 12,
            lineArr: [],
            // demo
            vehicleList: [],
            tmpValue: {
                car: [1, 2, 3, 13, 14, 17],
                paramList: [],
                paramData: [],
                paramViewData: []
            },
            chooseVin: '',
            paramPanel: false
        };
    },
    computed: {
        style: function() {
            return ("height:" + this.height);
        }
    },
    ready: function() {
        var self = this;
        self.amap = new AMap.Map('Amap', {
            resizeEnable: true
        });
        commonAjax.ajaxGetJson('../src/pages/demo/paramList.json', null, function(data) {
            console.dir(data);
            self.tmpValue.paramList = data.paramList;
        });
    },
    methods: {
        // Demo coding BEGIN
        setVehicleData: function(data) {
            this.vehicleList = data;
        },
        submitParam: function() {
            var self = this;
            console.warn(self.chooseVin);
            var url = '';
            if (self.chooseVin === 'KNB20198752343234') {
                url = '../src/pages/demo/paramListValue.json';
            }
            if (self.chooseVin === 'WDB2012012DK23KR0') {
                url = '../src/pages/demo/paramListValue1.json';
            }
            if (self.chooseVin === 'DES9384728EK3OFM4') {
                url = '../src/pages/demo/paramListValue2.json';
            }
            if (self.chooseVin === 'WOD2493041F94MR42') {
                url = '../src/pages/demo/paramListValue3.json';
            }
            if (self.chooseVin === 'OEK4825831F244F4F') {
                url = '../src/pages/demo/paramListValue4.json';
            }
            self.tmpValue.paramViewData = [];
            commonAjax.ajaxGetJson(url, null, function(data) {
                self.tmpValue.paramData = data.paramData;
            });
            var tempArr = [];
            for (var i = 0; i < self.tmpValue.paramData.length; i++) {
                for (var j = 0; j < self.tmpValue.car.length; j++) {
                    if (self.tmpValue.paramData[i].id === self.tmpValue.car[j]) {
                        self.tmpValue.paramViewData.push(self.tmpValue.paramData[i]);
                    }
                }
            }
            console.log($('#' + self.chooseVin + ' .data-panel')[0]);
            setTimeout(function() {
                self.paramPanel = false;
                var panelData = document.getElementById('panelData').innerHTML;
                console.log(panelData);
                $('#' + self.chooseVin + ' .data-panel')[0].innerHTML = panelData;
            }, 200);
        },
        openPanel: function(event) {
            var self = this;
            console.dir($(event.target));
            var text = $(event.target).text();
            if (text === '收起') {
                $(event.target).parents('.content-panel').find('.data-panel').html('');
                $(event.target).text('选择参数');
            } else {
                self.chooseVin = $(event.target).parents('.content-panel').attr('id');
                self.paramPanel = true;
                $(event.target).text('收起');
            }
        },
        // Demo coding END
        /**
         * 定点图标
         * @returns {HTML DOM} markerImg
         */
        makeMarkerImg: function() {
            var markerImg = document.createElement("img");
            markerImg.className = this.imgClass;
            markerImg.src = this.imgIcon;
            return markerImg;
        },
        /**
         * 点定位
         * @param {Object} opts - 地图设置
         * @param {Array} opts.point - 点坐标
         * @param {Number} opts.zoom - 地图缩放比例
         * @param {String} opts.content - Label标签内容
         * @returns {Object} marker - 标记对象
         */
        getPoint: function(opts) {
            var self = this;
            var opts = opts ? opts : {};
            // 设置缩放级别
            if (opts.zoom) {
                this.amap.setZoom(opts.zoom);
            } else {
                this.amap.setZoom(this.zoom);
            }
            if (opts.content) {
                // 自定义点标记内容
                var markerContent = document.createElement("div");
                markerContent.appendChild(this.makeMarkerImg());
                // 点标记中的文本
                var markerSpan = document.createElement("div");
                markerSpan.className = 'marker';
                // markerSpan.innerHTML = opts.content;
                // DEMO coding
                var vin = opts.data.vin;
                var box = document.createElement('div');
                box.className = 'box box-primary content-panel';
                box.id = opts.data.vin;
                markerSpan.appendChild(box);
                var boxHeader = document.createElement('div');
                boxHeader.className = 'box-header with-border';
                boxHeader.innerHTML = '<h5 class="box-title">VIN: ' + vin + '</h3>';
                var warn = document.createElement('div');
                if (opts.data.data.warning === 1) {
                    warn.className = 'pull-right error';
                    warn.innerText = '提示';
                    boxHeader.appendChild(warn);
                }else if(opts.data.data.warning === 2){   
                    warn.className = 'pull-right warning';                 
                    warn.innerText = '预警';
                    boxHeader.appendChild(warn);
                }
                var boxBodys = document.createElement('div');
                boxBodys.className = 'box-body';
                var tmpDiv = document.createElement('div');
                var p = document.createElement('p');
                p.className = 'date';
                p.innerText = opts.data.data.date;
                var pullRight = document.createElement('div');
                pullRight.className = 'pull-right';
                var button = document.createElement('button');
                button.innerText = '选择参数';
                button.onclick = function(event) {
                    self.openPanel(event);
                }
                var dataPanel = document.createElement('div');
                dataPanel.className = 'data-panel';
                boxBodys.appendChild(tmpDiv);
                boxBodys.appendChild(dataPanel);
                pullRight.appendChild(button);
                tmpDiv.appendChild(p);
                tmpDiv.appendChild(pullRight);
                box.appendChild(boxHeader);
                box.appendChild(boxBodys);
                // DEMO coding
                markerContent.appendChild(markerSpan);
            }
            // 定位
            var marker = new AMap.Marker({
                map: this.amap,
                content: opts.content ? markerContent : this.makeMarkerImg(),
                position: opts.point
            });
            this.amap.setFitView();
            return marker;
        },
        /**
         * 删除标记
         * @param {Object} markers 标记
         */
        removePoint: function(markers) {
            this.amap.remove(markers);
        },
        /**
         * 路线规划
         * @param {Object} opts - 地图设置
         * @param {Array} opts.start - 起点坐标
         * @param {Array} opts.end - 终点坐标
         * @param {Number} opts.zoom - 地图缩放比例
         */
        getLine: function(opts) {
            var self = this;
            var opts = opts ? opts : {};
            opts.point = [(opts.start[0] + opts.end[0]) / 2, (opts.start[1] + opts.end[1]) / 2];
            if (opts.zoom) {
                this.amap.setZoomAndCenter(opts.zoom, opts.point);
            } else {
                this.amap.setZoomAndCenter(opts.point);
            }
            // 构造路线导航类
            var driving = new AMap.Driving({
                map: this.amap
            });
            // 根据起终点经纬度规划驾车导航路线
            driving.search(opts.start, opts.end, function(status, result) {
                // 获取路径数组
                self.getLinePath(result);
            });
        },
        /**
         * 获取路径数组
         * @param {Object} obj - 路径返回值
         */
        getLinePath: function(obj) {
            var len = obj.routes[0].steps.length;
            var routes = obj.routes[0];
            var lineArr = [];
            var lngX = routes.steps[0].start_location.lng,
                latY = routes.steps[0].start_location.lat;
            for (var i = 0; i < len; i++) {
                lngX = routes.steps[i].end_location.lng;
                latY = routes.steps[i].end_location.lat;
                lineArr.push([lngX, latY]);
            }
            this.lineArr = lineArr;
        },
        polyline: function(opts) {
            var opts = opts ? opts : {};
            var lineLen = opts.lineArr.length;
            opts.point = [(opts.lineArr[0][0] + opts.lineArr[lineLen - 1][0]) / 2, (opts.lineArr[0][1] + opts.lineArr[lineLen - 1][1]) / 2];
            if (opts.zoom) {
                this.amap.setZoomAndCenter(opts.zoom, opts.point);
            } else {
                this.amap.setZoomAndCenter(opts.point);
            }
            // this.amap.setFitView(); //地图自适应
            var polyline = new AMap.Polyline({
                map: this.amap,
                path: opts.lineArr,
                strokeColor: "#00f", // 线颜色
                strokeOpacity: 1, // 线透明度
                strokeWeight: 3, // 线宽
                strokeStyle: "solid" // 线样式
            });
            var marker = new AMap.Marker({
                map: this.amap,
                position: [116.379028, 39.865042],
                icon: "http://webapi.amap.com/images/car.png",
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true
            });
            return marker;
        }
    }
}
</script>
