<template>
  <div class="toolbar">
    <ul class="toolbar__list">
      <li class="toolbar__item" v-for="(item, index) of menu" :key="index">
        <el-tooltip effect="dark" :content="item.name" placement="bottom">
          <i
            class="toolbar__item__icon iconfont"
            :class="item.icon"
            @click="selectMenu(item)"
          />
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menu: [
        {
          name: "后退",
          icon: "iconarrow-back",
          key: "undo"
        },
        {
          name: "前进",
          icon: "iconarrow-forward",
          key: "redo"
        },
        {
          name: "居左",
          icon: "iconalign-left",
          key: "align-left"
        },
        {
          name: "水平居中",
          icon: "iconalign-center",
          key: "align-center"
        },
        {
          name: "居右",
          icon: "iconalign-right",
          key: "align-right"
        },
        {
          name: "居上",
          icon: "iconvertical-top",
          key: "vertical-top"
        },
        {
          name: "垂直居中",
          icon: "iconvertical-middle",
          key: "vertical-middle"
        },
        {
          name: "居下",
          icon: "iconvertical_align_bottom",
          key: "vertical-bottom"
        },
        {
          name: "合并单元格",
          icon: "iconmerge-cells",
          key: "mergeCells"
        }
      ],
      hot: {}
    };
  },
  computed: {
    ...mapState(["tableInstance", "currentRange", "originData"])
  },
  methods: {
    resetSelectCell(from, to) {
      this.tableInstance.selectCell(from.row, from.col, to.row, to.col, false);
    },
    setAlign(direction, align) {
      let startRow = this.currentRange.from.row;
      let startCol = this.currentRange.from.col;
      let endRow = this.currentRange.to.row;
      let endCol = this.currentRange.to.col;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style[direction] = align;
        }
      }
      this.tableInstance.render();
    },
    mergeCells() {
      // source code: https://github.com/handsontable/handsontable/blob/master/src/plugins/mergeCells/mergeCells.js
      let currentRange = this.currentRange;
      let plugin = this.tableInstance.getPlugin("mergeCells");
      if (!currentRange) {
        return;
      }

      currentRange.setDirection("NW-SE");

      const { from, to } = currentRange;

      plugin.toggleMerge(currentRange);
      this.resetSelectCell(from, to);
    },
    selectMenu(item) {
      switch (item.key) {
        case "mergeCells":
          this.mergeCells();
          break;
        case "redo":
        case "undo":
          this.tableInstance[item.key]();
          break;
        case "align-left":
        case "align-center":
        case "align-right":
        case "vertical-top":
        case "vertical-middle":
        case "vertical-bottom":
          let align = item.key.split("-")[1];
          if (align === "left" || align === "center" || align === "right") {
            this.setAlign("text-align", align);
          } else {
            this.setAlign("vertical-align", align);
          }
          const { from, to } = this.currentRange;
          this.resetSelectCell(from, to);
          break;
      }
    }
  }
};
</script>
<style lang="stylus">
.toolbar {
  position: relative;
  padding: 0 26px;
  z-index: 1;

  .toolbar__list {
    display: flex;

    .toolbar__item {
      .toolbar__item__icon {
        padding: 0 8px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
