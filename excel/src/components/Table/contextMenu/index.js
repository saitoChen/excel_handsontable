export function renderContextMenu(cfg) {
  console.log(cfg);
  return {
    items: {
      mergeCells: {
        name: "合并单元格"
      },
      row_above: {
        name: "向上方添加一行"
      },
      row_below: {
        name: "向下方添加一行"
      },
      remove_row: {
        name: "删除行"
      },
      col_left: {
        name: "向左添加列"
      },
      col_right: {
        name: "向右添加列"
      },
      remove_col: {
        name: "删除列"
      } /* ,
      undo: {
        name: "后退"
      },
      redo: {
        name: "前进"
      },
      alignment: {
        name: "对齐方式",
        submenu: alignSubMenu(cfg.setAlign)
      },
      background: {
        name: "背景颜色",
        submenu: setBgColor(cfg.setBgColor)
      },
      color: {
        name: "颜色",
        submenu: setColor(cfg.setColor)
      } */
    }
  };
}

function setColor(fn) {
  return {
    items: [
      {
        key: "color:black",
        name: "白色",
        callback: () => {
          fn("#fff");
        }
      },
      {
        key: "color:red",
        name: "红色",
        callback: () => {
          fn("red");
        }
      }
    ]
  };
}

function setBgColor(fn) {
  return {
    items: [
      {
        key: "background:black",
        name: "黑色",
        callback: () => {
          fn("#000");
        }
      },
      {
        key: "background:red",
        name: "红色",
        callback: () => {
          fn("red");
        }
      }
    ]
  };
}

function alignSubMenu(fn) {
  return {
    items: [
      {
        key: "alignment:left",
        name: "左对齐",
        callback: () => {
          fn("text-align", "left");
        }
      },
      {
        key: "alignment:center",
        name: "水平居中",
        callback: () => {
          fn("text-align", "center");
        }
      },
      {
        key: "alignment:right",
        name: "右对齐",
        callback: () => {
          fn("text-align", "right");
        }
      },
      {
        key: "alignment:top",
        name: "上对齐",
        callback: () => {
          fn("vertical-align", "top");
        }
      },
      {
        key: "alignment:middle",
        name: "垂直居中",
        callback: () => {
          fn("vertical-align", "middle");
        }
      },
      {
        key: "alignment:bottom",
        name: "下对齐",
        callback: () => {
          fn("vertical-align", "bottom");
        }
      }
    ]
  };
}
