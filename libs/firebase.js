import firebase from 'firebase'

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

const httpGet = function (url) {
  const xmlHttp = new XMLHttpRequest()
  const theUrl = 'https://getmeta.info/json?url=' + url
  xmlHttp.open('GET', theUrl, false) // false for synchronous request
  xmlHttp.send(null)
  return xmlHttp.responseText
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

    let infos = httpGet(link)
    if (!infos || infos === 'Server error') {
      console.log({ type: 'error', content: 'Le lien est incorrect' })
      return
    }

    infos = JSON.parse(infos)
    db.collection('messages').add({
      title: infos.title,
      content: link,
      createdAt: new Date().getTime()
    })
      .then(function (doc) {
        callback({ type: 'succes', content: 'Lien envoyé' })
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }
}
