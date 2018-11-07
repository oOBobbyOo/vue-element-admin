export interface SidebarState {
  opened: boolean
  withoutAnimation: boolean
}

export interface AppState {
  sidebar: SidebarState
  device: string
}
