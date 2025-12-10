document.addEventListener( "DOMContentLoaded", function () {

  renderCart()

  var checkout = document.getElementById( "checkout-button" )

  if ( checkout ) {
    checkout.addEventListener( "click", function () {

      var it = getCartItems()

      if ( it.length === 0 ) {
        showNotification( "Your cart is empty", "error" )
        return
      }

      window.location.href = "order-confirmation.html"
    })
  }
})

function getCartItems() {

  var d = localStorage.getItem( "bookHavenCart" )
  var items = []

  if ( d ) {
    try {
      items = JSON.parse( d )
    } catch ( e ) {
      items = []
    }
  }

  return items
}

function saveCartItems( items ) {

  localStorage.setItem( "bookHavenCart", JSON.stringify( items ) )
  updateCartUI()
}

function renderCart() {

  var list = getCartItems()
  var el = document.getElementById( "cart-items" )
  var count = document.getElementById( "cart-total-items" )

  if ( count ) {
    count.textContent = list.length
  }

  if ( !el ) {
    return
  }

  if ( list.length === 0 ) {

    el.innerHTML =
      '<div class="empty-cart">' +
        '<i class="fas fa-book"></i>' +
        '<h3>Your cart is empty</h3>' +
        '<a href="books.html" class="btn">Browse books</a>' +
      '</div>'

    updateSummary()
    return
  }

  var html = ""

  for ( var i = 0; i < list.length; i++ ) {

    var it = list[i]

    html +=
      '<div class="cart-item" data-id="' + it.id + '">' +
        '<img class="cart-item-img" src="images/book-placeholder.jpg" />' +
        '<div class="cart-item-details">' +
          '<h4>' + it.name + '</h4>' +
          '<div class="author">by ' + ( it.author || "Unknown" ) + '</div>' +
          '<div class="price">$' + ( ( it.price || 0 ).toFixed(2) ) + '</div>' +
          '<div class="quantity-control">' +
            '<button class="decrease" data-id="' + it.id + '">-</button>' +
            '<input value="' + it.quantity + '" data-id="' + it.id + '" />' +
            '<button class="increase" data-id="' + it.id + '">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="item-total">$' + ( ( ( it.price || 0 ) * it.quantity ).toFixed(2) ) + '</div>' +
        '<button class="remove-item" data-id="' + it.id + '">Remove</button>' +
      '</div>'
  }

  el.innerHTML = html

  var inc = document.querySelectorAll( ".increase" )

  for ( var j = 0; j < inc.length; j++ ) {
    inc[j].addEventListener( "click", function ( e ) {
      changeQuantity( e.currentTarget.getAttribute( "data-id" ), 1 )
    })
  }

  var dec = document.querySelectorAll( ".decrease" )

  for ( var k = 0; k < dec.length; k++ ) {
    dec[k].addEventListener( "click", function ( e ) {
      changeQuantity( e.currentTarget.getAttribute( "data-id" ), -1 )
    })
  }

  var rem = document.querySelectorAll( ".remove-item" )

  for ( var r = 0; r < rem.length; r++ ) {
    rem[r].addEventListener( "click", function ( e ) {
      removeItem( e.currentTarget.getAttribute( "data-id" ) )
    })
  }

  updateSummary()
}

function changeQuantity( id, delta ) {

  var items = getCartItems()

  for ( var i = 0; i < items.length; i++ ) {
    if ( items[i].id === id ) {
      items[i].quantity = Math.max( 1, ( items[i].quantity || 1 ) + delta )
      break
    }
  }

  saveCartItems( items )
  renderCart()
}

function removeItem( id ) {

  var items = getCartItems()
  var idx = -1

  for ( var i = 0; i < items.length; i++ ) {
    if ( items[i].id === id ) {
      idx = i
      break
    }
  }

  if ( idx !== -1 ) {
    items.splice( idx, 1 )
  }

  saveCartItems( items )
  renderCart()
}

function updateSummary() {

  var items = getCartItems()
  var sub = 0

  for ( var i = 0; i < items.length; i++ ) {
    sub += ( items[i].price || 0 ) * items[i].quantity
  }

  var ship = items.length > 0 ? 3.99 : 0
  var tax  = sub * 0.08
  var total = sub + ship + tax

  if ( document.getElementById( "subtotal" ) ) {
    document.getElementById( "subtotal" ).textContent = "$" + sub.toFixed(2)
  }

  if ( document.getElementById( "shipping" ) ) {
    document.getElementById( "shipping" ).textContent = "$" + ship.toFixed(2)
  }

  if ( document.getElementById( "tax" ) ) {
    document.getElementById( "tax" ).textContent = "$" + tax.toFixed(2)
  }

  if ( document.getElementById( "total" ) ) {
    document.getElementById( "total" ).textContent = "$" + total.toFixed(2)
  }

  updateCartUI()
}

function updateCartUI() {

  var items = getCartItems()
  var t = 0

  for ( var i = 0; i < items.length; i++ ) {
    t += items[i].quantity
  }

  var els = document.querySelectorAll( "#cart-count" )

  for ( var j = 0; j < els.length; j++ ) {
    els[j].textContent = t
  }
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