'use strict'

const Schema = use('Schema')

class DepartmentStorageTableSchema extends Schema {

  up () {
    this.create('department_storage', (table) => {
      table.increments()
      table.integer('storage_id').unsigned().references('id').inTable('storages')
      table.integer('department_id').unsigned().references('id').inTable('departments')
      table.timestamps()
    })
  }

  down () {
    this.drop('department_storage')
  }

}

module.exports = DepartmentStorageTableSchema
