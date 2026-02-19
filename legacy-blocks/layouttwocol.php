<!-- Make contents editor editable -->
<?php $query_args = [
    "post_type" => ["post"],
    "post_status" => "publish",
    "posts_per_page" => 2,
    "order" => "ASC",
]; ?>
<div class="layout-two-col">
  <div class="layout-two-col__column">
    <?php
    $query = new WP_Query($query_args);

    if ($query->have_posts()):
        while ($query->have_posts()):
            $query->the_post(); ?>
             <div class="post-list-item">
                <div class="meta-box">
                    <h3><a href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a></h3>
                    <p>By <?php echo get_the_author_posts_link(); ?> (<?php echo get_the_time(
     "Y.m.d",
 ); ?>)</p>
                </div>
                <p class="excerpt">
                    <?php echo get_the_excerpt(); ?>
                </p>
                <a href="<?php echo get_the_permalink(); ?>" class="btn btn__rm btn__anim-bar"><span class="anim-inner">Read
                        more</span></a>
            </div>

<?php
        endwhile;
    endif;
    wp_reset_postdata();
    ?>
  </div>
  <div class="layout-two-col__column">
    <h3>Other column here</h3>
    <p>Text text text</p>
    <p>Text text text</p>
    <p>Text text text</p>
  </div>
</div>
