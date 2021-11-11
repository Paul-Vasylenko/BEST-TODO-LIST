import sequelize from '../../config/db';

sequelize
	.authenticate()
	.then((res) => res)
	.catch((e) => {
		console.log(e.message);
	});

sequelize
	.sync()
	.then(() => {
		console.log('DB connection successful.');
	})
	.catch((err) => {
		console.log(err);
	});
