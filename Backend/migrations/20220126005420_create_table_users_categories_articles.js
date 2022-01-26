/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('admin').notNullable().defaultTo(false)
        table.timestamps();
    })
    .then(() => {
        return knex.schema.createTable('categories', table => {
            table.increments('id').primary()
            table.string('name').notNullable()
            table.integer('parentId').unsigned().notNullable()
                .references('id')
                .inTable('categories')
            table.timestamps();
        })
    })
    .then(() => {
        return knex.schema.createTable('articles', table => {
            table.increments('id').primary()
            table.string('name').notNullable()
            table.string('description', 1000).notNullable()
            table.string('imageUrl', 1000)
            table.binary('content').notNullable()
            table.integer('userId').unsigned().notNullable()
                .references('id')
                .inTable('users')
            table.integer('categoryId').unsigned().notNullable()
                .references('id')
                .inTable('categories')
            table.timestamps();
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return  knex.schema.dropTable('articles').then(()=>{
        return knex.schema.dropTable('categories');
    })
    .then(() => {
        return knex.schema.dropTable('users');

    })
    
};
