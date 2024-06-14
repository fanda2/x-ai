<template>
  <div class="loading-container" v-if="isLoading">
    <div class="loading-spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div class="loading-text">加载中...</div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 70px;
  height: 70px;
  position: relative;
  text-align: center;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.bounce1,
.bounce2,
.bounce3 {
  width: 18px;
  height: 18px;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.loading-text {
  margin-top: 16px;
  font-size: 16px;
  color: #333;
}
</style>
