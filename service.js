const Seneca = require('seneca');
const deserializeArgs = require('./deserializeArgs');
const uuid = require('uuid4');
Seneca()
    .add('role:fw,cmd:application', (msg, response) => {
        const id = uuid();

        Seneca().add(`role:fw,cmd:createActor,id:${id}`, (msg, response) => {
            // Seneca().add(`hello`,(msg,response) =>{
            // })
            console.log('Inside createActor')
            const m = deserializeArgs(msg.data);

            const { Subject } = require('rxjs');
            const s = new Subject();

            const arr1 = m.operations.map(o => {
                const op = require('rxjs/operators')[o.operator];
                return op.apply(op, o.args);                            // filter(i => i%2 === 0)
            });

            let value = 'not odd';
            s.pipe.apply(s, arr1).subscribe((resp, err) => {
                value = resp;
            });

            s.next(msg.value);
            s.complete();
            response({ value: value });
        })
            .use('mesh', {
                isbase: false,
                pin: `role:fw,cmd:createActor,id:${id}`
            })

        response({ x: `role:fw,cmd:createActor,id:${id}` })
    })
    .use('mesh', {
        isbase: false,
        pin: 'role:fw,cmd:application'
    })