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
      <el-form ref="form" :model="messageForm" label-width="100px">
        <el-form-item label="需求ID">
          <el-input v-model="messageForm.requestId"></el-input>
        </el-form-item>
        <el-form-item label="发布者名称">
          <el-input v-model="messageForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="回复内容">
          <el-input type="textarea" v-model="messageForm.message"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleCreateMessage"
            >立即回复</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任意删除发言</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { createRequest } from "../common/common";

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
    handleCreateMessage() {},
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
