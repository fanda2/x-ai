<template>
  <div class="photo">
    <div class="photo-input">
      <div class="photo-input__title">Concept Description</div>
      <div class="photo-input__body">
        <div class="photo-input__body-tags">
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
          <div class="photo-input__body-tags-item">标签</div>
        </div>
        <div class="photo-input__body-input">
          <textarea
            class="photo-input__body-input-textarea"
            placeholder="请输入..."
          />
          <div class="photo-input__body-input-btn"></div>
        </div>
      </div>
    </div>
    <div class="photo-preview">
      <div class="photo-preview__title">Generate Images</div>
      <div class="photo-preview__body">
        <div class="photo-preview__body-keywords">
          标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,标签,
        </div>
        <div class="photo-preview__body-images"></div>
        <div class="photo-preview__body-pagination">
          <div class="photo-preview__body-pagination-prev">
            <el-button size="mini" type="primary">上一页</el-button>
          </div>
          <div class="photo-preview__body-pagination-select">
            <el-select
              v-model="value"
              size="mini"
              placeholder="请选择跳转的页码"
            >
              <el-option
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="photo-preview__body-pagination-next">
            <el-button size="mini" type="primary">下一页</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.photo {
  box-sizing: border-box;
  background-color: rgb(225, 225, 225);
  width: 900px;
  height: 460px;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .photo-input {
    box-sizing: border-box;
    width: 430px;
    height: 440px;
    max-width: 430px;

    &__title {
      height: 30px;
      color: #555;
      font-weight: bold;
      box-sizing: border-box;
    }
    &__body {
      box-sizing: border-box;
      height: 410px;
      background-color: white;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      &-tags {
        max-height: 120px;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 10px 5px;
        display: flex;
        gap: 4px;
        flex-wrap: wrap;

        &-item {
          background-color: #fff9d5;
          color: gray;
          font-size: 12px;
          border-radius: 10px;
          box-sizing: border-box;
          padding: 0 8px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #e0e0e0;
        }
      }

      &-input {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        border: 1px solid #c0c0c0;
        box-sizing: border-box;
        background-color: white;
        width: 400px;
        height: 170px;
        border-radius: 10px;
        margin: 10px auto 0 auto;
        padding: 10px 0;

        &-textarea {
          display: block;
          box-sizing: border-box;
          width: 380px;
          height: 120px;
          border: none;
          margin: 0 auto;
          resize: none;

          &:focus-visible {
            outline: none;
          }
        }

        &-btn {
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
  }

  .photo-preview {
    box-sizing: border-box;
    width: 430px;
    height: 440px;
    max-width: 430px;

    &__title {
      height: 30px;
      color: #555;
      font-weight: bold;
      box-sizing: border-box;
    }
    &__body {
      box-sizing: border-box;
      height: 410px;
      background-color: white;
      border-radius: 10px;
      overflow: hidden;

      &-keywords {
        color: #555;
        box-sizing: border-box;
        width: 400px;
        height: 48px;
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
        height: 280px;
        width: 400px;
        margin: 10px auto 0 auto;
      }

      &-pagination {
        box-sizing: border-box;
        height: 50px;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
