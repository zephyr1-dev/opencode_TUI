/** @jsxImportSource @opentui/solid */
/**
 * Posting-inspired layout for OpenCode
 * Beautiful, professional two-pane design
 */

import { createSignal, Show, createMemo } from "solid-js"

export interface LayoutState {
  mode: "request" | "response" | "expanded"
}

export function OpenCodeLayout(props: {
  header?: any
  requestPane: any
  responsePane: any
  footer?: any
}) {
  const [layoutState, setLayoutState] = createSignal<LayoutState>({
    mode: "request",
  })

  return (
    <box flexDirection="column" width="100%" height="100%" backgroundColor="#0a0a0a">
      {/* Header - Posting style */}
      <Show when={props.header}>
        <box
          height={1}
          width="100%"
          backgroundColor="#1a1a1a"
          borderBottomStyle="single"
          borderBottomColor="#333333"
          paddingLeft={1}
          flexDirection="row"
          gap={2}
        >
          {props.header}
        </box>
      </Show>

      {/* Main Body - Two pane layout */}
      <box
        flexDirection="row"
        width="100%"
        flex={1}
        minHeight={0}
        backgroundColor="#0a0a0a"
      >
        {/* Request Pane - Left side */}
        <box
          width={layoutState().mode === "expanded" ? "0" : "50%"}
          height="100%"
          borderRightStyle={layoutState().mode === "expanded" ? "none" : "single"}
          borderRightColor={layoutState().mode === "expanded" ? undefined : "#333333"}
          display={layoutState().mode === "response" ? "none" : "flex"}
          flexDirection="column"
          minWidth={0}
          backgroundColor="#0a0a0a"
        >
          {props.requestPane}
        </box>

        {/* Response Pane - Right side */}
        <box
          width={layoutState().mode === "expanded" ? "100%" : "50%"}
          height="100%"
          display={layoutState().mode === "request" ? "none" : "flex"}
          flexDirection="column"
          minWidth={0}
          backgroundColor="#0a0a0a"
        >
          {props.responsePane}
        </box>
      </box>

      {/* Footer - Posting style */}
      <Show when={props.footer}>
        <box
          height={1}
          width="100%"
          backgroundColor="#1a1a1a"
          borderTopStyle="single"
          borderTopColor="#333333"
          paddingLeft={1}
          flexDirection="row"
        >
          {props.footer}
        </box>
      </Show>
    </box>
  )
}

/**
 * Header component - inspired by Posting's AppHeader
 */
export function LayoutHeader(props: {
  title: string
  subtitle?: string
  mode?: string
}) {
  return (
    <>
      <text bold fg="#0ff">
        {props.title}
      </text>
      <Show when={props.mode}>
        <text fg="#888" marginLeft="auto" marginRight={1}>
          {props.mode}
        </text>
      </Show>
    </>
  )
}

/**
 * Tabbed pane - inspired by Posting's tabs
 */
export function TabbedPane(props: {
  tabs: Array<{ id: string; label: string; content: any }>
  activeTab?: string
  onTabChange?: (tabId: string) => void
}) {
  const [activeTab, setActiveTab] = createSignal(props.activeTab || props.tabs[0]?.id || "")

  return (
    <box flexDirection="column" height="100%" width="100%" minHeight={0}>
      {/* Tab Headers */}
      <box
        height={1}
        width="100%"
        borderBottomStyle="single"
        borderBottomColor="#333333"
        flexDirection="row"
        gap={1}
        paddingLeft={1}
        backgroundColor="#1a1a1a"
      >
        {props.tabs.map((tab) => (
          <text
            fg={activeTab() === tab.id ? "#0ff" : "#555"}
            bold={activeTab() === tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              props.onTabChange?.(tab.id)
            }}
          >
            {tab.label}
            {activeTab() === tab.id && " "}
          </text>
        ))}
      </box>

      {/* Tab Content */}
      <box flex={1} width="100%" minHeight={0} minWidth={0}>
        {props.tabs.find((t) => t.id === activeTab())?.content}
      </box>
    </box>
  )
}

/**
 * Section with border - inspired by Posting's .section class
 */
export function Section(props: {
  title?: string
  children: any
  collapsible?: boolean
  onExpand?: (expanded: boolean) => void
}) {
  const [collapsed, setCollapsed] = createSignal(false)

  return (
    <box
      flexDirection="column"
      width="100%"
      borderStyle="round"
      borderColor="#555555"
      paddingLeft={1}
      paddingRight={1}
      marginBottom={1}
      backgroundColor="transparent"
    >
      <Show when={props.title}>
        <box
          height={1}
          width="100%"
          flexDirection="row"
          gap={1}
          paddingTop={0}
          paddingBottom={0}
        >
          <Show when={props.collapsible}>
            <text
              fg="#aaa"
              onClick={() => {
                const next = !collapsed()
                setCollapsed(next)
                props.onExpand?.(next)
              }}
            >
              {collapsed() ? "▶" : "▼"}
            </text>
          </Show>
          <text bold fg="#0ff">
            {props.title}
          </text>
        </box>
      </Show>

      <Show when={!collapsed()}>
        <box paddingLeft={1}>{props.children}</box>
      </Show>
    </box>
  )
}

/**
 * Footer info - inspired by Posting's footer
 */
export function LayoutFooter(props: { left?: any; right?: any; center?: any }) {
  return (
    <>
      {props.left}
      <Show when={props.center}>
        <box flex={1} textAlign="center">
          {props.center}
        </box>
      </Show>
      <Show when={props.right}>
        <text marginLeft="auto" marginRight={1} fg="#888">
          {props.right}
        </text>
      </Show>
    </>
  )
}
