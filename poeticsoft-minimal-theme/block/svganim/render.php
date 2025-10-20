<?php

/**
 * - $attributes: atributos del bloque
 * - $content: contenido interno, si aplica
 * - $block: array con info completa del bloque
 */

defined( 'ABSPATH' ) || exit;

$block_id = $attributes['blockId'];
$svgscript  = $attributes['svgscript'];
$minWidth = $attributes['minWidth'];
$width = $attributes['width'];
$minWidth = $attributes['minWidth'];
$maxWidth = $attributes['maxWidth'];
$className = $attributes['className'];
$classAlign = $attributes['align'];

$wrapper_attributes = get_block_wrapper_attributes([
  'class' => 'svg-anim-wrapper'
]);

echo '<div>' . json_encode($wrapper_attributes) . '</div><div
  id="' . $block_id . '"
  class="wp-block wp-block-poeticsoft-svganim ' . $className . ' ' . $classAlign . '"
  style="
    width: clamp('. $minWidth . 'px, '. $width . '%, '. $maxWidth . 'px); 
    padding: 0px 0px clamp('. $minWidth . 'px, '. $width . '%, '. $maxWidth . 'px);
    position: relative;
  "
>
  <div class="SVG">
    <svg 
      id={ blockId }
      width="100%" 
      height="100%" 
      viewPort="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <script 
        type="application/ecmascript"
        href="/wp-content/themes/poeticsoft-minimal-theme/svgscript/' . $svgscript . '/main.js"
        data-svgid={ blockId }
      ></script>
    </svg>
  </div>
</div>
<script>

  document.addEventListener(
    "DOMContentLoaded", 
    () => {
      if(window.wp_block_poeticsoft_svganim) {

        window.wp_block_poeticsoft_svganim("' . $block_id . '") 
      }
    }
  ); 

</script>';