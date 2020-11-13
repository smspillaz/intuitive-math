/*
 * app/sagas.js
 *
 * A toplevel saga that watches all the other sagas (which should be spawned
 * off at the same time).
 */

export default function* root() {
  yield [];
}
