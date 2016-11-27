'use strict'

const Department = use('App/Model/Department')
const DepStor = use('App/Model/DepartmentStorage')

const Validator = use('Validator')


class DepartmentController {

    * create (req, res) {
            yield res.sendView('departmentCreate')
    }
    
    * doCreate (req, res) {
        // 1. input
        const departmentData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:5',
        }

        const validation = yield Validator.validateAll(departmentData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/department/create')
            return
        }

        // TODO: check category

        const department = new Department()
        department.name = departmentData.name

        yield department.save()

        //res.redirect(`/recipe/${recipe.id}`)
        res.redirect('/departments')
    } 

    * show (req, res) {
        const departments = yield Department.all()

        yield res.sendView('showDepartments', {
            departments: departments.toJSON()
        })
    }

    * edit (req, res) {
        const department = yield Department.find(req.param('id'))

        yield res.sendView('departmentEdit', {
            department: department.toJSON()
        })
    }

    * doEdit (req, res) {
        const department = yield Department.find(req.param('id'))

        const departmentData = req.all()

        const rules = {
            'name': 'required|min:5'
        }

        const validation = yield Validator.validateAll(departmentData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/department/${department.id}/edit`)
            return
        }

        department.name = departmentData.name
        
        yield department.save()

        res.redirect(`/departments`)
    }

    * doDelete (req, res) {
        const dep_id = req.param('id')

        console.log("OSSIAN")
        console.log(dep_id)

        const depStors = yield DepStor.query().where('department_id', dep_id).fetch()

         for (const depStor of depStors) {
            const items = yield depStor.items().fetch()

            console.log(depStor)
            console.log("OSSIAN2")
            console.log(items)

            for (const item of items) {
               yield item.delete()
            }
            yield depStor.delete()
        }

        const department = yield Department.find(dep_id)

        yield department.delete()

        res.redirect('/departments')
    }
}

module.exports = DepartmentController
