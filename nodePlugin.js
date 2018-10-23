// const { Subject } = require('rxjs');
const uuid = require('uuid4');

const deserializeArgs = require('./deserializeArgs');

function nodePlugin(options) {

    this.add('role:fw,cmd:createActor', (msg, response) => {
        var id = uuid();
        console.log('new actor id is', id);


        this.add(`role:app , cmd:newActor, id:${id}`, (req, resp) => {
            const m = deserializeArgs(req.data);
            // console.log(m.operations);
            console.log(m);
            const { Subject } = require('rxjs');

            const s = new Subject();

            const arr1 = m.operations.map(o => {
                const op = require('rxjs/operators')[o.operator];
                return op.apply(op, o.args); // filter(i => i%2 === 0)
            });
            console.log(arr1);
            let number = "even number will not be doubled";
            s.pipe.apply(s, arr1).subscribe(i => {
                number = i + "";
            });
            console.log(req.value);
            s.next(req.value);
            resp({ value: number });
        })



        console.log('responded');
        response({ pattern: `role:app , cmd:newActor , id: ${id}` });


        // return 'name0';
    })
}

module.exports = nodePlugin;
