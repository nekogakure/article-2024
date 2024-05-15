// イージングクラス
class Easing {
  // コンストラクタ
  // レベルの初期値を100に設定
  constructor(level = 100) {
    this.level = level;
  }

  /**
   * ベジェ曲線上の点の座標を計算する関数
   *
   * @param {number} t - 曲線上の位置を表すパラメータ。0から1までの値を取る。
   * @param {number} x1 ,y1, x2, y2, x3, y3, x4, y4 - ベジェ曲線を定義する４つの制御点の座標。
   * @returns {{x: number, y: number}} - 曲線上の点のx座標とy座標を格納したオブジェクト。
   */
  bezierCurve(t, x1, y1, x2, y2, x3, y3, x4, y4) {
    // 1 - t を計算
    const oneMinusT = 1 - t;
    // 曲線上の点の座標を計算
    return {
      x:
        x1 * Math.pow(oneMinusT, 3) +
        3 * x2 * t * Math.pow(oneMinusT, 2) +
        3 * x3 * Math.pow(t, 2) * oneMinusT +
        x4 * Math.pow(t, 3),
      y:
        y1 * Math.pow(oneMinusT, 3) +
        3 * y2 * t * Math.pow(oneMinusT, 2) +
        3 * y3 * Math.pow(t, 2) * oneMinusT +
        y4 * Math.pow(t, 3),
    };
  }

  /**
   * リニア関数
   *
   * @param {number} x - イージングの対象となる値。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  linear(x) {
    x = Math.max(0, x);
    x = Math.min(x, 1);
    return x;
  }

  /**
   * ステップ関数
   *
   * @param {number} x - イージングの対象となる値。0から1までの値を取る。
   * @param {number} level - イージングのパラメーター。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  step(x, level) {
    x = Math.max(0, x);
    x = Math.min(x, 1);
    level = Math.max(0, level);
    level = Math.min(level, 1);
    if (x < level) return 0;
    return 1;
  }
  /**
   * イージングイン関数
   *
   * @param {number} x - イージングの対象となる値。0から1までの値を取る。
   * @param {number} level - イージングの強さを表すレベル。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  in(x, level) {
    // レベルの範囲を0から1に制限
    level = Math.max(0, level);
    level = Math.min(level, 1);
    // xの範囲を0から1に制限
    x = Math.max(0, x);
    x = Math.min(x, 1);
    // ベジェ曲線上の点を求める
    let result;
    //二分探索用の変数の作成
    let min = 0;
    let max = 1;
    // レベル分のループ
    for (let i = 0; i < this.level; ++i) {
      let mid = (min + max) / 2;
      result = this.bezierCurve(mid, 0, 0, level, 0, 1, 1 - level, 1, 1);
      // 二分探索の実行
      if (result.x > x) {
        max = mid;
      } else {
        min = mid;
      }
    }
    // xが曲線より右側にある場合は1を返す
    return result.y;
  }

  /**
   * イージングアウト関数
   *
   * @param {number} x - イージングの対象となる値。0から1までの値を取る。
   * @param {number} level - イージングの強さを表すレベル。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  out(x, level) {
    // レベルの範囲を0から1に制限
    level = Math.max(0, level);
    level = Math.min(level, 1);
    // xの範囲を0から1に制限
    x = Math.max(0, x);
    x = Math.min(x, 1);
    //二分探索用の変数の作成
    let result;
    let min = 0;
    let max = 1;
    // レベル分のループ
    for (let i = 0; i < this.level; ++i) {
      let mid = (min + max) / 2;
      result = this.bezierCurve(mid, 0, 0, 0, level, 1 - level, 1, 1, 1);
      // 二分探索の実行
      if (result.x > x) {
        max = mid;
      } else {
        min = mid;
      }
    }
    // xが曲線より右側にある場合は1を返す
    return result.y;
  }

  /**
   * イージングインアウト関数
   *
   * @param {number} x - イージングの対象となる値。0から1までの値を取る。
   * @param {number} level - イージングの強さを表すレベル。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  inout(x, level) {
    // レベルの範囲を0から1に制限
    level = Math.max(0, level);
    level = Math.min(level, 1);
    // xの範囲を0から1に制限
    x = Math.max(0, x);
    x = Math.min(x, 1);
    //二分探索用の変数の作成
    let result;
    let min = 0;
    let max = 1;
    // レベル分のループ
    for (let i = 0; i < this.level; ++i) {
      let mid = (min + max) / 2;
      result = this.bezierCurve(mid, 0, 0, level, 0, 1 - level, 1, 1, 1);
      // 二分探索の実行
      if (result.x > x) {
        max = mid;
      } else {
        min = mid;
      }
    }
    // xが曲線より右側にある場合は1を返す
    return result.y;
  }

  /**
   * イージングカスタム関数
   *
   * @param {number} t - イージングの対象となる値。0から1までの値を取る。
   * @param {number} x1,y1,x2,y2 - イージングの性質を決めるための引数。0から1までの値を取る。
   * @returns {number} - イージング後の値。
   */
  custom_bezier(x, x1, y1, x2, y2) {
    // 引数の範囲を0から1に制限
    x = Math.max(0, x);
    x = Math.min(x, 1);
    x1 = Math.max(0, x1);
    x1 = Math.min(x1, 1);
    x2 = Math.max(0, x2);
    x2 = Math.min(x2, 1);
    if (x1 > x2) {
      let mid = (x1 + x2) / 2;
      x1 = mid;
      x2 = mid;
    }
    let result;
    let min = 0;
    let max = 1;
    // レベル分のループ
    for (let i = 0; i < this.level; ++i) {
      let mid = (min + max) / 2;
      result = this.bezierCurve(mid, 0, 0, x1, y1, x2, y2, 1, 1);
      // 二分探索の実行
      if (result.x > x) {
        max = mid;
      } else {
        min = mid;
      }
    }
    // xが曲線より右側にある場合は1を返す
    return result.y;
  }
}

