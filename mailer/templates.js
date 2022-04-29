exports.registerMessage = (req, title, copy, username, code) => {
  return `<div style="font-family: 'Google Sans'; padding: 20px; background: #dfdfdf;min-width: 300px; max-width: 500px; margin: 0 auto;">
    <div style="background: white">
        <div style=" padding: 30px; background: #3f5176; text-align: center">
            <img style="margin-bottom: -1rem" src="https://ci3.googleusercontent.com/proxy/Ns0PoUW1mjQ45hmqVHePBzYPbNcILJfxt2phVMh6F9OoU0yaqybKasIwZa0wvoJqnub0iLmwzIxuMT8oabxL3cLkSGwIKTDCaGraYYM=s0-d-e1-ft#https://media2.giphy.com/media/Wt4byHTpeY3lHaoHzQ/200w.gif" alt="Animated Pinch Emoji" width="135" class="CToWUd">
            <h3 style="margin: 0;font-weight: 100; font-size: 24px; color: white">${title}</h3> 
        </div>
        \n
        <div style=" padding: 20px;">
            \n <p style="font-size: 15px">Hi ${username},</p>
            \n
            \n <p style="font-size: 15px">${copy}</p>
            \n
                <a style="display: inline-block; cursor: pointer; border: none; padding: 17px;text-decoration: none; background: orange; color: white;" 
                href="http://localhost:3000/auth/verify?token=${code}" target="_blank">Activate Email Address</a>
        </div>

    </div>
<div>
    `;
};

exports.loginVerificationMessage = (title, copy) => {
  return `<div style="min-width: 300px;max-width: 500px; margin: 0 auto; border: 1px solid orange; font-family: 'Google Sans'; padding: 20px; background: white">
    <h3 style="font-weight: 100; font-size: 24px">${title}</h3> 
    \n
    \n <p style="font-size: 15px">${copy}</p>
        </div>
    `;
};

exports.newUserVerificationMessage = (req, title, copy) => {
  return `<div style="font-family: 'Google Sans'; padding: 20px; background: #dfdfdf;min-width: 300px; max-width: 500px; margin: 0 auto;">
                <div style="background: white">
                    <div style=" padding: 20px; background: #3f5176">
                        <h3 style="font-weight: 100; font-size: 24px; color: white">${title}</h3> 
                    </div>
                    \n
                    <div style=" padding: 20px;">
                        \n <p style="font-size: 15px">${copy}</p>
                        \n
                            <a style="display: inline-block; cursor: pointer; border: none; padding: 17px;text-decoration: none; background: orange; color: white;" 
                            href="https://${req.headers.host}/dashboard" target="_blank">View Client Details</a>
                    </div>

                </div>
            <div>
    `;
};

exports.newAccountCreationMessage = (req, title, copy) => {
  return `<div style="font-family: 'Google Sans'; padding: 20px; background: #dfdfdf;min-width: 300px; max-width: 500px; margin: 0 auto;">
                <div style="background: white">
                    <div style=" padding: 20px; background: #3f5176">
                        <h3 style="font-weight: 100; font-size: 24px; color: white">${title}</h3> 
                    </div>
                    \n
                    <div style=" padding: 20px;">
                        \n <p style="font-size: 15px">${copy}</p>
                        \n
                        
                    </div>

                </div>
            <div>
    `;
};

exports.approvalRequestMessage = (req, title, copy) => {
  return `<div style="font-family: 'Google Sans'; padding: 20px; background: #dfdfdf;min-width: 300px; max-width: 500px; margin: 0 auto;">
                <div style="background: white">
                    <div style=" padding: 20px; background: #3f5176">
                        <h3 style="font-weight: 100; font-size: 24px; color: white">${title}</h3> 
                    </div>
                    \n
                    <div style=" padding: 20px;">
                        \n <p style="font-size: 15px">${copy}</p>
                        \n

                        <a style="display: inline-block; cursor: pointer; border: none; padding: 17px;text-decoration: none; background: orange; color: white;" 
                        href="https://${req.headers.host}/admin/login" target="_blank">Approve Request
                        </a>   
                    </div>

                </div>
            <div>
    `;
};

exports.userApprovalMessage = (req, title, copy) => {
  return `<div style="font-family: 'Google Sans'; padding: 20px; background: #dfdfdf;min-width: 300px; max-width: 500px; margin: 0 auto;">
                <div style="background: white">
                    <div style=" padding: 20px; background: #3f5176">
                        <h3 style="font-weight: 100; font-size: 24px; color: white">${title}</h3> 
                    </div>
                    \n
                    <div style=" padding: 20px;">
                        \n <p style="font-size: 15px">${copy}</p>
                        \n

                        <a style="display: inline-block; cursor: pointer; border: none; padding: 17px;text-decoration: none; background: orange; color: white;" 
                        href="https://${req.headers.host}/auth/login" target="_blank">Get Card Details
                        </a>   
                    </div>

                </div>
            <div>
    `;
};
