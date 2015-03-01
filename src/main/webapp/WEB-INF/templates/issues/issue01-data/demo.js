var receipt = {
      paymentDetails: [
           {
              key: "PaymentDetailsMaskedAccount",
              label: "Account",
              value: "1234"
          }, {
              key: "PaymentDetailsSource",
              label: "Entry Mode",
              value: "Magstripe"
          }, {
              key: "PaymentDetailsCardIssueNumber",
              label: "Card Issue No.",
              value: "01"
          }
      ]
};


thymol.ready(function () {
  thymol.configurePreExecution( function()
      {
          thymol.applicationContext.createVariable("receipt", receipt);
      });
});