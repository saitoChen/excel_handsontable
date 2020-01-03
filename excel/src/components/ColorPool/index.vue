<template>
  <div class="lake-colorboard-group">
    <div
      v-for="(item, index) of colorPool"
      @click="colorPick(item)"
      class="lake-colorboard-group-item"
      :key="index"
    >
      <div :style="{background: item.color}"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorPool: [
        {
          color: "#F5222D"
        },
        {
          color: "#FA541C"
        },
        {
          color: "#FA8C16"
        },
        {
          color: "#FADB14"
        },
        {
          color: "#52C41A"
        },
        {
          color: "#13C2C2"
        },
        {
          color: "#1890FF"
        },
        {
          color: "#2F54EB"
        },
        {
          color: "#722ED1"
        },
        {
          color: "#EB2F96"
        }
      ]
    };
  },
  methods: {
    colorPick(item) {
      this.$emit("colorPick", item.color);
    }
  }
};
</script>
<style lang="stylus">
.lake-colorboard-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  .lake-colorboard-group-item {
    width: 24px;
    height: 24px;
    padding: 2px 2px;
    display: inline-block;
    border-radius: 3px 3px;
    border: 1px solid transparent;
    flex: 0 0 auto;
    cursor: pointer;
    background-color: #fff;
  }

  .lake-colorboard-group-item > div {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 2px 2px;
    border: 1px solid transparent;
  }
}
</style>