// eslint-disable-next-line no-undef
importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/bcryptjs/2.4.3/bcrypt.min.js'
);

// eslint-disable-next-line no-undef
self.onmessage = function (e) {
    const { password, saltRounds } = e.data;
    // eslint-disable-next-line no-undef
    const hashed = bcrypt.hashSync(password, saltRounds);
    // eslint-disable-next-line no-undef
    self.postMessage({ hashed });
};
