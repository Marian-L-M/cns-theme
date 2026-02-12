<footer>
    <a href="<?php echo site_url(); ?>" class="logo logo__footer">Logo</a>
    <nav>
        <?php wp_nav_menu([
            "theme_location" => "footerMenuLocation",
        ]); ?>
    </nav>
</footer>
