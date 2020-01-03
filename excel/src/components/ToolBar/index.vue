<template>
  <div class="toolbar">
    <ul class="toolbar__list">
      <li class="toolbar__item" v-for="(item, index) of menu" :key="index">
        <div slot="reference" class="toolbar__item__wrap">
          <el-tooltip effect="dark" :content="item.name" placement="bottom">
            <div class="toolbar__item__icon_wrap">
              <i @click="selectMenu(item)" class="toolbar__item__icon iconfont" :class="item.icon" />
              <el-popover placement="bottom" width="120" trigger="click">
                <div class="color__pool__wrap">
                  <ColorPool @colorPick="colorPick($event, item)" />
                </div>
                <i
                  v-if="item.subIcon"
                  slot="reference"
                  class="iconfont toolbar__item__subicon"
                  :class="item.subIcon"
                />
              </el-popover>
            </div>
          </el-tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ColorPool from "../ColorPool/index";
export default {
  components: {
    ColorPool
  },
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
          name: "字体颜色",
          icon: "iconfont-color",
          key: "color",
          subIcon: "iconarrowdown"
        },
        {
          name: "背景颜色",
          icon: "iconmd-color-fill",
          key: "bgColor",
          subIcon: "iconarrowdown"
        },
        {
          name: "居左",
          icon: "iconalign-left",
          key: "align-left"
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
      hot: {},
      curColor: ""
    };
  },
  computed: {
    ...mapState(["tableInstance", "currentRange", "originData"])
  },
  methods: {
    setBgColor(color) {
      let startRow = this.currentRange.from.row;
      let startCol = this.currentRange.from.col;
      let endRow = this.currentRange.to.row;
      let endCol = this.currentRange.to.col;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style.backgroundColor = color;
        }
      }
      this.tableInstance.render();
    },
    setColor(color) {
      let startRow = this.currentRange.from.row;
      let startCol = this.currentRange.from.col;
      let endRow = this.currentRange.to.row;
      let endCol = this.currentRange.to.col;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          this.originData[i][j].style.color = color;
        }
      }
      this.tableInstance.render();
    },
    // 获取选择的颜色
    colorPick(color, item) {
      let { from, to } = this.currentRange;
      this.curColor = color;
      if (item.key === "bgColor") {
        this.setBgColor(color);
      } else {
        this.setColor(color);
      }
      this.resetSelectCell(from, to);
    },
    // 重新选中excel选区
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
      let { from, to } = this.currentRange;
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
          this.resetSelectCell(from, to);
          break;
        case "bgColor":
          this.setBgColor(this.curColor);
          this.resetSelectCell(from, to);
          break;
        case "color":
          this.setColor(this.curColor);
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
  height: 28px;
  display: flex;
  align-items: center;

  .toolbar__list {
    display: flex;

    .toolbar__item {
      display: flex;
      align-items: center;
      height: 24px;

      .toolbar__item__wrap {
        .toolbar__item__icon_wrap {
          .toolbar__popper {
            z-index: 99999;
          }

          .toolbar__item__icon {
            padding: 0 8px;
            font-size: 14px;
            cursor: pointer;
          }

          .iconfont-color {
            padding-right: 0;
          }

          .iconmd-color-fill {
            padding-right: 0;
          }

          .toolbar__item__subicon {
            font-size: 14px;
            cursor: pointer;
          }
        }
      }

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}

.color__pool__wrap {
  width: 100%;
  height: 60px;
}
</style>
