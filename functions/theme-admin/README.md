# CNS Admin Panel

Provides the **Clouds And Spaceships** settings page in the WordPress admin sidebar (`admin.php?page=cns-settings`). The theme owns the page shell and the **Theme** tab. All other tabs are registered by their respective plugins.

---

## How it works

- The top-level menu entry is labelled **CNS** and sits at position 99 (bottom of the sidebar).
- Each tab is also a submenu entry, so tabs are bookmarkable and deep-linkable.
- Tab definitions are collected through the `cns_admin_tabs` filter before the menu is built at `admin_menu` priority 99.

---

## Adding a tab from a plugin

Hook into `cns_admin_tabs` at the default priority (10) so your tab is registered before the menu renders at priority 99.

```php
add_filter( 'cns_admin_tabs', function ( array $tabs ): array {
    $tabs['my-slug'] = [
        'menu_title' => 'My Suite',        // label shown in the sidebar submenu
        'title'      => 'My Suite Title',  // label shown on the horizontal tab bar
        'capability' => 'manage_options',  // who can see this tab
        'callback'   => 'my_render_tab',   // any callable
        'priority'   => 40,                // lower = further left; theme tab is 10
    ];
    return $tabs;
} );

function my_render_tab(): void {
    echo '<div class="wrap"><h2>My Suite</h2><p>Content here.</p></div>';
}
```

### Tab definition keys

| Key | Type | Required | Description |
|---|---|---|---|
| `menu_title` | string | yes | Sidebar submenu label |
| `title` | string | yes | Horizontal tab label |
| `capability` | string | no | Defaults to `manage_options` |
| `callback` | callable | yes | Renders the tab body |
| `priority` | int | no | Sort order; defaults to 50 |

### Page slug convention

The theme tab uses `cns-settings` as its page slug (matching the parent menu). Every other tab gets `cns-settings-{slug}`, e.g. `cns-settings-wiki`. Use `cns_admin_page_slug( $slug )` if you need to build a URL to another tab.

```php
$url = admin_url( 'admin.php?page=' . cns_admin_page_slug( 'wiki' ) );
```

---

## Tab ordering

Tabs are sorted ascending by `priority` after all filters have run:

| Priority | Tab |
|---|---|
| 10 | Theme (built-in) |
| 20–30 | Reserved for first-party CNS suites |
| 40+ | Third-party plugins |

---

## Capability-gated tabs

Tabs whose `capability` the current user does not hold are hidden from both the tab bar and the sidebar. Access is also checked at render time, so the URL cannot be used to bypass it.

---

## File structure

```
functions/theme-admin/
  cns-admin.php        — registration, routing, dispatcher
  README.md            — this file
  partials/
    page.php           — page shell (heading, tab nav, content wrapper)
    tab-theme.php      — Theme tab content
```
