<script setup name="backstage:largescreen:smarttour">
import RealtimeTouristStatistics from './components/RealtimeTouristStatistics.vue'
import GenderRatio from './components/GenderRatio.vue'
import AgeRatio from './components/AgeRatio.vue'
import ScenicRealTimeFlow from './components/ScenicRealTimeFlow.vue'
import Next30DaysTrend from './components/Next30DaysTrend.vue'
import HotScenicRank from './components/HotScenicRank.vue'

const $router = useRouter()

// 跳转首页
const handleNavToHome = () => {
  $router.replace('/backstage/home')
}
</script>

<template>
  <div class="page_container smarttour_page">
    <div class="largescreen_header">
      <div class="header_left">
        <div class="left_btn" @click="handleNavToHome">首页</div>
      </div>
      <div class="header_center">
        <div class="big_title">智慧旅游可视化大数据展示平台</div>
        <div class="small_title">平台高峰预警信息（2条）</div>
      </div>
      <div class="header_right">
        <div class="right_btn">统计报告</div>
      </div>
    </div>

    <div class="largescreen_main">
      <div class="main_left_box">
        <RealtimeTouristStatistics></RealtimeTouristStatistics>
        <GenderRatio></GenderRatio>
        <AgeRatio></AgeRatio>
      </div>
      <div class="main_center_box">
        <ScenicRealTimeFlow></ScenicRealTimeFlow>
        <Next30DaysTrend></Next30DaysTrend>
      </div>
      <div class="main_right_box">
        <HotScenicRank></HotScenicRank>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.smarttour_page {
  width: 100vw;
  height: 100vh;
  background-image: url('./images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0px 0px;
  border-radius: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  --largescreen-header-height: 35px;
  --largescreen-left-width: 22vw;
  --largescreen-center-width: 56vw;
  --largescreen-right-width: 22vw;

  .largescreen_header {
    width: 100%;
    height: var(--largescreen-header-height);
    display: flex;
    align-items: flex-start;

    .header_left {
      width: var(--largescreen-left-width);
      height: 100%;
      background-image: url('./images/header-left-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: flex-end;

      .left_btn {
        width: 6vw;
        height: 40px;
        background-image: url('./images/header-btn-bg-l.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: YouSheBiaoTiHei;
        color: #29fcff;
        cursor: pointer;
      }
    }

    .header_center {
      width: var(--largescreen-center-width);
      height: auto;

      .big_title {
        width: 100%;
        height: 72px;
        background-image: url('./images/header-center-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #29fcff;
        font-size: 24px;
      }

      .small_title {
        width: 100%;
        height: 50px;
        background-image: url('./images/header-warn-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
      }
    }

    .header_right {
      width: var(--largescreen-right-width);
      height: 100%;
      background-image: url('./images/header-right-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: flex-start;

      .right_btn {
        width: 6vw;
        height: 40px;
        background-image: url('./images/header-btn-bg-r.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: YouSheBiaoTiHei;
        color: #29fcff;
        cursor: pointer;
      }
    }
  }

  .largescreen_main {
    width: 100%;
    height: calc(100% - var(--largescreen-header-height));
    padding-top: var(--largescreen-main-top-padding);
    padding-right: var(--largescreen-main-right-padding);
    padding-bottom: var(--largescreen-main-bottom-padding);
    padding-left: var(--largescreen-main-left-padding);
    --largescreen-main-top-padding: 10px;
    --largescreen-main-right-padding: 20px;
    --largescreen-main-bottom-padding: 10px;
    --largescreen-main-left-padding: 20px;
    display: flex;

    .main_left_box {
      width: calc(var(--largescreen-left-width) - var(--largescreen-main-left-padding));
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .main_center_box {
      width: var(--largescreen-center-width);
      height: 100%;
      padding: 0 15px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .main_right_box {
      width: calc(var(--largescreen-right-width) - var(--largescreen-main-right-padding));
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>