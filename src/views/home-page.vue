<template>
  <div class="container-box">
    <div class="container-content">
      <div class="container-content_chat-outer-box">
        <AiChat></AiChat>
      </div>
      <div class="container-content_right-outer-box">
        <div class="stakeholder-box">
          <div class="content-title">Stakeholders</div>
          <StakeHolderPage></StakeHolderPage>
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
  min-width: 1400px;
  background-color: rgb(225, 225, 225);
}
.container-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  min-width: 1200px;
  &_chat-outer-box {
    width: 30%;
    height: 100%;
    min-height: 400px;
    padding: 0 20px;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  &_right-outer-box {
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
      min-width: 1000px;
    }
  }
  .generate-box {
    width: 100%;
    height: calc(100% - 500px);
    min-height: 400px;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
  }
}
.content-title {
  font-weight: bold;
  font-size: 23px;
  height: 40px;
  line-height: 40px;
  color: #333;
}
</style>
