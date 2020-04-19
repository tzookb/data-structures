class Heap {
    constructor(type) {
        this.heapType = type
        this.arr = []
    }

    insert(item) {
        this.arr.push(item)
        this._rebalance(this.arr.length - 1)
    }

    remove(item) {
        const indexOfFound = this.arr.indexOf(item)
        if (indexOfFound > -1) {
            this.arr.splice(indexOfFound, 1)
        }
        this._rebalance()
    }

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

            //check children
            if (this._compare(leftChildVal, currentVal)) {
                this.arr[leftChildIdx] = currentVal
                this.arr[i] = leftChildVal
                i = leftChildIdx
                continue
            }
            if (this._compare(rightChildVal, currentVal)) {
                this.arr[rightChildIdx] = currentVal
                this.arr[i] = rightChildVal
                i = rightChildIdx
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

const h = new Heap('max');
// const h = new Heap();
h.insert(6)
h.insert(3)
h.insert(2)
h.insert(1)
h.insert(0)
h.insert(10)
console.log(h);
// h.remove(1)
// console.log(h);
