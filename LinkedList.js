(function() {
    // implements doubly-linked list
    var LinkedList = function () {
        this.len = 0;
        this.head = null;
        this.tail = null;

        this.Node = function () {};
        this.Node.prototype = {
            value: 0,
            next: null,
            prev: null
        }

        this.size = function () {
            return this.len;
        }

        this.add = function (v) {
            var newNode = new this.Node();
            newNode.value = v;
            newNode.next = this.head;
            if (this.head == null)
                this.tail = newNode;
            else
                this.head.prev = newNode;
            this.head = newNode;
            this.len++;
            return this; // for chaining multiple .add calls
        };

        this.remove = function (v) {
            if (this.head.value === v) { // removing head
                this.head = this.head.next;
                if (this.len == 0)
                    this.tail = null; // tail gets nuked here
                this.len--;
            }
            else if (this.tail.value === v) { // deleting last element or tail
                this.tail = this.tail.prev;
                this.tail.next = null;
                this.len--;
            } else { // node to remove is between head and tail
                var iter = this.head;
                while (iter) {
                    if (iter.value === v) {
                        iter.prev.next = iter.next;
                        iter.next.prev = iter.prev;
                        this.len--;
                        break;
                    }
                    iter = iter.next;
                }
            }
            return this;
        };

        this.list = function () {
            var curr = this.head;
            var res = [];
            while (curr) {
                res.push(curr.value);
                curr = curr.next;
            }
            console.log(res.join(" -> "));
        }
    };

    var ll = new LinkedList();
    ll.add(7).add(13).add(21).add(33).list();
    ll.remove(13).list();
    ll.remove(33).list();
    ll.remove(7).list();
    console.log("size: " + ll.size());
})();
