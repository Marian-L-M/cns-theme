<?php
if (!isset($attributes["imgURL"])) {
    $attributes["imgURL"] = get_theme_file_uri("/assets/images/banner.png");
} ?>
<div class="infobox">
    <div
        class="infobox__image"
        style="background-image: url('<?php echo $attributes["imgURL"]; ?>');"
    ></div>
    <div class="infobox__content">
        <?php echo $content; ?>
    </div>
</div>