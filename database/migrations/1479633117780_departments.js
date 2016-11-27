'use strict'

const Schema = use('Schema')

class DepartmentsTableSchema extends Schema {

  up () {
    this.create('departments', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      //table.integer('storage_id').unsigned().references('id').inTable('storages')
      table.timestamps()
    })
  }

  down () {
    this.drop('departments')
  }

}

module.exports = DepartmentsTableSchema
