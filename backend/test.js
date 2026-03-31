const http = require('http');
const app = require('./index');

let passed = 0;
let failed = 0;

function check(name, condition) {
    if (condition) { console.log(`✅ ${name}`); passed++; }
    else { console.log(`❌ ${name}`); failed++; }
}

setTimeout(() => {
    http.get('http://localhost:5000/health', (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const body = JSON.parse(data);
            check('health returns 200', res.statusCode === 200);
            check('status is healthy', body.status === 'healthy');

            http.get('http://localhost:5000/api/users', (res2) => {
                let data2 = '';
                res2.on('data', c => data2 += c);
                res2.on('end', () => {
                    const body2 = JSON.parse(data2);
                    check('users returns 200', res2.statusCode === 200);
                    check('users is array', Array.isArray(body2));
                    check('users has 3 items', body2.length === 3);

                    console.log(`\n${passed} passed, ${failed} failed`);
                    app.close();
                    process.exit(failed > 0 ? 1 : 0);
                });
            });
        });
    }).on('error', err => {
        console.log('❌ Error:', err.message);
        process.exit(1);
    });
}, 500);
