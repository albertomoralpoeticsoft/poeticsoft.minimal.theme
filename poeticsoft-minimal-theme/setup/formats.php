<?php

add_action(
  'enqueue_block_editor_assets',
  function () {
  
    $editors = [
      'formats'
    ];

    foreach($editors as $editor) {

      wp_enqueue_style(
        'poeticsoft_editor_' . $editor . '_style',
        get_stylesheet_directory_uri() . '/editor/' . $editor . '/main.css',
        array(),
        filemtime(get_stylesheet_directory_uri() . '/editor/' . $editor . '/main.css')
      );

      wp_enqueue_script(
        'poeticsoft_editor_' . $editor . '_edit_script',
        get_stylesheet_directory_uri() . '/editor/' . $editor . '/main.js',
        array(
          'wp-blocks',
          'wp-block-editor',
          'wp-element',
          'wp-components',
          'wp-data',
          'wp-hooks',
          'lodash'
        ),
        filemtime(get_stylesheet_directory_uri() . '/editor/' . $editor . '/main.js')
      );
    }
  }
);
					