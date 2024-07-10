<script setup name="OneEdit">
import axios from 'axios'

// 改文模板列表
const reviseTextTemplate = [
  {
    name: 'temp1',
    title: '模板1',
    frontContent: `作为写作大师，重写下面原文，要求如下。\n1.大致意思不变，并且适合口语化；\n2.字数和标点符合和原文一致；\n3.只输出重写的内容部分。\n原文：`,
    backConternt: ``
  },
  {
    name: 'temp2',
    title: '模板2',
    frontContent: `作为写作大师，重写下面原文，要求如下。\n1.大致意思不变，并且适合口语化；\n原文：`,
    backConternt: ``
  }
]
// 当前模板名称
const currTemplateName = ref('temp1')
// 当前模板前置内容
const currTemplateFrontContent = ref(reviseTextTemplate[0].frontContent)
// 当前模板后置内容
const currTemplateBackContent = ref(reviseTextTemplate[0].backConternt)


// AI推理配置
const aiReasonConfig = ref({
  platform: 'DS', // AI推理平台
  model: 'deepseek-chat', // AI模型
  apikey: 'sk-3c265109215a442288abd61c340204e6', // API密钥

  deepSeek_ApiKey: 'sk-3c265109215a442288abd61c340204e6', // DeepSeek的apikey
  zpqy_ApiKey: '80ade88391309a945f06d7fb2b406bbb.E5OUXo7mOnziQz6c', // 智普清言的apikey
})
// 原文案内容
const originText = ref('')
// 修改后文案内容
const editedText = ref('')

// 选择的模板改变时
const handleTemplateChange = (value) => {
  const findRes = reviseTextTemplate.find(item => item.name === value)
  if (!findRes) return
  currTemplateFrontContent.value = findRes.frontContent
  currTemplateBackContent.value = findRes.backConternt
}

// 选择的AI推理平台改变时
const handleAiPlatformChange = (value) => {
  aiReasonConfig.value.model = ''
  if (value === 'DS') {
    aiReasonConfig.value.apikey = aiReasonConfig.value.deepSeek_ApiKey
  } else if (value === 'ZPQY') {
    aiReasonConfig.value.apikey = aiReasonConfig.value.zpqy_ApiKey
  }
}

