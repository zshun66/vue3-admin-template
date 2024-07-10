<script setup name="backstage:noveltweets:noveltweets">
import OneEdit from './components/OneEdit.vue'
import Setting from './components/Setting.vue'

import axios from 'axios'

const noveltweetsConfig = localStorage.getItem('QS_ADMIN_NOVELTWEETS_CONFIG') || {}
const outActiveTab = ref('oneedit')

// const handleChatGPT = () => {
//   axios({
//     method: 'get',
//     url: '/gpt/v1/models',
//     headers: {
//       'Authorization': `Bearer ${'sk-ibDImO0Nhpaerqiq154X2Q7KMMQIaeQFb0YnVl5ZAc5hixZG'}`,
//     },
//   }).then(res => {
//     console.log(res)
//   }).catch(error => {
//     console.error('Error:', error)
//   })

//   axios({
//     method: 'post',
//     url: '/gpt/v1/chat/completions',
//     headers: {
//       'Authorization': `Bearer ${'sk-ibDImO0Nhpaerqiq154X2Q7KMMQIaeQFb0YnVl5ZAc5hixZG'}`,
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify({
//       model: 'gpt-4o', // text-davinci-003 gpt-4o gpt-3.5-turbo
//       messages: [
//         { role: 'system', content: '现在你是一名基于输入描述的提示词生成器，你会将我输入的自然语言想象为完整的画面生成提示词。请注意你生成后的内容服务于一个绘画AI，它只能理解具象的提示词而非抽象的概念。我将提供简短的中文描述，生成器需要为我提供准确的提示词，必要时优化和重组以提供更准确的内容。请模仿示例的结构生成完美的提示词。示例输入: “一个坐在路边的办公室女职员”示例输出: 一个女孩，办公室小姐，独唱，性感，巨大的胸部，美丽的细节眼睛，淡淡的腮红，黑色头发，长发，鼻红，看着观众，西装，白色衬衫，条纹超短裙，蕾丝黑色连裤袜，黑色高跟鞋，LV包，大腿高，展开腿，坐着，街道，商店边界，秋叶原，东京，树，雨，多云，美丽的详细背景，景深，萝莉，逼真，环境光，电影构图，霓虹灯，HDR，强调照明。请仔细阅读我的要求，并严格按照规则生成提示词。现在我输入“这天。好好的大晌午，眨眼间黑如三更。整个村子都陷入一片黑暗之中。”，请生成我需要的中文提示词。' }
//       ],
//     })
//   }).then(res => {
//     console.log(res)
//     const result = res.data.choices[0].message.content
//     console.log(result)
//   }).catch(error => {
//     console.error('Error:', error)
//   })
// }
</script>

<template>
  <div class="page_container noveltweets_page">
    <el-tabs v-model="outActiveTab" type="card">
      <el-tab-pane name="oneedit" label="一键改文"></el-tab-pane>
      <el-tab-pane name="format" label="格式化文章"></el-tab-pane>
      <el-tab-pane name="keyword" label="生成关键词"></el-tab-pane>
      <el-tab-pane name="setting" label="配置中心"></el-tab-pane>
    </el-tabs>

    <OneEdit v-if="outActiveTab === 'oneedit'"></OneEdit>
    <Setting v-if="outActiveTab === 'setting'"></Setting>

    <div class="tab_wrapper" v-if="outActiveTab === 'keyword'">
      <el-button type="primary" @click="handleChatGPT">GPT</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.noveltweets_page {
  width: 100%;
}
</style>