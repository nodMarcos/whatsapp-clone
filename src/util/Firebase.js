const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor () {
        this._config = {

            apiKey: "AIzaSyABNUFiJ2L7IeIxg1PUuQXhmjW1MhL0Lkg",
          
            authDomain: "whatsapp-clone-63172.firebaseapp.com",
          
            projectId: "whatsapp-clone-63172",
          
            storageBucket: "whatsapp-clone-63172.appspot.com",
          
            messagingSenderId: "676853924701",
          
            appId: "1:676853924701:web:1f46d8f2b5c316ceb91eb4"
          
          };
        this.init();
    }

    initAuth () {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                console.log(result);
                console.log('token: ', result.credential.idToken);


                s({user, token});
            })
            .catch(err => {
                f(err);
            })
        })
 
    }

    init() {
                
        if(!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            })

            window._initializedFirebase = true;
        }

    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

}