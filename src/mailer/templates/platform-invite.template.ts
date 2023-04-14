export const newUserInviteTemplate = (
  organizationName: string,
  inviteCode: string,
) => {
  return `
  <div style="display: flex; align-items: center; width: 100%; justify-content: center;">
    <div class="f-fallback_mr_css_attr">
      <h1 style="margin-top: 0;color: #333333;font-size: 22px;font-weight: bold;text-align: left;" data-darkosha-skip="data-darkosha-skip">Hello Friend!</h1>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;margin: .4em 0 1.1875em;" data-darkosha-skip="data-darkosha-skip">You were invited to the platform in an organization: <span style="margin-top: 0;color: #333333;font-size: 18px;font-weight: bold;text-align: left;">${organizationName}</span></p>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;" data-darkosha-skip="data-darkosha-skip">For accept invite press button:</p>
      <a href="http://localhost:3001/auth?invite=${inviteCode}" class="f-fallback_mr_css_attr button_mr_css_attr" target="_blank" style="margin: .4em 0 1.1875em; color: #FFFAFA;background-color:  #e91e63;display: inline-block;text-decoration: none;border-radius: 3px;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);-webkit-text-size-adjust: none;box-sizing: border-box;border-color: #e91e63;border-style: solid;border-width: 10px 18px;" rel=" noopener noreferrer">
        <span class="button--text_mr_css_attr" style="color: #FFFAFA;" data-darkosha-skip="data-darkosha-skip">
            Create account
        </span>
      </a>
      <br>
      <p style="font-size: 14px;color: rgb(255, 82, 82); margin-bottom: 10px;">Please note that the invitation is valid for 24 hours</p>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;margin: .4em 0 1.1875em;" data-darkosha-skip="data-darkosha-skip">Regards,
      <br>Your friends at QCase</p>
    </div>
  </div>
  `;
};

export const existingUserInviteTemplate = (
  userName: string,
  organizationName: string,
  inviteCode: string,
) => {
  return `
  <div style="display: flex; align-items: center; width: 100%; justify-content: center;">
    <div class="f-fallback_mr_css_attr">
      <h1 style="margin-top: 0;color: #333333;font-size: 22px;font-weight: bold;text-align: left;" data-darkosha-skip="data-darkosha-skip">Hello ${userName}!</h1>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;margin: .4em 0 1.1875em;" data-darkosha-skip="data-darkosha-skip">You were invited to the platform in an organization: <span style="margin-top: 0;color: #333333;font-size: 18px;font-weight: bold;text-align: left;">${organizationName}</span></p>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;" data-darkosha-skip="data-darkosha-skip">For accept invite press button:</p>
      <a href="http://localhost:3001/main/accept-invite?invite=${inviteCode}" class="f-fallback_mr_css_attr button_mr_css_attr" target="_blank" style="margin: .4em 0 1.1875em; color: #FFFAFA;background-color:  #e91e63;display: inline-block;text-decoration: none;border-radius: 3px;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);-webkit-text-size-adjust: none;box-sizing: border-box;border-color: #e91e63;border-style: solid;border-width: 10px 18px;" rel=" noopener noreferrer">
        <span class="button--text_mr_css_attr" style="color: #FFFAFA;" data-darkosha-skip="data-darkosha-skip">
            Accept Invite
        </span>
      </a>
      <br>
      <p style="font-size: 14px;color: rgb(255, 82, 82); margin-bottom: 10px;">Please note that the invitation is valid for 24 hours</p>
      <p style="font-size: 16px;line-height: 1.625;color: #51545E;margin: .4em 0 1.1875em;" data-darkosha-skip="data-darkosha-skip">Regards,
      <br>Your friends at QCase</p>
    </div>
  </div>
  `;
};
