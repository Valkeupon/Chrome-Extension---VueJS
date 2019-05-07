import firebase from 'firebase'
import metaget from 'metaget'

const config = {
  apiKey: 'AIzaSyAp5Xbc_MJhPbCC9867fDEBiejU8o_wYhU',
  authDomain: 'extensionchrome-a6490.firebaseapp.com',
  databaseURL: 'https://extensionchrome-a6490.firebaseio.com',
  projectId: 'extensionchrome-a6490',
  storageBucket: '',
  messagingSenderId: '988181996502'
}

firebase.initializeApp(config)
const db = firebase.firestore()

const httpGet = function (url, callback) {
  metaget.fetch(url, function (err, meta_response) {
  	if(err){
  		callback("error");
  	}else{
  		callback(meta_response);
  	}
  });
}

export default {
  getData: (callback) => {
    db.collection('messages').limit(3).orderBy('createdAt', 'desc').onSnapshot(function (elem) {
      let messages = []
      if (!elem) {
        callback(null)
        return
      }
      elem.forEach((doc) => {
        const message = doc.data()
        messages.push(message)
      })

      messages.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
          return -1
        }
        if (a.createdAt > b.createdAt) {
          return 1
        }
        return 0
      })

      callback(messages)
    })
  },
  insertData: (link, callback) => {
    if (!link) {
      console.log({ type: 'error', content: 'Le lien est incorrect' })
      return
    }

    httpGet(link, (infos) => {
      if (!infos || infos === "error") {
        callback({ type: 'error', content: 'Le lien est incorrect' })
        return
      }

      const title = infos["og:title"] || link
      const describ = infos["og:description"] || "Aucune description"

      db.collection('messages').add({
        title: title,
        describ: describ,
        content: link,
        createdAt: new Date().getTime()
      }).then(function (doc) {
          callback({ type: 'succes', content: 'Lien envoyé' })
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    });
  }
}
