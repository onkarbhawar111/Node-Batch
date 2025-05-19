import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    setTimeout(()=>{
        console.log('delayed o/p....')
    }, 3000)
  console.log('an event occurred!');
});
myEmitter.emit('event');