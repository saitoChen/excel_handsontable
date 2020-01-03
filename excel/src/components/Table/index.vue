<template>
  <div class="table-bar_wrapper">
    <div id="excel_table" />
  </div>
</template>
<script>
import Handsontable from "handsontable";
import "../../../node_modules/handsontable/dist/handsontable.full.min.css";
import { renderContextMenu } from "./contextMenu/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      hot: "",
      renderData: [],
      currentSelection: {}
    };
  },
  computed: {
    ...mapState(["tableInstance", "originData"])
  },
  mounted() {
    this.$nextTick(() => {
      this.renderData = this.generateData().renderData;
      this.$store.commit("SET_ORIGIN_DATA", this.generateData().data);
      this.initTable();
      this.$store.commit("SET_INSTANCE", this.hot);
    });
  },
  methods: {
    initContextCfg() {
      return {
        setAlign: this.setAlign,
        setBgColor: this.setBgColor,
        setColor: this.setColor
      };
    },
    initTable() {
      let table = document.querySelector("#excel_table");
      this.hot = new Handsontable(table, {
        data: this.renderData,
        rowHeaders: true,
        colHeaders: true,
        manualColumnMove: true,
        manualColumnResize: true,
        manualRowResize: true,
        manualRowMove: true,
        filters: true,
        mergeCells: true,
        contextMenu: renderContextMenu(this.initContextCfg()),
        renderer: (instance, TD, row, col, prop, cellValue, cellProperties) => {
          this.renderCellContent(TD, row, col, cellValue);
          this.renderCellStyle(TD, row, col);
        },
        afterSelection: (row, column, row2, column2) => {
          this.currentSelection["startRow"] = row;
          this.currentSelection["startCol"] = column;
          this.currentSelection["endRow"] = row2;
          this.currentSelection["endCol"] = column2;
          this.$store.commit("SET_CUR_RANGE", this.hot.getSelectedRangeLast());
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
        for (let j = 0; j < 52; j++) {
          renderData[i][j] = "";
          data[i][j] = {
            value: "",
            style: {}
          };
        }
      }
      return {
        data,
        renderData
      };
    },
    // 渲染单元格内容
    renderCellContent(TD, row, col, cellValue) {
      TD.innerHTML = cellValue;
      this.originData[row][col].value = cellValue;
    },
    // 渲染单元格样式
    renderCellStyle(TD, row, col) {
      let keys = Object.keys(this.originData[row][col].style);
      if (keys.length > 0) {
        keys.forEach(item => {
          TD.style[item] = this.originData[row][col].style[item];
        });
      }
    },
    setAlign(direction, align) {
      let { startRow, startCol, endRow, endCol } = this.currentSelection;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style[direction] = align;
        }
      }
      this.hot.render();
    },
    setBgColor(color) {
      let { startRow, startCol, endRow, endCol } = this.currentSelection;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style.backgroundColor = color;
        }
      }
      this.hot.render();
    },
    setColor(color) {
      let { startRow, startCol, endRow, endCol } = this.currentSelection;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style.color = color;
        }
      }
      this.hot.render();
    }
  }
};
</script>
<style lang="stylus">
.table-bar_wrapper {
  width: 100vw;
  height: calc(100vh - 38px);
  overflow: hidden;

  #excel_table {
    width: 100%;
    height: 100%;
  }
}
</style>
