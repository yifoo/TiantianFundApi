import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  base: '/FundApi/',
  lang: 'zh-CN',
  title: '基金 API',
  description: '基金NodeJS 版 API 文档',

  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API 列表', link: '/apis/' },
      { text: 'Github', link: 'https://github.com/yifoo/FundApi' },
    ],

    sidebar: {
      '/apis/': [
        {
          text: 'API 文档',
          children: [
            { text: '概览', link: '/apis/' },
            { text: '🔍 搜索', link: '/apis/search' },
            { text: '📋 基金列表', link: '/apis/fundlist' },
            { text: '📊 基金详情', link: '/apis/funddetail' },
            { text: '💰 基金净值', link: '/apis/nav' },
            { text: '🏆 基金排行', link: '/apis/rank' },
            { text: '🎯 基金筛选', link: '/apis/select' },
            { text: '🌐 基金主题', link: '/apis/theme' },
            { text: '🏢 基金公司', link: '/apis/company' },
            { text: '👤 基金经理', link: '/apis/manager' },
            { text: '📈 大数据榜单', link: '/apis/bigdata' },
            { text: '⚡ 实时行情', link: '/apis/market' },
            { text: '📉 股票', link: '/apis/stock' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '指南',
          children: [{ text: '快速开始', link: '/guide/' }],
        },
      ],
    },
  }),

  bundler: viteBundler(),
})
