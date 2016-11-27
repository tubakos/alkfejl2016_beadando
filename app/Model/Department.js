'use strict'

const Lucid = use('Lucid')

class Department extends Lucid {
     storage () {
        return this.belongsToMany('App/Model/Storage', 'department_storage')
    }


}

module.exports = Department
