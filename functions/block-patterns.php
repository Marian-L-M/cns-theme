<?php
// Solved by changing block type
// Keeping as reference for future patterns


/**
 * Register block patterns for the block editor.
 *
 * Patterns scoped to a blockType (e.g. core/navigation) appear in that
 * block's own "Patterns" tab in the editor, rather than the global inserter.
 *
 * NOTE: Individual wiki posts and regular posts are already searchable in the
 * navigation block link picker (they show up as you type) because the wiki
 * CPT has show_in_rest => true. Use these patterns for archive/index links
 * that don't have a single searchable post behind them.
 */
// function cns_register_block_patterns()
// {
//     // ── Pattern category ────────────────────────────────────────────────────
//     register_block_pattern_category(
//         'cns-navigation',
//         ['label' => __('CNS Navigation', 'cns-theme')]
//     );

//     // ── Wiki sidebar preset ─────────────────────────────────────────────────
//     // Scoped to core/navigation so it appears in the nav block's Patterns tab.
//     // Add or remove navigation-link blocks as needed.
//     register_block_pattern(
//         'cns-theme/sidebar-navigation',
//         [
//             'title'       => __('Sidebar Navigation', 'cns-theme'),
//             'description' => __('Archive and section links for the wiki sidebar.', 'cns-theme'),
//             'categories'  => ['cns-navigation'],
//             'blockTypes'  => ['core/navigation'],
//             'content'     => '
// <!-- wp:navigation-link {"label":"Wiki Archive","type":"custom","url":"/wiki/","kind":"custom"} /-->
// <!-- wp:navigation-link {"label":"All Posts","type":"custom","url":"/blog/","kind":"custom"} /-->
//             ',
//         ]
//     );
// }
// add_action('init', 'cns_register_block_patterns');