class Animation {
  #tools;
  #easing;
  constructor() {
    this.#easing = new Easing();
    this.default = {
      animation_info: {
        data: {
          pos: { x: 0, y: 0 },
          direction: 0,
          size: 100,
          effects: { color: 0, ghost: 0 },
        },
        easing: {
          type: "linear",
          args: {},
          /* 
          type: "in",
          args: {
            level: 0,//0-1
          },
          */
          /* 
          type: "out",
          args: {
            level: 0,//0-1
          },
          */
          /* 
          type: "inout",
          args: {
            level: 0,//0-1
          },
          */
          /* 
          type: "step",
          args: {
            level: 0,//0-1
          },
          */
          /* 
          type: "custom",
          args: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
          },
          */
        },
      },
    };
    this.#tools = {
      approximation: (array, input) => {
        if (array.length == 0) {
          return -1;
        }
        let min = 0;
        let max = array.length - 1;
        let mid = Math.floor((min + max) / 2);
        while (max - 1 != min) {
          mid = Math.floor((min + max) / 2);
          if (array[mid] > input) {
            max = mid;
          } else {
            min = mid;
          }
        }
        return min;
      },
    };
    this.datas = {
      0: this.default.animation_info,
      1: this.default.animation_info,
    };
  }
  getPos(t) {
    t = Math.max(0, t);
    t = Math.min(t, 1);
    const datas = this.datas;
    const keys = Object.keys(datas);
    for (let i = 0; i < keys.length; ++i) {
      keys[i] = Number.parseFloat(keys[i]);
    }
    keys.sort();
    let index = this.#tools.approximation(keys, t);
    if (index == keys.length - 1) {
      return datas[keys[index]].data;
    } else {
      let beforedata = datas[keys[index]].data;
      let afterdata = datas[keys[index + 1]].data;
      let easingInfo = datas[keys[index + 1]].easing;
      let intervaldata = JSON.parse(JSON.stringify(this.default.animation_info.data)); //差分の格納
      intervaldata.pos = {
        x: afterdata.pos.x - beforedata.pos.x,
        y: afterdata.pos.y - beforedata.pos.y,
      };
      intervaldata.direction = afterdata.direction - beforedata.direction;
      intervaldata.size = afterdata.size - beforedata.size;
      intervaldata.effects = {
        color: afterdata.effects.color - beforedata.effects.color,
        ghost: afterdata.effects.ghost - beforedata.effects.ghost,
      };
      let x = (t - keys[index]) / (keys[index + 1] - keys[index]);
      if (easingInfo.type == "linear") {
        x = this.#easing.linear(x);
      } else if (easingInfo.type == "in") {
        x = this.#easing.in(x, easingInfo.args.level);
      } else if (easingInfo.type == "out") {
        x = this.#easing.out(x, easingInfo.args.level);
      } else if (easingInfo.type == "inout") {
        x = this.#easing.inout(x, easingInfo.args.level);
      } else if (easingInfo.type == "step") {
        x = this.#easing.step(x, easingInfo.args.level);
      } else if (easingInfo.type == "custom") {
        x = this.#easing.custom_bezier(
          x,
          easingInfo.args.x1,
          easingInfo.args.y1,
          easingInfo.args.x2,
          easingInfo.args.y2
        );
      } else {
        console.error("The type of easing is uncorrected...");
      }
      let result = JSON.parse(JSON.stringify(this.default.animation_info.data)); //戻り値の格納
      result.pos = {
        x: beforedata.pos.x + x * intervaldata.pos.x,
        y: beforedata.pos.y + x * intervaldata.pos.y,
      };
      result.direction = beforedata.direction + x * intervaldata.direction;
      result.size = beforedata.size + x * intervaldata.size;
      result.effects = {
        color: beforedata.effects.color + x * intervaldata.effects.color,
        ghost: beforedata.effects.ghost + x * intervaldata.effects.ghost,
      };
      return result;
    }
  }
  /**
   * アニメーションデータを追加する関数
   *
   * @param {number} t - 時間位置を表すパラメータ。0から1までの値を取る。
   * @param {{pos: { x: number, y: number },direction: number,size: number,effects: { color: number, ghost: number },}} data - 座標、角度、大きさ、画像効果を入れる引数。
   * @param {{type: string,args: object,}} easing - イージングの種類などを入れる引数。
   */
  addAnimation(
    t,
    data = {
      pos: { x: 0, y: 0 },
      direction: 0,
      size: 100,
      effects: { color: 0, ghost: 0 },
    },
    easing = {
      type: "linear",
      args: {},
      /* 
    type: "in",
    args: {
      level: 0,//0-1
    },
    */
      /* 
    type: "out",
    args: {
      level: 0,//0-1
    },
    */
      /* 
    type: "inout",
    args: {
      level: 0,//0-1
    },
    */
      /* 
    type: "step",
    args: {
      level: 0,//0-1
    },
    */
      /* 
    type: "custom",
    args: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    },
    */
    }
  ) {
    this.datas[t] = { data: data, easing, easing };
  }
}
const animation = new Animation();
animation.addAnimation(0.5, data = {
  pos: { x: 100, y: 100 },
  direction: 0,
  size: 200,
  effects: { color: 0, ghost: 0 }
},
  easing = { type: "inout", args: { level: 0.1 } }
)
const canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");
let i = 0;
setInterval(() => {
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  i=(i+1/100)%1;
  const animation_info = animation.getPos(i);
  const x = animation_info.pos.x;
  const y = animation_info.pos.y;
  const size = animation_info.size;
  graphics.fill="#ff0000";
  graphics.rect(0, 0, 100, 100);
}, 100);