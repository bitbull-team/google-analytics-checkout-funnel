# Checkout funnel tracking with Google Analytics
Enable fine-grained checkout funnel tracking with Google Analytics (both Universal and Classic). 
The module aim to be as unobtrusive as possible, and only work out of the box with standard Magento one page checkout.

## Facts
- version: check the [config.xml](https://github.com/bitbull-team/google-analytics-checkout-funnel/blob/master/src/app/code/community/Bitbull/GoogleAnalyticsCheckoutFunnel/etc/config.xml)
- extension key: Bitbull_GoogleAnalyticsCheckoutFunnel
- extension on Magento Connect: -
- [extension on GitHub](https://github.com/bitbull-team/google-analytics-checkout-funnel)
- [direct download link](https://github.com/bitbull-team/google-analytics-checkout-funnel/zipball/master)
- Composer key: `bitbull/google_analytics_checkout_funnel`

## Description

The module require no configuration on the Magento side, it works sending virtual pageview to Google Analytics on checkout step change.
All the magic happens inside the file:

`skin/frontend/base/default/js/bitbull/ga_checkout_funnel.js`

The class `CheckoutFunnel` observe the `currentStep` property of `Checkout` object and when a change occours it send a corresponding pair of virtual url and title as pageview.

The tracking method test for the presence of `ga` function (Universal Analytics version), otherwise fallback on the `_gaq` object use.

## Installation Instructions

1. Install via Composer, modman or by copying all the files from the repository to the appropriate folders
2. Clear the cache
3. That's it :)

## Funnel configuration

Setup your goal as usual, the relevant part of funnel configuration (the one that relies on pageviews sent by this module) is shown below:

![Funnel configuration](https://dl.dropboxusercontent.com/u/975953/google_analytics_checkout_funnel_configuration_full.png)

## Support

If you have any issues with this extension, open an issue on GitHub (see URL above)

## Contribution

Any contributions are highly appreciated. The best way to contribute code is to open a
[pull request on GitHub](https://help.github.com/articles/using-pull-requests).

## Developer

Gennaro Vietri
[@kesonno](https://twitter.com/kesonno)

## Licence

[OSL - Open Software Licence 3.0](http://opensource.org/licenses/osl-3.0.php)

## Copyright

(c) 2015 Gennaro Vietri
