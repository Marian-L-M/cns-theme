<header>
    <a href="<?php echo site_url(); ?>" class="logo">Logo</a>
    <nav>
        <?php wp_nav_menu([
            "theme_location" => "headerMenuLocation",
        ]); ?>
      <button type="button" class="btn btn__icon text-xl fx-content-center p-r1 rounded-sm toggle-search-overlay"
            id="toggle-search-overlay" @click="openSearchMenu = ! openSearchMenu"
            aria-label="open search menu"><?php generate_icon("search"); ?>
        </button>
        <li class="dropdown" x-data="{ openUserMenu: false }">
            <button class="dropdown__toggle" @click="openUserMenu = ! openUserMenu" aria-label="open user menu">
                icon/toggle
            </button>
            <div class="dropdown__content">
                <ul class="fx-col" x-show="openUserMenu" @click.outside="openUserMenu = false" x-cloak>
                    <?php if (!is_user_logged_in()): ?>
                    <li>
                        <a href="<?php echo esc_url(
                            wp_registration_url(),
                        ); ?>">Sign up</a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(
                            wp_login_url(),
                        ); ?>">Log in</a>
                    </li>
                    <?php else: ?>
                    <li>
                        <a href="">
                            <!-- Profile -->
                            <?php echo get_avatar(get_current_user_id(), 60); ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(
                            wp_logout_url(),
                        ); ?>">Logout</a>
                    </li>
                    <li><a href="<?php echo get_permalink(
                        94,
                    ); ?>">My notes</a></li>
                    <?php endif; ?>
                </ul>
            </div>
        </li>
    </nav>
</header>
