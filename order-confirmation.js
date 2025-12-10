function genOrderNumber() {
  var n = 'ORD-' + Math.floor( Math.random() * 900000 + 100000 )
  return n
}

var num = genOrderNumber()
var el = document.getElementById( "order-msg" )

if ( el ) {
  el.textContent = "Your order number is " + num + ". We'll email you the details."
}

try {
  localStorage.removeItem( "bookHavenCart" )
} catch ( e ) {}