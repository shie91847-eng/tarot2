# tarot2

这是 `tarot-cards` 的整理版仓库。

原仓库 `shie91847-eng/tarot-cards` 只作为只读来源，没有被修改。

## 结构

- `index.html`：页面入口
- `src/styles.css`：样式
- `src/app.js`：交互逻辑
- `assets/cards/`：78 张塔罗牌图
- `assets/audio/bgm.mp3`：背景音乐

## 安全说明

原项目里曾经硬编码 AI 接口密钥。这个整理版不会继续把旧密钥写死在代码里，而是使用 `window.TAROT_AI_KEY` 作为运行时配置入口。
