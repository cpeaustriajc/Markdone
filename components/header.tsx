'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 text-foreground">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Upload File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  )
}
