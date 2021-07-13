
exports.up = knex => knex.schema.createTable('users', table => {
    table.text('id').notNullable()
    table.text('name').notNullable()
    table.text('email').unique().notNullable()
    table.text('nickname').notNullable()
    table.text('password').notNullable()
})

exports.down = knex => knex.schema.dropTable('users')