<template>
    <canvas id="{{Chartid}}" class="{{Chartclass}}" width="400" height="400"></canvas>
</template>
<script>
import Chart from 'chart.js';
export default {
    props: {
        Chartid: {
            type: [Number, String],
            required: false,
            default: ""
        },
        Chartclass: {
            type: [Number, String],
            required: false,
            default: ""
        },
    },
    data: function() {
        //
    },
    computed: {
        //
    },
    ready: function() {
        //
    },
    methods: {
        // 柱状图
        getBarchart: function(opts) {
            var ctx = document.getElementById('Barchart');
            var Barchart = new Chart(ctx, {
                type: 'bar',
                data: opts,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        // 饼状图
        getPiechart: function(opts) {
            var ctx = document.getElementById('Piechart');
            var Piechart = new Chart(ctx, {
                type: 'pie',
                data: opts,
                options: ''
            });
        },
        // 线性图
        getLinechart: function (opts) {
            var ctx = document.getElementById('Linechart');
            var Linechart = new Chart(ctx, {
                type: 'line',
                data: opts,
                options: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title'
                    }
                }
            });
        },
        // 雷达图
        getRadarchart: function (opts) {
            var ctx = document.getElementById('Radarchart');
            var Radarchart = new Chart(ctx, {
                type: "radar",
                data: opts,
                options: {
                    scale: {
                        reverse: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        // 极地区域图
        getPolarAreachart: function (opts) {
            var ctx = document.getElementById('PolarAreachart');
            var PolarAreachart = new Chart(ctx, {
                data: opts,
                type: "polarArea",
                options: {
                    elements: {
                        arc: {
                            borderColor: "#FFFFFF"
                        }
                    }
                }
            });
        }
    }
}
</script>
