$(function() {
  var getTimeRemaining = function(endTime) {
    var totalTime = Date.parse(endTime) - Date.parse(new Date())
    var seconds = Math.floor((totalTime / 1000) % 60);
    var minutes = Math.floor((totalTime / 1000 / 60) % 60);
    return {'total': totalTime, 'minutes': minutes, 'seconds': seconds}
  }

  $('[data-behaviour~="clock"]').each(function() {
    var $clock = $(this)
    var noSleep = new NoSleep()
    noSleep.enable()

    var endTime = new Date(Date.parse(new Date()) + 25 * 60 * 1000)

    var updateClock = function() {
      $minutes = $clock.find('[data-behaviour~="minutes"]')
      $seconds = $clock.find('[data-behaviour~="seconds"]')
      t = getTimeRemaining(endTime)
      $minutes.html(('0' + t.minutes).slice(-2))
      $seconds.html(('0' + t.seconds).slice(-2))

      if (t.total <= 0) {
        clearInterval(timeInterval)
      }
    }

    updateClock()
    var timeInterval = setInterval(updateClock, 1000)
  })
})
