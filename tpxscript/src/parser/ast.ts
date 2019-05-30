export type NodeType =
  | 'num'
  | 'str'
  | 'bool'
  | 'var'
  | 'fn'
  | 'call'
  | 'if'
  | 'assign'
  | 'binary'
  | 'prog'
  | 'let'

export interface BaseNode {
  type: NodeType
}

export interface NumberNode extends BaseNode {
  type: 'num'
  value: number
}

export interface VarNode extends BaseNode {
  type: 'var'
  value: string
}

export type IdentifierNode = VarNode

export interface StringNode extends BaseNode {
  type: 'str'
  value: string
}

export interface BooleanNode extends BaseNode {
  type: 'bool'
  value: boolean
}

export interface CallNode extends BaseNode {
  type: 'call'
  func: Node
  args: any[]
}

export interface IfNode extends BaseNode {
  type: 'if'
  cond: Node
  then: Node
  else: Node | undefined
}

export interface FnNode extends BaseNode {
  type: 'fn'
  name: string | undefined
  vars: any[]
  body: Node
}

export interface BinaryNode extends BaseNode {
  type: 'binary' | 'assign'
  operator: string
  left: Node
  right: Node
}

export interface AssignNode extends BinaryNode {
  type: 'assign'
  operator: '='
}

export interface ProgNode extends BaseNode {
  type: 'prog'
  prog: Node[]
}

export interface LetNode extends BaseNode {
  type: 'let'
}

export type Node =
  | NumberNode
  | VarNode
  | StringNode
  | BooleanNode
  | CallNode
  | IfNode
  | FnNode
  | BinaryNode
  | AssignNode
  | ProgNode
  | LetNode
