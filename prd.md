# Product Requirements Document: 首页改版 (v4.0)

**Product/Feature Name:** 黄小西 Home Page v4.0 Redesign
**Status:** In Review
**Author:** Product Manager
**Date Created:** 2026-04-27
**Version:** 4.0

---

## Executive Summary

**One-liner:** 全面升级首页的核心区域，通过模块化组件、高德地图合作榜单和 AI 互动能力，提升用户的留存与活跃度。

**Overview:** 为了提升首页的内容丰富度、互动性和 AI 的感知度，本次对首页（Home.tsx）进行重构。引入了高德地图合作元素、周末玩乐规划、瀑布流社区以及工具箱（Widget）管理等能力，使用户能够自定义其核心体验，并更深入地与平台互动。

**Quick Facts:**
- **Target Users:** 年轻旅行者、户外爱好者、周末游人群。
- **Problem Solved:** 首页内容固定缺乏个性化，AI 功能曝光不足，互动性较弱。
- **Key Metric:** 首页模块点击率、AI 按钮唤起率、次日留存率。
- **Target Launch:** Q2 2026

---

## Problem Statement

### The Problem
当前首页内容缺乏个性化配置能力，推荐内容主要以传统列表为主，未能充分结合 AI 智能规划及地理位置（高德）服务。

### Current State
用户进入首页后只能被动浏览固定推荐，缺乏自定义工具箱，且 AI 功能隐藏较深。

### Impact
**User Impact:**
- 用户难以快速找到常用功能，浏览疲劳。
**Business Impact:**
- AI 服务的调用转化率偏低，用户活跃时长未达预期。

---

## Goals & Objectives

### Business Goals
1. **提升互动转化:** 增加核心区域 AI 按钮的点击率 30%。
2. **提高用户留存:** 通过模块化和社区瀑布流提升次日留存率 15%。

### User Goals
1. **个性化体验:** 自由配置首页组件（足迹、工具等）。
2. **灵感获取:** 快速获取周末游玩榜单和社区达人推荐。

---

## User Personas

### Primary Persona: 年轻探索者
**Demographics:**
- Age range: 18-35
- Tech savviness: High

**Behaviors:**
- 经常在周末寻找周边游、音乐节或户外活动。
- 习惯使用 AI 获取攻略。

**Pain Points:**
- 寻找好玩的活动费时费力，缺乏直观的榜单和智能规划。

---

## User Stories & Requirements

### Epic: 首页核心互动区改造

#### Must-Have Stories (P0)

##### Story 1: <span style="display: inline-block; vertical-align: top; background-color: rgb(250, 173, 20); color: white; font-weight: bold; font-size: 10px; line-height: 14px; padding: 0px 4px; border-radius: 2px;">1</span> 工具箱管理 (Widget Management)

**User Story:**
```
As a 平台用户,
I want to 自定义首页头部的模块卡片,
So that 我可以快速访问最常用的功能。
```

**Acceptance Criteria:**
- [ ] Given 首页加载完成，when 用户点击卡片区域的“编辑”按钮，then 卡片呈现晃动效果（jiggle）并出现红色删除按钮。
- [ ] Given 处于编辑模式，when 用户点击“+”号按钮，then 弹出添加浮窗支持 1x1, 2x1, 2x2 尺寸的小组件添加。
- [ ] Given 处于编辑模式，when 用户点击卡片的删除按钮，then 移除该卡片并同步更新本地存储。

**Priority:** Must Have (P0)

---

##### Story 2: <span style="display: inline-block; vertical-align: top; background-color: rgb(250, 173, 20); color: white; font-weight: bold; font-size: 10px; line-height: 14px; padding: 0px 4px; border-radius: 2px;">2</span> 榜单推荐区 (好aoao好玩'ツ)

**User Story:**
```
As a 寻找游玩灵感的用户,
I want to 查看高德合作的扫街榜单,
So that 获取最热门的本地游玩推荐并使用 AI 规划。
```

**Acceptance Criteria:**
- [ ] Given 用户滚动到榜单区，when 看到标题“好aoao好玩'ツ × 高德地图”，then 必须带有高德指南角标。
- [ ] Given 榜单卡片展示，when 用户横向滑动，then 可以查看更多榜单分类。
- [ ] Given 用户点击卡片上的“AI 帮我找”，when 触发点击，then 唤起 AI 搜索推荐功能。

**Priority:** Must Have (P0)

---

##### Story 3: <span style="display: inline-block; vertical-align: top; background-color: rgb(250, 173, 20); color: white; font-weight: bold; font-size: 10px; line-height: 14px; padding: 0px 4px; border-radius: 2px;">3</span> 周末计划区 (Hiiiiii玩周末 👀)

**User Story:**
```
As a 周末出游用户,
I want to 浏览周末活动推荐列表,
So that 我能一键生成我的周末日程。
```

**Acceptance Criteria:**
- [ ] Given 用户浏览周末计划区，when 查看活动，then 看到每条活动都带有 AI 标签或一句话总结。
- [ ] Given 用户点击活动列表，when 点击“AI 周末计划生成”按钮，then 生成完整的周末行程。

**Priority:** Must Have (P0)

---

##### Story 4: <span style="display: inline-block; vertical-align: top; background-color: rgb(250, 173, 20); color: white; font-weight: bold; font-size: 10px; line-height: 14px; padding: 0px 4px; border-radius: 2px;">4</span> 社区瀑布流区 (来都来lie，看一哈 🙄)

**User Story:**
```
As a 社区活跃用户,
I want to 在瀑布流中查看精选图文内容,
So that 我能就感兴趣的内容直接咨询 AI。
```

**Acceptance Criteria:**
- [ ] Given 社区内容区，when 渲染完成，then 呈现 Masonry 瀑布流布局。
- [ ] Given 社区内容区，when 用户查看瀑布流区域，then 筛选项应放置在标题下方，并且“音乐节”和“马拉松”呈现醒目渐变及火焰图标，支持横向滑动。
- [ ] Given 瀑布流卡片，when 用户点击卡片内部的“咨询AI”按钮，then 唤起针对该内容的 AI 提问抽屉。

**Priority:** Must Have (P0)

---

##### Story 5: <span style="display: inline-block; vertical-align: top; background-color: rgb(250, 173, 20); color: white; font-weight: bold; font-size: 10px; line-height: 14px; padding: 0px 4px; border-radius: 2px;">5</span> 地图组件区 (足迹 & 全省地图)

**User Story:**
```
As a 旅行记录者,
I want to 在首页直观看到地图入口,
So that 我能快速进入我的足迹或全省地图。
```

**Acceptance Criteria:**
- [ ] Given 首页小组件，when 渲染旅行足迹，then 背景为黑白灰实景地图并悬浮数据统计（地点、照片、收藏）。
- [ ] Given 首页小组件，when 渲染全省手绘地图，then 背景为淡绿色手绘风格加橙色定位图标。
- [ ] Given 用户点击对应地图，when 触发点击事件，then 分别导航至 Footprint.tsx 和 MapExplore.tsx。

**Priority:** Must Have (P0)

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### Primary Metric (North Star)
**Metric:** AI Feature Engagement Rate
**Definition:** Percentage of daily active users who click an "AI" related button in the Home page.
**Target:** 30% increase over baseline.
