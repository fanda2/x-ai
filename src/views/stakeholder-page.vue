<template>
  <div class="temp-container-box">
    <div class="tab-list">
      <div
        class="tab-list-item"
        :class="{ 'tab-list-item-active': item.index == activeIndex }"
        v-for="(item, index) in tabArr"
        :key="index"
        @click="changeMessageList(item.index, item.type)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="tab-content">
      <!-- <LoadingPage :isLoading="isLoading"></LoadingPage> -->
      <div :class="`loading-box ${isLoading ? 'loading-box-show' : ''}`">
        数据加载中...
      </div>
      <ListItem
        :commentList="messageList"
        @getCommentList="getComment"
      ></ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from "./list-item.vue";
import { getDesignList, getMessigeList } from "../common/common";
import LoadingPage from "./loading-page.vue";
export default {
  components: { ListItem, LoadingPage },
  data() {
    return {
      isLoading: false,
      tabArr: [
        {
          index: 1,
          type: "clients",
          title: "Clients and Users",
        },
        {
          index: 2,
          type: "construction",
          title: "Construction Sector",
        },
        {
          index: 3,
          type: "society",
          title: "Society and Citizens",
        },
      ],
      activeIndex: 1,
      messageList: [],
      commentValue: "",
      designerId: "",
      activeType: "clients",
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.designerId = JSON.parse(userInfo).user_no;
    }
    this.getRequestList(this.tabArr[0].type);

    // 监听刷新事件
    this.$bus.$on("stakeholders-refresh", () => {
      this.getRequestList(this.activeType);
    });
  },
  methods: {
    changeMessageList: function (index, type) {
      this.activeIndex = index;
      this.activeType = type;
      this.getRequestList(type);
    },
    //获取对应消息列表
    getRequestList: async function (type) {
      this.isLoading = true;
      const result = await getDesignList(this.designerId, type);
      if (result.code !== 200) {
        this.isLoading = false;
        return this.$message.error("获取信息失败");
      }
      let requestList = result.data.requestList;
      requestList = requestList.map((item) => {
        return {
          ...item,
          hot_tags: (item.hot_tags || "").split(";").filter(Boolean),
        };
      });
      // this.messageList = this.requestList;
      this.setRequestMessageList(requestList);
    },
    //根据消息获取每个列表下面的数据
    setRequestMessageList: function (requestList) {
      let newArr = [];
      let that = this;
      Promise.all(this.getRequestMessageListApi(requestList)).then(
        (arr) => {
          this.isLoading = false;
          arr?.forEach((item, index) => {
            requestList[index].childrenList = item.data.messageList;
          });
          this.messageList = requestList;
        },
        (e) => {
          this.isLoading = false;
          console.log(e);
        }
      );
    },
    getRequestMessageListApi: function (requestList) {
      let requestArr = [];
      requestList?.forEach((item) => {
        requestArr.push(getMessigeList(item.request_id));
      });
      return requestArr;
    },
    //触发请求信息回调
    getComment: function () {
      this.getRequestList(this.activeType);
    },
  },
};
</script>

<style lang="less" scoped>
.temp-container-box {
  width: 100%;
  height: 100%;
}
.tab-list {
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  min-width: 900px;
  &-item {
    flex: 1;
    min-width: 300px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: #ccc;
    font-weight: bold;
    border-radius: 30px 30px 0 0;
    box-shadow: 2px 2px 4px #ccc;
    cursor: pointer;
    border: 1px solid rgb(197, 197, 197);
  }
  &-item-active {
    background: white;

    border-bottom: none;
  }
}
.tab-content {
  height: calc(100% - 125px);
  border: 2px solid #ccc;
  width: 100%;
  background: rgb(255, 255, 255);
  border-radius: 0 30px 30px 30px;
  overflow: hidden;
  padding-bottom: 10px;
  position: relative;

  .loading-box {
    position: absolute;
    z-index: 1000;
    height: 40px;
    line-height: 40px;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
    background-color: rgb(77, 113, 159);
    color: white;
    box-shadow: 0 2px 0 rgba(128, 128, 128, 0.472);
    display: none;
  }

  .loading-box-show {
    display: block;
    animation: loadingShow 0.5s ease;
  }
}

@keyframes loadingShow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
