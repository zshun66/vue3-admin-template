<script setup name="YearTouristVolumeContrast">
const gradientColors = ['rgba(254, 219, 101,0.1)', 'rgba(0, 122, 254,0.1)', 'rgba(255, 75, 122, 0.1)'];
const annualData = [
  {
    label: new Date().getFullYear() - 2 + '年',
    value: ['184', '90', '120', '0', '30', '100', '80', '40', '20', '510', '350', '180']
  },
  {
    label: new Date().getFullYear() - 1 + '年',
    value: ['118', '509', '366', '162', '380', '123', '321', '158', '352', '474', '154', '22']
  },
  {
    label: new Date().getFullYear() + '年',
    value: ['548', '259', '113', '90', '69', '512', '23', '49', '28', '420', '313', '156']
  }
]
const data = {
  data: annualData,
  unit: annualData.map(val => val.label),
  columns: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  colors: ['#FFA600', '#007AFE', '#FF4B7A']
}

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    formatter: (params) => {
      let str = ''
      params.forEach((val) => {
        str += `
          <div class='year-item'>
            <span class='year-dot' style='background-color: ${val.color};'></span>
            <span class='year-name'>${val.seriesName}</span>
            <span class='year-value'>${val.data >= 10000 ? (val.data / 10000).toFixed(2) + 'w' : val.data}</span>
          </div>
        `
      })
      const dom = `
        <div class='annual-tooltip'>
          <span class='annual-month'>${params[0].dataIndex + 1}月</span>
          <div class='annual-list'>
            ${str}
          </div>
        </div>
      `
      return dom
    }
  },
  legend: {
    right: '2%',
    top: '0%',
    itemWidth: 15,
    itemHeight: 6,
    align: 'auto',
    icon: 'rect',
    itemGap: 15,
    textStyle: {
      color: '#ebebf0'
    }
  },
  grid: {
    top: '35px',
    left: '35px',
    right: '10px',
    bottom: '25px'
  },
  xAxis: [
    {
      name: '(月份)',
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#233653'
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
      splitLine: {
        show: false,
        lineStyle: {
          color: '#192a44'
        }
      },
      axisTick: {
        show: false
      },
      data: data.columns
    }
  ],
  yAxis: {
    name: '(人数)',
    nameTextStyle: {
      color: '#D6DFEA',
      fontSize: 12,
      padding: [0, 30, 0, 0]
    },
    minInterval: 1,
    splitNumber: 5,
    splitLine: {
      show: false,
      lineStyle: {
        color: '#192a44'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#233653'
      }
    },
    axisLabel: {
      show: true,
      color: '#B9D6D6',
      padding: 0
    },
    axisTick: {
      show: false
    }
  },
  series: data.data.map((val, index) => {
    return {
      name: val.label,
      type: 'line',
      symbol: 'circle',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        width: 1,
        color: data.colors[index],
        borderColor: data.colors[index]
      },
      itemStyle: {
        color: data.colors[index],
        borderColor: '#646ace',
        borderWidth: 2
      },
      tooltip: {
        show: true
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: data.colors[index]
            },
            {
              offset: 1,
              color: gradientColors[index]
            }
          ],
          global: false
        },
        shadowColor: 'rgba(25,163,223, 0.3)',
        shadowBlur: 20
      },
      data: val.value
    }
  })
})
</script>

<template>
  <div class="comp_container year_tourist_volume_contrast_comp">
    <div class="title_box">
      <div class="title">年度游客量对比</div>
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
.year_tourist_volume_contrast_comp {
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

      :deep(.annual-tooltip) {
        box-sizing: border-box;
        width: 120px;
        height: 100px;
        padding: 5px 15px 0px;
        background: url("../images/contrast-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .annual-month {
          display: inline-block;
          margin-left: -5px;
          font-size: 12px;
          color: #03b8e2;
          line-height: 1;
        }
        .annual-list {
          margin-top: 3px;
          display: flex;
          flex-direction: column;
          width: 100%;
          .year-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 19px;
            .year-dot {
              margin-left: 2px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
            }
            .year-name,
            .year-value {
              font-size: 11px;
              color: #03b8e2;
            }
            .year-name {
              margin-left: 5px;
            }
            .year-value {
              margin-left: 5px;
              display: inline-block;
              width: 25%;
            }
          }
          .year-item + .year-item {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
</style>