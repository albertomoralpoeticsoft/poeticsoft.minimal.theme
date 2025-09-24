const pages = {}

export default url => {

  return new Promise(
    (resolve, reject) => {

      if(pages[url]) {
        
        return resolve(pages[url])
      }

      fetch(
        '/wp-json/minimaltheme/page',
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
            
            pages[url] = post
            resolve(post)
          })
        }
      })
      .catch(
        error => {

          reject(error)
        }
      )
    }
  )
}