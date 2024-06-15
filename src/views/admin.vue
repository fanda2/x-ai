<template>
  <div class="admin">
    <div style="padding: 20px 0">
      <el-button type="primary" @click="handleRefresh">刷新数据</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="修改数据" name="first">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加需求</span>
          </div>
          <div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="设计师">
                <el-select v-model="form.designerId" filterable>
                  <el-option label="Designer 1" value="1"></el-option>
                  <el-option label="Designer 2" value="2"></el-option>
                  <el-option label="Designer 3" value="3"></el-option>
                  <el-option label="Designer 4" value="4"></el-option>
                  <el-option label="Designer 5" value="5"></el-option>
                  <el-option label="Designer 6" value="6"></el-option>
                  <el-option label="Designer 7" value="7"></el-option>
                  <el-option label="Designer 8" value="8"></el-option>
                  <el-option label="Designer 9" value="9"></el-option>
                  <el-option label="Designer 10" value="10"></el-option>
                  <el-option label="Designer 11" value="11"></el-option>
                  <el-option label="Designer 12" value="12"></el-option>
                  <el-option label="Designer 13" value="13"></el-option>
                  <el-option label="Designer 14" value="14"></el-option>
                  <el-option label="Designer 15" value="15"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发布者">
                <el-cascader
                  v-model="form.creatorSelect"
                  :options="options"
                  :show-all-levels="false"
                  @change="handleCreatorSelectChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="所属分类">
                <el-select
                  v-model="form.classify"
                  disabled
                  placeholder="选择发布者后自动识别"
                >
                  <el-option
                    label="Clients and Users"
                    value="clients"
                  ></el-option>
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
                <el-input
                  type="textarea"
                  v-model="form.requestContent"
                ></el-input>
              </el-form-item>

              <el-form-item label="预设Good标签">
                <el-select
                  v-model="form.preTags"
                  multiple
                  placeholder="请选择预设Good标签"
                  style="width: 100%"
                  filterable
                  :multiple-limit="2"
                >
                  <el-option
                    v-for="item in tagOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="预设Bad标签">
                <el-select
                  v-model="form.preBadTags"
                  multiple
                  placeholder="请选择预设Bad标签"
                  style="width: 100%"
                  filterable
                  :multiple-limit="2"
                >
                  <el-option
                    v-for="item in tagOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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
              <el-form-item label="需求">
                <el-select
                  v-model="messageForm.requestId"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.request_id"
                    :label="`${item.user_nick} | ${item.request_creator} |【${item.request_id}】需求：${item.request_content}`"
                    :value="item.request_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="回复人">
                <el-cascader
                  v-model="messageForm.creatorSelect"
                  :options="options"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="回复内容">
                <el-input
                  type="textarea"
                  v-model="messageForm.message"
                ></el-input>
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
            <span>添加冲突</span>
          </div>
          <div>
            <el-form ref="form" :model="conflictForm" label-width="100px">
              <el-form-item label="需求A">
                <el-select
                  v-model="conflictForm.requestIdA"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.request_id"
                    :label="`${item.user_nick} | ${item.request_creator} |【${item.request_id}】需求：${item.request_content}`"
                    :value="item.request_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="需求B">
                <el-select
                  v-model="conflictForm.requestIdB"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.request_id"
                    :label="`${item.user_nick} | ${item.request_creator} |【${item.request_id}】需求：${item.request_content}`"
                    :value="item.request_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleCreateConflict"
                  :loading="conflictFormLoading"
                  >添加冲突</el-button
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
              <el-form-item label="需求">
                <el-select
                  v-model="deleteForm.requestId"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in tableData"
                    :key="item.request_id"
                    :label="`${item.user_nick} | ${item.request_creator} |【${item.request_id}】需求：${item.request_content}`"
                    :value="item.request_id"
                  >
                  </el-option>
                </el-select>
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
      </el-tab-pane>
      <el-tab-pane label="需求列表" name="second">
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="tableLoading"
          stripe
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div style="background-color: #f3f3f3; padding: 0 20px">
                <el-form label-position="left" inline>
                  <el-form-item label="【需求内容】：">
                    <span>{{ `${props.row.request_content}` }}</span>
                  </el-form-item>
                </el-form>
                <el-form label-position="left" inline>
                  <el-form-item label="【预置Good标签】：">
                    <span>{{ props.row.pre_tags || "-" }}</span>
                  </el-form-item>
                  <el-form-item label="【当前Good标签】：">
                    <span>{{ props.row.hot_tags || "-" }}</span>
                  </el-form-item>
                </el-form>
                <el-form label-position="left" inline>
                  <el-form-item label="【预置Bad标签】：">
                    <span>{{ props.row.pre_bad_tags || "-" }}</span>
                  </el-form-item>
                  <el-form-item label="【当前Bad标签】：">
                    <span>{{ props.row.bad_tags || "-" }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="request_id" label="需求ID" width="80">
          </el-table-column>
          <el-table-column prop="user_nick" label="设计师" width="120">
          </el-table-column>
          <el-table-column label="分类" width="220">
            <template slot-scope="scope">
              <span>{{
                scope.row.classify === "clients" && "Clients and Users"
              }}</span>
              <span>{{
                scope.row.classify === "construction" && "Construction Sector"
              }}</span>
              <span>{{
                scope.row.classify === "society" && "Society and Citizens"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="request_creator"
            label="需求提出者"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="request_content" label="需求内容">
            <template slot-scope="scope">
              <span>{{ `【需求】：${scope.row.request_content}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前Good标签" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.hot_tags || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前Bad标签" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.bad_tags || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预设Good标签" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.pre_tags || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预设Bad标签" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.pre_bad_tags || "-" }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="冲突列表" name="third">
        <el-table
          :data="conflictTableData"
          style="width: 100%"
          v-loading="conflictTableLoading"
          stripe
        >
          <el-table-column prop="conflict_id" label="冲突ID" width="100">
          </el-table-column>
          <el-table-column label="需求A">
            <template slot-scope="scope">
              <span>{{
                `【需求】：${
                  requestMap.get(scope.row.request_id_a) ||
                  scope.row.request_id_a
                }`
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="需求B">
            <template slot-scope="scope">
              <span>{{
                `【需求】：${
                  requestMap.get(scope.row.request_id_b) ||
                  scope.row.request_id_b
                }`
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="handleDeleteConflict(scope.row.conflict_id)"
                >删除冲突</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  createRequest,
  createMessageAny,
  deleteRequestAny,
  deleteMessageAny,
  requestListAll,
  createConflict,
  conflictList,
  deleteConflict,
} from "../common/common";

import { personOptions } from "../utils/person";
import { allowTag } from "../utils/options";

export default {
  data() {
    return {
      activeName: "first",

      tableLoading: false,

      tableData: [
        // {
        //   request_id: 11,
        //   request_creator: "Developer Sector A",
        //   request_content: "how can i go to school?",
        //   designer_id: 1,
        //   hot_tags: null,
        //   classify: "clients",
        //   create_time: "2024-06-15 13:00:25",
        //   update_time: "2024-06-15 13:00:25",
        //   user_no: 1,
        //   user_role: "design",
        //   user_nick: "designer 1",
        // },
      ],

      requestMap: new Map([]),

      options: personOptions,
      tagOptions: allowTag.map((tag) => ({ value: tag, label: tag })),

      conflictTableLoading: false,
      conflictTableData: [],

      form: {
        designerId: "",
        creatorSelect: [],
        requestContent: "",
        classify: "",
        preTags: [],
        preBadTags: [],
      },
      formLoading: false,

      messageForm: {
        requestId: "",
        creatorSelect: [],
        message: "",
      },
      messageFormLoading: false,

      conflictForm: {
        requestIdA: "",
        requestIdB: "",
      },
      conflictFormLoading: false,

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

  mounted() {
    this.handleGetRequestAll();
    this.handleGetConflictAll();
  },

  methods: {
    async handleRefresh() {
      await this.handleGetRequestAll();
      await this.handleGetConflictAll();
      this.$message({ message: "刷新成功", type: "success" });
    },
    async handleCreateRequest() {
      if (!this.form.designerId) {
        return this.$message({
          message: "请选择设计师",
          type: "warning",
        });
      }

      const classify = this.form.creatorSelect[0];
      const creator = this.form.creatorSelect[1];
      if (!creator) {
        return this.$message({
          message: "请选择需求创建者",
          type: "warning",
        });
      }

      if (!this.form.requestContent) {
        return this.$message({
          message: "请输入需求内容",
          type: "warning",
        });
      }

      if (!this.form.preTags || this.form.preTags.length === 0) {
        return this.$message({
          message: "请选择需求预置Good标签",
          type: "warning",
        });
      }

      if (!this.form.preBadTags || this.form.preBadTags.length === 0) {
        return this.$message({
          message: "请选择需求预置Bad标签",
          type: "warning",
        });
      }

      this.formLoading = true;

      // 执行提交
      const { code } = await createRequest(
        creator,
        this.form.requestContent,
        this.form.designerId,
        classify,
        this.form.preTags.join(";"),
        this.form.preBadTags.join(";")
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
        creatorSelect: [],
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

      const creator = this.messageForm.creatorSelect[1];
      if (!creator) {
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
      const { code } = await createMessageAny(
        this.messageForm.requestId,
        this.messageForm.message,
        creator
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
    async handleCreateConflict() {
      if (!this.conflictForm.requestIdA) {
        return this.$message({
          message: "请选择需求",
          type: "warning",
        });
      }
      if (!this.conflictForm.requestIdB) {
        return this.$message({
          message: "请选择需求",
          type: "warning",
        });
      }

      console.log(this.conflictForm);
      this.conflictFormLoading = true;
      const { code } = await createConflict(
        this.conflictForm.requestIdA,
        this.conflictForm.requestIdB
      );
      this.conflictFormLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "添加失败",
          type: "warning",
        });
      }

      this.conflictForm = {
        requestIdA: "",
        requestIdB: "",
      };

      return this.$message({
        message: "添加成功",
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

    handleCreatorSelectChange(value) {
      console.log(value);
      const classify = value[0];
      this.form.classify = classify;
    },

    // 拉取所有需求
    async handleGetRequestAll() {
      this.tableLoading = true;
      const { code, data } = await requestListAll();
      this.tableLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "获取失败",
          type: "warning",
        });
      }

      this.tableData = data.requestList;
      this.requestMap = new Map(
        data.requestList.map((item) => [item.request_id, item.request_content])
      );
    },

    // 拉取所有冲突
    async handleGetConflictAll() {
      this.conflictTableLoading = true;
      const { code, data } = await conflictList();
      this.conflictTableLoading = false;

      if (code !== 200) {
        return this.$message({
          message: "获取失败",
          type: "warning",
        });
      }

      this.conflictTableData = data.conflictList;
    },

    // 删除冲突
    async handleDeleteConflict(conflictId) {
      this.$message({ message: "正在删除..." });
      const { code } = await deleteConflict(conflictId);
      if (code !== 200) {
        return this.$message({ message: "删除失败", type: "warning" });
      }

      // 刷新冲突
      this.handleGetConflictAll();
      this.$message({ message: "删除成功", type: "success" });
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
