'use client'

import AppSidebarHeader from '@/components/sidebar/app-sidebar-header'
import SidebarHistory from '@/components/sidebar/sidebar-history'
import { SidebarUserNav } from '@/components/sidebar/sidebar-user-nav'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'

export function AppSidebar() {
  const isLogin = true
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSidebarHeader />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarHistory />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>{isLogin && <SidebarUserNav />}</SidebarFooter>
    </Sidebar>
  )
}
