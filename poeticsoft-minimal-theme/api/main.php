<?php

function poeticsoft_minimaltheme_svgscripts(WP_REST_Request $req) {

  $res = new WP_REST_Response();

  try {

    $scriptsdir = get_stylesheet_directory() . '/svgscript';
    $scripts = array_values(
      array_diff(
        scandir($scriptsdir),
        ['..', '.']
      )
    );
    
    $res->set_data($scripts);
    
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function poeticsoft_minimaltheme_page(WP_REST_Request $req) {

  $res = new WP_REST_Response();

  try { 

    $url = $req->get_param('url');
    $page = get_page_by_path($url, OBJECT, 'page');
    if(!$page) {

      throw new Exception(
        'La página no existe', 
        404
      ); 
    }
    $site_icon_id = get_option('site_icon'); // obtiene el ID del attachment
    $site_icon_url = wp_get_attachment_url($site_icon_id); // obtiene la URL completa
    
    $res->set_data([
      'icon' => $site_icon_url,
      'title' => $page->post_title,
      'content' => do_shortcode($page->post_content)
    ]);
    
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'minimaltheme',
      'svgscripts',
      array(
        array(
          'methods'  => 'GET',
          'callback' => 'poeticsoft_minimaltheme_svgscripts',
          'permission_callback' => '__return_true'
        )
      )
    );

    register_rest_route(
      'minimaltheme',
      'page',
      array(
        array(
          'methods'  => 'POST',
          'callback' => 'poeticsoft_minimaltheme_page',
          'permission_callback' => '__return_true'
        )
      )
    );
  }
);
