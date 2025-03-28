# 安全室巡捕系統

一個用於優化保安巡邏管理與記錄的智能解決方案，包含巡邏路線規劃、NFC/QR碼打卡、巡邏記錄管理和數據統計功能。

[![部署狀態](https://github.com/thunderlatent/PatrolPrototype/actions/workflows/static.yml/badge.svg)](https://github.com/thunderlatent/PatrolPrototype/actions/workflows/static.yml)

## 線上演示

此專案已部署在 GitHub Pages，您可以通過以下連結訪問線上演示：

🌐 [安全室巡捕系統線上演示](https://thunderlatent.github.io/PatrolPrototype/)

## 項目結構

```
安全室巡捕/
├── index.html           # 主頁面（帶有功能說明）
├── iphone-view.html     # iPhone 16 Pro Max 框架視圖
├── login.html           # 登入頁面
├── home.html            # 巡邏主頁面
├── profile.html         # 我的巡查紀錄頁面
├── admin.html           # 管理控制台頁面
├── styles.css           # 共用樣式文件
└── images/              # 圖片資源目錄
```

## 查看方式

本專案提供兩種查看方式：

### 1. 整體視圖 (index.html)

通過 `index.html` 頁面，您可以查看整個系統的功能介紹，並在嵌入的 iPhone 16 Pro Max 框架內預覽各個頁面。

### 2. iPhone 16 Pro Max 框架視圖 (iphone-view.html)

我們額外提供了 `iphone-view.html` 頁面，該頁面專門用於在 iPhone 16 Pro Max 框架內顯示各個功能頁面。這種視圖方式更加接近真實的移動設備使用體驗。

## 使用方法

1. 打開 `iphone-view.html` 頁面
2. 在頁面底部的按鈕區域中選擇要查看的頁面（登入、巡邏、我的紀錄、管理）
3. 選定頁面將會在 iPhone 框架內顯示
4. 登入後，您可以使用底部的導航欄切換不同頁面

## 登入帳號

系統提供以下測試帳號：

- 管理員帳號: admin / 密碼: admin123
- 警衛帳號: guard / 密碼: guard123
- 訪客模式: 無需帳號密碼，點擊「訪客模式」按鈕即可

## 功能說明

- **巡邏管理**: 查看和選擇巡邏路線，通過 NFC/QR 碼完成打卡
- **我的巡查紀錄**: 查看個人巡邏歷史記錄，包含完成狀態和詳細信息
- **管理控制台**: 監控整體巡邏情況，管理警衛人員和路線設置

## 注意事項

- 此為原型展示版本，部分功能可能僅為界面展示
- 最佳體驗請使用現代瀏覽器（Chrome、Firefox、Safari 最新版本）
- 設計基於 iPhone 16 Pro Max 尺寸 (430 x 932 px) 