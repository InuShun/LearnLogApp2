import firebase from './libs/Firebase';

// 本番環境のみ計測
if (process.env.NODE_ENV === 'production') {
  firebase.analytics();
}