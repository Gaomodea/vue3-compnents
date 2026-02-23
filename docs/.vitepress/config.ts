import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue3 Components",
  description: "基于Vue3的前端知识架构",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: 'JS语言', link: '/js-lang' },
      { text: 'Vitepress文档', link: 'https://vitepress.dev/zh/guide/markdown#line-highlighting-in-code-blocks' },
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: '运行时示例', link: '/api-examples' },
          { text: 'JS语言', link: '/js-lang' },
          { text: '变量、作用域、上下文', link: '/变量_作用域_上下文' },
          { text: '数据结构', link: '/数据结构' },
          { text: '严格模式', link: '/strict-mode' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Gaomodea/vue3-compnents' }
    ]
  }
})
