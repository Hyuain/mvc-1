import $ from 'jquery'
import './app4.css'

const html = `
<section id="app4">
<div id="circle"></div>
</section>
`
const $element = $(html).appendTo($('body>.page'))

const $circle = $('#app4 #circle')

$circle.on('mouseenter', ()=>{
  $circle.addClass('active')
}).on('mouseleave', ()=>{
  $circle.removeClass('active')
})