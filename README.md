# 🚀 cxin-cli - Vue项目脚手架工具

![NPM Version](https://img.shields.io/npm/v/cxin-cli?color=blue&logo=npm)
![License](https://img.shields.io/npm/l/cxin-cli?color=green)
![Downloads](https://img.shields.io/npm/dt/cxin-cli?color=orange)

## ✨ 功能特性

- ⚡ **快速启动**：一键生成Vue3项目模板
- 🛠️ **多模板支持**：提供PC端和移动端两种模板选择
- 📦 **开箱即用**：集成常用库和最佳实践配置
- 🔄 **自动更新**：内置版本检查更新功能
- 🎨 **交互式CLI**：友好的命令行交互体验

## 🏗️ 可用模板

### PC端模板
- **技术栈**: Vue3 + TypeScript + Vite + Element Plus + Pinia + Axios
- **分支**: `feature/vue-cli-pc`
- **特点**: 
  - 企业级中后台解决方案
  - 封装常用组件和工具函数

### 移动端模板
- **技术栈**: Vue3 + TypeScript + Vite + Vant + Pinia + Axios
- **分支**: `feature/vue-cli-mobile`
- **特点**:
  - 移动端最佳实践
  - 响应式设计适配
  - 常用移动端组件集成

## 📥 安装

```bash
# 全局安装
npm install -g cxin-cli

# 验证安装
cxin --version
```
## 🚀 使用指南

```bash
# 交互式创建项目
cxin create

# 直接创建指定名称的项目
cxin create [project-name]

# 更新脚手架到最新版本
cxin update

# 查看版本信息
cxin --version

```
