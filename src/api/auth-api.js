import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
export const logoutUser = () => {
  firebase.auth().signOut()
}

export const signInUser = async ({ name, email, password }) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    initialUserData(name)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

const initialUserData = (Name) => {
  const user = firebase.auth().currentUser
  firebase.auth().currentUser.updateProfile({
    displayName: Name,
  })
  firebase
    .database()
    .ref('users/' + user.uid)
    .set({
      data: {
        uid: user.uid,
        name: Name,
        email: user.email,
      },
    })
}

export const initialUserFetch = () => {
  try {
    const user = firebase.auth().currentUser
    return firebase
      .database()
      .ref('/users/' + user.uid)
      .once('value')
      .then((snapshot) => {
        return snapshot.val()
      })
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
