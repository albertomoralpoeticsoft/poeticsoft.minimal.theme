<?php

/**
 * Apps
 */

add_action( 
	'wp_enqueue_scripts', 
	function () {

    global $post;

    $pageapps = [
      'clouds',
      'rain2',
      'fire',
      'blur',
      'halo'
    ];

    if(null != $post) {
      
      $appname = $pageapps[rand(0, count($pageapps) - 1)];
      // $appname = $pageapps[0];

      wp_enqueue_script(
        'poeticsoft-theme-app-' . $appname, 
        get_stylesheet_directory_uri() . '/apps/' . $appname . '/main.js',
        [], 
        filemtime(get_stylesheet_directory() . '/apps/' . $appname . '/main.js'),
        true
      );

      wp_enqueue_style( 
        'poeticsoft-theme-app-' . $appname,
        get_stylesheet_directory_uri() . '/apps/' . $appname . '/main.css', 
        [], 
        filemtime(get_stylesheet_directory() . '/apps/' . $appname . '/main.css'),
        'all' 
      );
    }  
  }, 
	999 
);