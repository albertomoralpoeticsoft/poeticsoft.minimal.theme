import React from 'react'
import { createRoot } from 'react-dom/client';
import APP from './js/app'
import './main.scss'

const init = () => {

  const app = document.createElement("div");
  app.setAttribute('id', 'APP')
  document.body.prepend(app)
  const domNode = document.getElementById('APP');
  const root = createRoot(domNode);
  
  root.render(<APP />)
}

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    init
  )

} else {

  init();
}