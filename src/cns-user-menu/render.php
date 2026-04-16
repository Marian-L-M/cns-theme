<?php
$items = $attributes["items"] ?? [];
$wrapper_attributes = get_block_wrapper_attributes([
    "data-wp-interactive" => "cns-theme/cns-header",
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="cns-um__wrapper">
        <button class="cns-um__toggle">Bogdan Popowitch</button>
        <ul class="cns-um__nav-links">
            <?php foreach ($items as $item): ?>
            <li class="cns-um__nav-link">
                    <a href="<?php echo esc_url($item["url"]); ?>"
                        <?php if (
                            !empty($item["linkNewTab"])
                        ): ?>target="_blank" rel="noopener noreferrer"<?php endif; ?>
                    >
                        <?php echo esc_html($item["label"]); ?>
                    </a>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>