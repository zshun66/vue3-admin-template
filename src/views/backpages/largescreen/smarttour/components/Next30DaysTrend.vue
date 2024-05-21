<script setup name="Next30DaysTrend">
const dateData = [
  '06/01',
  '06/02',
  '06/03',
  '06/04',
  '06/05',
  '06/06',
  '06/07',
  '06/08',
  '06/09',
  '06/10',
  '06/11',
  '06/12',
  '06/13',
  '06/14',
  '06/15',
  '06/16',
  '06/17',
  '06/18',
  '06/19',
  '06/20',
  '06/21',
  '06/22',
  '06/23',
  '06/24',
  '06/25',
  '06/26',
  '06/27',
  '06/28',
  '06/29',
  '06/30',
]
const visitData = {
  unit: ['访问量'],
  data: new Array(dateData.length).fill('').map(val => val = parseInt(Math.random() * 200000))
}
const option = ref({
  grid: {
    top: '30px',
    left: '40px',
    right: '35px',
    bottom: '25px'
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 30],
        lineStyle: {
          color: '#233653',
          shadowOffsetX: 20,
          shadowColor: '#233653'
        }
      },
      axisLabel: {
        color: '#7ec7ff',
        padding: 0,
        fontSize: 12,
        formatter: function (data) {
          return data
        }
      },
      splitLine: { show: false, lineStyle: { color: '#192a44' } },
      axisTick: { show: false },
      data: dateData
    }
  ],
  yAxis: visitData.unit.map((_val, index) => {
    return {
      name: '(访问量)',
      nameTextStyle: {
        color: '#7ec7ff',
        fontSize: 12,
        padding: [0, 30, -4, 0]
      },
      minInterval: 1,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#192a44'
        }
      },
      axisLine: {
        show: index === 0 ? true : false,
        lineStyle: {
          color: '#233653'
        }
      },
      axisLabel: {
        show: true,
        color: '#7ec7ff',
        padding: 0,
        formatter: function (value) {
          if (Number(value) >= 10000) {
            value = Number(value) / 10000 + 'w'
          }
          return value
        }
      },
      axisTick: {
        show: false
      }
    }
  }),
  series: visitData.data.map(() => {
    return {
      name: '',
      type: 'line',
      symbol: 'circle',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#707070',
        borderColor: '#707070'
      },
      itemStyle: {
        color: '#F5B348',
        shadowColor: 'rgba(245, 179, 72, 0.3)',
        shadowBlur: 3
      },
      emphasis: {
        scale: true
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#846B38' },
            { offset: 0.5, color: '#403E47' },
            { offset: 1, color: '#11144E' }
          ],
          global: false
        },
        shadowColor: 'rgba(255, 199, 37, 0)',
        shadowBlur: 20
      },
      data: visitData.data
    }
  }),
  tooltip: {
    trigger: 'axis',
    confine: true,
    formatter: params => {
      let tipData = params[0]
      let html = `
        <div class='line-chart-bg'>
          <span style=''>${tipData.name} <i >${tipData.value}</i> 人次访问</span>
        </div>
      `
      return html
    },
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    axisPointer: { lineStyle: { type: 'dashed' }, snap: true },
    extraCssText: 'box-shadow: none; padding: 0;'
  },
})
</script>

<template>
  <div class="comp_container next_30days_trend_comp">
    <div class="title_box">
      <div class="title">未来30天游客量趋势图</div>
      <div class="img"></div>
    </div>
    <div class="content_box">
      <div class="echarts_box">
        <ECharts :option="option"></ECharts>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.next_30days_trend_comp {
  width: 100%;
  height: 30%;
  min-height: 260px;

  .title_box {
    height: 45px;
    background-image: url("../images/chart-bg1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .title {
      position: relative;
      top: 2px;
      color: #ffffff;
      line-height: 1;
    }

    .img {
      margin-top: 12px;
      width: 68px;
      height: 7px;
      background-image: url("../images/title-img.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .content_box {
    height: calc(100% - 45px);
    background-image: url("../images/chart-bg2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .echarts_box {
      width: 100%;
      height: 100%;

      :deep(.line-chart-bg) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 180px;
        height: 60px;
        padding-left: 20px;
        background: url("../images/line-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        span {
          font-size: 12px;
          color: rgb(255 255 255 / 80%);
          i {
            font-style: normal;
            color: #f5b348;
          }
        }
      }
    }
  }
}
</style>