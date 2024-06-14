<script>
export default {};
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
.toe {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
html,
body {
  padding: 0;
  margin: 0;
}
div::-webkit-scrollbar {
  width: 10px;
}
div::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  opacity: 0.2;
}
div::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}
div::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
