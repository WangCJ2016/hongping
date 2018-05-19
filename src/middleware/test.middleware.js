function testMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    return next(action);
  };
}

const test = testMiddleware();


export default test;