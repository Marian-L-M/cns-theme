<!-- To do: Change to splide -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/glide.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/css/glide.core.min.css">

<?php if (!isset($attributes["imgURL"])) {
    $attributes["imgURL"] = get_theme_file_uri("/assets/images/banner.png");
} ?>
<!-- <div class="slideshow__container">
  <div
    class="page-banner__bg-image"
    style="background-image: url('<?php echo $attributes["imgURL"]; ?>');"
  ></div>
  <div class="page-banner__content">
  </div>
</div> -->

<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
    <?php echo $content; ?>
      <!-- <li class="glide__slide">0</li>
      <li class="glide__slide">1</li>
      <li class="glide__slide">2</li> -->
    </ul>
  </div>
</div>

<script>
  new Glide('.glide').mount()
</script>