// 测试AI平台
const handleTestAiPlatform = () => {
  // 测试DeepSeek
  if (aiReasonConfig.value.platform === 'DS') {
    let config = {
      method: 'get',
      url: 'https://api.deepseek.com/models',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${aiReasonConfig.value.apikey}`
      },
      maxBodyLength: Infinity,
    }
    axios(config).then((response) => {
      ElMessage.success('测试通过')
    }).catch((error) => {
      ElMessage.error('测试不通过')
    })
  }
  // 测试智普清言
  else if (aiReasonConfig.value.platform === 'ZPQY') {
    
  }
}
</script>

<template>
  <div class="comp_container one_edit_comp">
    <div class="template_wrapper">
      <div class="template_select_wrap">
        <label class="label" for="">改文模板：</label>
        <el-select class="selector" v-model="currTemplateName" @change="handleTemplateChange">
          <el-option v-for="(item, index) in reviseTextTemplate" :key="index" :label="item.title" :value="item.name"></el-option>
        </el-select>
      </div>
      <div class="template_content_wrap">
        <div class="front_content_box">
          <div class="label">前置内容:</div>
          <el-input class="content" v-model="currTemplateFrontContent" type="textarea" :autosize="{ minRows: 20, maxRows: 20 }"></el-input>
        </div>
        <div class="back_content_box">
          <div class="label">后置内容:</div>
          <el-input class="content" v-model="currTemplateBackContent" type="textarea" :autosize="{ minRows: 7, maxRows: 7 }"></el-input>
        </div>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="platform_select_wrap">
        <label class="label" for="">AI平台：</label>
        <el-select class="platform_selector" v-model="aiReasonConfig.platform" @change="handleAiPlatformChange">
          <el-option label="DeepSeek" value="DS"></el-option>
          <el-option label="智普清言" value="ZPQY"></el-option>
          <el-option label="无问芯穹" value="WWXQ"></el-option>
          <el-option label="通义千问" value="TYQW"></el-option>
        </el-select>
        <el-select class="model_selector" v-model="aiReasonConfig.model" placeholder="请选择模型" clearable v-if="aiReasonConfig.platform === 'DS'">
          <el-option label="deepseek-chat" value="deepseek-chat"></el-option>
          <el-option label="deepseek-coder" value="deepseek-coder"></el-option>
        </el-select>
        <el-select class="model_selector" v-model="aiReasonConfig.model" placeholder="请选择模型" clearable v-if="aiReasonConfig.platform === 'ZPQY'">
          <el-option label="GLM-4-0520" value="GLM-4-0520"></el-option>
          <el-option label="GLM-4" value="GLM-4"></el-option>
          <el-option label="GLM-4-AirX" value="GLM-4-AirX"></el-option>
          <el-option label="GLM-4-Air" value="GLM-4-Air"></el-option>
          <el-option label="GLM-4-Flash" value="GLM-4-Flash"></el-option>
          <el-option label="GLM-3-Turbo" value="GLM-3-Turbo"></el-option>
        </el-select>
        <el-select class="model_selector" v-model="aiReasonConfig.model" placeholder="请选择模型" clearable v-if="aiReasonConfig.platform === 'WWXQ'">
          <el-option label="qwen-7b-chat" value="qwen-7b-chat"></el-option>
          <el-option label="qwen-14b-chat" value="qwen-14b-chat"></el-option>
          <el-option label="qwen-72b-chat" value="qwen-72b-chat"></el-option>
          <el-option label="qwen-72b" value="qwen-72b"></el-option>
          <el-option label="qwen1.5-1.8b-chat" value="qwen1.5-1.8b-chat"></el-option>
          <el-option label="qwen1.5-4b-chat" value="qwen1.5-4b-chat"></el-option>
          <el-option label="qwen1.5-7b-chat" value="qwen1.5-7b-chat"></el-option>
          <el-option label="qwen1.5-14b-chat" value="qwen1.5-14b-chat"></el-option>
          <el-option label="qwen1.5-72b-chat" value="qwen1.5-72b-chat"></el-option>
          <el-option label="qwen1.5-72b" value="qwen1.5-72b"></el-option>
          <el-option label="baichuan2-7b-chat" value="baichuan2-7b-chat"></el-option>
          <el-option label="baichuan2-13b-chat" value="baichuan2-13b-chat"></el-option>
          <el-option label="baichuan2-13b-base" value="baichuan2-13b-base"></el-option>
          <el-option label="llama-2-70b-chat" value="llama-2-70b-chat"></el-option>
          <el-option label="llama-2-70b" value="llama-2-70b"></el-option>
          <el-option label="llama-2-7b-chat" value="llama-2-7b-chat"></el-option>
          <el-option label="llama-2-13b-chat" value="llama-2-13b-chat"></el-option>
          <el-option label="chatglm2-6b" value="chatglm2-6b"></el-option>
          <el-option label="chatglm2-6b-32k" value="chatglm2-6b-32k"></el-option>
          <el-option label="chatglm3-6b" value="chatglm3-6b"></el-option>
          <el-option label="chatglm3-6b-32k" value="chatglm3-6b-32k"></el-option>
          <el-option label="chatglm3-6b-base" value="chatglm3-6b-base"></el-option>
          <el-option label="chatglm3" value="chatglm3"></el-option>
          <el-option label="infini-megrez-7b" value="infini-megrez-7b"></el-option>
        </el-select>
        <el-select class="model_selector" v-model="aiReasonConfig.model" placeholder="请选择模型" clearable v-if="aiReasonConfig.platform === 'TYQW'">
          <el-option label="qwen-turbo" value="qwen-turbo"></el-option>
          <el-option label="qwen-plus" value="qwen-plus"></el-option>
          <el-option label="qwen-max" value="qwen-max"></el-option>
        </el-select>
        <el-input class="apikey_input" v-model="aiReasonConfig.apikey" placeholder="请输入ApiKey" type="password" show-password clearable>
          <template #append>
            <el-button @click="handleTestAiPlatform">测试</el-button>
          </template>
        </el-input>
      </div>
      <div class="origin_content_box">
        <div class="label">原文案内容:</div>
        <el-input class="content" v-model="originText" type="textarea" :autosize="{ minRows: 14, maxRows: 14 }"></el-input>
      </div>
      <div class="edited_content_box">
        <div class="label">修改文案内容:</div>
        <el-input class="content" v-model="editedText" type="textarea" :autosize="{ minRows: 13, maxRows: 13 }"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.one_edit_comp {
  width: 100%;
  display: flex;
  align-items: flex-start;

  .template_wrapper {
    flex: 4;
    max-width: 400px;

    .template_select_wrap {

      .label {
        font-size: 15px;
      }

      .selector {
        width: calc(100% - 75px);
      }
    }

    .template_content_wrap {
      margin-top: 20px;

      .front_content_box {

        .label {
          font-size: 15px;
        }

        .content {
          margin-top: 7px;
        }
      }

      .back_content_box {
        margin-top: 20px;

        .label {
          font-size: 15px;
        }

        .content {
          margin-top: 7px;
        }
      }
    }
  }

  .content_wrapper {
    margin-left: 15px;
    flex: 6;

    .platform_select_wrap {

      .label {
        font-size: 15px;
      }

      .platform_selector {
        width: 150px;
      }

      .model_selector {
        width: 200px;
      }

      .apikey_input {
        width: 400px;
      }
    }

    .origin_content_box {
      margin-top: 20px;

      .label {
        font-size: 15px;
      }

      .content {
        margin-top: 7px;
      }
    }

    .edited_content_box {
      margin-top: 20px;

      .label {
        font-size: 15px;
      }

      .content {
        margin-top: 7px;
      }
    }
  }
}
</style>