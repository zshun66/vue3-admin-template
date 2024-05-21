<script setup name="GenderRatio">
const data = {
  man: 0.6,
  woman: 0.4
}

const option = ref({
  xAxis: {
    type: 'value',
    show: false
  },
  grid: {
    left: 0,
    top: '15px',
    bottom: 0,
    right: 0
  },
  yAxis: [
    {
      type: 'category',
      position: 'left',
      data: ['男生'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    {
      type: 'category',
      position: 'right',
      data: ['女士'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false,
        padding: [0, 0, 40, -60],
        fontSize: 12,
        lineHeight: 60,
        color: 'rgba(255, 255, 255, 0.9)',
        formatter: '{value}' + data.woman * 100 + '%',
        rich: {
          a: {
            color: 'transparent',
            lineHeight: 30,
            fontFamily: 'digital',
            fontSize: 12
          }
        }
      }
    }
  ],
  series: [
    {
      type: 'bar',
      barWidth: 20,
      data: [data.man],
      z: 20,
      itemStyle: {
        borderRadius: 10,
        color: '#007AFE'
      },
      label: {
        show: true,
        color: '#E7E8ED',
        position: 'insideLeft',
        offset: [0, -20],
        fontSize: 12,
        formatter: () => {
          return `男士 ${data.man * 100}%`;
        }
      }
    },
    {
      type: 'bar',
      barWidth: 20,
      data: [1],
      barGap: '-100%',
      itemStyle: {
        borderRadius: 10,
        color: '#FF4B7A'
      },
      label: {
        show: true,
        color: '#E7E8ED',
        position: 'insideRight',
        offset: [0, -20],
        fontSize: 12,
        formatter: () => {
          return `女士 ${data.woman * 100}%`;
        }
      }
    }
  ]
})
</script>

<template>
  <div class="comp_container gender_ratio_comp">
    <div class="title_box">
      <div class="title">男女比例</div>
      <div class="img"></div>
    </div>
    <div class="content_box">
      <div class="img_box">
        <div class="man">
          <span>男士</span>
          <img src="../images/man.png" alt="" />
        </div>
        <div class="woman">
          <span>女士</span>
          <img src="../images/woman.png" alt="" />
        </div>
      </div>
      <div class="echarts_box">
        <ECharts :option="option"></ECharts>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gender_ratio_comp {
  width: 100%;
  height: 30%;
  min-height: 260px;

  .title_box {
    height: 45px;
    background-image: url('../images/chart-bg1.png');
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
      background-image: url('../images/title-img.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .content_box {
    height: calc(100% - 45px);
    background-image: url('../images/chart-bg2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .img_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 35px 0px;

      .man {
        width: 111px;
        height: 110px;
        background-image: url('../images/man-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;

        span {
          position: absolute;
          top: 3px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 14px;
        }

        img {

        }
      }

      .woman {
        background-image: url('../images/woman-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 111px;
        height: 110px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;

        span {
          position: absolute;
          top: 3px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 14px;
        }

        img {
          
        }
      }
    }

    .echarts_box {
      width: 100%;
      height: 100%;
      padding: 0 35px;
    }
  }
}
</style>