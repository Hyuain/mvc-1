import $ from 'jquery'
import './app3.css' 

const $square = $('#app3 #square')
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes' ? true : false


// 如果 active 是 true，就最开始加上class='active'，如果是 false，就不加
$square.toggleClass('active', active)

$square.on('click',() => {
  if($square.hasClass('active')){
    $square.removeClass('active')
    localStorage.setItem('app3.active', 'no')
  } else {
    $square.addClass('active')
    localStorage.setItem('app3.active', 'yes')
  }
})