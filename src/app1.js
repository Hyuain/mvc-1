import $ from 'jquery'

const $number = $('#number')

const num = localStorage.getItem('num')
$number.text(num || 200)

$('#add1').on('click', ()=>{
  let num = parseInt($number.text())
  num += 1
  localStorage.setItem('num', num)
  $number.text(num)
})
$('#minus1').on('click', ()=>{
  let num = parseInt($number.text())
  num -= 1
  localStorage.setItem('num', num)
  $number.text(num)
})
$('#mul2').on('click', ()=>{
  let num = parseInt($number.text())
  num *= 2
  localStorage.setItem('num', num)
  $number.text(num)
})
$('#divide2').on('click', ()=>{
  let num = parseInt($number.text())
  num /= 2
  localStorage.setItem('num', num)
  $number.text(num)
})