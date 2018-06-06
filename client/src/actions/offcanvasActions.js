import { CLOSE_OFFCANVAS, OPEN_OFFCANVAS, TOGGLE_OFFCANVAS } from '../constants';

export function closeOffcanvas() {
  return { type: CLOSE_OFFCANVAS };
}

export function openOffcanvas() {
  return { type: OPEN_OFFCANVAS };
}

export function toggleOffcanvas() {
  return { type: TOGGLE_OFFCANVAS };
}