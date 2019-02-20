import { expect } from 'chai'
import { HashMap } from './hash-map'

describe('HashMap', () => {
  it('should map keys to values', () => {
    let map = new HashMap()

    map.set('test', 'value')

    expect(map.get('test')).to.equal('value')

    map.set('test', 'another value')

    expect(map.get('test')).to.equal('another value')

    map.set('test2', 'value2')

    expect(map.get('test')).to.equal('another value')
    expect(map.get('test2')).to.equal('value2')
  })

  it('should return null for empty key', () => {
    let map = new HashMap()

    expect(map.get('something')).to.be.null
  })

  it('should manage key hash collisions', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).to.equal(4)
  })

  it('should be able to delete keys', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.size).to.equal(4)

    map.delete('test1')

    expect(map.size).to.equal(3)

    map.delete('test2')
    map.delete('test3')
    map.delete('test4')

    expect(map.size).to.equal(0)
    expect(map.has('test2')).to.be.false
  })

  it('should be able to check key presence', () => {
    let map = new HashMap()

    expect(map.has('test')).to.be.false

    map.set('test', 'test')

    expect(map.has('test')).to.be.true
  })

  it('should be able to list keys', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.keys()).to.deep.equal(['test1', 'test2', 'test3', 'test4'])
  })

  it('should be able to list values', () => {
    let map = new HashMap(2)

    map.set('test1', 'foo')
    map.set('test2', 'bar')
    map.set('test3', 'baz')
    map.set('test4', 'qux')

    expect(map.values()).to.have.members(['foo', 'bar', 'baz', 'qux'])
  })
})
