const { assert } = require("chai")

//test to make sure the contractlist 
const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
    before(async() => {
        this.todoList = await TodoList.deployed()
    })

    it('deployed successfully', async() =>{

        const address = await this.todoList.address
        //make sure the address exists and not emmpty
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('list tasks', async () => {
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'check out dapp')
        assert.equal(task.compeleted, false)
        assert.equal(taskCount.toNumber(), 1)
    })

    it('create tasks', async () => {
        const results = await this.todoList.createTask('A new Task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 2)
        const event = result.logs[0].args 
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A new test')
        assert.equal(event.completed, false)
    })

    it('toggles task completetion', async () => {
        const result = await this.todoList.toogleCompeleted(1)
        const task = await this.todoList.task(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args 
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.content, 'A new test')
        assert.equal(event.completed, true)
    })

    


})