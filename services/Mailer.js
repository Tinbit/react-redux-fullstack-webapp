const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//Export class ,that is why its capital letter

//set up like react comp
// class Mailer contains bunch of code,setup, functionality that is closely tiled/inherited to Mail
//helper.Mail takes a lot of configuration and spits out Mail
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content){
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body =  new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //fcn provided by helper
    this.addClickTracking();//enable click tracking in sendgrid
    this.addRecipients();
  }

  formatAddresses(recipients) {
   return recipients.map(({ email }) => {
     return new helper.Email(email);
   });
 }

//from sendGrid doc code
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);

  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

   const response =  await this.sgApi.API(request);
   return response;
  }
}

module.exports = Mailer;
