<script setup name="RealtimeTouristStatistics">
const bookableTotal = ref(999999)
const bookedTotal = ref('256963')

const option = ref({
  title: [
    {
      text: '预约量',
      left: '49%',
      top: '25%',
      textAlign: 'center',
      textStyle: {
        fontSize: '15',
        fontWeight: 'normal',
        color: '#ffffff',
        align: 'center',
        textBorderColor: 'rgba(0, 0, 0, 0)',
        textShadowColor: '#000',
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 1
      }
    },
    {
      text: (bookedTotal.value / bookableTotal.value * 100).toFixed(2) + '%',
      left: '49%',
      top: '35%',
      textAlign: 'center',
      textStyle: {
        fontSize: '16',
        fontWeight: 'normal',
        color: '#ffffff',
        align: 'center',
        textBorderColor: 'rgba(0, 0, 0, 0)',
        textShadowColor: '#000',
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 1
      }
    },
  ],
  grid: {
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    containLabel: true
  },
  polar: {
    center: ['50%', '50%'],
    radius: ['75%', '85%'],
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  angleAxis: {
    max: 120,
    clockwise: false,
    startAngle: 188,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      type: 'bar',
      data: [55],
      z: 10,
      coordinateSystem: 'polar',
      roundCap: true,
      color: '#31d8d5'
    },
    {
      type: 'pie',
      radius: ['80%', '80%'],
      center: ['50%', '50%'],
      z: 1,
      label: { show: false },
      silent: true,
      itemStyle: {
        borderWidth: 2,
        borderType: [8, 10],
        borderDashOffset: 15,
        borderColor: '#31d8d5',
        color: '#11144e',
        borderCap: 'round'
      },
      data: [100]
    },
    {
      type: 'liquidFill',
      radius: '70%',
      z: 2,
      center: ['50%', '50%'],
      data: [0.4, 0.4, 0.4],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#35FAB6' },
            { offset: 1, color: 'rgba(40, 209, 247,0.3)' }
          ],
          global: false
        }
      },
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#31d8d5',
          shadowBlur: 20,
          shadowColor: '#50c1a7'
        }
      },
      label: {
        show: false
      },
      backgroundStyle: {
        borderWidth: 1,
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            { offset: 0, color: '#0D2648' },
            { offset: 0.8, color: '#0D2648' },
            { offset: 1, color: '#228E7D' }
          ],
          global: false
        }
      }
    },
  ]
})
</script>

<template>
  <div class="comp_container realtime_tourist_statistics_comp">
    <div class="title_box">
      <div class="title">实时游客统计</div>
      <div class="img"></div>
    </div>
    <div class="expect_total">可预约总量<i class="num">{{ bookableTotal }}</i>人</div>
    <div class="actual_total">
      <div class="actual_item" v-for="(item, index) in bookedTotal.split('')" :key="index">{{ item }}</div>
      <div class="actual_item">人</div>
    </div>
    <div class="echarts_box">
      <ECharts :option="option"></ECharts>
    </div>
  </div>
</template>

<style scoped lang="scss">
.realtime_tourist_statistics_comp {
  width: 100%;
  height: 350px;
  padding-top: 47px;
  background-image: url('../images/main-lt.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;

  .title_box {
    position: absolute;
    top: 1px;
    left: 0px;

    .title {
      color: #ffffff;
      line-height: 1;
    }

    .img {
      margin-top: 5px;
      width: 68px;
      height: 7px;
      background-image: url('../images/title-img.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .expect_total {
    position: absolute;
    top: 32px;
    right: 10px;
    color: #ffffff;

    .num {
      color: #ff8100;
      font-style: oblique;
    }
  }

  .actual_total {
    padding: 15px 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    .actual_item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-family: MetroDF;
      font-size: 32px;
      color: #6ff;
      background-image: url('../images/total-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .actual_item + .actual_item {
      margin-left: 1px;
    }
  }

  .echarts_box {
    width: 100%;
    height: 100%;
    padding: 0px 10px;
  }
}
</style>