'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
    department_storage () {
        return this.belongsTo('App/Model/DepartmentStorage')
    }
}

module.exports = Item
