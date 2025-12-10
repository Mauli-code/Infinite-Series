document.addEventListener("DOMContentLoaded", function () {
  updateCartCount()
  var btn = document.querySelector(".mobile-menu-button")
  if (btn) {
    btn.addEventListener("click", function () {
      var m = document.querySelector(".nav-menu"); var b = document.querySelector(".nav-buttons")
      if (m.style.display === "flex") { m.style.display = "none"; b.style.display = "none" } else { m.style.display = "flex"; b.style.display = "flex"; m.style.flexDirection = "column"; b.style.flexDirection = "column" }
    })
  }
  document.addEventListener("click", function (e) {
    var t = e.target
    if (!t) { return }
    if (t.classList && t.classList.contains("add-to-cart-button")) {
      var id = t.getAttribute("data-book-id"); var name = t.getAttribute("data-book-name"); var price = parseFloat(t.getAttribute("data-book-price") || 0)
      addToCart(id, name, price)
    }
  })
  var f = document.getElementById("newsletter-form")
  if (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault()
      var em = document.getElementById("newsletter-email").value.trim()
      if (em === "" || em.indexOf("@") === -1) { showNotification("Please enter a valid email", "error"); return }
      showNotification("Thank you for subscribing!", "success")
      document.getElementById("newsletter-email").value = ""
    })
  }
})

function updateCartCount() {
  var d = localStorage.getItem("bookHavenCart"); var items = []
  if (d) { try { items = JSON.parse(d) } catch (e) { items = [] } }
  var total = 0
  for (var i = 0; i < items.length; i++) { total = total + items[i].quantity }
  var els = document.querySelectorAll("#cart-count")
  for (var j = 0; j < els.length; j++) { els[j].textContent = total }
}

function addToCart(id, name, price) {
  var d = localStorage.getItem("bookHavenCart"); var items = []
  if (d) { try { items = JSON.parse(d) } catch (e) { items = [] } }
  var found = false
  for (var i = 0; i < items.length; i++) { if (items[i].id === id) { items[i].quantity = items[i].quantity + 1; found = true; break } }
  if (!found) { items.push({ id: id, name: name, price: price, quantity: 1 }) }
  localStorage.setItem("bookHavenCart", JSON.stringify(items))
  updateCartCount()
  showNotification(name + " added to cart", "success")
}

function showNotification(m, t) {
  var area = document.getElementById("notification-area"); if (!area) { return }
  var n = document.createElement("div"); n.className = "notification"
  if (t === "error") { n.classList.add("notification-error") }
  n.innerHTML = '<span class="notification-message">' + m + '</span><button class="close-notification">×</button>'
  area.appendChild(n)
  var c = n.querySelector(".close-notification"); if (c) { c.addEventListener("click", function () { n.remove() }) }
  setTimeout(function () { if (n.parentNode) { n.remove() } }, 3000)
}