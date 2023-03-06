const clientId = "c82dbe6f-4177-47f4-bf46-f98bca13760e"; // Use template engine to get rid of hard coding

microsoftTeams.app.initialize();

function requestAccessToken() {
  getClientSideToken().then((ssoToken) => {
    const tokenObj = jwtDecode(ssoToken);
    const tenantId = tokenObj.tid;
    const loginHint =
      tokenObj.ver === "2.0" ? tokenObj.preferred_username : tokenObj.upn;
    const msalConfig = {
      auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
      },
    };
    console.log(JSON.stringify(msalConfig));
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    const scopesRequestForSsoSilent = {
      scopes: ["User.Read"],
      loginHint: loginHint,
      redirectUri: window.location.origin + "/blank-auth-end",
    };
    msalInstance
      .ssoSilent(scopesRequestForSsoSilent)
      .then((tokenResponse) => getUserInfo(tokenResponse.accessToken))
      .catch((error) => {
        alert(error);
      });
  });
}
function getUserInfo(accessToken) {
  return new Promise((resolve, reject) => {
    microsoftTeams.app.getContext().then((context) => {
      fetch("/getUserInfo", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tid: context.user.tenant.id,
          token: accessToken,
        }),
        mode: "cors",
        cache: "default",
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          } else {
            reject(response.error);
          }
        })
        .then((responseJson) => {
          if (responseJson.error) {
            reject(responseJson.error);
          } else {
            const userDetails = responseJson;
            let userName = userDetails.displayName.split(" ");
            $("#name").append(userDetails.displayName);
            $("#username").append(
              `${userName[0]}_${userName[1]}  <i class="fa fa-pencil" aria-hidden="true" onclick="ssoUserNameToggle()"></i>`
            );
            $("#email").append(userDetails.userPrincipalName);
            $("#work").append(userDetails.jobTitle);
          }
        });
    });
  });
}
function ssoAuthentication() {
  getClientSideToken()
    .then((token) => {
      const tokenObj = jwtDecode(token);
      $("#name").append(tokenObj.name);
      $("#email").append(tokenObj.oid);
    })
    .catch((error) => {
      alert(error);
    });
}
function getClientSideToken() {
  return new Promise((resolve, reject) => {
    microsoftTeams.authentication
      .getAuthToken()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        alert(error);
        reject("Error getting token: " + error);
      });
  });
}
function getServerSideToken(clientSideToken) {
  return new Promise((resolve, reject) => {
    microsoftTeams.app.getContext().then((context) => {
      fetch("/getProfileOnBehalfOf", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tid: context.user.tenant.id,
          token: clientSideToken,
        }),
        mode: "cors",
        cache: "default",
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          } else {
            reject(response.error);
          }
        })
        .then((responseJson) => {
          if (responseJson.error) {
            reject(responseJson.error);
          } else {
            const userDetails = responseJson;
            let userName = userDetails.displayName.split(" ");
            $("#name").append(userDetails.displayName);
            $("#username").append(
              `${userName[0]}_${userName[1]}  <i class="fa fa-pencil" aria-hidden="true" onclick="ssoUserNameToggle()"></i>`
            );
            $("#email").append(userDetails.userPrincipalName);
            $("#work").append(userDetails.jobTitle);
          }
        });
    });
  });
}
function requestOboToken() {
  getToken().then((data) => {
    $("#consent").hide();
    $("#divError").hide();
    getClientSideToken().then((token) => {
      getServerSideToken(token);
    });
  });
}
function getToken() {
  return new Promise((resolve, reject) => {
    microsoftTeams.authentication
      .authenticate({
        url: window.location.origin + "/auth-start",
        width: 600,
        height: 535,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
function jwtDecode(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

document.getElementById("ssoBtn").addEventListener("click", requestAccessToken);
document.getElementById("oboBtn").addEventListener("click", requestOboToken);
