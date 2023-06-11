const HTML_TEMPLATE = (data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            padding: 20px;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
            <h3>Pallet Management System</h3>
            </div>
            <div class="email-body">
              <p>Claim Pallet ${data.trx_number} has been issue to  ${data.company_name}, with details :<b></p>
              <p> BER Pallet : ${data.ber_pallet}<b></p>
              <p> Missing Pallet : ${data.missing_pallet}<b></p>
              <p> Price : ${data.price}<b></p>
              <p> Total Price : ${data.total_price}<b></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
module.exports = HTML_TEMPLATE;
