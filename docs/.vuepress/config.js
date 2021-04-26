module.exports = {
  title: "SnowNull",
  description: '流云与风，苍穹游牧。',
  dest: '',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
/*      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">
<script src="https://cdn.jsdelivr.net/gh/qbmzc/live2d-widget@latest/autoload.js"></script> 
 */
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css' }],
    ['script', { src: 'https://cdn.jsdelivr.net/gh/qbmzc/live2d-widget@latest/autoload.js' }] 
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' },
      /*   { text: 'Compass', link: 'https://snowyan.gitee.io/compass/', icon: 'reco-other' }, */
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/qbmzc', icon: 'reco-github' },
          /*    { text: '简书', link: 'https://www.jianshu.com/u/1fa980d5267b', icon: 'reco-jianshu' }, */
          { text: 'Gitee', link: 'https://gitee.com/snowyan', icon: 'reco-mayun' },
          /*  { text: 'GitLab', link: 'https://gitlab.com/congco?nav_source=navbar', icon: 'reco-gitlab' } */
        ]
      }
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    logo: '/head.png', //对应public中的head.png
    authorAvatar: '/head.png', //对应public中的head.png
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'congco',
    // 备案号
    record: '-----',
    // 项目开始时间
    startYear: '2016',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: 'TNv8mbgAX8tdW4kYXRJjbWdX-gzGzoHsz',// your appId
      appKey: '0tsbVbmWPjmQRNdsSgoxuils', // your appKey
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/medium-zoom', 
    'flowchart' ]

}  