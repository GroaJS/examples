const Groa = require('groa');
const Router = require('groa-router');

const app = new Groa();
const router = new Router({
	prefix: 'example.foo.Example1'
});

app.use(router.routes());

const fn = async (ctx, next) => {
	console.log('Middleware!');
	await next();
};

router.rpc('Ping', async (ctx) => {

	console.log('Ping');
	ctx.body = ctx.req.body;
});

router.rpc('Echo', fn, fn, async (ctx, next) => {

	console.log('Echo');
	ctx.body = ctx.req.body;
});

// Sub-router
const subRouter = new Router();

subRouter.rpc('Hello', async (ctx) => {

	console.log('hello');

	ctx.body = {
		msg: 'Hello!!!'
	};
});

// Append to previous router
router.use(subRouter.routes());

app.listen(50051, () => {
	console.log('Listening on port 50051');

	app.loadProto(__dirname + '/proto/example.proto');
});
