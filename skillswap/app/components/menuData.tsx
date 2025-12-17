interface Menu {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};


const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "  Discover",
    path: "/discover",
    newTab: false,
  },
  {
    id: 3,
    title: "Requests",
    path: "/request",
    newTab: false,
  },
  {
    id: 4,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "Profile",
    path: "/profile",
    newTab: false,
  }
];
export default menuData;
