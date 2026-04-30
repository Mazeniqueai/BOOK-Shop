// ================================
// PAGE DE PAIEMENT - MAM++ multilingue
// ================================

document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  i18n.applyTranslations();
  buildLanguageSelector();
  renderCheckoutPage();
});

function renderCheckoutPage() {
  const container = document.getElementById('checkout-grid');
  if (!container) return;

  if (Cart.items.length === 0) {
    container.style.display = 'block';
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 1rem;">${i18n.t('cart.empty')}</h2>
        <a href="../index.html" class="btn-primary" style="text-decoration: none;">${i18n.t('cart.discover')}</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div>
      <div class="checkout-section">
        <h2>${i18n.t('checkout.your_info')}</h2>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('checkout.firstname')} *</label>
            <input type="text" id="firstName" required />
          </div>
          <div class="form-group">
            <label>${i18n.t('checkout.lastname')} *</label>
            <input type="text" id="lastName" required />
          </div>
        </div>

        <div class="form-group">
          <label>${i18n.t('checkout.email')}</label>
          <input type="email" id="email" required placeholder="vous@email.com" />
        </div>

        <div class="form-group">
          <label>${i18n.t('checkout.phone')}</label>
          <input type="tel" id="phone" placeholder="+237 6XX XXX XXX" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('checkout.country')} *</label>
            <select id="country" required>
              <option value="">${i18n.t('checkout.select')}</option>
              <option value="CM">Cameroun</option>
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="CA">Canada</option>
              <option value="CI">Côte d'Ivoire</option>
              <option value="SN">Sénégal</option>
              <option value="MA">Maroc</option>
              <option value="ES">España</option>
              <option value="MX">México</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div class="form-group">
            <label>${i18n.t('checkout.city')}</label>
            <input type="text" id="city" />
          </div>
        </div>
      </div>

      <div class="checkout-section">
        <h2>${i18n.t('checkout.payment_method')}</h2>
        <div class="payment-methods" id="payment-methods">

          <label class="payment-option" data-method="stripe">
            <input type="radio" name="payment" value="stripe" />
            <div class="payment-icon stripe">CARD</div>
            <div class="payment-label">
              <strong>Carte bancaire</strong>
              <span>Visa, Mastercard, Amex via Stripe</span>
            </div>
          </label>
          <div class="payment-fields" id="fields-stripe">
            <div class="form-group">
              <label>Numéro de carte</label>
              <input type="text" placeholder="1234 5678 9012 3456" id="card-number" maxlength="19" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Expiration</label>
                <input type="text" placeholder="MM/AA" id="card-expiry" maxlength="5" />
              </div>
              <div class="form-group">
                <label>CVC</label>
                <input type="text" placeholder="123" id="card-cvc" maxlength="4" />
              </div>
            </div>
          </div>

          <label class="payment-option" data-method="paypal">
            <input type="radio" name="payment" value="paypal" />
            <div class="payment-icon paypal">PayPal</div>
            <div class="payment-label">
              <strong>PayPal</strong>
              <span>Payez avec votre compte PayPal</span>
            </div>
          </label>
          <div class="payment-fields" id="fields-paypal">
            <p style="font-size: 0.9rem; color: var(--ink-soft);">Vous serez redirigé vers PayPal.</p>
          </div>

          <label class="payment-option" data-method="orange">
            <input type="radio" name="payment" value="orange" />
            <div class="payment-icon orange">OM</div>
            <div class="payment-label">
              <strong>Orange Money</strong>
              <span>Paiement mobile Orange</span>
            </div>
          </label>
          <div class="payment-fields" id="fields-orange">
            <div class="form-group">
              <label>Numéro Orange Money</label>
              <input type="tel" placeholder="6XX XXX XXX" id="orange-number" />
            </div>
          </div>

          <label class="payment-option" data-method="mtn">
            <input type="radio" name="payment" value="mtn" />
            <div class="payment-icon mtn">MTN</div>
            <div class="payment-label">
              <strong>MTN Mobile Money</strong>
              <span>Paiement via MTN MoMo</span>
            </div>
          </label>
          <div class="payment-fields" id="fields-mtn">
            <div class="form-group">
              <label>Numéro MTN MoMo</label>
              <input type="tel" placeholder="6XX XXX XXX" id="mtn-number" />
            </div>
          </div>

        </div>
      </div>
    </div>

    <aside class="order-summary">
      <h3>${i18n.t('checkout.summary')}</h3>
      <div class="summary-items" id="summary-items"></div>
      <div class="summary-row">
        <span>${i18n.t('checkout.subtotal')}</span>
        <span id="summary-subtotal">0 €</span>
      </div>
      <div class="summary-row">
        <span>${i18n.t('checkout.shipping')}</span>
        <span style="color: var(--sage); font-weight: 500;">${i18n.t('checkout.shipping_free')}</span>
      </div>
      <div class="summary-total">
        <strong>${i18n.t('checkout.total_to_pay')}</strong>
        <span id="summary-total-price">0 €</span>
      </div>
      <button class="checkout-btn" id="pay-btn" onclick="processPayment()">
        ${i18n.t('checkout.pay_now')}
      </button>
      <p class="security-note">${i18n.t('checkout.secure')}</p>
    </aside>
  `;

  renderSummary();
  setupPaymentSelection();
}

function renderSummary() {
  const itemsContainer = document.getElementById('summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total-price');

  if (!itemsContainer) return;

  itemsContainer.innerHTML = Cart.items.map(item => `
    <div class="summary-item">
      <div class="summary-item-name">
        <strong>${item.title}</strong>
        <span>${item.author} · ${item.language || ''} × ${item.quantity}</span>
      </div>
      <div class="summary-item-price">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');

  const total = Cart.getTotal();
  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function setupPaymentSelection() {
  const options = document.querySelectorAll('.payment-option');
  const fields = document.querySelectorAll('.payment-fields');

  options.forEach(option => {
    option.addEventListener('click', () => {
      const method = option.dataset.method;
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
      options.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      fields.forEach(f => f.classList.remove('active'));
      const targetFields = document.getElementById(`fields-${method}`);
      if (targetFields) targetFields.classList.add('active');
    });
  });

  const cardNumber = document.getElementById('card-number');
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
      v = v.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = v;
    });
  }

  const cardExpiry = document.getElementById('card-expiry');
  if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
      e.target.value = v;
    });
  }
}

