 enig.userlogin = function(e) {
   var user = e;
    function loggedIn(user){
       login.hidden = logout.hidden = true; user.hidden = false;
       var userinfo = JSON.parse(localStorage.getItem('user'));
       user.template = user.innerHTML;
       user.innerHTML = user.template.replace(/\${[^}]*}/g, function(o) { return userinfo[o.replace(/\$|{|}/g,'')] });
       document.querySelector('#user > img').src = userinfo.picture;
       user.onmouseover = () => { logout.hidden = false }
       user.onmouseout = () => { logout.hidden = true }
       logout.addEventListener('click', ()=>{
         localStorage.removeItem('id_token');
         localStorage.removeItem('user');
         location.reload();
       });
    }
    var user = localStorage.getItem('user');
    if(!user){
      login.hidden = false; logout.hidden = true;
      var lock = new Auth0Lock('fBLesHV6GaLAbGs0ajbJEAT6KtdTfm8c', 'digplan.auth0.com');
      login.addEventListener('click', ()=>lock.show());
      login.hidden = false;
      lock.on("authenticated", (authResult) => {
        lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) return Error(error);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('user', JSON.stringify(profile));
          loggedIn(e);
        });
      });
      return;
    }
    loggedIn(e);
 }