
(function () {
  const elementTemplate = document.querySelector('#template')

  if (elementTemplate) {
    console.log('in script.js', elementTemplate.innerHTML)
  } else {
    console.log('in script.js elementTemplate 不存在')
  }
  console.log(Date.now())
})()