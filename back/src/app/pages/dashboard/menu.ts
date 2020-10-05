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
    title: 'Manage Posts',
    icon: 'fas fa-fw fa-list',
    children: [
      {
        title: 'All posts',
        link: '/dashboard/posts/list',
      },
    ],
  },
  {
    title: 'Manage Tags',
    icon: 'fas fa-fw fa-tags',
    link: '/dashboard/tags',
  },
  {
    title: 'SETTING',
    group: true,
  },
  {
    title: 'Setting',
    icon: 'fas fa-fw fa-cog',
    children: [
      {
        title: 'Profile',
        link: '/dashboard/profile',
      },
    ],
  },
];
