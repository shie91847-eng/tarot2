# 迁移完成说明

本仓库由 GitHub Actions 从 `shie91847-eng/tarot-cards` 只读复制并整理生成。

已整理内容：

- 拆分原单文件 `index.html`
- 复制 78 张 PNG 牌图到 `assets/cards/`
- 复制 `bgm.mp3` 到 `assets/audio/`
- 将图片和音乐路径改为本地相对路径
- 移除公开硬编码 AI 密钥，改为运行时变量

原仓库未被修改。
