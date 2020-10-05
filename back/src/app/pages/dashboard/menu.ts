export let MENU_ITEMS = [
  {
    title: 'Dashboard',
    icon: 'fas fa-fw fa-tachometer-alt',
    link: '/dashboard',
  },
  {
    title: 'MANAGEMENT',
    group: true,
  },
  {
    title: 'Post',
    icon: 'fas fa-fw fa-list',
    children: [
      {
        title: 'Add Post',
        link: '/dashboard/posts/new',
      },
      {
        title: 'All posts',
        link: '/dashboard/posts/list',
      },
    ],
  },
  {
    title: 'Tag',
    icon: 'fas fa-fw fa-list',
    link: '/dashboard/tags',
  },
  {
    title: 'Setting',
    icon: 'fas fa-fw fa-cog',
    link: '/dashboard/setting',
  },
];
