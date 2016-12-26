<style scoped>
#slider-box {
    overflow: hidden;
    position: relative;
}

.slider,
.slider li {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.slider {}

.slider li {
    position: relative;
    width: 50%;
    float: left;
}

.slider li img {
    width: 100%;
}

.slider li p.title {
    position: absolute;
    bottom: 0px;
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    margin: 0;
    padding: 10px;
    color: #000;
}

.slider-footer {
    position: absolute;
    bottom: 6px;
    left: 0;
    width: 100%;
}

.slider-footer ul {
    list-style: none;
    padding: 0;
    margin: 0 10px;
    text-align: right;
}

.slider-footer li {
    list-style: none;
    margin: 3px;
    padding: 0;
    width: 10px;
    background-color: rgba(53, 53, 53, 1);
    height: 10px;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
    line-height: 40px;
    overflow: hidden;
}

.slider-footer li.active {
    background-color: rgba(53, 53, 53, 0.5);
}
</style>
<template>
    <div id="slider-box" v-on:mouseenter="mouseEnter" v-on:mouseleave="mouseLeave" :style="{ width: width + 'px', height: height + 'px'}">
        <ul class="slider fn-clear" :style="ulStyle">
            <li :style="liStyle">
                <a :href="lastImg.href" :target="target">
                    <img :src="lastImg.src" :alt="lastImg.alt" :title="lastImg.title">
                    <p v-if="lastImg.title" class="title" v-html="lastImg.title"></p>
                </a>
            </li>
            <li v-for="item in items" :style="liStyle">
                <a :href="item.href" :target="target">
                    <img :src="item.src" :alt="item.alt" :title="item.title">
                    <p v-if="item.title" class="title" v-html="item.title"></p>
                </a>
            </li>
            <li :style="liStyle">
                <a :href="firstImg.href" :target="target">
                    <img :src="firstImg.src" :alt="firstImg.alt" :title="firstImg.title">
                    <p v-if="firstImg.title" class="title" v-html="firstImg.title"></p>
                </a>
            </li>
        </ul>
        <div v-if="sliderNav" class="slider-footer">
            <ul class="fn-clear">
                <li v-for="item in items" :class="{ 'active' : $index + 1 === currenPosition }" @click="scrollTo($index + 1)">
                    <a href="javascript:(0);">{{$index}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: { // 图片数组
            type: Array,
            required: false
        },
        width: { // 宽度
            type: [Number, String],
            required: false,
            default: "auto"
        },
        height: { // 高度
            type: [Number, String],
            required: false,
            default: "auto"
        },
        direction: { // 滚动方向
            type: String,
            required: false,
            default: "left"
        },
        speed: { // 滚动速度
            type: Number,
            required: false,
            default: 2000
        },
        sliderNav: { // 是否有滚动按钮
            type: Boolean,
            required: false,
            default: true
        },
        target: { // 链接跳转方式
            type: String,
            required: false,
            default: '_blank'
        }
    },
    computed: {
        firstImg: function() {
            return this.items[0];
        },
        lastImg: function() {
            return this.items[this.items.length - 1];
        },
        itemLen: function() {
            return this.items.length + 2;
        },
        ulWidth: function() {
            var ulWidth = 100 * this.itemLen;
            return ulWidth;
        },
        liWidth: function() {
            var liWidth = 100 / this.itemLen;
            return liWidth;
        },
        ulHeight: function() {
            var ulHeight = this.height * this.itemLen;
            return ulHeight;
        },
        liHeight: function() {
            return this.height;
        },
        horizontal: function() {
            if (this.direction === 'left' || this.direction === 'right') {
                return true;
            } else if (this.direction === 'up' || this.direction === 'down') {
                return false;
            }
        }
    },
    data: function() {
        return {
            currenPosition: 1,
            lastPosition: 1,
            interval: null,
            ulStyle: {
                width: 'auto',
                height: 'auto',
                transform: null,
                transitionDuration: '0.5s'
            },
            liStyle: {
                width: 'auto',
                height: 'auto'
            }
        }
    },
    ready: function() {
        var x = 0,
            y = 0,
            z = 0;
        if (this.horizontal) {
            this.ulStyle.width = this.ulWidth + '%';
            this.liStyle.width = this.liWidth + '%';
            x = (this.liWidth * -(this.currenPosition)) + "%";
        } else {
            this.ulStyle.height = this.ulHeight + 'px';
            this.liStyle.height = this.liHeight + 'px';
            y = (this.liHeight * -(this.currenPosition)) + "px";
        }
        this.ulStyle.transform = "translate3d(" + x + "," + y + "," + z + ")";
        this.interval = setInterval(this.loop, this.speed);
    },
    methods: {
        loop: function() {
            if (this.direction === "left" || this.direction === 'up') {
                this.currenPosition++;
            }
            if (this.direction === "right" || this.direction === 'down') {
                this.currenPosition--;
            }
            this.scrollTo(this.currenPosition);
        },
        scrollTo: function(index, transitionStop) {
            var self = this;
            var x = 0,
                y = 0,
                z = 0;
            self.currenPosition = index;
            // 是否有动画
            if (transitionStop) {
                self.ulStyle.transitionDuration = null;
            } else {
                self.ulStyle.transitionDuration = '0.5s';
            }
            if (index !== self.lastPosition) {
                if (self.horizontal) {
                    var per = -(index) * self.liWidth;
                    x = per + "%";
                } else {
                    var per = -(index) * self.liHeight;
                    y = per + "px";
                }
                self.ulStyle.transform = "translate3d(" + x + "," + y + "," + z + ")";
                self.lastPosition = index;
                if (index === self.itemLen - 1) {
                    self.currenPosition = 1;
                    setTimeout(function() {
                        self.scrollTo(self.currenPosition, true);
                    }, (self.speed / 2));
                }
                if (index === 0) {
                    self.currenPosition = self.itemLen - 2;
                    setTimeout(function() {
                        self.scrollTo(self.currenPosition, true);
                    }, (self.speed / 2));
                }
            }
        },
        mouseEnter: function() {
            clearInterval(this.interval);
        },
        mouseLeave: function() {
            this.interval = setInterval(this.loop, this.speed);
        }
    }
}
</script>
