import BrowseModsPage from '@/components/pages/BrowseModsPage.vue';
import AboutPage from '@/components/pages/AboutPage.vue';
import SettingsPage from '@/components/pages/SettingsPage.vue';
import ModPage from '@/components/pages/ModPage.vue';

export default [
  /*{
      path: '/installed-mods',
      name: 'landing-page',
      component: require('@/components/Pages/InstalledModsPage').default,
      meta: {
        showInSidebar: true,
        title: 'Installed Mods',
      },
    },*/
  {
    path: '/browse-mods',
    component: BrowseModsPage,
    meta: {
      showInSidebar: true,
      title: 'Browse Mods',
    },
  },
  {
    path: '/mod/:modID',
    component: ModPage,
    props: true,
    meta: {
      showInSidebar: false,
    },
  },
  /*{
      path: '/my-mods',
      component: require('@/components/Pages/MyModsPage').default,
      meta: {
        showInSidebar: true,
        title: 'My Mods',
      },
    },*/
  {
    path: '/settings',
    component: SettingsPage,
    meta: {
      showInSidebar: true,
      title: 'Settings',
    },
  },
  {
    path: '/about',
    component: AboutPage,
    meta: {
      showInSidebar: true,
      title: 'About',
    },
  },
  {
    path: '*',
    redirect: '/browse-mods',
    meta: {
      showInSidebar: false,
      title: '',
    },
  },
  /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/ webpackChunkName: 'about' / './views/About.vue'),
    },*/
];
