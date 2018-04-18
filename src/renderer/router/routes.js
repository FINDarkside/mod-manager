export default [{
    path: '/installed-mods',
    name: 'landing-page',
    showInSidebar: true,
    title: 'Installed Mods',
    component: require('@/components/Pages/InstalledModsPage').default
},
{
    path: '/browse-mods',
    showInSidebar: true,
    title: 'Browse Mods',
    component: require('@/components/Pages/BrowseModsPage').default
},
{
    path: '/my-mods',
    showInSidebar: true,
    title: 'My Mods',
    component: require('@/components/Pages/MyModsPage').default
},
{
    path: '/settings',
    showInSidebar: true,
    title: 'Settings',
    component: require('@/components/Pages/SettingsPage').default
},
{
    path: '/about',
    showInSidebar: true,
    title: 'About',
    component: require('@/components/Pages/AboutPage').default
},
{
    path: '*',
    redirect: '/browse-mods'
}];