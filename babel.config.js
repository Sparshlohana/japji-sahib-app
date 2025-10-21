module.exports = function (api) {
    api.cache(true);
    const presets = ['babel-preset-expo'];
    const plugins = [];

    // Strip console.* in production bundles to reduce JS size
    if (process.env.NODE_ENV === 'production') {
        plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
    }

    return { presets, plugins };
};