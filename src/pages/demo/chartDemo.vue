<style>

</style>
<template>
    <section class="content-header">
        <h1>图表Demo</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">各种类型的图表</h3>
            </div>
            <div class="box-body">
                <div class="row form-group">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" @click="getBarchart">柱状图</button>
                        <button type="button" class="btn btn-primary" @click="getPiechart">饼状图</button>
                        <button type="button" class="btn btn-primary" @click="getLinechart">线性图</button>
                        <button type="button" class="btn btn-primary" @click="getRadarchart">雷达图</button>
                        <button type="button" class="btn btn-primary" @click="getPolarAreachart">极地区域图</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 everychart">
                        <charts v-ref:charts Chartid="Barchart" Chartclass="Barchart" ></charts>
                    </div>
                    <div class="col-md-6 everychart">
                        <charts v-ref:charts Chartid="Piechart" Chartclass="Piechart" ></charts>
                    </div>
                    <div class="col-md-6 everychart">
                        <charts v-ref:charts Chartid="Linechart" Chartclass="Linechart" ></charts>
                    </div>
                    <div class="col-md-6 everychart">
                        <charts v-ref:charts Chartid="Radarchart" Chartclass="Radarchart" ></charts>
                    </div>
                    <div class="col-md-6 everychart">
                        <charts v-ref:charts Chartid="PolarAreachart" Chartclass="PolarAreachart" ></charts>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import common from '../../components/common';
import charts from '../../components/Chart.vue';
export default {
    data: function() {
        return {
            //
        };
    },
    components: {
        charts
    },
    route: {
        data: function(transition) {
            if (common.noLoginRedirect()) {
                transition.next();
            }
        }
    },
    methods: {
        // 柱状图
        getBarchart: function() {
            $(".everychart").hide();
            $("#Barchart").parent().show();
            var opts = {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            };
            this.$refs.charts.getBarchart(opts);
        },
        // 饼状图
        getPiechart: function() {
            $(".everychart").hide();
            $("#Piechart").parent().show();
            var opts = {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            };
            this.$refs.charts.getPiechart(opts);
        },
        // 线性图
        getLinechart: function () {
            $(".everychart").hide();
            $("#Linechart").parent().show();
            var opts = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            };
            this.$refs.charts.getLinechart(opts);
        },
        getRadarchart: function () {
            $(".everychart").hide();
            $("#Radarchart").parent().show();
            var opts = {
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            };
            this.$refs.charts.getRadarchart(opts);
        },
        getPolarAreachart: function () {
            $(".everychart").hide();
            $("#PolarAreachart").parent().show();
            var opts = {
                datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset' // for legend
                }],
                labels: [
                    "Red",
                    "Green",
                    "Yellow",
                    "Grey",
                    "Blue"
                ]
            };
            this.$refs.charts.getPolarAreachart(opts);
        }

    },
    ready: function () {
        //
    }
}
</script>
