import portfolio from './portfolio'
import './main.scss'

(function ($) {

  const $portfoliolinks = $('a[href^="#portfolio"]')

  if($portfoliolinks.length) {

    $portfoliolinks
    .on(
      'click',
      function() {

        const $link = $(this)
        const href = $link.attr('href')

        portfolio($, href)

        return false
      }
    )
  }

})(jQuery);