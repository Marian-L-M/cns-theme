<?php
// Theme archive settings
function filter_pre_get_posts($query)
{
    if (
        !is_admin() &&
        is_post_type_archive("features") &&
        $query->is_main_query()
    ) {
        $query->set("orderby", "title");
        $query->set("order", "ASC");
        $query->set("posts_per_page", -1);
    }
    if (
        !is_admin() &&
        is_post_type_archive("guides") &&
        $query->is_main_query()
    ) {
        $query->set("orderby", "title");
        $query->set("order", "ASC");
        $query->set("posts_per_page", -1);
    }
    if (
        !is_admin() &&
        is_post_type_archive("roadmap") &&
        $query->is_main_query()
    ) {
        $today = date("Ymd");
        $query->set("posts_per_page", 10);
        $query->set("order", "DESC");
        $query->set("orderby", "meta_value_num");
        $query->set("meta_key", "event_date");
    }
}
add_action("pre_get_posts", "filter_pre_get_posts");
