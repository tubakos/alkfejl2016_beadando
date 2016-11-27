'use strict'

const Schema = use('Schema')

class StoragesTableSchema extends Schema {

  up () {
    this.create('storages', (table) => {
      table.increments()
      table.string('name', 30).notNullable().unique()
      table.string('address', 60).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('storages')
  }

}

module.exports = StoragesTableSchema
