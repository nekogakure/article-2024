export default function f(x){
  return ((Math.floor(x * 5+1) - Math.sqrt((1 - 5 * x%0.2)(1 + 5 * x%0.2))) / 5);
}