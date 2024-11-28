import { IconType } from 'react-icons'
import { 
  HiOutlineViewGrid, 
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineGlobe,
  HiOutlineMap,
  HiOutlineDocumentDuplicate,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineCollection
} from 'react-icons/hi'

interface NavLink {
  href: string
  label: string
  icon: IconType
  subItems?: NavLink[]
}

export const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { href: '/leads', label: 'Leads', icon: HiOutlineDocumentText },
  { href: '/customers', label: 'Customers', icon: HiOutlineUsers },
  { href: '/website', label: 'Website', icon: HiOutlineGlobe },
  { href: '/trips', label: 'Trips', icon: HiOutlineMap },
  { href: '/invoice', label: 'Invoice', icon: HiOutlineDocumentDuplicate },
  { href: '/itineraries', label: 'Itineraries', icon: HiOutlineClipboardList },
  { 
    href: '/setup', 
    label: 'Setup', 
    icon: HiOutlineCollection,
    subItems: [
      { href: '/setup/stay', label: 'Stay', icon: HiOutlineHome },
      { href: '/setup/activities', label: 'Activities', icon: HiOutlineUserGroup },
      { href: '/setup/transportation', label: 'Transportation', icon: HiOutlineTruck },
      { href: '/setup/other-service', label: 'Other Service', icon: HiOutlineCollection },
    ]
  },
  { href: '/setting', label: 'Setting', icon: HiOutlineCog },
]