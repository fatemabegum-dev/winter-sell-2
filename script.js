let totalPrice = 0;
let discountAmount = 0;
let isCouponApplied = false;


function addToCart(element, price) {
  totalPrice += parseFloat(price);

  if (isCouponApplied) {
    discountAmount = totalPrice * 0.20; 
  }

  updateDisplay();
}


document.addEventListener('DOMContentLoaded', () => {

  
  const applyBtn = document.querySelector('.btn-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      
      const couponInput = document.querySelector('.coupon-input input');
      const code = couponInput ? couponInput.value.trim() : '';

      if (code === "SELL200") {
        if (totalPrice >= 200) {
          discountAmount = totalPrice * 0.20;
          isCouponApplied = true;
          alert("Coupon applied successfully! 20% discount has been added.");
        } else {
          alert("Please add at least 200TK worth of products to use this coupon.");
        }
      } else {
        alert("Invalid coupon code! Please use: SELL200");
      }

      updateDisplay();
    });
  }

 
  const purchaseBtn = document.querySelector('.btn-purchase');
  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', function (e) {
      e.preventDefault();

      if (totalPrice > 0) {
        alert("Thank you! Your order has been placed successfully.");

       
        totalPrice = 0;
        discountAmount = 0;
        isCouponApplied = false;
        
        const couponInput = document.querySelector('.coupon-input input');
        if (couponInput) couponInput.value = '';

        updateDisplay();
      } else {
        alert("Your cart is empty! Please select at least one product.");
      }
    });
  }

});


function updateDisplay() {
  const grandTotal = totalPrice - discountAmount;

  let totalElem = document.getElementById('total-price');
  let discountElem = document.getElementById('discount');
  let grandTotalElem = document.getElementById('grand-total');

  if (!totalElem) totalElem = document.querySelector('.price-box p:nth-child(1) span');
  if (!discountElem) discountElem = document.querySelector('.price-box p:nth-child(2) span');
  if (!grandTotalElem) grandTotalElem = document.querySelector('.price-box p:nth-child(3) span');

  if (totalElem) totalElem.innerText = totalPrice.toFixed(2) + " TK";
  if (discountElem) discountElem.innerText = discountAmount.toFixed(2) + " TK";
  if (grandTotalElem) grandTotalElem.innerText = (grandTotal > 0 ? grandTotal : 0).toFixed(2) + " TK";
}
