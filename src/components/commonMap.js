var YFMap = function(ele, opt) {
    this.$element = ele;
    this.defaults = {
        enableAutoResize: true
    };
    this.options = $.extend({}, this.defaults, opt);
    this.map = new BMap.Map(this.$element.attr('id'), this.options);
    this.cluster;
    this.WEB_API_KEY = '0749cba04b7af237211ec92a9e58cdc6';
    this.infoWindow = new BMap.InfoWindow({ offset: new BMap.Pixel(-10, -10) });
};

YFMap.prototype = {
    init: function() {
        this.centerAndZoom();
        this.map.enableScrollWheelZoom();
        this.ipLocate();
        this.addControl();
        return this;
    },
    clearOverlays: function() {
        this.map.clearOverlays(); // 初始化地图，设置中心点坐标和地图级别
        return this;
    },
    centerAndZoom: function() {
        var point = new BMap.Point(104.065714, 30.657413); // 创建点坐标
        this.map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
        return this;
    },
    addControl: function() {
        var scaleControl = new BMap.ScaleControl();
        var navigationControl = new BMap.NavigationControl();
        var overviewMapControl = new BMap.OverviewMapControl();

        this.map.addControl(scaleControl);
        this.map.addControl(navigationControl);
        this.map.addControl(overviewMapControl);

    },
    // 获取用户所在城市信息
    ipLocate: function() {
        var that = this;
        var myCity = new BMap.LocalCity();
        myCity.get(function(result) {
            var cityName = result.name;
            that.map.setCenter(cityName);
        });
    },
    panTo: function(x, y) {
        var lonlat = new BMap.Point(x, y);
        this.map.panTo(lonlat);
    },
    // 标记地图定位
    addMarker: function(x, y, msg, title) {
        var point = new BMap.Point(x, y);
        this.map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point, {
            title: title
        });
        if (msg) {
            var label = new BMap.Label(msg, { offset: new BMap.Size(20, -10) });
            marker.setLabel(label);
        }
        this.map.addOverlay(marker);
        return this;
    },
    // 显示Label
    setMakerLabel: function(marker, text) {
        marker.setLabel(new BMap.Label(text, { offset: new BMap.Pixel(25, 0) }));
        return this;
    },
    // 模拟路径
    setLuShu: function(star, end) {
        var self = this;
        // 实例化一个驾车导航用来生成路线
        var drv = new BMap.DrivingRoute('北京', {
            onSearchComplete: function(res) {
                if (drv.getStatus() === BMAP_STATUS_SUCCESS) {
                    var plan = res.getPlan(0);
                    var arrPois = [];
                    for (var j = 0; j < plan.getNumRoutes(); j++) {
                        var route = plan.getRoute(j);
                        arrPois = arrPois.concat(route.getPath());
                    }
                    self.map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: '#111' }));
                    self.map.setViewport(arrPois);

                    var lushu = new BMapLib.LuShu(self.map, arrPois, {
                        defaultContent: '', // Label信息
                        autoView: true, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                        icon: new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52, 26), { anchor: new BMap.Size(27, 13) }),
                        speed: 4500,
                        enableRotation: true // 是否设置marker随着道路的走向进行旋转
                    });
                }
            }
        });
        drv.search(star, end);
        return this;
    }
};

$.fn.yfmap = function(options) {
    var yfMap = new YFMap(this, options);
    return yfMap.init();
};
