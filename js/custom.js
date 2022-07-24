var productsInBasket = [];

function getProductFromBasket(productId) {
  for (var x = 0; x < productsInBasket.length; x++) {
    var currProd = productsInBasket[x];
    if (currProd.id == productId) {
      return currProd;
    }
  }
  return false;
}

function deleteProductFromBasket(productId) {
  for (var x = 0; x < productsInBasket.length; x++) {
    var currProd = productsInBasket[x];
    if (currProd.id == productId) {
      productsInBasket.splice(x, 1);
    }
  }
}

function reloadBasketHMTL() {
  var productsHTML = '';

  $('.shopping-bag').html('');

  if (productsInBasket.length === 0) {
    $('.shopping-bag').html('<p>Your Basket is empty</p>');
    totalInBasket(productsInBasket);
    return;
  }
  for (var x = 0; x < productsInBasket.length; x++) {
    var currProd = productsInBasket[x];

    var currentProductHTML = '<div class="row">' +
      '<div class="col col-grid prod-name col-4">' + currProd.name + '</div>' +
      '<div class="col col-grid prod-sing-prc col-2">' + currProd.price + '$</div>' +
      '<div class="col col-grid prod-qty col-2">' + currProd.quantity + '</div>' +
      '<div class="col col-grid prod-tot-prc col-3">' + currProd.price * currProd.quantity + '$</div>' +
      '<div class="col col-grid col-1">' +
      '<button type="button" class="remove-btn btn btn-danger" data-productid="' + currProd.id + '">Remove</button>' +
      '</div>' +
      '</div>';

    productsHTML += currentProductHTML;
  }
  $('.shopping-bag').html(productsHTML);
  totalInBasket(productsInBasket);
}


//me ->
function totalInBasket(productsInBasket) {
  var productsHTML = '';
  var totalPrice = 0;
  if (productsInBasket.length === 0) {
    var emptyBasketHTML = '<div class="row">' +
      '<div class="col col-grid prod-name col-4"><strong>Total price</strong></div>' +
      '<div class="col col-grid prod-name col-4">' + '' + '</div>' +
      '<div class="col col-grid prod-tot-prc col-3">' + '' + '</div>' +
      '<div class="col col-grid col-1">' +
      '<button type="button" class="confirm-btn btn btn-outline-dark disabled">Confirm Order</button>' +
      '</div>' +
      '</div>';

    $('.confirm-order').html(emptyBasketHTML);
    return;
  } else {
    for (var x = 0; x < productsInBasket.length; x++) {
      var currProd = productsInBasket[x];
      totalPrice += currProd.price * currProd.quantity;
    }
    var confirmOrderHTML = '<div class="row">' +
      '<div class="col col-grid prod-name col-4"><strong>Total price</strong></div>' +
      '<div class="col col-grid prod-name col-4">' + " " + '</div>' +
      '<div class="col col-grid prod-tot-prc col-3">' + totalPrice + '$' + '</div>' +
      '<div class="col col-grid col-1">' +
      '<button type="button" class="confirm-btn btn btn-outline-dark" data-productid="' + currProd.id + '">Confirm Order</button>' +
      '</div>' +
      '</div>';

    $('.confirm-order').html(confirmOrderHTML);
  }
}

// me <-



(function initEvents() {
  // $('img.ihv').on('mouseenter', function() {
  //   var initialSrc = $(this).attr('src');
  //   $(this).attr('src', $(this).data('src'));
  //   $(this).data('src', initialSrc);
  // });
  //
  // $('img.ihv').on('mouseleave', function() {
  //   var initialSrc = $(this).attr('src');
  //   $(this).attr('src', $(this).data('src'));
  //   $(this).data('src', initialSrc);
  // });

  $('.add-to-bag').on('click', function(e) {
    var price = $(this).data('price');
    var name = $(this).data('productname');
    var id = $(this).data('productid');

    var productInBasket = getProductFromBasket(id);

    if (productInBasket) {
      productInBasket.quantity += 1;
    } else {
      productsInBasket.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }
    reloadBasketHMTL();
  });

  $('.shopping-bag').on('click', '.remove-btn', function(e) {
    var id = $(this).data('productid');
    var productInBasket = getProductFromBasket(id);

    if (productInBasket.quantity > 1) {
      productInBasket.quantity--;
    } else {
      deleteProductFromBasket(id);
    }
    reloadBasketHMTL();
  });
  //->me
  $('.confirm-order').on('click', '.confirm-btn', function(e) {
    var id = $(this).data('productid');
    var test = productsInBasket;
    var productInBasket = getProductFromBasket(id);
    for (i = 0; i <productsInBasket.length; i++) {
      if (productsInBasket[i].quantity > 5) {
        alert("The selected quantity for product " + productsInBasket[i].name + " is out of stock");
      }
    }
    reloadBasketHMTL();
  });
  //->me
  reloadBasketHMTL();
})();
