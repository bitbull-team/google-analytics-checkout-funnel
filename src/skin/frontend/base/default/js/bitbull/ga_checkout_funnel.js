var CheckoutFunnel = Class.create();
CheckoutFunnel.prototype = {

    currentStep: 'login',

    intervalId: null,

    stepData: {
        login: { url: '/checkout/onepage', title: 'Checkout' },
        billing: { url: '/checkout/onepage/billingAddress', title: 'Checkout Billing Address' },
        shipping: { url: '/checkout/onepage/shippingAddress', title: 'Checkout Shipping Address' },
        shipping_method: { url: '/checkout/onepage/shippingMethod', title: 'Checkout Shipping Method' },
        payment: { url: '/checkout/onepage/paymentMethod', title: 'Checkout Payment Method' },
        review: { url: '/checkout/onepage/review', title: 'Checkout Review' }
    },

    checkStepIsChanged: function() {
        if (this.currentStep != checkout.currentStep) {
            this.currentStep = checkout.currentStep;
    
            this.trackPageView(this.stepData[this.currentStep].url, this.stepData[this.currentStep].title);
        }
    },

    checkLoginStepIsPassed: function(req, res) {
        if (req.url.indexOf('checkout/onepage/saveMethod')) {
            this.intervalId = setInterval(this.checkStepIsChanged.bind(this), 200);

            // Deregister itself
            Ajax.Responders.unregister({
                onComplete: this.checkLoginStepIsPassed.bind(this)
            });
        }
    },

    trackPageView: function(url, title) {
        try {
            if (typeof ga == 'function') {
                // GA Universal
                ga('send', 'pageview', {
                    'page': url,
                    'title': title
                });
            } else {
                // GA Classic
                _gaq.push(['_set', 'title', title]);
                _gaq.push(['_trackPageview', url]);
            }
        } catch (e) {}
    },

    stopWatch: function() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },
    
    initialize: function() {
        // We start to watch for step changes only after the login/register step was passed
        // because checkout.currentStep start with 'billing' value
        Ajax.Responders.register({
            onComplete: this.checkLoginStepIsPassed.bind(this)
        });
    }
};

var checkoutFunnel = new CheckoutFunnel();