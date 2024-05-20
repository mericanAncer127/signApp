import { CSSProperties } from "react";

export const DateSign = "DateSign";
export const TypeSign = "TypeSign";
export const DrawSign = "DrawSign";
export const CheckSign = "CheckSign";

export interface Point {
  x: number;
  y: number;
}

export interface SignResource {
  x: number | undefined;
  y: number | undefined;
  w: number | undefined;
  h: number | undefined;
  image: any;
}

export interface SignElement {
  id: number;
  content: any; // dom Element
  type: string;
  left: number;
  top: number;
  style: CSSProperties | undefined;
  resource: SignResource | undefined;
  pageIndex: number;
}
