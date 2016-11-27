'use strict'

const Schema = use('Schema')

class ItemsTableSchema extends Schema {

  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.integer('department_storage_id').unsigned().references('id').inTable('department_storage')      
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }

}

module.exports = ItemsTableSchema
