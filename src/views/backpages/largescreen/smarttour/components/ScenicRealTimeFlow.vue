<script setup name="ScenicRealTimeFlow">
import * as echarts from 'echarts'
import chinaMapJson from '../assets/chinaMap.json'

const data = [
  {
    fromName: '北京',
    toName: '上海',
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891]
    ]
  },
  {
    fromName: '上海',
    toName: '北京',
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '广州',
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196]
    ]
  },
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '成都',
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617]
    ]
  },
  {
    fromName: '成都',
    toName: '北京',
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '成都',
    toName: '新疆维吾尔自治区',
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801]
    ]
  },
  {
    fromName: '新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617]
    ]
  }
]
const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

echarts.registerMap('chinaMap', chinaMapJson)

const option = ref({
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px'
  },
  geo: {
    map: 'chinaMap',
    zoom: 1.5,
    center: [100.848234, 37.82333],
    roam: true,
    scaleLimit: {
      min: 0.8,
      max: 2
    },
    label: {
      show: true,
      color: '#fff',
    },
    itemStyle: {
      areaColor: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#073684' },
          { offset: 1, color: '#061E3D' }
        ]
      },
      borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#00F6FF' },
        { offset: 1, color: '#87ADCB' }
      ], false),
      shadowColor: 'rgba(10,76,139,1)',
      shadowOffsetY: 0,
      shadowBlur: 60,
      borderWidth: 1
    },
    emphasis: {
      label: {
        show: true,
        color: '#fff',
      },
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#073684' },
            { offset: 1, color: '#2B91B7' }
          ]
        }
      }
    },
    tooltip: {
      show: false
    }
  },
  series: [
    {
      name: '',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: 'red',
        symbolSize: 3
      },
      lineStyle: {
        color: '#fff',
        width: 0,
        curveness: 0.2
      },
      data: data
    },
    {
      name: '',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      symbol: ['none', 'arrow'],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        color: '#fff',
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      data: data
    }
  ]
})
</script>

<template>
  <div class="comp_container scenic_real_time_flow_comp">
    <div class="title_box">景区实时客流量</div>
    <div class="content_box">
      <div class="echarts_box">
        <ECharts :option="option"></ECharts>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scenic_real_time_flow_comp {
  width: 100%;
  height: 70%;
  min-height: 500px;
  position: relative;

  .title_box {
    width: 220px;
    height: 25px;
    padding-left: 20px;
    color: #ffffff;
    line-height: 1;
    font-size: 14px;
    letter-spacing: 5px;
    background-image: url('../images/map-title-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 100px;
    left: 20px;
  }

  .content_box {
    height: calc(100%);

    .echarts_box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>