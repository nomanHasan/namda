import { intersection } from 'lodash';
import * as R from 'ramda';



// Map changes between two objects
export const mapChanges = (obj1, obj2) => {
  return intersection(Object.keys(obj1), Object.keys(obj2)).map(key => {
    const oldValue = obj1[key];
    console.log("Log: mapChanges -> oldValue", oldValue)
    const newValue = obj2[key];
    console.log("Log: mapChanges -> newValue", newValue)
    if (oldValue && !newValue) {
      return {
        key, change: 'DELETED',
        newValue,
        oldValue,
      }
    } else if (!oldValue && newValue) {
      return {
        key, change: 'CREATED',
        newValue,
        oldValue,
      }
    } else if (!oldValue && !newValue) {
      return {
        key, change: 'NOT_CHANGED',
        newValue,
        oldValue,
      }
    } else if (newValue !== oldValue) {
      return {
        key, change: 'UPDATED',
        newValue,
        oldValue,
      }
    }
  })
}



// Map common values between two objects
export const mapCommonValues = (objs) => {
  return R.fromPairs(R.uniq(
    R.flatten(objs.map(obj => Object.keys(obj)))
  )
    .map(key => {

      const values = R.map(R.prop(key))(objs);

      const allEqual = values.every(e => e == values[0]);

      if (allEqual) {
        return {
          key,
          common: values[0]
        };
      }
    })
    .filter(R.identity)
    .filter(e => !R.isNil(e?.common))
    .map(e => [e?.key, e?.common]));
};