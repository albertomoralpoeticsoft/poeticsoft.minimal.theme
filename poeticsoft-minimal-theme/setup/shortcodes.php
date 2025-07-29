<?php

add_shortcode(
  'portfolio', 
  function($atts) {

    if(isset($atts['folder'])) {

      $folder = $atts['folder'];
      $uploads = wp_upload_dir();
      $uploadsbasedir = $uploads['basedir'];
      $uploadsbaseurl = $uploads['baseurl'];
      $portfoliofolder = $uploadsbasedir . '/portfolio/' . $folder;

      if(is_dir($portfoliofolder)) {

        $portfoliourl = $uploadsbaseurl . '/portfolio/' . $folder . '/';
        $folderfiles = scandir($portfoliofolder);
        $fileslist = '<div class="Files">';

        foreach($folderfiles as $filename) {

          if(
            $filename != '.'
            &&            
            $filename != '..'
          ) {

            $fileslist .= '<div class="File">
              <img class="PortfolioFileImage" src="' . $portfoliourl . $filename . '" />
            </div>';
          } 
        }  
        
        $fileslist .= '</div>';

        return $fileslist;

      } else {

        return 'folder ' . $portfoliofolder . ' no existe';
      }

    } else {
      
      return 'Falta folder';
    }

  }
);