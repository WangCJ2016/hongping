function testMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    //console.log(next)
    return next(action);
  };
}

const test = testMiddleware();


export default test;