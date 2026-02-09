'use client'

import AppSidebarHeader from '@/components/sidebar/app-sidebar-header'
import SidebarHistory from '@/components/sidebar/sidebar-history'
import { SidebarUserNav } from '@/components/sidebar/sidebar-user-nav'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import cookieHelper from '@/lib/helpers/cookie.helper'

export function AppSidebar() {
  const isLogin = cookieHelper.getAccessToken()
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
      <SidebarFooter>{!isLogin && <SidebarUserNav />}</SidebarFooter>
    </Sidebar>
  )
}
