# BINARY SEARCH TREE => T: O(logn/O(n), S: O(h)
class BSTNode:
    def __init__(self, data=None, left=None, right=None) -> None:
        self.data = data
        self.left = left
        self.right = right


class BinarySearchTree:
    def __init__(self) -> None:
        self.root = None
        self.count = 0

    def insert(self, val: int) -> BSTNode:
        node = self.root
        if not node:
            self.root = node = BSTNode(val)
        else:
            node = self.__insertHelper(val, self.root)

        self.count += 1
        return node

    def __insertHelper(self, val: int, node: BSTNode) -> BSTNode:
        if not node:
            return BSTNode(val)
        if val <= node.data:
            node.left = self.__insertHelper(val, node.left)
        else:
            node.right = self.__insertHelper(val, node.right)
        return node

    def preOrder(self, root: BSTNode):
        if not root:
            return

        print(f'preOrder: {root.data}')
        self.preOrder(root.left)
        self.preOrder(root.right)

    def inOrder(self, root: BSTNode):
        if not root:
            return

        self.inOrder(root.left)
        print(f'inOrder: {root.data}')
        self.inOrder(root.right)

    def postOrder(self, root: BSTNode):
        if not root:
            return

        self.postOrder(root.left)
        self.postOrder(root.right)
        print(f'postOrder: {root.data}')

    def printVal(self, root: BSTNode):
        if not root:
            return None

        self.printVal(root.left)
        print(root.data)
        self.printVal(root.right)

    def isInTree(self, val: int) -> bool:
        if not self.root:
            return False

        return self.__checkInTree(val, self.root)

    def __checkInTree(self, val: int, node: BSTNode) -> bool:
        if not node:
            return False

        if val == node.data:
            return True

        if val <= node.data:
            return self.__checkInTree(val, node.left)
        else:
            return self.__checkInTree(val, node.right)

    def getHeight(self, root: BSTNode):
        if not root:
            return -1

        leftHeight = self.getHeight(root.left)
        rightHeight = self.getHeight(root.right)

        return max(leftHeight, rightHeight) + 1

    def getMin(self, root: BSTNode):
        if not root:
            return None

        if root.left:
            return self.getMin(root.left)

        return root.data

    def getMax(self, root: BSTNode):
        if not root:
            return None

        if root.right:
            return self.getMax(root.right)

        return root.data

    def isBST(self, root: BSTNode = None) -> bool:
        queue = []

        if not self.root:
            return False

        node = root if root else self.root
        queue.append((node, float('-inf'), float('inf')))

        while queue:
            curr, low, high = queue.pop(0)
            if not curr:
                return True
            else:
                if not low <= curr.data or not high >= curr.data:
                    return False

                queue.append((curr.left, low, curr.data))
                queue.append((curr.right, curr.data, high))

        return True

    def getSuccessor(self, val: int):
        curr = self.__findNode(val, self.root)

        if not curr:
            return curr

        # if node has right subTree, Inorder Successor is min in right tree
        if curr.right:
            return self.__findMin(curr.right)
        else:
            # node doesn't have a right subtree ->  go to nearest ancestor where node would be in its left subtree
            successor = None
            ancestor = self.root

            while ancestor and ancestor != curr:
                if curr.data < ancestor.data:
                    successor = ancestor
                    ancestor = ancestor.left
                else:
                    ancestor = ancestor.right

        return successor

    def getPredecessor(self, val: int):
        curr = self.__findNode(val, self.root)

        if not curr:
            return curr

        # if node has left subTree, Inorder Predeccessor is max in left tree
        if curr.left:
            return self.__findMax(curr.left)
        else:
            # node doesn't have a left subtree ->  go to nearest ancestor where node would be in its right subtree
            predecessor = None
            ancestor = self.root

            while ancestor and ancestor != curr:
                if curr.data > ancestor.data:
                    predecessor = ancestor
                    ancestor = ancestor.right
                else:
                    ancestor = ancestor.left

        return predecessor

    def __findNode(self, val: int, root: BSTNode = None) -> BSTNode:
        if not root:
            return None

        if root.data == val:
            return root
        if val <= root.data:
            return self.__findNode(val, root.left)
        else:
            return self.__findNode(val, root.right)

    def __findMin(self, root: BSTNode):
        if not root:
            return root

        if root.left:
            return self.__findMin(root.left)

        return root

    def __findMax(self, root: BSTNode):
        if not root:
            return root

        if root.right:
            return self.__findMax(root.right)

        return root


t = BinarySearchTree()
t.insert(8)
t.insert(4)
t.insert(2)
t.insert(5)
t.insert(1)
t.insert(-2)
t.insert(3)
t.insert(9)
t.insert(15)
curr = t.root

t.printVal(curr)
