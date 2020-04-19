class Heap {
    constructor(type, initArr=[]) {
        this.heapType = type
        this.arr = []
        if (initArr) {
            initArr.map(item => {
                this.insert(item)
            })
        }
    }

    /**
     * O(log(n))
     */
    insert(item) {
        this.arr.push(item)
        this._rebalance(this.arr.length - 1)
    }

    /**
     * O(log(n))
     */
    remove(item) {
        const indexOfFound = this.arr.indexOf(item)
        if (indexOfFound > -1) {
            this._removeByIdx(indexOfFound)
        }
    }

    /**
     * O(1)
     */
    readEdge() {
        return this.arr[0]
    }

    /**
     * O(log(n))
     */
    getEdge() {
        const edge = this.arr[0]
        this._removeByIdx(0)
        return edge
    }

    /**
     * O(log(n))
     */
    _removeByIdx(idx) {
        const lastItem = this.arr.pop()
        this.arr[idx] = lastItem
        this._rebalance(idx)
    }

    /**
     * O(log(n))
     */
    _rebalance(i) {
        while (true) {
            let currentVal = this.arr[i]
            let parentIdx = this._getParentIndex(i)
            let parentVal = this.arr[parentIdx]

            if (this._compare(currentVal, parentVal)) {
                this.arr[parentIdx] = currentVal
                this.arr[i] = parentVal
                i = parentIdx
                continue
            }

            const leftChildIdx = this._getLeftChildIdx(i)
            const leftChildVal = this._getLeftChild(i)
            const rightChildIdx = this._getRightChildIdx(i)
            const rightChildVal = this._getRightChild(i)

            if (this._compare(rightChildVal, currentVal)) {
                this.arr[rightChildIdx] = currentVal
                this.arr[i] = rightChildVal
                i = rightChildIdx
                continue
            }
            //check children
            if (this._compare(leftChildVal, currentVal)) {
                this.arr[leftChildIdx] = currentVal
                this.arr[i] = leftChildVal
                i = leftChildIdx
                continue
            }
            break
        }
    }

    _compare(a, b) {
        if (this.heapType === 'max') {
            return a > b;
        }
        return a < b;
    }

    _getParentIndex(childIdx) {
        return Math.floor((childIdx-1)/2)
    }

    _getLeftChildIdx(parentIdx) {
        return 2*parentIdx + 1
    }

    _getRightChildIdx(parentIdx) {
        return 2*parentIdx + 2
    }

    _getParent(childIdx) {
        return this.arr[this._getParentIndex(childIdx)]
    }

    _getLeftChild(parentIdx) {
        return this.arr[ this._getLeftChildIdx(parentIdx) ]
    }

    _getRightChild(parentIdx) {
        return this.arr[ this._getRightChildIdx(parentIdx) ]
    }

    _getHeight() {
        return Math.ceil(Math.log2(this.arr.length + 1)) - 1
    }

}

// const h = new Heap('max', [1,2,3,4,5,6]);
const h = new Heap('max', [1,2,3,4,5,6]);
// const h = new Heap();
// h.insert(6)
// h.insert(3)
// h.insert(2)
// h.insert(1)
// h.insert(0)
// console.log(h);
console.log(h);
// h.remove(6)
h.insert(10)
h.remove(10)
// h.insert(7)
console.log(h);
