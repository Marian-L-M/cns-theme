<?php
// Consider using localize script workaround instead of this hacky solution
if (!empty($attributes["defaultimg"])) {
    $attributes["imgURL"] = get_theme_file_uri(
        "assets/images/" . $attributes["themeimage"],
    );
}
if (!isset($attributes["imgURL"])) {
    $attributes["imgURL"] = get_theme_file_uri("/assets/images/banner.png");
}
?>
  <div
    class="slideshow__slide"
    style="background-image: url('<?php echo $attributes["imgURL"]; ?>');"
  >
  <div class="slideshow_slide-interior container">
    <div class="slideshow__overlay">
      <?php echo $content; ?>
    </div>
  </div>
</div>