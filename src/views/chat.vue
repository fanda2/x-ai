<template>
  <div class="chat">
    <div class="chat-list">
      <div class="chat-list__header">AI Bot</div>
      <div class="chat-list__body">
        <div class="chat-list-item right-align" v-for="item in 2">
          <div class="chat-list-item__name">Name 1</div>
          <div class="chat-list-item__content right-align-content">
            content测试内容测试内容测试内容测试内容测试内容测试内容测试内容
          </div>
        </div>

        <div class="chat-list-item left-align" v-for="item in 2">
          <div class="chat-list-item__name">Name 1</div>
          <div class="chat-list-item__content left-align-content">
            content测试内容测试内容测试内容测试内容测试内容测试内容测试内容

            <div class="chat-list-item__tags">
              <div class="chat-list-item__tags-item">标签</div>
              <div class="chat-list-item__tags-item">标签</div>
              <div class="chat-list-item__tags-item">标签</div>
              <div class="chat-list-item__tags-item">标签</div>
              <div class="chat-list-item__tags-item">标签</div>
            </div>
          </div>
        </div>

        <div class="chat-list-item right-align" v-for="item in 6">
          <div class="chat-list-item__name">Name 1</div>
          <div class="chat-list-item__content right-align-content">
            content测试内容测试内容测试内容测试内容测试内容测试内容测试内容
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea class="chat-input-textarea" placeholder="请输入..." />
      <div class="chat-input-btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.chat {
  width: 360px;
  border: 1px solid gray;
  height: 800px;
  background-color: #a2a2a2;
  border-radius: 10px;

  .chat-list {
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);
    background-color: white;
    box-sizing: border-box;
    width: 340px;
    height: 600px;
    border-radius: 10px;
    margin: 10px auto 0 auto;
    overflow: hidden;

    &__header {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      border-bottom: 1px solid #e0e0e0;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
    }

    &__body {
      box-sizing: border-box;
      height: calc(100% - 40px);
      overflow-y: auto;
      padding-bottom: 10px;

      .chat-list-item {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
        // border: 1px solid #e0e0e0;
        box-sizing: border-box;
        width: 280px;

        &__name {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }

        &__content {
          width: 280px;
          padding: 10px 10px;
          margin-top: 4px;
          font-size: 14px;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          border-radius: 10px;
          word-break: break-all;

          .chat-list-item__tags {
            display: flex;
            gap: 4px;
            margin-top: 4px;

            &-item {
              background-color: #fff9d5;
              color: gray;
              font-size: 12px;
              border-radius: 10px;
              box-sizing: border-box;
              padding: 0 5px;
            }
          }
        }
      }

      .right-align {
        float: right;
        clear: right;
      }

      .right-align-content {
        background-color: #f2f2f2;
      }

      .left-align {
        float: left;
        clear: left;
      }

      .left-align-content {
        background-color: #d5d5d5;
      }
    }
  }

  .chat-input {
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);
    box-sizing: border-box;
    background-color: white;
    width: 340px;
    height: 170px;
    border-radius: 10px;
    margin: 10px auto 0 auto;
    padding: 10px 0;
    position: relative;

    .chat-input-textarea {
      display: block;
      box-sizing: border-box;
      width: 320px;
      height: 120px;
      border: none;
      //   border: 1px solid #e0e0e0;
      margin: 0 auto;
      resize: none;
    }

    .chat-input-textarea:focus-visible {
      outline: none;
    }

    .chat-input-btn {
      box-sizing: border-box;
      width: 25px;
      height: 25px;
      background: url("../assets/arrow-right.svg") no-repeat;
      background-size: 90%;
      background-position: center;
      background-color: #cdcdcd;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      right: 20px;
      bottom: 10px;

      &:hover {
        cursor: pointer;
        background-color: #e4e4e4;
        transition: all 0.2s ease-in-out;
      }
      &:active {
        background-color: #cdcdcd;
        transition: all 0.2s ease-in-out;
      }
    }
  }
}
</style>
