module.exports.createEmail = (data, template) => {

    let email_template = {
        'business_account_created': `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <p>username: ${data.username}</p>
        <p>password: ${data.password}</p>
        <a href="http://localhost:4200/business/login">Login</a>
    </body>
    </html>
        `,



        'new_business_enquiry': `
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
       </head>
       <body>
            <h4> New Business Enquiry </h4>
           <p>business Category: ${data.business_category}</p>
           <p>business name: ${data.business_name}</p>
           <p>contact name: ${data.contact_name}</p>
           <p>contact email: ${data.contact_email}</p>
           <p>contact number: ${data.contact_number}</p>
       </body>
       </html>
           `,


        'user_purchase_self': `
           <!DOCTYPE html>
           <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
           </head>
           <body>
                <p> You have successfully purchased a gift card worth Rs ${data.amount} </p>
               <p>please use QR Code to redeem once the venue is operational</p>
           </body>
           </html>
               `,



        'user_purchase_recipient':`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
             <p> Your wellwisher ${data.user_name} just purchased a gift card woth Rs ${data.amount}  for you</p>
            <p>please use QR Code to redeem once the venue is operational</p>
        </body>
        </html>
            `


    };
    return email_template[template];
}