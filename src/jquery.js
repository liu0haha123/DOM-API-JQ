//利用了构造函数的思想，不是常规意义中JS的构造函数，设计模式
//JQ对象指的是其构造出的对象
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") {
            // 如果是标签形式就创建div
            elements = [createElement(selectorOrArrayOrTemplate)]
        }
        else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }    
    }

    else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement (string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }
    // api 可以操作elements
    const api = Object.create(jQuery.prototype) // 创建一个对象，这个对象的 __proto__ 为括号里面的东西,保证API中的函数储存在JQ对象的原型上，节约内存
    // 赋值操作
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })

    return api
}

jQuery.fn = jQuery.prototype = {
    // 保证构造函数
    constructor: jQuery,
    jquery: true,
    
    each (fn) {
        // 遍历元素，调用回调函数
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i);
        }
        return this;
    },

    get (index) {
        // 按下标获取元素
        return this.elements[index]
    },
    appendTo (node) {
        // 如果是节点就直接插入，如果是JQ对象就先获取第一个元素作为节点再插入
        if (node instanceof Element) {
            this.each((ele)=>{node.appendChild(ele)})
        } else if (node.jquery === true) {
            this.each((ele) => { node.get(0).appendChild(ele) })
        }
    },
    append (children) {
        // 如果操作的HTML元素就直接找到节点插入
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            // 如果插入的是HTML伪数组就逐个插入
            for (let i = 0; i < children, length; i++){
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    find (selector) {
        let array = [];
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
            array = array.concat(elements2);
        }
        array.oldApi = this; // this 就是 旧 api
        return jQuery(array);
    },
    parent () {
        const array = [];
        this.each(node => {
            // 如果父节点不在数组中就插入，用JQ对象重新包装保证链式操作
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode);
            }
        });
        return jQuery(array);
    },
    children () {
        const array = [];
        this.each(node => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(...node.children);
            }
        });
        return jQuery(array);
    },
    print () {
        console.log(this.elements);
    },
    // 闭包：函数访问外部的变量
    addClass (className) {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.classList.add(className);
        }
        return this;
    },
    end () {
        return this.oldApi; // this 就是新 api
    }
}
