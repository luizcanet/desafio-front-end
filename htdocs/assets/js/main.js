function getSection (name, data) {
  for (var i in data.section) {
    if (data.section[i].name === name) {
      return data.section[i]
    }
  }

  return false
}

var env = nunjucks.configure('partials')

env.addFilter('limit', function (data, limit, offset) {
  return data.slice(offset || 0, limit + (offset || 0))
})

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.json')
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.response)
        document.getElementById('main').innerHTML = env.render('main.html', getSection('main', data))
        document.getElementById('brasil').innerHTML = env.render('section.html', getSection('Brasil', data))
        document.getElementById('mundo').innerHTML = env.render('section.html', getSection('Mundo', data))
      } else {
        window.alert('Request failed.  Returned status of ' + xhr.status)
      }
    }
    xhr.send()
  }
}
