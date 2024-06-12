<template>
  <div class="temp-container-box">
    <div class="temp-content-box">
      <el-tabs type="border-card" :stretch="true">
        <el-tab-pane label="Clients and Users">
          <ListItem :commentList="messageList"></ListItem>
        </el-tab-pane>
        <el-tab-pane label="Construction Sector">
          <div class="message-list">22</div></el-tab-pane
        >
        <el-tab-pane label="Society and Citizens">
          <div class="message-list">33</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ListItem from "./list-item.vue";
export default {
  components: { ListItem },
  data() {
    return {
      messageList: [
        {
          id: 1,
          username: "fanda",
          time: "2024-06-06",
          content: "这是评论内容",
          childrenList: [
            {
              id: 3,
              username: "fanda",
              time: "2024-06-06",
              content: "这是评论内容",
            },
            {
              id: 3,
              username: "fanda",
              time: "2024-06-06",
              content: "这是评论内容",
            },
            {
              id: 3,
              username: "fanda",
              time: "2024-06-06",
              content: "这是评论内容",
            },
          ],
        },
        {
          id: 2,
          username: "fanda",
          time: "2024-06-06",
          content: "这是评论内容",
        },
      ],
      commentValue: "",
    };
  },
};
</script>

<style lang="less" scoped>
.temp-cotainer-box {
  width: 100%;
  height: 100%;
}
</style>
