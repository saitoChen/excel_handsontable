<template>
  <div class="table-bar_wrapper">
    <div id="excel_table" />
  </div>
</template>
<script>
import Handsontable from "handsontable";
import "../../../node_modules/handsontable/dist/handsontable.full.min.css";
export default {
  data() {
    return {
      hot: "",
      renderData: [],
      originData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.originData = this.generateData().data;
      this.renderData = this.generateData().renderData;
      this.initTable();
    });
  },
  methods: {
    initTable() {
      let table = document.querySelector("#excel_table");
      this.hot = new Handsontable(table, {
        data: this.renderData,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        contextMenu: true,
        renderer: (instance, TD, row, col, prop, cellValue, cellProperties) => {
          this.renderCellContent(TD, row, col, cellValue);
        },
        licenseKey: "non-commercial-and-evaluation"
      });
    },
    generateData() {
      let data = [];
      let renderData = [];
      for (let i = 0; i < 100; i++) {
        data[i] = [];
        renderData[i] = [];
        for (let j = 0; j < 26; j++) {
          renderData[i][j] = "";
          data[i][j] = {
            value: ""
          };
        }
      }
      return {
        data,
        renderData
      };
    },
    renderCellContent(TD, row, col, cellValue) {
      TD.innerHTML = cellValue;
      this.originData[row][col].value = cellValue;
    }
  }
};
</script>
<style lang="stylus">
.table-bar_wrapper {
  width:100vw;
  height: calc(100vh - 38px);
  overflow: hidden;
  #excel_table {
    width: 100%;
    height: 100%;
  }
}
</style>
