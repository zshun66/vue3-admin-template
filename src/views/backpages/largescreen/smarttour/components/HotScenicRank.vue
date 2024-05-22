<script setup name="HotScenicRank">
import { ranking1, ranking2, ranking3, ranking4 } from '../assets/ranking-icon.js'

const data = [
  {
    value: 79999,
    name: '峨眉山',
    percentage: '80%',
    maxValue: 100000
  },
  {
    value: 59999,
    name: '稻城亚丁',
    percentage: '60%',
    maxValue: 100000
  },
  {
    value: 49999,
    name: '九寨沟',
    percentage: '50%',
    maxValue: 100000
  },
  {
    value: 39999,
    name: '万里长城',
    percentage: '40%',
    maxValue: 100000
  },
  {
    value: 29999,
    name: '北京故宫',
    percentage: '30%',
    maxValue: 100000
  }
]

const colors = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']

const option = ref({
  grid: {
    top: '5px',
    left: '20px',
    right: '8px',
    bottom: '5px',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white'
      }
    },
    nameGap: 1,
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      fontSize: 16
    },
    triggerEvent: false
  },
  yAxis: [
    {
      show: true,
      data: data.map((val) => val.name),
      inverse: true,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        formatter: (value) => {
          let str = value.length > 6 ? value.slice(0, 6) + '...' : value
          let index = data.map((item) => item.name).indexOf(value) + 1
          return ['{' + (index > 3 ? 'lg' : 'lg' + index) + '|NO.' + index + '}', '{title|' + str + '}'].join(' ')
        },
        rich: {
          lg1: {
            width: 60,
            backgroundColor: {
              image: ranking1
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13
          },
          lg2: {
            width: 60,
            backgroundColor: {
              image: ranking2
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13
          },
          lg3: {
            width: 60,
            backgroundColor: {
              image: ranking3
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13
          },
          lg: {
            width: 60,
            backgroundColor: {
              image: ranking4
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13
          },
          title: {
            width: 60,
            fontSize: 13,
            align: 'center',
            padding: [0, 10, 0, 15]
          }
        }
      },
      triggerEvent: false
    },
    {
      show: true,
      inverse: true,
      data,
      axisLabel: {
        fontSize: 14,
        color: '#fff',
        margin: 20,
        formatter: (value) => {
          return value >= 10000 ? (value / 10000).toFixed(2) + 'w' : value + ''
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      triggerEvent: false
    }
  ],
  series: [
    {
      name: '条',
      type: 'bar',
      yAxisIndex: 0,
      data,
      barWidth: 12,
      itemStyle: {
        borderRadius: 30,
        color: function (params) {
          let num = colors.length
          return colors[params.dataIndex % num]
        }
      },
      label: {
        show: true,
        position: [12, 0],
        lineHeight: 14,
        color: '#fff',
        formatter: params => {
          return (params.data).percentage
        }
      }
    },
    {
      name: '框',
      type: 'bar',
      yAxisIndex: 1,
      data: data.map((val) => {
        if (!val.maxValue) return 5
        return val.maxValue
      }),
      barWidth: 18,
      itemStyle: {
        color: 'none',
        borderColor: '#00c1de',
        borderWidth: 1,
        borderRadius: 15
      },
      silent: true
    }
  ]
})
</script>

<template>
  <div class="comp_container hot_scenic_rank_comp">
    <div class="title_box">
      <div class="title">热门景区排行</div>
      <div class="img"></div>
    </div>
    <div class="content_box">
      <div class="thead_box">
        <span>排名</span>
        <span>景区</span>
        <span>预约数量</span>
      </div>
      <div class="echarts_box">
        <ECharts :option="option"></ECharts>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot_scenic_rank_comp {
  width: 100%;
  height: 35%;
  min-height: 320px;

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
    padding: 10px 10px 0px;
    height: calc(100% - 45px);
    background-image: url("../images/chart-bg2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .thead_box {
      display: flex;
      height: 36px;
      line-height: 36px;
      background: url("../images/rankingChart-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      span {
        width: 70px;
        font-size: 14px;
        font-weight: bold;
        color: #fdbc52;
        text-align: center;

        &:nth-child(2) {
          width: 90px;
        }

        &:nth-child(3) {
          width: 150px;
        }
      }
    }

    .echarts_box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>