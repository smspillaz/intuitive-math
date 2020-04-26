/*
 * app/sagas.js
 *
 * A toplevel saga that watches all the other sagas (which should be spawned
 * off at the same time).
 */
import { fork } from 'redux-saga/effects';

export default function* root() {
  yield [];
}
