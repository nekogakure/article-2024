export default function f(x){
  return Math.floor(x*5)/5-Math.sqrt((1-5*x%1)*(1+5*x%1))/5;
}