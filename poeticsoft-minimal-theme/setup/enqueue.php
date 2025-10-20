<?php

add_action( 
	'admin_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-theme-admin', 
      get_stylesheet_directory_uri() . '/admin/main.js',
      [], 
      filemtime(get_stylesheet_directory() . '/admin/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-admin',
      get_stylesheet_directory_uri() . '/admin/main.css', 
      [
        'wp-block-library',
        'wp-block-library-theme'
      ], 
      filemtime(get_stylesheet_directory() . '/admin/main.css'),
      'all' 
    );

    /* Editor controls

    wp_enqueue_script(
      'poeticsoft-theme-editor-controls', 
      get_stylesheet_directory_uri() . '/editor/controls/main.js',
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
      get_stylesheet_directory_uri() . '/editor/controls/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/editor/controls/main.css'),
      'all' 
    );

    */
	}, 
	15 
);

add_action(
  'enqueue_block_editor_assets', 
  function () {
    
    wp_enqueue_style('wp-block-library');
    wp_enqueue_style('wp-block-library-theme');
  }
);

add_action( 
	'wp_enqueue_scripts', 
	function () {
    
    wp_enqueue_style('wp-block-library'); 
    wp_enqueue_style('wp-block-library-theme');

    // Theme

    wp_enqueue_script(
      'poeticsoft-theme-theme', 
      get_stylesheet_directory_uri() . '/theme/main.js',
      [], 
      filemtime(get_stylesheet_directory() . '/theme/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-theme',
      get_stylesheet_directory_uri() . '/theme/main.css', 
      [
        'wp-block-library',
        'wp-block-library-theme'
      ], 
      filemtime(get_stylesheet_directory() . '/theme/main.css'),
      'all' 
    );

    // Dialog

    wp_enqueue_script(
      'poeticsoft-theme-dialog', 
      get_stylesheet_directory_uri() . '/dialog/main.js',
      ['jquery'], 
      filemtime(get_stylesheet_directory() . '/dialog/main.js'),
      true
    );

    wp_enqueue_style( 
      'poeticsoft-theme-dialog',
      get_stylesheet_directory_uri() . '/dialog/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/dialog/main.css'),
      'all' 
    );

    // Portfolio

    wp_enqueue_script(
      'poeticsoft-theme-portfolio', 
      get_stylesheet_directory_uri() . '/portfolio/main.js',
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
      get_stylesheet_directory_uri() . '/portfolio/main.css', 
      [], 
      filemtime(get_stylesheet_directory() . '/portfolio/main.css'),
      'all' 
    );
	}, 
	15 
);