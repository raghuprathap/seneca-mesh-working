var Seneca = require('seneca');
var deserializeArgs = require('./deserializeArgs');
var uuid = require('uuid4');
Seneca()
// change app to createActor
    .add('role:fw,cmd:createActor', (msg, response) => {
        var id = uuid();

        // change createActor to actor role  fw to application
        Seneca().add(`role:application,cmd:actor,id:${id}`, (msg, response) => {
            // Seneca().add(`hello`,(msg,response) =>{
            // })
            console.log('Inside createActor')
            //var m = deserializeArgs(msg.data);

            var  Subject  = require('rxjs').Subject;
            var s = new Subject();

            // rename arr1 to something meaningfull
            var arr1 = m.operations.map(o => {
                var op = require('rxjs/operators')[o.operator];
                return op.apply(op, o.args);                            // filter(i => i%2 === 0)
            });

            var value = 'not odd';
            s.pipe.apply(s, arr1).subscribe((resp, err) => {
                value = resp;
            });

            s.next(msg.value);
            s.complete();
            // do not call complete until msg contains complete:true

            // response also should contain next, complete, error
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
        pin: 'role:fw,cmd:createActor'
    })