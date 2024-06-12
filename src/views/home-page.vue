<template>
  <div class="container-box">
    <div class="content-box">
      <div class="chat-outer-box">
        <div class="chat-content">
          <AiChat></AiChat>
        </div>
      </div>
      <div class="right-outer-box">
        <div class="stakeholder-box">
          <div class="inner-box">
            <StakeHolderPage></StakeHolderPage>
          </div>
        </div>
        <div class="generate-box">
          <AiPhoto></AiPhoto>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StakeHolderPage from "./stakeholder-page.vue";
import AiChat from "./chat.vue";
import AiPhoto from "./photo.vue";
export default {
  components: { StakeHolderPage, AiChat, AiPhoto },
};
</script>

<style lang="less" scoped>
.container-box {
  width: 100%;
  height: 100vh;
}
.content-box {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  min-width: 1200px;
  .chat-outer-box {
    width: 30%;
    height: 100%;
    min-height: 400px;
  }
  .right-outer-box {
    flex: 1;
    height: 100%;
    .stakeholder-box {
      height: 500px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      overflow: hidden;
      border-radius: 30px;
      border-radius: 30px;
      overflow: hidden;
    }
  }
  .generate-box {
    width: 100%;
    height: calc(100% - 500px);
    min-height: 400px;
    overflow: hidden;
  }
}
</style>
