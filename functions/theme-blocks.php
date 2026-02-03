<?php
// Theme custom blocks
function bannerBlock()
{
    wp_register_script(
        "bannerBlockScript",
        get_stylesheet_directory_uri() . "/build/banner.js",
        ["wp-blocks", "wp-editor"],
    );
    register_block_type("cns-theme/banner", [
        "editor_script" => "bannerBlockScript",
    ]);
}
add_action("init", "bannerBlock");
