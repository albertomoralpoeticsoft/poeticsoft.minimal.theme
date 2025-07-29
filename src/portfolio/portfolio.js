import Viewer from 'viewerjs'

import arrowcircle from 'assets/images/arrow-circle.svg'

export default ($, url) => {
 
  $('body')
  .append(`
    <div id="PortfolioWrapper">
      <div class="Portfolio">
        <div class="Loading">
          <h4>
            Cargando portfolio...
          </h4>
        </div>
        <div class="WP">
          <div class="Title">
            <div class="Text">
            </div>
            <div class="Close">
              <svg viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M8,19a3,3,0,0,1-3-3V8A3,3,0,0,1,8,5,1,
                     1,0,0,0,8,3,5,5,0,0,0,3,8v8a5,5,0,0,0,
                     5,5,1,1,0,0,0,0-2Zm7.71-3.29a1,1,0,0,
                     0,0-1.42L13.41,12l2.3-2.29a1,1,0,0,
                     0-1.42-1.42L12,10.59,9.71,8.29A1,1,
                     0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,
                     1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,
                     13.41l2.29,2.3a1,1,0,0,0,1.42,0ZM16,
                     3a1,1,0,0,0,0,2,3,3,0,0,1,3,3v8a3,3,
                     0,0,1-3,3,1,1,0,0,0,0,2,5,5,0,0,0,
                     5-5V8A5,5,0,0,0,16,3Z"
                />
              </svg>
            </div>
          </div>
          <div class="Content">
          </div>
      </div>
    </div>
  `)

  const $portfoliowrapper = $('body')
  .find('#PortfolioWrapper')
  .eq(0)
  const $portfolio = $portfoliowrapper.find('.Portfolio')
  const $loading = $portfolio.find('.Loading')
  const $wp = $portfolio.find('.WP')
  const $title = $wp.find('.Title')
  const $titletext = $title.find('.Text')
  const $close = $title.find('.Close')
  const $content = $wp.find('.Content')

  $close
  .on(
    'click',
    function() {

      $portfoliowrapper
      .fadeOut(
        1000,
        () => {

          $portfoliowrapper.remove()
        }
      )
    }
  )

  $portfolio
  .fadeIn(
    500,
    () => {      
      
      // TO DO Cache page

      fetch(
        '/wp-json/poeticsoft/page',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          })
        }
      )
      .then(response => {
    
        if(response.status == 200) {
    
          response.json()
          .then(post => {

            $titletext.html(post.title);
            $content.html(post.content) 

            const $images = $content.find('.File img')
            if($images.length) {   
              
              let imagesdom = `<ul id="Images">`
              $images.each(function() {

                imagesdom += `<li><img src="${ $(this).attr('src') }" /></li>`
              })
              imagesdom += `</ul>`
              
              $images.each(function(index) {

                $(this)
                .on(
                  'load',
                  function(){

                    $(this)
                    .parent('.File')
                    .addClass('Loaded')
                  }
                )
                .on(
                  'click',
                  function(e) {

                    const src = $(this).attr('src')

                    $('body')
                    .append(`
                      <div id="ImageViewerWrapper">
                        ${ imagesdom }
                      </div>
                    `)

                    const $imageviewerwrapper = $('#ImageViewerWrapper')
                    const $images = $imageviewerwrapper.find('#Images')

                    $imageviewerwrapper
                    .fadeIn(
                      500,
                      function() {

                        const gallery = new Viewer(
                          $images[0],
                          {
                            backdrop: false,
                            toolbar: false,
                            title: false,
                            // navbar: false,
                            container: $imageviewerwrapper[0],
                            hidden: () => {

                              $imageviewerwrapper
                              .fadeOut(
                                500,
                                function() {

                                  $imageviewerwrapper.remove()
                                }
                              )
                            }
                          }
                        )
                        
                        gallery.view(index)
                      }
                    )

                    return false;
                  }
                )
              })
            }

            $loading.fadeOut()
            $wp.fadeIn()
          })
    
        } else {
    
          console.log('Fetch error')
        }
      })
      .catch(error => {
    
        console.log(error)
      })
    }
  )  
}