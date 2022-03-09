const appInsights = require('./config')
let client = appInsights.defaultClient;

class Mylogger{
      async info(message){
          this.myLog(message,appInsights.Contracts.SeverityLevel.Information);
      }

      async warn(message){
        this.myLog(message,appInsights.Contracts.SeverityLevel.Warning);
    }

    async error(message){
        this.myLog(message,appInsights.Contracts.SeverityLevel.Error);
    }

      async  myLog(message,severityLevel) {
        client.trackTrace({
           message: message,
           severity: severityLevel
       });
     }
}


const mylogger = new Mylogger()

module.exports = mylogger