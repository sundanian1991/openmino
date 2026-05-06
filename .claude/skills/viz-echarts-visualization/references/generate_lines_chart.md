# generate_lines_chart — 流向路径图

## 功能概述
带流动动画的路径/航线图，通常配合地图使用，适用于供应商业务流向、物流路线、航线网络等。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `coords`（array of [lon, lat] 坐标点数组），定义一条路径。

### 可选
- `style.coordinateSystem`: string，坐标系，默认 `geo`（地图），可选 `cartesian2d`（直角坐标）。
- `style.showEffect`: boolean，显示流动动画，默认 `true`。
- `style.effectSpeed`: number，动画速度，默认 `3`。
- `style.effectSymbol`: string，动画图标，默认 `triangle`。
- `style.trailLength`: number，尾迹长度，默认 `0.4`。
- `style.lineColor`: string，线路颜色。
- `style.lineWidth`: number，线路宽度，默认 `2`。
- `style.curveness`: number，线路曲率，默认 `0.3`。
- `style.lineOpacity`: number，线路不透明度，默认 `0.5`。
- `style.mapAreaColor`: string，地图区域填充色，默认 `#e8e8e8`。
- `style.mapBorderColor`: string，地图边框颜色，默认 `#999`。
- `style.roam`: boolean，地图缩放拖拽，默认 `true`。
- `style.zoom`: number，地图初始缩放，默认 `1`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回流向路径图 HTML 文件路径。
