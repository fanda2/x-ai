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
      <ListItem :commentList="messageList"   @getCommentList="getComment"></ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from "./list-item.vue";
import { getDesignList, getMessigeList } from "../common/common";
export default {
  components: { ListItem },
  data() {
    return {
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
      activeType:"clients",
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.designerId = JSON.parse(userInfo).user_no;
    }
    this.getRequestList(this.tabArr[0].type);
  },
  methods: {
    changeMessageList: function (index, type) {
      this.activeIndex = index;
      this.activeType = type;
      this.getRequestList(type);
    },
    //获取对应消息列表
    getRequestList: async function (type) {
      const result = await getDesignList(this.designerId, type);
      let requestList = result.data.requestList;
      // this.messageList = this.requestList;
      this.setRequestMessageList(requestList);
    },
    //根据消息获取每个列表下面的数据
    setRequestMessageList: function (requestList) {
      let newArr = [];
      let that = this;
      Promise.all(this.getRequestMessageListApi(requestList)).then(
        (arr) => {
          arr?.forEach((item, index) => {
            requestList[index].childrenList = item.data.messageList;
          });
          this.messageList = requestList;
        },
        (e) => {
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
    getComment:function(){
      this.getRequestList(this.activeType);
    }
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
}
</style>
