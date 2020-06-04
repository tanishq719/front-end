<template>
  <div class="header">
    <div class="logo-section">
      <img id="logo" src="../assets/logo.png" />
      <img id="full-form" src="../assets/full-form.png" />
    </div>
    <div class="search-box">
      <input id="search" placeholder="Search" />
      <button id="sep">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>
    <div class="login-signup">
      <div id="about-us">About us</div>
      <div id="help">Help</div>
      <button id="login">LOGIN</button>
      <button id="signup">SIGNUP</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style scoped>
#logo {
  width: 100%;
  max-width: 100px;
}
#full-form {
  width: 100%;
  max-width: 100px;
}
.logo-section {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  width: 20%;
  padding: 0 2% 0 2%;
  max-width: 100px;
}
.header {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
}
.search-box {
  width: 50%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-box button {
  padding: 0px 5px 0px 5px;
  background-color: #f2ccb3;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-color: #f1ac6b;
  margin: 0%;
  width: 100%;
  max-width: 80px;
  border-style: solid;
  border-width: 2px;
  border-left: none;
}
#search {
  width: 50%;
  padding: 6px 0px 6px 6px;
  border-width: 2px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-color: #f1ac6b;
  border-style: solid;
  border-right: none;
  margin-right: 0px;
}
.login-signup {
  /* width:25%; */
  /* align-items: flex-end; */
  /* display:flex; */
  align-self: center;
  justify-content: center;
  align-items: baseline;
  margin: 0 2%;
}
.login-signup div {
  position: relative;
  padding: 5px;
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
}
.login-signup button {
  padding: 0px 10px 0px 10px;
  margin: 4%;
  background-color: #0a76cf;
  color: white;
  border-width: 2px;
  border-radius: 5px;
  border-color: #0a76cf;
  width: 100%;
  max-width: 120px;
  border-style: solid;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
}
</style>