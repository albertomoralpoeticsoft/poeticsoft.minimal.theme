<?php

add_action( 
	'admin_enqueue_scripts', 
	function () {

    $url = get_stylesheet_directory_uri();

    wp_enqueue_script(
      'poeticsoft-theme-admin', 
      $url . '/admin/main.js',
      [], 
      filemtime(get_stylesheet_directory() . '/admin/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-admin',
      $url . '/admin/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/admin/main.css'),
      'all' 
    );

    /* Editor controls

    wp_enqueue_script(
      'poeticsoft-theme-editor-controls', 
      $url . '/editor/controls/main.js',
      [
        'wp-blocks', 
        'wp-edit-post', 
        'wp-hooks', 
        'wp-element', 
        'wp-i18n', 
        'wp-components', 
        'wp-data', 
        'wp-compose'
      ], 
      filemtime(get_stylesheet_directory() . '/editor/controls/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-editor-controls',
      $url . '/editor/controls/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/editor/controls/main.css'),
      'all' 
    ); 
    
    */
	}, 
	15 
);

add_action( 
	'wp_enqueue_scripts', 
	function () {

    if(isset($_GET['app'])) { // ?app=local

      $url = 'http://localhost:8090'; 

    } else {

      $url = get_stylesheet_directory_uri();
    }

    // Theme

    wp_enqueue_script(
      'poeticsoft-theme-theme', 
      $url . '/theme/main.js',
      [], 
      filemtime(get_stylesheet_directory() . '/theme/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-theme',
      $url . '/theme/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/theme/main.css'),
      'all' 
    );

    // Dialog

    wp_enqueue_script(
      'poeticsoft-theme-dialog', 
      $url . '/dialog/main.js',
      ['jquery'], 
      filemtime(get_stylesheet_directory() . '/dialog/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-dialog',
      $url . '/dialog/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/dialog/main.css'),
      'all' 
    );

    // Portfolio

    wp_enqueue_script(
      'poeticsoft-theme-portfolio', 
      $url . '/portfolio/main.js',
      [
        'jquery',
        'jquery-ui-core',
        'jquery-ui-widget',
        'jquery-ui-mouse'
      ], 
      filemtime(get_stylesheet_directory() . '/portfolio/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-portfolio',
      $url . '/portfolio/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/portfolio/main.css'),
      'all' 
    );
	}, 
	15 
);