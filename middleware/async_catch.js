const asyncCatch = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('api-error', err, ctx);
    }
  }
module.exports = asyncCatch;