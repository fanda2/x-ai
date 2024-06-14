<template>
  <div class="admin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加需求</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="设计师ID">
            <el-input v-model="form.designerId"></el-input>
          </el-form-item>
          <el-form-item label="发布者名称">
            <el-input v-model="form.creator"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="form.classify">
              <el-option label="Clients and Users" value="clients"></el-option>
              <el-option
                label="Construction Sector"
                value="construction"
              ></el-option>
              <el-option
                label="Society and Citizens"
                value="society"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需求内容">
            <el-input type="textarea" v-model="form.requestContent"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="handleCreateRequest"
              :loading="formLoading"
              >创建需求</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>利益相关者回复</span>
      </div>
      <div>
        <el-form ref="form" :model="messageForm" label-width="100px">
          <el-form-item label="需求ID">
            <el-input v-model="messageForm.requestId"></el-input>
          </el-form-item>
          <el-form-item label="回复人名称">
            <el-input v-model="messageForm.creator"></el-input>
          </el-form-item>
          <el-form-item label="回复内容">
            <el-input type="textarea" v-model="messageForm.message"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="handleCreateMessage"
              :loading="messageFormLoading"
              >立即回复</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任意删除需求</span>
      </div>
      <div>
        <el-form ref="form" :model="deleteForm" label-width="100px">
          <el-form-item label="需求ID">
            <el-input v-model="deleteForm.requestId"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              @click="handleDeleteRequest"
              :loading="deleteFormLoading"
              >立即删除</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任意删除发言</span>
      </div>
      <div>
        <el-form ref="form" :model="deleteMessageForm" label-width="100px">
          <el-form-item label="发言ID">
            <el-input v-model="deleteMessageForm.messageId"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              @click="handleDeleteMessage"
              :loading="deleteMessageFormLoading"
              >立即删除</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  createRequest,
  createMessageAny,
  deleteRequestAny,
  deleteMessageAny,
} from "../common/common";

export default {
  data() {
    return {
      form: {
        designerId: "",
        creator: "",
        requestContent: "",
        classify: "clients",
      },
      formLoading: false,

      messageForm: {
        requestId: "",
        creator: "",
        message: "",
      },
      messageFormLoading: false,

      deleteForm: {
        requestId: "",
      },
      deleteFormLoading: false,

      deleteMessageForm: {
        messageId: "",
      },
      deleteMessageFormLoading: false,
    };
  },

  methods: {
    async handleCreateRequest() {
      if (!this.form.designerId) {
        return this.$message({
          message: "请输入设计师ID",
          type: "warning",
        });
      }

      if (!this.form.creator) {
        return this.$message({
          message: "请输入需求创建者",
          type: "warning",
        });
      }

      if (!this.form.requestContent) {
        return this.$message({
          message: "请输入需求内容",
          type: "warning",
        });
      }

      this.formLoading = true;

      // 执行提交
      const { code } = await createRequest(
        this.form.creator,
        this.form.requestContent,
        this.form.designerId,
        this.form.classify
      );

      this.formLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "添加失败",
          type: "warning",
        });
      }

      this.form = {
        designerId: "",
        creator: "",
        requestContent: "",
        classify: "clients",
      };

      return this.$message({
        message: "需求创建成功",
        type: "success",
      });
    },
    async handleCreateMessage() {
      if (!this.messageForm.requestId) {
        return this.$message({
          message: "请输入需求ID",
          type: "warning",
        });
      }

      if (!this.messageForm.creator) {
        return this.$message({
          message: "请输入回复人名称",
          type: "warning",
        });
      }

      if (!this.messageForm.message) {
        return this.$message({
          message: "请输入回复内容",
          type: "warning",
        });
      }

      this.messageFormLoading = true;

      // 执行回复
      await createMessageAny(
        this.messageForm.requestId,
        this.messageForm.message,
        this.messageForm.creator
      );

      this.messageFormLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "添加失败",
          type: "warning",
        });
      }

      this.messageForm = {
        requestId: "",
        creator: "",
        message: "",
      };

      return this.$message({
        message: "需求创建成功",
        type: "success",
      });
    },
    async handleDeleteRequest() {
      if (!this.deleteForm.requestId) {
        return this.$message({
          message: "请输入需求ID",
          type: "warning",
        });
      }

      this.deleteFormLoading = true;
      const { code } = await deleteRequestAny(this.deleteForm.requestId);
      this.deleteFormLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "删除失败",
          type: "warning",
        });
      }

      this.deleteForm = {
        requestId: "",
      };

      return this.$message({
        message: "删除成功",
        type: "success",
      });
    },
    async handleDeleteMessage() {
      if (!this.deleteMessageForm.messageId) {
        return this.$message({
          message: "请输入回复ID",
          type: "warning",
        });
      }
      this.deleteMessageFormLoading = true;
      const { code } = await deleteMessageAny(this.deleteMessageForm.messageId);
      this.deleteMessageFormLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "删除失败",
          type: "warning",
        });
      }

      this.deleteMessageForm = {
        messageId: "",
      };

      return this.$message({
        message: "删除成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.admin {
  padding: 20px 0;
  margin: 0 20px;

  .box-card {
    margin-bottom: 20px;
  }
}
</style>
