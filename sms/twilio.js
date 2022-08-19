const client = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

exports.sendSMS = async(phone, code) => {
  try {
    await client(accountSid, authToken).messages
    .create({
        body: `Verification Code - ${code}`,
        from: '+13148865841',
        to: `+233${phone}`
      })
    
  } catch (error) {
    console.log('Could not send SMS')
  }
  
}

