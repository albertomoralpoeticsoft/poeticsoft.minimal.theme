<?php

add_filter('xmlrpc_enabled', '__return_false');
add_filter('login_display_language_dropdown', '__return_false');

function theme_log($display) { 

  $text = is_string($display) ? $display : json_encode($display, JSON_PRETTY_PRINT);

  file_put_contents(
    WP_CONTENT_DIR . '/core_log.txt',
    $text . PHP_EOL,
    FILE_APPEND
  );
}

add_filter( 'styles_inline_size_limit', '__return_zero' );
add_filter( 'wp_img_tag_add_auto_sizes', '__return_false' );

// add_action(
//   'wp_enqueue_scripts', 
//   function () {

//     wp_dequeue_style('global-styles');
//     wp_dequeue_style('core-block-supports');
//   }, 
//   100 
// );

add_action( 
  'after_setup_theme', 
  function () {
    
    remove_action('wp_footer', 'the_block_template_skip_link');
  } 
);


add_action(
  'wp_head', 
  function() {

    echo '<meta name="viewport" 
          content="width=device-width, 
                   user-scalable=no, 
                   initial-scale=1, 
                   maximum-scale=5"
    >';
  },
  2
);

require_once(dirname(__FILE__) . '/admin/main.php'); 
require_once(dirname(__FILE__) . '/setup/main.php');
require_once(dirname(__FILE__) . '/apps/main.php');