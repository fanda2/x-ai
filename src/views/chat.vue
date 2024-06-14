<template>
  <div class="chat">
    <div class="chat-list">
      <div class="chat-list__header">AI ChatBot</div>
      <div v-if="messageList.length" class="chat-list__body">
        <div
          class="chat-list-item"
          :class="
            item.Message.Role == 'assistant' ? 'left-align' : 'right-align'
          "
          v-for="(item, index) in messageList"
          :key="index"
        >
          <div class="chat-list-item__name">{{ item.Message.Role }}</div>
          <div class="chat-list-item__content right-align-content">
            {{ item.Message.Content }}
            <div
              v-if="
                extractTagsFormat(item.Message.Content).length !== 0 &&
                item.Message.Role == 'assistant'
              "
              class="chat-list-item__tags"
            >
              <div
                class="chat-list-item__tags-item"
                v-for="(item, index) in extractTagsFormat(item.Message.Content)"
                :key="index"
                @click="chooseTag(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-list__body">
        <el-empty :image-size="200"> </el-empty>
      </div>
    </div>
    <div class="chat-input">
      <textarea
        class="chat-input-textarea"
        v-model="sendContent"
        placeholder="请输入..."
      />
      <div class="chat-input-btn" @click="sendMessageBtn"></div>
    </div>
  </div>
</template>

<script>
import { chatMessage } from "@/common/common";
import { extractTags } from "@/utils/utils";
export default {
  data() {
    return {
      currentRequestId: "",
      trackContent: "Track: 请问是否有其他需求与这一变动产生冲突？",
      alalyseContent: "Analyse:现在建设方提出一个需求",
      responseContent: "Response:现在建设方提出一个需求",
      userInfo: "",
      sendContent: "",

      messageList: [],

      allowList: [
        "Minimalism Style",
        "Bamboo Material",
        "Curved  Ribs Dome Framework",
        "Grid Dome Framework",
        "Geodesic Dome Framework",
        "Hexagonal Dome Framework",
        "Fence",
        "Forest",
        "Garden",
        "Grass",
        "Hemispherical Design",
        "Mountain Environment",
        "Nature",
        "Outdoors",
        "Polygonal Grid",
        "Scenery",
        "Self-Supporting Structure",
        "Sky",
        "Sunlight",
        "Tree",
      ],
    };
  },
  created() {
    let userMessage = localStorage.getItem("userInfo");
    if (userMessage) {
      this.userInfo = JSON.parse(userMessage);
    }
    this.messageList = localStorage.getItem("messageList")
      ? JSON.parse(localStorage.getItem("messageList"))
      : [];
    this.$bus.$on("sendMessage", (data) => {
      this.currentRequestId = data.requestId;
      if (data.istemplate && data.type == "analyse") {
        this.sendMessageApi(this.alalyseContent + data.value);
      } else if (data.istemplate && data.type == "track") {
        this.sendMessageApi(this.trackContent);
      } else {
        this.sendMessageApi(this.responseContent + data.value);
      }
    });
  },
  methods: {
    sendMessageApi: async function (sendContent, requestId) {
      let senMessageArr = [];
      //获取历史消息
      this.messageList.forEach((item) => {
        let obj = {
          role: item.Message.Role,
          content: item.Message.Content,
        };
        senMessageArr.push(obj);
      });
      //将当前消息插入
      senMessageArr.push({
        role: "user",
        content: sendContent,
      });
      this.messageList.push({
        Message: { Role: "user", Content: sendContent },
      });
      const result = await chatMessage(senMessageArr, this.currentRequestId);
      if (result.code !== 200) {
        return this.$message.error("信息发送失败！");
      }
      this.sendContent = "";
      this.messageList = [
        ...this.messageList,
        ...result.data.chatResult.Choices,
      ];
      localStorage.setItem("messageList", JSON.stringify(this.messageList));
    },
    //点击发送信息按钮
    sendMessageBtn: async function () {
      if (this.sendContent.trim() == "") {
        return this.$message({
          message: "输入内容不能为空",
          type: "warning",
        });
      }
      this.sendMessageApi(this.sendContent);
    },
    extractTagsFormat: function (message) {
      return extractTags(message, this.allowList);
    },
    chooseTag: function (tag) {
      this.$bus.$emit("addTag", tag);
    },
  },
};
</script>

<style lang="less" scoped>
.chat {
  min-width: 360px;
  width: 100%;
  border: 1px solid gray;
  min-height: 800px;
  height: 100%;
  background-color: #a2a2a2;
  border-radius: 10px;

  .chat-list {
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);
    background-color: white;
    box-sizing: border-box;
    min-width: 340px;
    width: calc(100% - 40px);
    min-height: 600px;
    height: calc(100% - 230px);
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
      padding: 10px;

      .chat-list-item {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
        // border: 1px solid #e0e0e0;
        box-sizing: border-box;
        min-width: 280px;
        width: 80%;

        &__name {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }

        &__content {
          min-width: 280px;
          width: 100%;
          padding: 10px 10px;
          margin-top: 4px;
          font-size: 14px;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          border-radius: 10px;
          word-break: break-all;

          .chat-list-item__tags {
            display: flex;
            gap: 8px;
            margin-top: 4px;

            &-item {
              background-color: #fff9d5;
              color: gray;
              font-size: 12px;
              border-radius: 16px;
              box-sizing: border-box;
              padding: 3px 8px;
              cursor: pointer;
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
    min-width: 340px;
    width: calc(100% - 40px);
    height: 180px;
    border-radius: 10px;
    margin: 20px auto 0 auto;
    padding: 10px 0;
    position: relative;

    .chat-input-textarea {
      display: block;
      box-sizing: border-box;
      min-width: 320px;
      width: 100%;
      height: 120px;
      border: none;
      padding: 10px;
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
