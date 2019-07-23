export function logIn() {
  FB.login(
    response => {
      if (response.status === "connected") {
        const context = this;
        context.setState({ user: response });
        window.token = response.authResponse.userID;

        FB.api("/me", "get", response => {
          console.log(response);
          context.setState({
            userName: response.name,
            buttonAction: "btn-danger",
            userID: response.authResponse.userID
          });
        });
        FB.api(`/${response.authResponse.userID}/`, function(response) {
          if (response && !response.error) {
            /* handle the result */
          }
        });
        FB.api(`/${response.authResponse.userID}/friends`, "GET", {}, function(
          response
        ) {
          // Insert your code here
          console.log("friends?:", response);
        });
      }
    },
    { scope: "public_profile,email,user_friends,user_birthday" }
  );
}
export function logOut() {
  FB.logout(response => {
    if (response.status === "unknown") {
      this.setState({
        user: null,
        userName: null,
        buttonAction: "btn-primary"
      });
    }
  });
}
export function publishPost(messageContent) {
  FB.api("/me/feed", "post", { message: messageContent });
}
