import $ from "jquery"
import './app2.css'

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')
const localKey = 'app2.index'
const index = localStorage.getItem(localKey) || 0

$tabBar.on('click', 'li', (e)=>{
  const $li = $(e.currentTarget)
  $li
    .addClass('selected')
    .siblings()
    .removeClass('selected')
  const index = $li.index()
  localStorage.setItem(localKey, index)
  $tabContent
    .children()
    .eq(index)
    .addClass('active')
    .siblings()
    .removeClass('active')
})

$tabBar.children().eq(index).trigger('click')