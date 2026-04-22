<?php
$slide_count = count($block->inner_blocks);
$bullets = "";
for ($i = 0; $i < $slide_count; $i++) {
    $bullets .=
        '<button class="glide__bullet" data-glide-dir="=' . $i . '"></button>';
}
?>
<div class="cns-slideshow__wrapper">
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <?php echo $content; ?>
      </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#8249;</button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir="&gt;">&#8250;</button>
    </div>
    <?php if ($slide_count > 1): ?>
    <div class="glide__bullets" data-glide-el="controls[nav]">
      <?php echo $bullets; ?>
    </div>
    <?php endif; ?>
  </div>
</div>
