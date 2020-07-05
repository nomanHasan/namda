export class JSONX {
  /** Parse the argument anyhow. Even if the argumnent is an Object*/
  static tryParse(payload) {
    if (typeof payload === 'object' && payload !== null) {
      return {
        success: true,
        result: payload, 
      };
    }
    if (typeof payload !== 'string') {
      return {
        success: false,
        result: payload, 
      };
    }
    let result;
    try {
      result = JSON.parse(payload);
    } catch(e) {
      return {
        success: false,
        result: e.message
      }
    }
    return {
      success: true,
      result
    };
  }
}