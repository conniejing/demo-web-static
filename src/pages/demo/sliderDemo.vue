<template>
    <section class="content-header">
        <h1>滚动图片Demo</h1>
    </section>
    <section class="content">
        <div class="box box-widget">
            <div class="row">
                <div class="col-md-6">
                    <slider :items=items :speed="1500" :slider-nav="true" direction="left" :width="300" :height="200"></slider>
                </div>
                <div class="col-md-6">
                    <slider :items=items :speed="1500" :slider-nav="true" direction="right" :width="300" :height="200"></slider>
                </div>
                <div class="col-md-6">
                    <slider :items=items :speed="1500" :slider-nav="true" direction="up" :width="300" :height="200"></slider>
                </div>
                <div class="col-md-6">
                    <slider :items=items :speed="1500" :slider-nav="true" direction="down" :width="300" :height="200"></slider>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Slider from '../../components/Slider.vue';
export default {
    data: function() {
        return {
            items: [{
                src: require('../../images/flower/10.jpg'),
                title: '阿尔的飘窗',
                href: 'www.baidu.com'
            }, {
                src: require('../../images/flower/1.jpg'),
                alt: '1111',
                title: '婴儿手指'
                    // },{
                    //     src: require('../../images/flower/2.jpg'),
                    //     alt: '2222',
                    //     title: '月光女神'
                    // },{
                    //     src: require('../../images/flower/3.jpg'),
                    //     alt: '3333',
                    //     title: '女雏'
                    // },{
                    //     src: require('../../images/flower/4.jpg'),
                    //     alt: '4444',
                    //     title: '蓝色宝石'
                    // },{
                    //     src: require('../../images/flower/5.jpg'),
                    //     alt: '5555',
                    //     title: '霜之朝'
                    // },{
                    //     src: require('../../images/flower/6.jpg'),
                    //     alt: '6666',
                    //     title: '粉蓝鸟'
                    // },{
                    //     src: require('../../images/flower/7.jpg'),
                    //     alt: '7777',
                    //     title: '和锦杂？'
                    // },{
                    //     src: require('../../images/flower/8.jpg'),
                    //     alt: '8888',
                    //     title: '玉杯东云'
            }, {
                src: require('../../images/flower/9.jpg'),
                alt: '9999',
                title: '月影系'
            }]
        };
    },
    components: {
        Slider
    }
}
</script>
