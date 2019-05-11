//retun a function ...leading lower case char
const re =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default (emails) => {
  //for every individual email run email.trim fcn inorder to remove space
  //emails.splitArray = emails
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  .filter(email =>re.test(email) === false )

  if (invalidEmails.length){
    return `These emails are invalid:${invalidEmails}`;
  }
};
