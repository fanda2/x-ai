<template>
  <div class="register-container">
    <div class="register-form">
      <h2>注册</h2>
      <div v-if="error" class="error">{{ error }}</div>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="用户名" required>
        <button type="submit">注册</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        if (this.username === 'existinguser') {
          this.error = '用户名已经存在'
          return
        }
        this.$router.push('/home')
      } catch (error) {
        this.error = '注册失败,请稍后重试'
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6b6b6b, #202020);
}

.register-form {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 300px;
}

input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: #ff0000;
  font-weight: bold;
}
</style>