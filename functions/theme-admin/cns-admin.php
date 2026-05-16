<?php
/**
 * CNS administration panel.
 *
 * Registers the top-level "CNS" menu and one submenu entry per tab.
 * Runs at admin_menu priority 99 so it lands near the bottom of the sidebar.
 *
 * ── Plugin / suite integration ───────────────────────────────────────────────
 * Any plugin can inject its own tab by hooking `cns_admin_tabs` before
 * admin_menu fires at priority 99 (i.e. use the default priority 10):
 *
 *   add_filter( 'cns_admin_tabs', function ( array $tabs ): array {
 *       $tabs['my-slug'] = [
 *           'menu_title' => 'My Suite',       // sidebar label
 *           'title'      => 'My Suite Title', // horizontal tab label
 *           'capability' => 'manage_options',
 *           'callback'   => 'my_suite_render_tab', // callable
 *           'priority'   => 40,               // lower = further left/up
 *       ];
 *       return $tabs;
 *   } );
 */

defined( 'ABSPATH' ) || exit;

// ── Tab registry ──────────────────────────────────────────────────────────────

/**
 * Returns the ordered tab definitions, merged with any plugin additions.
 * Result is cached so apply_filters only runs once per request.
 */
function cns_admin_get_tabs(): array {
    static $tabs = null;
    if ( null !== $tabs ) {
        return $tabs;
    }

    $built_in = [
        'theme' => [
            'menu_title' => __( 'Theme', 'cns-theme' ),
            'title'      => __( 'Theme', 'cns-theme' ),
            'capability' => 'manage_options',
            'callback'   => 'cns_admin_render_tab_theme',
            'priority'   => 10,
        ],
    ];

    $tabs = (array) apply_filters( 'cns_admin_tabs', $built_in );

    uasort( $tabs, static function ( array $a, array $b ): int {
        return ( (int) ( $a['priority'] ?? 50 ) ) <=> ( (int) ( $b['priority'] ?? 50 ) );
    } );

    return $tabs;
}

/**
 * Returns the WP admin page slug for a given tab slug.
 * The first/theme tab shares the parent slug so WordPress doesn't duplicate it.
 */
function cns_admin_page_slug( string $tab_slug ): string {
    return $tab_slug === 'theme' ? 'cns-settings' : 'cns-settings-' . $tab_slug;
}

// ── Menu registration ─────────────────────────────────────────────────────────

add_action( 'admin_menu', 'cns_admin_register_menus', 99 );

function cns_admin_register_menus(): void {
    $tabs = cns_admin_get_tabs();

    // Top-level entry — dashicons-cloud, position 99 = bottom of sidebar.
    add_menu_page(
        __( 'Clouds And Spaceships', 'cns-theme' ),
        __( 'CNS', 'cns-theme' ),
        'manage_options',
        'cns-settings',
        'cns_admin_render_page',
        'dashicons-cloud',
        99
    );

    // One named submenu per tab. The theme tab reuses the parent slug so it
    // replaces the auto-generated "CNS" duplicate that add_menu_page creates.
    foreach ( $tabs as $slug => $tab ) {
        add_submenu_page(
            'cns-settings',
            __( 'Clouds And Spaceships', 'cns-theme' ),
            esc_html( $tab['menu_title'] ),
            $tab['capability'] ?? 'manage_options',
            cns_admin_page_slug( $slug ),
            'cns_admin_render_page'
        );
    }

    // Remove the auto-generated "CNS" duplicate (first match on the parent slug).
    remove_submenu_page( 'cns-settings', 'cns-settings' );
}

// ── Page renderer ─────────────────────────────────────────────────────────────

function cns_admin_render_page(): void {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( esc_html__( 'You do not have permission to access this page.', 'cns-theme' ) );
    }

    $tabs         = cns_admin_get_tabs();
    $current_page = sanitize_key( $_GET['page'] ?? 'cns-settings' );

    $active_tab = array_key_first( $tabs );
    foreach ( $tabs as $slug => $tab ) {
        if ( $current_page === cns_admin_page_slug( $slug ) ) {
            $active_tab = $slug;
            break;
        }
    }

    include __DIR__ . '/partials/page.php';
}

// ── Built-in tab callbacks ────────────────────────────────────────────────────

function cns_admin_render_tab_theme(): void {
    include __DIR__ . '/partials/tab-theme.php';
}
