var Seneca = require('seneca')
var serializeArgs = require('./serializeArgs');
var data = {
    operations: [{
        operator: 'filter',
        args: [i => i % 2 !== 0]
    }, {
        operator: 'map',
        args: [i => i * 2]
    }]
}

/* [{
    next: 1
}, {
    next: 2
}, {
    next: 3
}, {
    next: 4
}, {
    complete: true
}] */

Seneca({ log: 'test' })
    .use('mesh')
    .act('role:fw,cmd:createActor', (err, response) => {
        console.log('This is response X: ', response.x);
        [1, 2, 3, 4].forEach(i => {
            Seneca({ log: 'test' })
                .use('mesh')
                .act(response.x, { value: i, data: serializeArgs(data) }, (err, res) => {
                    console.log(res);
                });
        });
        console.log('Response of application is: ', response);
    })