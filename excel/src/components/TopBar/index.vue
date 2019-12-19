<template>
  <div class="top-bar">
    <ul class="topbar__list">
      <li class="topbar__item" v-for="(item, index) of menu" :key="index">
        <div class="topbar__item__title">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "编辑"
        },
        {
          name: "插入"
        },
        {
          name: "格式"
        }
      ]
    };
  }
};
</script>
<style lang="stylus">
.top-bar {
  position: relative;
  z-index: 2;
  height: 28px;
  padding: 0 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .topbar__list {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;

    .topbar__item {
      display: flex;
      align-items: center;
      padding: 0 14px;
      cursor: pointer;
      height: 100%;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>
