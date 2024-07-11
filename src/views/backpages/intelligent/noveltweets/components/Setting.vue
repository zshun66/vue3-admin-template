<script setup name="Setting">

// AI推理配置
const aiReasonConfig = ref({
  platform: 'ZPQY',
  model: '',
  apikey: '',
  apiurl: 'http://localhost:8000/v1'
})
</script>

<template>
  <div class="comp_container setting_comp">
    <!-- AI推理配置 -->
    <el-card class="card_box aireason" shadow="never">
      <template #header>
        <div class="card_header">
          <span>AI推理配置</span>
        </div>
      </template>
      <el-form :model="aiReasonConfig" label-position="right" label-width="68px">
        <el-form-item prop="platform" label="推理平台">
          <el-radio-group v-model="aiReasonConfig.platform" @change="aiReasonConfig.model = ''">
            <el-radio-button label="DS">DeepSeek</el-radio-button>
            <el-radio-button label="ZPQY">智普清言</el-radio-button>
            <el-radio-button label="WWXQ">无问芯穹</el-radio-button>
            <el-radio-button label="TYQW">通义千问</el-radio-button>
            <el-radio-button label="LLM">本地LLM</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="model" label="模型" v-if="aiReasonConfig.platform !== 'LLM'">
          <el-select v-model="aiReasonConfig.model" clearable v-if="aiReasonConfig.platform === 'DS'">
            <el-option label="deepseek-chat" value="deepseek-chat"></el-option>
            <el-option label="deepseek-coder" value="deepseek-coder"></el-option>
          </el-select>
          <el-select v-model="aiReasonConfig.model" clearable v-if="aiReasonConfig.platform === 'ZPQY'">
            <el-option label="glm-3-turbo" value="glm-3-turbo"></el-option>
            <el-option label="glm-4" value="glm-4"></el-option>
            <el-option label="glm-4-flash" value="glm-4-flash"></el-option>
            <el-option label="glm-4-airx" value="glm-4-airx"></el-option>
            <el-option label="glm-4-air" value="glm-4-air"></el-option>
            <el-option label="glm-4-0520" value="glm-4-0520"></el-option>
          </el-select>
          <el-select v-model="aiReasonConfig.model" clearable v-if="aiReasonConfig.platform === 'WWXQ'">
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
          <el-select v-model="aiReasonConfig.model" clearable v-if="aiReasonConfig.platform === 'TYQW'">
            <el-option label="qwen-turbo" value="qwen-turbo"></el-option>
            <el-option label="qwen-plus" value="qwen-plus"></el-option>
            <el-option label="qwen-max" value="qwen-max"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="apikey" label="ApiKey" v-if="aiReasonConfig.platform !== 'LLM'">
          <el-input v-model="aiReasonConfig.apikey" type="password" show-password clearable>
            <template #append>
              <el-button>测试</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="apiurl" label="ApiUrl" v-if="aiReasonConfig.platform === 'LLM'">
          <el-input v-model="aiReasonConfig.apiurl" clearable>
            <template #append>
              <el-button>测试</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 翻译配置 -->
    <el-card class="card_box translate" shadow="never">
      <template #header>
        <div class="card_header">
          <span>翻译配置</span>
        </div>
      </template>
      <el-form :model="aiReasonConfig" label-position="right" label-width="68px">
       
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.setting_comp {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card_box {
    flex: 5;
    
    :deep(.el-card__header) {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .card_header {
      line-height: 1;
    }
  }

  .card_box.translate {
    margin-left: 15px;
  }
}
</style>