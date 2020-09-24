<template>
    <div>
        mapa hijo
        <div class="g-signin2" :data-onsuccess="onSignIn"></div>

    </div>
</template>

<script>

var ee = require('@google/earthengine');
console.log('1');

// Initialize client library and run analysis.
var initialize = function() {
  ee.initialize(null, null, function() {
      var image = new ee.Image('srtm90_v4');
image.getMap({min: 0, max: 1000}, function(map) {
  console.log(map);
});
    // ... run analysis ...
  }, function(e) {
    console.error('Initialization error: ' + e);
    console.log('2');
  });
};
const id = '598205792626-k99po8rb2u9jp913bg23er9f3knigfgf'
// Authenticate using an OAuth pop-up.
ee.data.authenticateViaOauth(id, initialize, function(e) {
  console.error('Authentication error: ' + e);
}, null, function() {
  ee.data.authenticateViaPopup(initialize);
});
console.log('3');
// Run an Earth Engine script.
ee.data.authenticateViaOauth(id);
// ee.initialize();
// var image = new ee.Image('srtm90_v4');
// image.getMap({min: 0, max: 1000}, function(map) {
//   console.log(map);
// });
// console.log('4');
export default {
    methods: {
      onSignIn (googleUser) {
          console.log(googleUser);
          var id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
       var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        },
    },
}
</script>

<style lang="scss" scoped>

</style>