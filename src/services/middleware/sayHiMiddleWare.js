export const sayHiMiddleWare = store => next => action => {
    console.log('Привет!');
    return next(action);
};