<?php
/**
 * CNS admin — page shell template.
 *
 * Variables provided by cns_admin_render_page():
 *   @var array  $tabs       Full tab registry from cns_admin_get_tabs().
 *   @var string $active_tab Slug of the currently active tab.
 */
defined( 'ABSPATH' ) || exit;

$active = $tabs[ $active_tab ];
?>
<div class="wrap">

  <h1><?php esc_html_e( 'Clouds And Spaceships', 'cns-theme' ); ?></h1>

  <nav class="nav-tab-wrapper" aria-label="<?php esc_attr_e( 'CNS settings sections', 'cns-theme' ); ?>">
    <?php foreach ( $tabs as $slug => $tab ) :
        if ( ! current_user_can( $tab['capability'] ?? 'manage_options' ) ) continue;
        $url         = admin_url( 'admin.php?page=' . cns_admin_page_slug( $slug ) );
        $active_class = $slug === $active_tab ? ' nav-tab-active' : '';
    ?>
      <a href="<?php echo esc_url( $url ); ?>" class="nav-tab<?php echo $active_class; ?>">
        <?php echo esc_html( $tab['title'] ); ?>
      </a>
    <?php endforeach; ?>
  </nav>

  <div class="cns-admin-tab-content">
    <?php
    if ( is_callable( $active['callback'] ) ) {
        call_user_func( $active['callback'] );
    } else {
        echo '<p>' . esc_html__( 'No content available for this tab.', 'cns-theme' ) . '</p>';
    }
    ?>
  </div>

</div>
