<!-- To do: Change to splide -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/glide.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/css/glide.core.min.css">

<?php if (!isset($attributes["imgURL"])) {
    $attributes["imgURL"] = get_theme_file_uri("/assets/images/banner.png");
} ?>
<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
    <?php echo $content; ?>
    </ul>
  </div>
</div>

<script>
  new Glide('.glide').mount()
</script>