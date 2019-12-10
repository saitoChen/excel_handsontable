<template>
  <div class="excel">
    <TopBar />
    <ToolBar />
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar/index";
import ToolBar from "@/components/ToolBar/index";
import Table from "@/components/Table/index";

export default {
  name: "excel",
  components: {
    TopBar,
    ToolBar,
    Table
  }
};
</script>

<style lang="stylus">
.excel {
  width: 100vw;
  height: 100vh;
  background: #f7f7f7;
}
</style>
