import './main.scss'

(function ($) {
  
  const $dialog = $('#Dialog')
  const $slides = $dialog.find('.Slide')

  /* Init slides */

  $slides.each(function() {
      
    const $this = $(this) 

    if(location.pathname == '/') {

      $this.find('.wp-block-button.common.home').remove()
    }
  
    if($this.hasClass('First')) {

      $this.find('.wp-block-button.common.root').remove()
    }
  })

  /* Slides height */

  const calculateSize = () => {

    $dialog.removeClass('Calculated')

    let width = 0;
    let height = 0;

    setTimeout(() => {

      $slides.each(function() {

        const $this = $(this)
        width = Math.ceil(Math.max(height, $this.outerWidth()))
        height = Math.ceil(Math.max(height, $this.outerHeight()))
      })
      $dialog.height(width)
      $dialog.height(height)
      
      $dialog.addClass('Calculated')
    }, 100)
  }

  window.addEventListener(
    'resize',
    calculateSize
  )

  setTimeout(() => {
    
    calculateSize()
  }, 800)
  
  /* Hash changes */

  const hashchanged = () => {     

    $slides.each(function() {
      
      $(this).removeClass('Current')
    })

    const hash = location.hash
    const $targetSlide = hash ?
      $dialog.find(hash)
      :
      $dialog.find('.Slide.First')

    setTimeout(() => {
      
      if($targetSlide.length) { 

        $targetSlide.addClass('Current')
      }
    }, 600)
  }

  window.addEventListener(
    'hashchange', 
    hashchanged
  )

  setTimeout(() => {
    
    hashchanged()
  }, 1000)  

})(jQuery);