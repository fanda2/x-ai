<template>
  <!-- 用户评论弹出框 -->
  <div class="comment-content">
    <div class="message-list">
      <div class="list-title">
        <div class="list-title-content">
          <span class="slogen">Concept Design Phase</span>
          <span>DDL[12:00 AM in 2024/06/06]</span>
        </div>
      </div>
      <div class="message-list-content">
        <div
          class="list-item"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="list-item-inner">
            <div class="left-box">
              <div class="avatar-box">
                <img src="../assets/img/noman-avatar.jpg" alt="头像" />
              </div>
            </div>
            <div class="center-box">
              <div class="title-content">
                <div class="title-content-item user-name">
                  {{ item.username }}
                </div>
                <div class="split-line"></div>
                <div class="title-content-item time-show">
                  4 Days 5 Hour Remaining
                </div>
                <div class="split-line"></div>
                <div class="title-content-item time-show">
                  4 Days 5 Hour Remaining
                </div>
              </div>
              <div class="comment-content">
                {{ item.content }}
              </div>
            </div>
            <div class="right-box">
              <div class="ico-box color-blue">
                <img src="../assets/img/statistic.svg" alt="统计" />
              </div>
              <div class="ico-box">
                <img src="../assets/img/guid.svg" alt="统计" />
              </div>
              <div class="ico-box color-red">
                <img src="../assets/img/comment.svg" alt="统计" />
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
                  <img src="../assets/img/noman-avatar.jpg" alt="头像" />
                </div>
              </div>
              <div class="center-box">
                <div class="title-content">
                  <div class="title-content-item user-name">
                    {{ childItem.username }}
                  </div>
                </div>
                <div class="comment-content">
                  {{ childItem.content }}
                </div>
              </div>
              <div class="right-box" style="width: 60px">
                <div class="ico-box color-red">
                  <img src="../assets/img/comment.svg" alt="评论" />
                </div>
              </div>
            </div>
            <div class="comment-input-box sub-list-item">
              <div class="left-box">
                <div>回复：</div>
                <div class="reback-user-box">Construction 01</div>
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
                <div class="ico-box">
                  <img src="../assets/img/send.svg" alt="评论" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    commentList: {
      type: Object,
      default() {
        return {};
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
      commentValue: "",
      isLogin: false,
      userAvatar: "",
    };
  },
  created() {
    let token = null;
    token = localStorage.getItem("token");
    this.userAvatar = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).authorAvatar
      : "";
    if (token != "" && token != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    sendComment() {
      this.$emit("inputChange", this.commentValue);
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
  },
};
</script>

<style lang="less" scoped>
.comment-content {
  width: 100%;
  height: 100%;
  .message-list {
    width: 100%;
    height: 420px;
    background: white;
    .list-title {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgb(215, 215, 215);
      &-content {
        float: right;
        font-size: 12px;
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
  .list-item-inner,
  .sub-list-item {
    display: flex;
    height: 70px;
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
      }
      .comment-content {
        padding: 6px 10px 0 10px;
      }
    }
    .right-box {
      width: 160px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;
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
