<template>
  <div class="register-container">
    <div class="register-form">
      <div class="form-title">Sign in</div>
      <form>
        <el-input placeholder="user id" v-model="userId" clearable> </el-input>
        <el-button @click="register" type="success">Sign in</el-button>
      </form>
      <div class="bottom-notice">Don't have an account yet? Sign up now!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    async register() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #3c1a63, #8e305c);
}

.register-form {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  .form-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
  }
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.el-button {
  margin: 20px 0;
}

button {
  background-color: #a24da1;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #752d73;
}
</style>