function processPayment() {
  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName = document.getElementById('lastName')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const country = document.getElementById('country')?.value;
  const selectedPayment = document.querySelector('input[name="payment"]:checked');

  if (!firstName || !lastName) { showToast('⚠ ' + i18n.t('validation.name_required')); return; }
  if (!email || !email.includes('@')) { showToast('⚠ ' + i18n.t('validation.email_invalid')); return; }
  if (!country) { showToast('⚠ ' + i18n.t('validation.country_required')); return; }
  if (!selectedPayment) { showToast('⚠ ' + i18n.t('validation.payment_required')); return; }

  const method = selectedPayment.value;

  if (method === 'stripe') {
    const cardNum = document.getElementById('card-number')?.value.replace(/\s/g, '');
    const expiry = document.getElementById('card-expiry')?.value;
    const cvc = document.getElementById('card-cvc')?.value;
    if (!cardNum || cardNum.length < 13) { showToast('⚠ ' + i18n.t('validation.card_invalid')); return; }
    if (!expiry || expiry.length !== 5) { showToast('⚠ ' + i18n.t('validation.expiry_invalid')); return; }
    if (!cvc || cvc.length < 3) { showToast('⚠ ' + i18n.t('validation.cvc_invalid')); return; }
  } else if (method === 'orange') {
    const num = document.getElementById('orange-number')?.value.trim();
    if (!num || num.length < 8) { showToast('⚠ ' + i18n.t('validation.orange_invalid')); return; }
  } else if (method === 'mtn') {
    const num = document.getElementById('mtn-number')?.value.trim();
    if (!num || num.length < 8) { showToast('⚠ ' + i18n.t('validation.mtn_invalid')); return; }
  }

  const btn = document.getElementById('pay-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = i18n.t('checkout.processing');
  }

  setTimeout(() => {
    const orderData = {
      orderNumber: 'MAM-' + Date.now().toString().slice(-8),
      items: Cart.items,
      total: Cart.getTotal(),
      customer: { firstName, lastName, email, country },
      paymentMethod: method,
      language: i18n.currentLang,
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    Cart.clear();
    window.location.href = 'confirmation.html';
  }, 2000);
}
