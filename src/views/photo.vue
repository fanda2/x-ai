<template>
  <div class="photo">
    <div class="photo-input">
      <div class="photo-input__title">Concept Description</div>
      <div class="photo-input__body">
        <div class="photo-input__body-tags">
          <div
            v-for="(item, index) in tagList"
            :key="index"
            class="photo-input__body-tags-item"
          >
            {{ item }}
            <span
              class="photo-input__body-tags-item__delete"
              @click="handleDeleteTag(item)"
            ></span>
          </div>
        </div>
        <div class="photo-input__body-input">
          <textarea
            class="photo-input__body-input-textarea"
            v-model="sendMessageValue"
            placeholder="请输入..."
          />
        </div>
        <div class="photo-input__body-input-btn" @click="diagramBtn"></div>
      </div>
    </div>
    <div class="photo-preview">
      <div class="photo-preview__title">Generate Images</div>
      <div class="photo-preview__body">
        <div class="photo-preview__body-keywords">
          {{ currentImageValue.image_keyword }}
        </div>
        <div class="photo-preview__body-images">
          <img :src="currentImageValue.image_base64" alt="图片" />
        </div>
        <div class="photo-preview__body-pagination">
          <div class="photo-preview__body-pagination-prev">
            <el-button
              size="mini"
              type="primary"
              @click="prePage"
              :disabled="pageValue == 1"
              >上一页</el-button
            >
          </div>
          <div class="photo-preview__body-pagination-select">
            <el-select
              v-model="pageValue"
              size="mini"
              placeholder="请选择跳转的页码"
              @change="pageChange"
            >
              <el-option
                v-for="item in imageList.length"
                :key="item"
                :label="`第 ${item} 张`"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="photo-preview__body-pagination-next">
            <el-button
              size="mini"
              type="primary"
              :disabled="imageList.length == pageValue"
              @click="nextPage"
              >下一页</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageList, generateImage, uplodImage } from "../common/common";
export default {
  data() {
    return {
      imageList: [],
      tagList: [],
      sendMessageValue: "",
      currentImageValue: {
        image_base64: "",
        image_keyword: "",
        image_id: "",
      },
      pageValue: 1,
    };
  },
  created() {
    this.getImageListAll();
    this.$bus.$on("addTag", (data) => {
      this.addTagToList(data);
    });
  },
  methods: {
    //获取所有图片记录
    getImageListAll: async function () {
      const result = await getImageList();
      if (result.code !== 200) {
        return this.$message.error("加载图片列表失败");
      }
      this.imageList = result.data.imageList;
      if (this.imageList.length > 0) {
        this.currentImageValue = this.imageList[this.imageList.length - 1];
        this.pageValue = this.imageList.length;
      }
    },
    //添加标签到标签列表
    addTagToList: function (tag) {
      const lowercaseElement = tag.toLowerCase();
      const lowercaseArray = this.tagList.map((item) => item.toLowerCase());
      if (!lowercaseArray.includes(lowercaseElement)) {
        this.tagList = [...this.tagList, tag];
      }
    },
    // 删除标签
    handleDeleteTag(tag) {
      this.tagList = this.tagList.filter((item) => item !== tag);
    },

    //发送请求生成图片
    diagramBtn: function () {
      if (this.sendMessageValue.trim() == "") {
        return this.$message({
          message: "输入内容不能为空",
          type: "warning",
        });
      }
      this.diagramBtnApi(this.sendMessageValue);
    },
    //调用文生图接口生成图片
    diagramBtnApi: async function (text) {
      let alltext = "";
      if (this.tagList.length !== 0) {
        alltext = text + "#" + this.tagList.join("#");
      }
      const result = await generateImage(alltext);
      if (result.code !== 200) {
        return this.$message.error("文字生图调用失败");
      }
      //将生成图片放入列表中
      this.imageList = [...this.imageList, result.data.image];
      this.currentImageValue = this.imageList[this.imageList - 1];
      this.pageValue = this.imageList.length;
      this.sendMessageValue = "";
      this.tagList = [];
      await uplodImage(result.data.image, alltext);
      this.getImageListAll();
    },
    //页码改变
    pageChange: function (value) {
      this.currentImageValue = this.imageList[value - 1];
    },
    //上一页
    prePage: function () {
      let minValue = 1;
      if (this.pageValue - 1 >= minValue) {
        this.pageValue = this.pageValue - 1;
      }
      this.currentImageValue = this.imageList[this.pageValue - 1];
    },
    //下一页
    nextPage: function () {
      let maxValue = this.imageList.length;
      if (this.pageValue + 1 <= maxValue) {
        this.pageValue = this.pageValue + 1;
      }
      this.currentImageValue = this.imageList[this.pageValue - 1];
    },
  },
};
</script>

<style lang="less" scoped>
.photo {
  box-sizing: border-box;
  width: 100%;
  min-height: 380px;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .photo-input {
    box-sizing: border-box;
    width: 48%;
    min-height: 380px;
    height: 100%;
    &__title {
      height: 30px;
      color: #555;
      font-weight: bold;
      box-sizing: border-box;
    }
    &__body {
      box-sizing: border-box;
      min-height: 380px;
      height: 100%;
      background-color: white;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      &-tags {
        max-height: 120px;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 10px 20px;
        display: flex;
        gap: 4px;
        flex-wrap: wrap;

        &-item {
          background-color: #fff9d5;
          color: gray;
          font-size: 12px;
          border-radius: 13px;
          box-sizing: border-box;
          padding: 0 20px;
          height: 26px;
          line-height: 26px;
          border: 1px solid #e0e0e0;

          position: relative;

          &__delete {
            position: absolute;
            right: -5px;
            top: -5px;
            display: block;
            width: 15px;
            height: 15px;
            background: url("../assets/img/delete.svg") no-repeat;
            background-size: 100%;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      &-input {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translate(-50%, 0);
        border: 1px solid #c0c0c0;
        box-sizing: border-box;
        background-color: white;
        width: calc(100% - 40px);
        height: 170px;
        border-radius: 10px;
        margin: 10px auto 0 auto;
        padding: 10px 0;

        &-textarea {
          display: block;
          box-sizing: border-box;
          width: 100%;
          height: 120px;
          padding: 10px;
          border: none;
          margin: 0 auto;
          resize: none;

          &:focus-visible {
            outline: none;
          }
        }

        &-btn {
          box-sizing: border-box;
          width: 30px;
          height: 30px;
          background: url("../assets/send.svg") no-repeat;
          background-size: 70%;
          background-position: center;
          background-color: #cdcdcd;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          right: 50%;
          bottom: 20px;

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
  }

  .photo-preview {
    box-sizing: border-box;
    width: 50%;
    min-height: 380px;
    height: 100%;

    &__title {
      height: 30px;
      color: #555;
      font-weight: bold;
      box-sizing: border-box;
    }
    &__body {
      box-sizing: border-box;
      min-height: 380px;
      height: 100%;
      background-color: white;
      border-radius: 10px;
      overflow: hidden;

      &-keywords {
        color: #555;
        box-sizing: border-box;
        width: 90%;
        height: 48px;
        line-height: 24px;
        // border: 1px solid #919191;
        margin: 10px auto 0 auto;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }

      &-images {
        border: 1px solid #c0c0c0;
        border-radius: 24px;
        min-height: 300px;
        height: calc(100% - 140px);
        min-width: 400px;
        width: 70%;
        margin: 10px auto 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &-pagination {
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        &-select {
          width: 60%;
          .el-select {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
