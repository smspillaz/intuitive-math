/*
 * app/sagas.js
 *
 * A toplevel saga that watches all the other sagas (which should be spawned
 * off at the same time).
 */
import { fork } from 'redux-saga/effects';
import githubData from 'containers/HomePage/saga';

export default function* root() {
  yield [
    fork(githubData),
  ];
}
