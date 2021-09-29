import { observable, observe } from './observer.js';

export default class Component{
    target;
    props; // 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위해서이다.
    state;

    constructor(target, props) {
        this.target = target;
        this.props = props; // $props 할당
        this.setup();
    }

    setup() {
        this.state = observable(this.initState());
        observe(() => {
            this.render();
            this.setEvent();    // 이벤트 버블링을 한 상태에서만 가능하다
            this.mounted();     // render 후에 mounted가 실행 된다.  render 이후에 추가적인 기능을 수행하기 위해서이다.
        })
    };

    initState(){return {}}
    mounted () {};
    template() {return '';}
    render() {this.target.innerHTML = this.template();}
    setEvent() {}

    addEvent(eventType, selector, callback){
        const children = [...this.target.querySelectorAll(selector)];
        // selector에 명시한 것보다 더 하위 요소가 선택되는 경우가 있을 땐 closest을 이용하여 처리한다.
        const isTarget = (target) => children.includes(target) || target.closest(selector);
        this.target.addEventListener(eventType, event => {
            if(!isTarget(event.target)) return false;
            callback(event);
        })
    }

}