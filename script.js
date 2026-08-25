let totalPrice = 0;
let discountAmount = 0;
let isCouponApplied = false;

// ১. প্রোডাক্টে ক্লিক করলে কার্টে দাম যোগ করার ফাংশন
function addToCart(element, price) {
  totalPrice += parseFloat(price);

  if (isCouponApplied) {
    discountAmount = totalPrice * 0.20; // ২০% ছাড়
  }

  updateDisplay();
}

// ২. পেজ লোড হলে Apply এবং Make Purchase বাটনে ক্লিক অ্যাকশন যুক্ত করা
document.addEventListener('DOMContentLoaded', () => {

  // কুপন অ্যাপ্লাই বাটন
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

  // মেক পারচেজ বাটন
  const purchaseBtn = document.querySelector('.btn-purchase');
  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', function (e) {
      e.preventDefault();

      if (totalPrice > 0) {
        alert("Thank you! Your order has been placed successfully.");

        // কেনাকাটা শেষ হলে কার্ট খালি করা
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

// ৩. স্ক্রিনে হিসাব আপডেট করার ফাংশন
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