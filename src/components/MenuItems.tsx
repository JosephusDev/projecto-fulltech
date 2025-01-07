import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function MenuItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href='/projetos'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Projetos
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href='/clientes'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Clientes
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href='/dashboard'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
