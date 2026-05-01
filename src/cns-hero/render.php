<?php
$position = $attributes["contentPosition"] ?? "middle-center";
$padding = $attributes["slidePadding"] ?? [
    "top" => "0px",
    "right" => "0px",
    "bottom" => "0px",
    "left" => "0px",
];

[$v, $h] = explode("-", $position);

$container_props = [
    "align-items" =>
        $v === "top" ? "flex-start" : ($v === "bottom" ? "flex-end" : "center"),
    "justify-content" =>
        $h === "left" ? "flex-start" : ($h === "right" ? "flex-end" : "center"),
    "padding-top" => $padding["top"] ?? "0px",
    "padding-right" => $padding["right"] ?? "0px",
    "padding-bottom" => $padding["bottom"] ?? "0px",
    "padding-left" => $padding["left"] ?? "0px",
];

$img_id = $attributes["bgImageID"] ?? 0;
$img_url = $img_id
    ? wp_get_attachment_image_url($img_id, "full")
    : $attributes["bgImageURL"] ?? "";
if ($img_url) {
    $container_props["background-image"] = "url(" . esc_url($img_url) . ")";
    $container_props["background-size"] = "cover";
    $container_props["background-position"] = "center";
}

$bg_color = $attributes["bgColor"] ?? "";
if ($bg_color) {
    $container_props["background-color"] = $bg_color;
}
?>
<div class="hero__container" style="<?php echo cns_generate_style_text(
    $container_props,
); ?>">
    <div class="hero__overlay">
        <?php echo $content; ?>
    </div>
    <a href="" class="hero__credits hero__credits--reference">Rozendale in the year HEM1</a>
    <a href="" class="hero__credits hero__credits--author">Map by Eugene Jonathan</a>
</div>
