var form = document.getElementById( "contactForm" )

if ( form ) {
  form.addEventListener( "submit", function ( e ) {

    e.preventDefault()

    var name  = document.getElementById( "c-name" ).value.trim()
    var email = document.getElementById( "c-email" ).value.trim()
    var msg   = document.getElementById( "c-message" ).value.trim()

    document.getElementById( "err-name" ).textContent = ""
    document.getElementById( "err-email" ).textContent = ""
    document.getElementById( "err-message" ).textContent = ""

    var ok = true

    if ( !name ) {
      document.getElementById( "err-name" ).textContent = "Please enter your name."
      ok = false
    }

    if ( !email || email.indexOf( "@" ) === -1 ) {
      document.getElementById( "err-email" ).textContent = "Please enter a valid email."
      ok = false
    }

    if ( !msg ) {
      document.getElementById( "err-message" ).textContent = "Please write a message."
      ok = false
    }

    if ( !ok ) {
      return
    }

    document.getElementById( "contact-result" ).textContent = "Thanks, " + name + ". Your message has been received."

    console.log( "Contact submitted:", { name: name, email: email, message: msg } )

    document.getElementById( "contactForm" ).reset()
    showNotification( "Message sent", "success" )
  })
}

function showNotification( m, t ) {

  var area = document.getElementById( "notification-area" )

  if ( !area ) {
    return
  }

  var n = document.createElement( "div" )
  n.className = "notification"

  if ( t === "error" ) {
    n.className = "notification error"
  }

  n.textContent = m

  area.appendChild( n )

  setTimeout( function () {
    if ( n.parentNode ) {
      n.parentNode.removeChild( n )
    }
  }, 2500 )
}