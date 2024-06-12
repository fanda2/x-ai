<template>
  <div class="container-box">
    <div class="content-box">
      <div class="chat-outer-box">
        <div class="chat-content">111</div>
      </div>
      <div class="right-outer-box">
        <div class="stakeholder-box">
          <div class="inner-box">
            <StakeHolderPage></StakeHolderPage>
          </div>
        </div>
        <div class="generate-box">222</div>
      </div>
    </div>
  </div>
</template>

<script>
import StakeHolderPage from "./stakeholder-page.vue";
export default {
  components: { StakeHolderPage },
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
    background: green;
    min-height: 400px;
  }
  .right-outer-box {
    flex: 1;
    height: 100%;
    background: salmon;
    .stakeholder-box {
      height: 500px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      overflow: hidden;
      border-radius: 30px;
      .inner-box{
        height: 100%;
        border-radius: 30px;
        overflow: hidden;
      }
    }
    .generate-box {
      width: 100%;
      height: calc(100% - 500px);
      min-height: 400px;
      background: rgb(166, 150, 148);
      overflow: hidden;
    }
  }
}
</style>
