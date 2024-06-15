<template>
  <!-- 用户评论弹出框 -->
  <div class="comment-content-outer">
    <div class="message-list">
      <div class="list-title">
        <div class="list-title-content">
          <span class="slogen">Concept Design Phase</span>
          <span>DDL[12:00 AM in 2024/06/06]</span>
        </div>
      </div>
      <div v-if="commentList.length > 0" class="message-list-content">
        <div
          class="list-item"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="list-item-inner">
            <div class="left-box">
              <div class="avatar-box">
                <img
                  src="../assets/avatars/black.svg"
                  alt="头像"
                  v-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'black'
                  "
                />
                <img
                  src="../assets/avatars/blue-black.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'blue-black'
                  "
                />
                <img
                  src="../assets/avatars/blue.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'blue'
                  "
                />
                <img
                  src="../assets/avatars/gray.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'gray'
                  "
                />
                <img
                  src="../assets/avatars/green.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'green'
                  "
                />
                <img
                  src="../assets/avatars/green-light.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'green-light'
                  "
                />
                <img
                  src="../assets/avatars/orange.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'orange'
                  "
                />
                <img
                  src="../assets/avatars/red-light.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'red-light'
                  "
                />
                <img
                  src="../assets/avatars/red.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'red'
                  "
                />
                <img
                  src="../assets/avatars/yellow.svg"
                  alt="头像"
                  v-else-if="
                    item.isConflict &&
                    avatarMap.get(item.request_creator) === 'yellow'
                  "
                />
                <!-- 设计师默认头像 -->
                <img src="../assets/img/noman-avatar.svg" alt="头像" v-else />
              </div>
            </div>
            <div class="center-box">
              <div class="title-content">
                <div class="title-content-item user-name">
                  {{ item.request_creator }}
                </div>
                <div class="split-line"></div>
                <div
                  class="title-content-item"
                  style="color: #d04444"
                  v-if="timeDiffWithNow(item.allow_time) < 0"
                >
                  {{ formatTime(item.allow_time) }}
                </div>
                <div
                  class="title-content-item"
                  style="color: #d04444"
                  v-else-if="
                    timeDiffWithNow(item.allow_time) < 1 * 24 * 60 * 60 * 1000
                  "
                >
                  {{ formatTime(item.allow_time) }} Remaining
                </div>
                <div
                  class="title-content-item"
                  style="color: #5a8dff"
                  v-else-if="
                    timeDiffWithNow(item.allow_time) < 4 * 24 * 60 * 60 * 1000
                  "
                >
                  {{ formatTime(item.allow_time) }} Remaining
                </div>
                <div class="title-content-item" v-else style="color: #507c04">
                  {{ formatTime(item.allow_time) }} Remaining
                </div>
                <div class="split-line"></div>
                <div class="title-content-item tag-show">
                  <div class="tag-show-title">Hot Comments:</div>
                  <span
                    v-if="
                      item.hot_tags.length === 0 && item.bad_tags.length === 0
                    "
                    >-</span
                  >
                  <div v-else class="tag-list">
                    <div
                      class="tag-list-item"
                      v-for="tag in item.hot_tags"
                      @click="chooseTag(tag)"
                      :style="`${
                        item.isConflict
                          ? `background-color: ${tagMap.get(
                              item.request_creator
                            )}`
                          : ''
                      }`"
                    >
                      <div class="ico-box">
                        <img src="../assets/img/good.svg" alt="成功" />
                      </div>
                      <div class="tag-list-item__text" :title="tag">
                        {{ tag }}
                      </div>
                    </div>
                    <div
                      class="tag-list-item"
                      v-for="tag in item.bad_tags"
                      @click="chooseTag(tag)"
                      :style="`${
                        item.isConflict
                          ? `background-color: ${tagMap.get(
                              item.request_creator
                            )}`
                          : ''
                      }`"
                    >
                      <div class="ico-box">
                        <img src="../assets/img/bad.svg" alt="失败" />
                      </div>
                      <div class="tag-list-item__text" :title="tag">
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="comment-content">
                [{{ item.request_id }}]{{ item.request_content }}
              </div>
            </div>
            <div class="right-box">
              <div
                class="ico-box color-blue"
                @click="sendAnalyseMessage(item.request_content, item)"
              >
                <img src="../assets/img/statistic.svg" alt="统计" />
              </div>
              <div
                class="ico-box"
                @click="sendTrackMessage(item.request_content, item)"
              >
                <img src="../assets/img/guid.svg" alt="发送" />
              </div>
              <div
                class="ico-box color-red"
                @click="showCommentInput(index, item)"
              >
                <img src="../assets/img/comment.svg" alt="回复" />
              </div>
            </div>
          </div>

          <div class="sub-list">
            <div
              class="sub-list-item"
              v-for="(childItem, index) in item.childrenList"
              :key="index"
            >
              <div class="left-box">
                <div class="avatar-box">
                  <img
                    src="../assets/avatars/black.svg"
                    alt="头像"
                    v-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'black'
                    "
                  />
                  <img
                    src="../assets/avatars/blue-black.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'blue-black'
                    "
                  />
                  <img
                    src="../assets/avatars/blue.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'blue'
                    "
                  />
                  <img
                    src="../assets/avatars/gray.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'gray'
                    "
                  />
                  <img
                    src="../assets/avatars/green.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'green'
                    "
                  />
                  <img
                    src="../assets/avatars/green-light.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'green-light'
                    "
                  />
                  <img
                    src="../assets/avatars/orange.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'orange'
                    "
                  />
                  <img
                    src="../assets/avatars/red-light.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'red-light'
                    "
                  />
                  <img
                    src="../assets/avatars/red.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'red'
                    "
                  />
                  <img
                    src="../assets/avatars/yellow.svg"
                    alt="头像"
                    v-else-if="
                      item.isConflict &&
                      avatarMap.get(childItem.creator) === 'yellow'
                    "
                  />
                  <!-- 设计师默认头像 -->
                  <img src="../assets/img/noman-avatar.svg" alt="头像" v-else />
                </div>
              </div>
              <div class="center-box">
                <div class="title-content">
                  <div class="title-content-item user-name">
                    {{ childItem.creator }}
                  </div>
                </div>
                <div class="comment-content">
                  [{{ childItem.message_id }}]{{ childItem.message_content }}
                </div>
              </div>
              <div class="right-box" style="width: 60px">
                <div
                  class="ico-box color-red"
                  @click="showCommentInput(index, childItem)"
                >
                  <img src="../assets/img/comment.svg" alt="评论" />
                </div>
              </div>
            </div>
            <div
              v-show="index == showInputIndex"
              class="comment-input-box sub-list-item"
            >
              <div class="left-box">
                <div style="min-width: 50px">回复：</div>
                <div
                  class="reback-user-box toe"
                  :title="
                    replayObj.request_creator
                      ? replayObj.request_creator
                      : replayObj.creator
                  "
                >
                  {{
                    replayObj.request_creator
                      ? replayObj.request_creator
                      : replayObj.creator
                  }}
                </div>
              </div>
              <div class="center-box">
                <el-input
                  placeholder="请输入内容"
                  v-model="commentValue"
                  clearable
                >
                </el-input>
              </div>
              <div class="right-box" style="width: 60px">
                <div class="ico-box" @click="sendComment">
                  <img src="../assets/img/send.svg" alt="评论" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="message-list-content">
        <el-empty :image-size="200"> </el-empty>
      </div>
    </div>
  </div>
</template>
<script>
import { formatTimeDifference } from "../utils/utils";
import { createMessage } from "../common/common";
import { personMap } from "../utils/person";
import { sleep, timeDiffWithNow } from "../utils/utils";
export default {
  props: {
    commentList: {
      type: Array,
      default() {
        return [];
      },
    },
    usePage: Number,
    useSize: Number,
    commentTotal: Number,
    showTotal: Number,
    LoginState: Boolean,
  },
  data() {
    return {
      isLoading: true,
      commentValue: "",
      isLogin: false,
      userAvatar: "",
      showInputIndex: -1,
      replayObj: {},
      userInfo: {},
      currentRequestId: 0,
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
      avatarMap: new Map(
        Object.values(personMap).map((item) => [item.name, item.icon])
      ),
      tagMap: new Map(
        Object.values(personMap).map((item) => [item.name, item.tag])
      ),
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
    this.userInfo = userInfo;
    console.log(this.commentList);
  },
  methods: {
    sendComment() {
      if (this.commentValue.trim() == "") {
        return this.$message({
          message: "发送信息不能为空",
          type: "warning",
        });
      }
      this.designerCreateMessage();
    },
    /**
     * 清除输入框内容
     */
    clearValue() {
      this.commentValue = "";
    },
    /**
     * 页面大小改变
     * 	page-size 改变时触发
     */
    handleSizeChange(val) {
      this.$emit("setSize", val);
      this.$emit("getCommentList");
    },
    /**
     * 页面计数改变
     * current-page 改变时触发
     */
    handleCurrentChange(val) {
      this.$emit("setPage", val);
      this.$emit("getCommentList");
    },
    /**
     * 用户点击上一页按钮改变当前页时触发
     */
    preChange(val) {
      this.$emit("setPage", val);
      this.$emit("getCommentList");
    },
    /**
     * 用户点击下一页按钮改变当前页时触发
     */
    nextChange(val) {
      this.$emit("setPage", val);
      this.$emit("getCommentList");
    },

    //展示评论框
    showCommentInput: function (index, chatMsg) {
      this.showInputIndex = index;
      this.replayObj = chatMsg;
      this.currentRequestId = chatMsg.request_id;
      let sendValue = chatMsg.request_content
        ? chatMsg.request_content
        : chatMsg.message_content;
      this.$bus.$emit("sendMessage", {
        type: "message",
        istemplate: false,
        value: sendValue,
        requestId: chatMsg.request_id,
      });
    },

    //格式化时间
    formatTime: function (time) {
      return formatTimeDifference(new Date(time));
    },

    timeDiffWithNow: function (date) {
      return timeDiffWithNow(new Date(date));
    },

    // 发送信息回复
    designerCreateMessage: async function (requestId) {
      this.$message({ message: "正在回复中..." });
      const result = await createMessage(
        this.currentRequestId,
        this.commentValue,
        this.userInfo.user_no
      );
      if (result.code !== 200) {
        return this.$message.error("回复信息失败");
      }

      this.$emit("getCommentList");

      await sleep(2 * 1000);
      this.$message({ message: "回复成功", type: "success" });

      this.showInputIndex = -1;
      this.replayObj = {};
      this.commentValue = "";
    },
    //发送信息
    sendAnalyseMessage: function (value, chatMsg) {
      this.$bus.$emit("sendMessage", {
        type: "analyse",
        istemplate: true,
        value: value,
        requestId: chatMsg.request_id,
      });
    },
    sendTrackMessage: function (value, chatMsg) {
      this.$bus.$emit("sendMessage", {
        type: "track",
        istemplate: true,
        value: value,
        requestId: chatMsg.request_id,
      });
    },

    chooseTag: function (tag) {
      this.$bus.$emit("addTag", tag);
    },
  },
};
</script>

<style lang="less" scoped>
.comment-content-outer {
  width: 100%;
  height: 98%;
  background: darkcyan;
  .message-list {
    width: 100%;
    height: 100%;
    background: white;
    .list-title {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgb(215, 215, 215);
      &-content {
        float: right;
        font-size: 12px;
        padding-right: 20px;
        color: purple;
        .slogen {
          font-weight: bold;
          padding-right: 30px;
        }
      }
    }
    &-content {
      height: calc(100% - 30px);
      padding-bottom: 10px;
      overflow: auto;
    }
  }
}
.message-list-content {
  position: relative;
  padding: 0 30px;

  .list-item-inner,
  .sub-list-item {
    display: flex;
    min-height: 70px;
    border-radius: 10px;
    background: #eeeeee;
    margin-top: 10px;
    padding: 5px 0;

    .left-box {
      width: 60px;
      height: 70px;
      .avatar-box {
        width: 40px;
        height: 40px;
        margin: 15px;
        overflow: hidden;
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .center-box {
      flex: 1;
      .title-content {
        display: flex;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        &-item {
          padding: 0 10px;
        }
        .user-name {
          font-weight: bold;
        }
        .tag-show {
          display: flex;
          width: 50%;
          min-width: 300px;
          &-title {
            width: 115px;
            min-width: 115px;
          }
          .tag-list {
            width: 80%;
            height: 100%;
            display: flex;
            align-items: center;
            gap: 4px;

            &-item {
              padding: 0 5px;
              display: flex;
              gap: 4px;
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              border-radius: 10px;
              background: wheat;
              border: 1px solid #e0e0e0;
              align-items: center;

              &:hover {
                cursor: pointer;
                filter: grayscale(70%);
              }

              &:active {
                filter: none;
              }

              &__text {
                display: -webkit-box;
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }

              .ico-box {
                width: 18px;
                min-width: 18px;
                height: 18px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
              }
              img {
                width: 90%;
                height: 90%;
              }
            }
          }
        }
      }
      .comment-content {
        width: 96%;
        padding: 0 10px 10px 10px;
        font-size: 14px;
      }
    }
    .right-box {
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .ico-box {
        cursor: pointer;
        width: 30px;
        height: 30px;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 50%;
        background: rgb(232, 232, 232);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 88%;
          height: 88%;
          object-fit: cover;
        }
      }
      .ico-box:hover {
        background: rgb(201, 201, 201);
      }
      .color-blue {
        background: rgb(157, 173, 189);
      }
      .color-blue:hover {
        background: rgb(135, 151, 167);
      }
      .color-red {
        background: rgb(184, 164, 173);
      }
      .color-red:hover {
        background: rgb(170, 148, 158);
      }
    }
  }
}
.bottom-button {
  position: absolute;
  left: auto;
  right: 10px;
  .ico-box {
    cursor: pointer;
    width: 30px;
    height: 30px;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 50%;
    background: rgb(232, 232, 232);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 88%;
      height: 88%;
      object-fit: cover;
    }
  }
  .ico-box:hover {
    background: rgb(201, 201, 201);
  }
}
.sub-list {
  width: calc(100% - 90px);
  margin-left: 70px;
  margin-right: 20px;
  .comment-input-box {
    background: white;
    height: 70px;
    line-height: 70px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 10px;
    .left-box {
      padding: 0 10px;
      width: 180px;
      display: flex;
    }
    .right-box {
      .ico-box {
        background: #ccc;
      }
    }
  }
}
.split-line {
  width: 0px;
  height: 80%;
  border-right: 1px solid rgb(117, 117, 117);
  background: rgb(125, 125, 125);
}
</style>
<style lang="less">
.el-tabs__nav {
  width: 100%;
}
.el-tabs__item {
  height: 60px;
  line-height: 50px;
  width: 33.3%;
  text-align: center;
}
.el-tabs__content {
  height: 100%;
}
.center-box {
  .el-input {
    input {
      height: 50px;
      border: none;
    }
  }
}
</style>
