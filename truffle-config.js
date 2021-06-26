require('babel-register');
require('babel-polyfill');

module.exports = {
	contracts_build_directory: './src/abis/',
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*"
		},
		compilers: {
			solc: {
				optimizer: {
					enable: true,
					runs: 50000
				}
			}
		},
	},
	mocha: {
		useColors: true,
		bail: true,   // Abort after first test failure
		reporter: "nyan", // <https://mochajs.org/#reporters>
	}
};
