<script setup name="AgeRatio">
const data = [
  { value: 200, name: '10岁以下', percentage: '16%' },
  { value: 110, name: '10 - 18岁', percentage: '8%' },
  { value: 150, name: '18 - 30岁', percentage: '12%' },
  { value: 310, name: '30 - 40岁', percentage: '24%' },
  { value: 250, name: '40 - 60岁', percentage: '20%' },
  { value: 260, name: '60岁以上', percentage: '20%' }
]
const colors = ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA']

const option = ref({
  color: colors,
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b}<br/>占比：{d}%'
  },
  legend: {
    orient: 'vertical',
    right: '5px',
    top: '15px',
    itemGap: 15,
    itemWidth: 14,
    formatter: function (name) {
      let text = ''
      const findRes = data.find(item => item.name === name)
      text = findRes ? `${name}  ${findRes.percentage}` : ''
      return text
    },
    textStyle: { color: '#fff' }
  },
  grid: { top: 'bottom', left: 0, bottom: 0 },
  series: [
    {
      zlevel: 1,
      name: '年龄比例',
      type: 'pie',
      selectedMode: 'single',
      radius: [50, 90],
      center: ['32%', '50%'],
      startAngle: 60,
      label: {
        position: 'inside',
        show: true,
        color: '#fff',
        formatter: function (params) {
          return params.data.percentage
        },
        rich: {
          b: {
            fontSize: 16,
            lineHeight: 30,
            color: '#fff'
          }
        }
      },
      itemStyle: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 10
      },
      data: data.map((val, index) => {
        return {
          value: val.value,
          name: val.name,
          percentage: val.percentage,
          itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[index],
            borderRadius: 10
          }
        }
      })
    },
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      radius: [50, 90],
      center: ['32%', '50%'],
      startAngle: 60,
      data: [
        {
          value: 1000,
          name: '',
          label: {
            show: true,
            formatter: '{a|本日总数}',
            rich: {
              a: {
                align: 'center',
                color: 'rgb(98,,137169)',
                fontSize: 16
              }
            },
            position: 'center'
          }
        }
      ]
    }
  ]
})
</script>

<template>
  <div class="comp_container age_ratio_comp">
    <div class="title_box">
      <div class="title">年龄比例</div>
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
.age_ratio_comp {
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
    }
  }
}
</style>